import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {unstable_renderSubtreeIntoContainer, unmountComponentAtNode} from 'react-dom';
import RenderToLayer from '../common/RenderToLayer';
import Transitions from '../styles/Transitions';

const styles = {
  root: {
    display: 'none',
  },
};

interface Props extends React.Props<Popover> {
    open: boolean;
    animated: boolean;
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
    animation: any;
    children?:any;
};

export default class Popover extends React.Component<Props, {}>{
    private layer: RenderToLayer;

    state = {
        open: false,
        closing: false,
    };

    constructor(props, context) {
        super(props, context);

        this.state = {
            open: props.open,
            closing: false,
        };
    }
    

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
        this.setPlacement();
    }

    componentDidUpdate() {
        this.setPlacement();
    }

    timeout = null;

    componentWillReceiveProps(nextProps) {
        if (nextProps.open === this.props.open) {
            return;
        }

        if (nextProps.open) {
            clearTimeout(this.timeout);
            this.timeout = null;
            this.setState({
                open: true,
                closing: false,
            });
        } else {
            if (nextProps.animated) {
                if (this.timeout !== null) return;
                this.setState({closing: true});
                this.timeout = setTimeout(() => {
                this.setState({
                    open: false,
                }, () => {
                    this.timeout = null;
                });
                }, 500);
            } else {
                this.setState({
                open: false,
                });
            }
        }
    }

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

    setPlacement = () => {
        if (!this.props.open) {
            return;
        }

        if (!this.layer.getLayer()) {
            return;
        }

        const targetEl = ReactDOM.findDOMNode<HTMLDivElement>(this.layer.getLayer().children[0]);
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

        targetEl.style.top = `${Math.max(0, targetPosition.top)}px`;
        targetEl.style.left = `${Math.max(0, targetPosition.left)}px`;
        targetEl.style.maxHeight = `${window.innerHeight}px`;
        targetEl.style.position = `fixed`;
        targetEl.style.backgroundColor = 'rgb(255, 255, 255)';
        targetEl.style.boxSizing = 'border-box';
        targetEl.style.boxShadow = 'rgba(0, 0, 0, 0.12) 0px 1px 6px';
        targetEl.style.fontFamily = 'sans-serif';
    };

    requestClose(reason) {
        if (this.props.onRequestClose) {
            this.props.onRequestClose(reason);
        }
    }

    componentClickAway = (event) => {
        event.preventDefault();
        this.requestClose('clickAway');
    };

    renderLayer = () => {
        const {
            anchorEl,
            animation,
            anchorOrigin,
            children,
            onRequestClose,
            ...other
        } = this.props;

        const {
            open
        } = this.state;

        let styleRoot = {
            position: 'fixed'
        };

        const Animation = animation;

        return (
        <Animation
            style={styleRoot}
            {...other}
            open={this.state.open && !this.state.closing}
        >
            {children}
        </Animation>
        );
    };

    render() {
        return (
            <div style={styles.root}>
                <RenderToLayer
                    ref={(ref) => this.layer = ref}
                    open={this.state.open}
                    componentClickAway={this.componentClickAway}
                    render={this.renderLayer}
                />
            </div>
        );
    }
};