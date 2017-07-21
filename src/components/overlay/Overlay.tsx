import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';
import Transitions from '../styles/Transitions';

function getStyles(props) {
    return {
        root: {
            position: 'fixed' as 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 2000,
        }
    }
};

interface Props extends React.Props<Overlay> {
    open: boolean;
    anchorEl: any;
    anchorOrigin?: {
        vertical: string,
        horizontal: string,
    };
    targetOrigin?: {
        vertical: string,
        horizontal: string,
    };
    onRequestClose: any;
    children?:any;
};

export default class Overlay extends React.Component<Props, {}>{
    private layer: HTMLDivElement;
    // constructor(props, context) {
    //     super(props, context);
        
    //     this.state = {
    //         open: props.open,
    //     };
    // }

    static defaultProps = {
        anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        },
        onRequestClose: () => {},
        open: false,
        style: {
            overflowY: 'auto',
        },
        targetOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        zDepth: 1,
    };

    componentDidMount() {
        this.renderOverlay();
        this.setTargetPlacement();
    }

    componentDidUpdate() {
        this.renderOverlay();
        this.setTargetPlacement();
    }

    onClickAway = (event) => {
        if (event.defaultPrevented) {
            return;
        }

        if (!this.props.open) {
            return;
        }

        this.props.onRequestClose();

        // const el = this.layer;
        // if (event.target !== el && event.target === window ||
        // (document.documentElement.contains(event.target) && !Dom.isDescendant(el, event.target))) {
        // this.props.componentClickAway(event);
        // }
    };

    getAnchorPosition(el) {
        if (!el) {
            el = ReactDOM.findDOMNode(this);
        }

        const rect = el.getBoundingClientRect();
        const a = {
            top: rect.top,
            right: 0,
            bottom: 0,
            left: rect.left,
            middle: 0,
            center: 0,
            width: el.offsetWidth,
            height: el.offsetHeight,
        };

        a.right = rect.right || a.left + a.width;
        a.bottom = rect.bottom || a.top + a.height;
        a.middle = a.left + ((a.right - a.left) / 2);
        a.center = a.top + ((a.bottom - a.top) / 2);

        return a;
    }

    getTargetPosition(targetEl) {
        return {
            top: 0,
            center: targetEl.offsetHeight / 2,
            bottom: targetEl.offsetHeight,
            left: 0,
            middle: targetEl.offsetWidth / 2,
            right: targetEl.offsetWidth,
        };
    }

    setTargetPlacement = () => {
        if (!this.props.open) {
            return;
        }

        if (!this.layer) {
            return;
        }

        // const targetEl = this.layer.children[0];
        const targetEl = ReactDOM.findDOMNode<HTMLDivElement>(this.layer.children[0]);
        if (!targetEl) {
            return;
        }

        const {targetOrigin, anchorOrigin} = this.props;
        const anchorEl = this.props.anchorEl;

        const anchor = this.getAnchorPosition(anchorEl);
        let target = this.getTargetPosition(targetEl);

        let targetPosition = {
            top: anchor[anchorOrigin.vertical] - target[targetOrigin.vertical],
            left: anchor[anchorOrigin.horizontal] - target[targetOrigin.horizontal],
        };

        // if (scrolling && this.props.autoCloseWhenOffScreen) {
        // this.autoCloseWhenOffScreen(anchor);
        // }

        // if (this.props.canAutoPosition) {
        // target = this.getTargetPosition(targetEl); // update as height may have changed
        // targetPosition = this.applyAutoPositionIfNeeded(anchor, target, targetOrigin, anchorOrigin, targetPosition);
        // }

        targetEl.style.top = `${Math.max(0, targetPosition.top)}px`;
        targetEl.style.left = `${Math.max(0, targetPosition.left)}px`;
        targetEl.style.maxHeight = `${window.innerHeight}px`;
        targetEl.style.position = `fixed`;
        targetEl.style.backgroundColor = 'rgb(255, 255, 255)';
        targetEl.style.transition = Transitions.easeOut();
        targetEl.style.boxSizing = 'border-box';
        targetEl.style.boxShadow = 'rgba(0, 0, 0, 0.12) 0px 1px 6px';
        targetEl.style.fontFamily = 'sans-serif';
    };

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

    renderOverlay() {
        const {
            open,
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

            // const layerElement = this.render();
            unstable_renderSubtreeIntoContainer(this, children, this.layer)
        } else {
            this.unrenderLayer();
        }
    }

    render() {
        return null;
    }
};