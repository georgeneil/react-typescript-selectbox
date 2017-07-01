import * as React from 'react';

interface Props extends React.Props<SvgIcon> {
    style?: any;
};

export default class SvgIcon extends React.Component<Props, {}>{
    render() {
        const {children, style} = this.props;

        let defaultStyle = {
            display: 'inline-block',
            height: 24,
            width: 24,
            userSelect: 'none'
        };
        const mergedStyles = {...defaultStyle, ...style};

        return (
            <svg style={mergedStyles}>
                {children}
            </svg>
        );
    }
}