import * as React from 'react';
import SvgIcon from '../svg-icon/SvgIcon';


interface Props extends React.Props<ArrowDown> {
    style?: any;
};

export default class ArrowDown extends React.Component<Props, {}>{
    public render() {
        return (
            <SvgIcon {...this.props}>
                <path d="M7 10l5 5 5-5z"/>
            </SvgIcon>
        );
    }
};