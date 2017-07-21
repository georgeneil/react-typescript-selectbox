import * as React from 'react';

function getStyles(props, state) {
    return {
        root: {
            backgroundColor: state.hovered ? 'rgba(0, 0, 0, 0.1)' : null,
            color: 'rgba(0, 0, 0, 0.87)',
            cursor: 'pointer',
            minHeight: '32px',
            lineHeight: '32px',
            fontSize: 15,
            whiteSpace: 'nowrap' as 'nowrap',
            padding: '0px 24px',
        }
    }
};

interface Props extends React.Props<MenuItem> {
    itemValue: number;
    primaryText : string;
    style?: Object;
    onMouseUp?: any;
};

export default class MenuItem extends React.Component<Props, {}>{
    state = {
        hovered: false,
    }

    handleMouseEnter = (event) => {
        this.setState({hovered: true});
    };

    handleMouseLeave = (event) => {
        this.setState({hovered: false});
    };

    handleMouseUp = (event) => {
        if (this.props.onMouseUp) {
            this.props.onMouseUp(event);
        }
    }

    public render() {
        const styles = getStyles(this.props, this.state);
        const {primaryText, style, children} = this.props;

        const mergedRootStyles = {...styles.root, ...style};

        return (
            <div 
                style={mergedRootStyles}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onMouseUp={this.handleMouseUp}
            >
                <div>
                    {primaryText}
                </div>
            </div>
        );
    }
}