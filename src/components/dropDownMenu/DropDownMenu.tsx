import * as React from 'react';
import Transitions from '../styles/Transitions';
import ArrowDown from '../svg-icons/arrow-down';
import IconButton from '../iconButton/IconButton';
import Overlay from '../overlay/Overlay';
import Menu from '../menu/Menu';

function getStyles(props) {
    return {
        root: {
            height: '100%',
            outline: 'none',
            position: 'relative' as 'relative',
            transition: Transitions.easeOut(),
        },
        control: {
            cursor: 'pointer',
            height: '100%',
            position: 'relative' as 'relative',
            width: '100%',
            marginTop: '14px'
        },
        label: {
            color: 'rgba(0, 0, 0, 0.87)',
            height: `56px`,
            lineHeight: `56px`,
            overflow: 'hidden' as 'hidden',
            opacity: 1 as number,
            position: 'relative' as 'relative',
            paddingLeft: 0,
            paddingRight: 56,
            textOverflow: 'ellipsis',
            top: 6,
            whiteSpace: 'nowrap',
        },
        icon: {
            fill: 'rgb(224, 224, 224)',
            position: 'absolute',
            right: 0,
            top: 8,
        },
        underline: {
            borderTop: `solid 1px rgb(224, 224, 224)`,
            bottom: 1,
            left: 0,
            margin: `0px`,
            right: 0,
            position: 'absolute',
        },
    }
};

interface Props extends React.Props<DropDownMenu> {
    value: number;
    iconButton?: any;
};

export default class DropDownMenu extends React.Component<Props, {}>{
    private arrowNode: ArrowDown;
    private rootNode: HTMLDivElement;

    static defaultProps = {
        iconButton: <ArrowDown />,
    };

    state = {
        open: false,
        anchorEl: {}
    };

    handleMouseUp = (event) => {
        event.preventDefault();
        this.setState({
            open: !this.state.open,
            anchorEl: this.rootNode,
        });
    };

    handleRequestCloseMenu = () => {
        this.close();
    };

    close = () => {
        this.setState({
            open: false,
        });
    }

    public render() {
        const styles = getStyles(this.props);
        const {children, value, iconButton, ...other} = this.props;
        // const {anchorEl, open } = this.state;
        
        let displayValue = '';
        React.Children.forEach(children, (child) => {
            const {label, itemValue, primaryText} = (child as any).props;
            if (child && (value === itemValue)) {
                displayValue = label || primaryText;
            }
        });

        const rootStyle = {...styles.root, ...styles.control};
        return (
            <div 
                ref={(node) => this.rootNode = node}
                style={rootStyle}
                onMouseUp={this.handleMouseUp}
            >
                <div style={styles.label}>
                    {displayValue}
                </div>
                <IconButton
                    ref={(ref) => this.arrowNode = ref}
                    style={styles.icon}
                >
                    {iconButton}
                </IconButton>
                <Overlay 
                    ref="overlay"
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleRequestCloseMenu}
                >
                    <Menu>
                        {children}
                    </Menu>
                </Overlay>
            </div>
        );
    }
}