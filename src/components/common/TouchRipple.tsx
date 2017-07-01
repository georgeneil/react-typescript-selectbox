import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactTransitionGroup from 'react-transition-group/TransitionGroup';
import CircleRipple from './CircleRipple';

// Remove the first element of the array
const shift = ([, ...newArray]) => newArray;

interface Props extends React.Props<TouchRipple> {
    style: any;
    color: string;
};

export default class TouchRipple extends React.Component<Props, {}>{
    state = {
        // This prop allows us to only render the ReactTransitionGroup
        // on the first click of the component, making the inital render faster.
        hasRipples: false,
        ripples: [],
        nextKey: 0
    };

    start(event) {

        let ripples = this.state.ripples;
        ripples = [...ripples, (
                    <CircleRipple 
                        key={this.state.nextKey}
                        style={{}}
                        color={this.props.color}
                    />
                    )];

        this.setState({
            hasRipples: true,
            nextKey: this.state.nextKey + 1,
            ripples: ripples
        });
    }

    end(){
        const currentRipples = this.state.ripples;
        this.setState({
            ripples: shift(currentRipples),
        });
    }

    handleMouseDown = (event) => {
        // only listen to left clicks
        if (event.button === 0) {
            this.start(event);
        }
    };


    public render() {
        const {children, style} = this.props;
        const {hasRipples, ripples} = this.state;

        let rippleGroup;
        if (hasRipples) {
            const defaultStyles = {
                height: '100%',
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
            };
            const mergedStyles = { ...defaultStyles, ...style}

            rippleGroup = (
                <ReactTransitionGroup style={mergedStyles}>
                    {ripples}
                </ReactTransitionGroup>
            );
        }
        return (
            <div 
            onMouseDown={this.handleMouseDown}>
                {rippleGroup}
                {children}
            </div>
        );
    }
};