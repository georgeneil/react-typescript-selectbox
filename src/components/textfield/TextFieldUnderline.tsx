import * as React from 'react';

function getStyles(props) {
    return {
        root: {
            borderTop: 'none',
            borderLeft: 'none',
            borderRight: 'none',
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderColor: 'rgb(224, 224, 224)',
            bottom: 8,
            boxSizing: 'content-box',
            margin: 0,
            position: 'absolute' as 'absolute',
            width: '100%',
        }
    }
};

interface Props extends React.Props<TextFieldUnderline> {
    style?: Object;
};

export default class TextFieldUnderline extends React.Component<Props, {}>{
    private hrNode: HTMLHRElement;

    static defaultProps = {
        style: {}
    };

    public render() {
        const styles = getStyles(this.props);
        const {style} = this.props;
        const underline = {...styles.root, ...style};

        return (
            <div>
                <hr 
                ref={(ref) => this.hrNode = ref}
                style={underline}
                />
            </div>
        );
    }
};