import * as React from 'react';

interface Props extends React.Props<DropDownMenu> {
    value: number;
};

export default class DropDownMenu extends React.Component<Props, {}>{
    componentDidMount() {
        console.log("CDM")
    };
    public render() {
        const {children, value} = this.props;
        
        let displayValue = '';
        React.Children.forEach(children, (child) => {
            const {label, dvalue, primaryText} = (child as any).props;
            if (child && (value === dvalue)) {
                // This will need to be improved (in case primaryText is a node)
                displayValue = label || primaryText;
            }
        });
        return (
            <div>
                {displayValue}
            </div>
        );
    }
}