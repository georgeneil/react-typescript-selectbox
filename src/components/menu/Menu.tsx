import * as React from 'react';
import List from '../List/List';

function getStyles(props) {
    return {
        root: {
            zIndex: 2100,
            maxHeight: 500,
            overflowY: 'auto' as 'auto',
            width: 250
        },
        list: {
            display: 'table-cell',
            paddingBottom: 16,
            paddingTop: 16,
            userSelect: 'none',
            width: 250,
        },
        selectedMenuItem: {
            color: 'rgb(255, 64, 129)'
        }
    }
};

interface Props extends React.Props<Menu> {
    value: number;
    onChange: any;
};

export default class Menu extends React.Component<Props, {}>{

    getFilteredChildren(children) {
        const filteredChildren = [];
        React.Children.forEach(children, (child) => {
        if (child) {
            filteredChildren.push(child);
        }
        });
        return filteredChildren;
    }

    handleMenuItemTouchTap(event, item, index) {
        let menuValue = this.props.value;
        const itemValue = item.props.itemValue;

        if (itemValue !== menuValue) {
            this.props.onChange(event, itemValue)
        }
    }

    isChildSelected(child, props) {
        const menuValue = props.value;
        const childValue = child.props.itemValue;

        return child.props.hasOwnProperty('itemValue') && menuValue === childValue;
    }

    cloneMenuItem(child, childIndex, styles, index) {

        let mergedChildStyles = {...child.props.style};

        const selected = this.isChildSelected(child, this.props);
        if (selected) {
            mergedChildStyles = {...mergedChildStyles, ...styles.selectedMenuItem};
        }

        const extraProps = {
            style: mergedChildStyles,
            onMouseUp: (event) => {
                this.handleMenuItemTouchTap(event, child, index);
                if (child.props.onTouchTap) child.props.onTouchTap(event);
            },
        };

        return React.cloneElement(child, extraProps);
    }

    public render() {
        const styles = getStyles(this.props);
        const {children} = this.props;

        const rootStyle = {...styles.root}
        const mergedListStyles = {...styles.list};

        const filteredChildren = this.getFilteredChildren(children);

        let menuItemIndex = 0;
        const newChildren = React.Children.map(filteredChildren, (child, index) => {
            const childName = (child as any).type ? (child as any).type.muiName : '';
            let newChild = this.cloneMenuItem(child, menuItemIndex, styles, index);

            menuItemIndex++;

            return newChild;
        });

        return (
            <div
                style={rootStyle}
                role="menu"
            >
                <List
                    style={mergedListStyles}
                >
                    {newChildren}
                </List>
            </div>
        );
    }
}