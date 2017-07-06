import * as React from 'react';
import Transitions from '../styles/Transitions';

function getStyles(props) {
    return {
        root: {
            boxSizing: 'border-box',
            overflow: 'visible',
            transition: Transitions.easeOut(),
            padding: 12,
            width: 48,
            height: 48,
            fontSize: 0,
            background: 'none'
        }
    }
};

interface Props extends React.Props<IconButton> {
    style?: Object;
    containerElement?: string;
};

export default class IconButton extends React.Component<Props, {}>{
    private button: HTMLButtonElement;

    static defaultProps = {
        containerElement: 'button',
        type: 'button',
    };

    public render() {
        const styles = getStyles(this.props);
        const {children, style, containerElement, ...other} = this.props;

        const defaultStyles = {
            border: 10,
            boxSizing: 'border-box',
            display: 'inline-block',
            cursor: 'pointer',
            textDecoration: 'none',
            margin: 0,
            padding: 0,
            outline: 'none',
            fontSize: 'inherit',
            fontWeight: 'inherit',
            position: 'relative', // This is needed so that ripples do not bleed past border radius.
            // verticalAlign: href ? 'middle' : null,
            zIndex: 1, // This is also needed so that (onTouch) ripples do not bleed past border radius.
        };

        const mergedStyles = {...defaultStyles, ...styles.root, ...style}
        
        const buttonProps = {
            style: {...mergedStyles},
            ref: (node) => this.button = node,
            type: 'button'
        };

        return React.createElement(containerElement, buttonProps, children);
    }
}