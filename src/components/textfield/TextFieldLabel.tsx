import * as React from 'react';
import Transitions from '../styles/Transitions';

function getStyles(props) {
  const defaultStyles = {
    position: 'absolute' as 'absolute',
    lineHeight: '22px',
    top: 38,
    transition: Transitions.easeOut(),
    zIndex: 1, // Needed to display label above Chrome's autocomplete field background
    transform: 'scale(1) translate(0, 0)',
    transformOrigin: 'left top',
    pointerEvents: 'auto',
    userSelect: 'none',
    color: 'rgba(0, 0, 0, 0.3)'
  };

  const shrinkStyles = {
    transform: 'scale(0.75) translate(0, -28px)',
    pointerEvents: 'none',
  };

  return {
    root: {...defaultStyles, ...shrinkStyles}
  };
}

interface Props extends React.Props<TextFieldLabel> {
    // label : string;
};

export default class TextFieldLabel extends React.Component<Props, {}>{
    public render() {
        const styles = getStyles(this.props);
        const {children} = this.props;

        return (
            <label style={styles.root}>
                {children}
            </label>
        );
    }
}