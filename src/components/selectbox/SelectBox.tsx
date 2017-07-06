import * as React from 'react';
import TextField from '../textfield/TextField';
import DropDownMenu from '../dropDownMenu/DropDownMenu';

function getStyles(props) {
    return {
        
    }
};

interface Props extends React.Props<SelectBox> {
    label : string;
    value: number;
};

export default class SelectBox extends React.Component<Props, {}>{
    private textInput: HTMLInputElement;

    state = {
        switched: false
    };


    public render() {
        const styles = getStyles(this.props);
        const {label, value, children} = this.props;

        return (
            <TextField label={label}>
                <DropDownMenu value={value}>
                    {children}
                </DropDownMenu>
            </TextField>
            
        );
    }
};