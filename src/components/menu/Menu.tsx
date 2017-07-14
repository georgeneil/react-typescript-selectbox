import * as React from 'react';
import List from '../List/List';

function getStyles(props) {
    return {
        root: {
            zIndex: 1000,
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
    }
};

interface Props extends React.Props<Menu> {
    // style: any;
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

    public render() {
        const styles = getStyles(this.props);
        const {children} = this.props;

        const rootStyle = {...styles.root}
        const mergedListStyles = {...styles.list};

        const filteredChildren = this.getFilteredChildren(children);

        let menuItemIndex = 0;
        const newChildren = React.Children.map(filteredChildren, (child, index) => {
            const childIsDisabled = (child as any).props.disabled;
            const childName = (child as any).type ? (child as any).type.muiName : '';
            let newChild = child;

            // switch (childName) {
            //     case 'MenuItem':
            //     newChild = this.cloneMenuItem(child, menuItemIndex, styles, index);
            //     break;

            //     case 'Divider':
            //     newChild = React.cloneElement(child, {
            //         style: Object.assign({}, styles.divider, child.props.style),
            //     });
            //     break;
            // }

            // if (childName === 'MenuItem' && !childIsDisabled) {
            //     menuItemIndex++;
            // }

            return newChild;
        });

        return (
            <div
                style={rootStyle}
                role="presentation"
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