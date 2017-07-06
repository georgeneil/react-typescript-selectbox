import * as React from 'react';
import TextFieldLabel from './TextFieldLabel';
import TextFieldUnderline from './TextFieldUnderline';
import Transitions from '../styles/Transitions';

function getStyles(props) {
    return {
        root: {
            fontSize: 16,
            lineHeight: '24px',
            width: props.fullWidth ? '100%' : 256,
            height: (props.label ? 72 : 48),
            display: 'inline-block',
            position: 'relative' as 'relative',
            backgroundColor: 'transparent',
            transition: Transitions.easeOut('200ms', 'height'),
            cursor: props.disabled ? 'not-allowed' : 'auto',
        },
        input: {
            padding: 0,
            position: 'relative',
            width: '100%',
            border: 'none',
            outline: 'none',
            backgroundColor: 'rgba(0,0,0,0)',
            color: 'rgba(0, 0, 0, 0.87)',
            cursor: 'inherit',
            font: 'inherit',
            WebkitOpacity: 1,
            WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated style).
        },
        inputNative: {
            appearance: 'textfield', // Improve type search style.
        }
    }
};

interface Props extends React.Props<TextField> {
    label : string;
    children?: any;
};

export default class TextField extends React.Component<Props, {}>{
    private textInput: HTMLInputElement;

    public render() {
        const styles = getStyles(this.props);
        const {label, children} = this.props;
        
        const inputProps = {
            id: 'input',
            ref: (elem) => this.textInput = elem,
        };

        const childStyleMerged = {...styles.input};
        let inputElement;
        if (children) {
            inputElement = React.cloneElement(children,
                {
                    ...inputProps,
                    ...children.props,
                    style: {...childStyleMerged},
                });
        } 

        const textFieldLabelElement = (
            <TextFieldLabel>
                {label}
            </TextFieldLabel>
        );

        return (
            <div style={styles.root}>
                {textFieldLabelElement}
                {inputElement}
                <TextFieldUnderline />
            </div>
        );
    }
};