import * as React from 'react';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';

interface Props extends React.Props<RenderToLayer> {
    open: boolean;
    componentClickAway: any;
    render: any;
    children?:any;
};

export default class RenderToLayer extends React.Component<Props, {}>{
    private layer: HTMLDivElement;

    timeout = null;

    componentDidMount() {
        this.renderLayer();
    }

    componentDidUpdate() {
        this.renderLayer();
    }

    onClickAway = (event) => {
        if (event.defaultPrevented) {
            return;
        }

        if (!this.props.componentClickAway) {
            return;
        }

        if (!this.props.open) {
            return;
        }

        this.props.componentClickAway(event);
    };

    getLayer() {
        return this.layer;
    }

    unrenderLayer() {
        if (!this.layer) {
            return;
        }

        this.layer.style.position = 'relative';
        this.layer.removeEventListener('click', this.onClickAway);

        unmountComponentAtNode(this.layer);
        document.body.removeChild(this.layer);
        this.layer = null;
    }

    renderLayer() {
        const {
            open,
            render,
            children
        } = this.props;

        if (open) {
            if (!this.layer) {
                this.layer = document.createElement('div');
                document.body.appendChild(this.layer);

                this.layer.addEventListener('click', this.onClickAway);
                this.layer.style.position = 'fixed';
                this.layer.style.top = '0';
                this.layer.style.bottom = '0';
                this.layer.style.left = '0';
                this.layer.style.right = '0';
                this.layer.style.zIndex = '2000';
            }

            const layerElement = render();
            unstable_renderSubtreeIntoContainer(this, layerElement, this.layer)
        } else {
            this.unrenderLayer()
        }
    }

    render() {
        return null;
    }
};