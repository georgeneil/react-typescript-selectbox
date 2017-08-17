import * as React from 'react';
import Transitions from '../styles/Transitions';

function getStyles(props, context, state) {
  const {open} = state;

  return {
    root: {
      position: 'fixed',
      zIndex: 2100,
      opacity: open ? 1 : 0,
      transform: open ? 'scaleY(1)' : 'scaleY(0)',
      transformOrigin: 'left top 0px',
      transition: Transitions.easeOut('450ms', ['transform', 'opacity']),
      maxHeight: '100%',
    },
  };
}

interface Props extends React.Props<PopoverAnimationVertical> {
    style: any;
    open: boolean;
};

export default class PopoverAnimationVertical extends React.Component<Props, {}>{
    state = {
        open: false,
    };

    componentDidMount() {
        this.setState({open: true}); 
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
        open: nextProps.open,
        });
    }

    render() {
        const {
            open,
            style,
        } = this.props;

        const styles = getStyles(this.props, this.context, this.state);
        const mergedStyle = {...styles.root, ...style}

        return (
            <div
                style={mergedStyle}
            >
                {this.props.children}
            </div>
        );
  }
};