import * as React from 'react';

function getStyles(props) {
    return {
        root: {
            color: 'rgba(0, 0, 0, 0.87)',
            cursor: 'pointer',
            minHeight: '32px',
            lineHeight: '32px',
            fontSize: 15,
            whiteSpace: 'nowrap' as 'nowrap',
        }
    }
};

interface Props extends React.Props<MenuItem> {
    itemValue: number;
    primaryText : string;
};

export default class MenuItem extends React.Component<Props, {}>{
     public render() {
        const styles = getStyles(this.props);
        const {primaryText, children} = this.props;

        const mergedRootStyles = {...styles.root};

        return (
            <div style={mergedRootStyles}>
                <div>
                    {primaryText}
                </div>
            </div>
        );
     }
}