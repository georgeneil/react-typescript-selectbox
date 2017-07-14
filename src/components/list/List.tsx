import * as React from 'react';

function getStyles(props) {
    return {
        root: {

        }
    }
};

interface Props extends React.Props<List> {
    style: any;
};

export default class List extends React.Component<Props, {}>{
    public render() {
        const styles = getStyles(this.props);
        const {style, children} = this.props;

        return (
            <div style={style}>
                {children}
            </div>
        );
    }
};