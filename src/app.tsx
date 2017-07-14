import * as React from 'react';

import SelectBox from './components/selectbox/SelectBox';
import MenuItem from './components/menuItem/MenuItem';

interface Props extends React.Props<App> {
}
const styles = {
  root: {
    fontFamily: 'sans-serif'
  },
  block: {
    maxWidth: 250,
    padding: 20
  },
};

export default class App extends React.Component<Props, {}> {
  state = {
    value: 1,
  };

  handleChange = (event, index, value) => this.setState({value});

  public render() {
    return (
      <div style={styles.root}>
        <h1>React Component using Typescript</h1>
        <h2>SelectBoxes</h2>
        <div style={styles.block}>
          <SelectBox
            label="Development Status ?"
            value={this.state.value}
            onChange={this.handleChange}
          >
              <MenuItem itemValue={1} primaryText="Completed" />
              <MenuItem itemValue={2} primaryText="Active" />
              <MenuItem itemValue={3} primaryText="Deprecated" />
          </SelectBox>
          <SelectBox
            label="Features Completed ?"
            value={4}
          >
              <MenuItem itemValue={1} primaryText="One" />
              <MenuItem itemValue={2} primaryText="Two" />
              <MenuItem itemValue={3} primaryText="Three" />
              <MenuItem itemValue={4} primaryText="Four" />
          </SelectBox>
        </div>
      </div>
    );
  }
}
