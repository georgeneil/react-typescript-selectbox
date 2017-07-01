import * as React from 'react';

interface Props extends React.Props<MenuItem> {
    dvalue: number;
    primaryText : string;
};

export default class MenuItem extends React.Component<Props, {}>{
     public render() {
        // const styles = getStyles(this.props);
        const {children} = this.props;

        return (
            <div>
                <label>
                    {children}
                </label>
            </div>
        );
     }
}