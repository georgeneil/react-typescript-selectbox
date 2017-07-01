import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Transitions from '../styles/Transitions';
import autoPrefix from '../utils/autoPrefix';

interface Props extends React.Props<CircleRipple> {
    color: string;
    style: object;
};

export default class CircleRipple extends React.Component<Props, {}>{
    private leaveTimer : number;
    private enterTimer : number;

    componentWillAppear(callback) {
        this.initializeAnimation(callback);
    };

    componentDidAppear() {
        this.animate();
    };

    componentWillEnter(callback) {
        this.initializeAnimation(callback);
    };

    componentDidEnter() {
        this.animate();
    };

    componentWillUnmount() {
        clearTimeout(this.enterTimer);
        clearTimeout(this.leaveTimer);
    };

    componentWillLeave(callback) {
        const style = ReactDOM.findDOMNode<HTMLInputElement>(this).style;
        style.opacity = '0';
        const removeAfter = 2000;
        this.enterTimer = setTimeout(callback, removeAfter);
    };

    initializeAnimation(callback) {
        const style = ReactDOM.findDOMNode<HTMLInputElement>(this).style;
        // style.opacity = this.props.opacity;
        autoPrefix.set(style, 'transform', 'scale(0)');
        this.leaveTimer = setTimeout(callback, 0);
    };

    animate() {
        const style = ReactDOM.findDOMNode<HTMLInputElement>(this).style;
        const transitionValue = `${Transitions.easeOut('2s', 'opacity')}, ${Transitions.easeOut('1s', 'transform')}`;
        autoPrefix.set(style, 'transition', transitionValue);
        autoPrefix.set(style, 'transform', 'scale(1)');
    };

    public render() {
        const {color, style, ...other} = this.props;

        const defaultStyles = {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            borderRadius: '50%',
            backgroundColor: color,
        };
        const mergedStyles = { ...defaultStyles, ...style}

        return (
            <div name='t' style={mergedStyles} />
        );
    };
};