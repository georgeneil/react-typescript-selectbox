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
    devStatusValue: 1,
    featureCompValue: 4,
  };

  handleDevStatusChange = (event, index, value) => this.setState({devStatusValue:value});
  handleFeatureCompletedChange = (event, index, value) => this.setState({featureCompValue:value});

  public render() {
    return (
      <div style={styles.root}>
        <h1>React Component using Typescript</h1>
        <h2>SelectBoxes</h2>
        <div style={styles.block}>
          <SelectBox
            label="Development Status ?"
            value={this.state.devStatusValue}
            onChange={this.handleDevStatusChange}
          >
              <MenuItem itemValue={1} primaryText="Completed" />
              <MenuItem itemValue={2} primaryText="Active" />
              <MenuItem itemValue={3} primaryText="Deprecated" />
          </SelectBox>
          <SelectBox
            label="Features Completed ?"
            value={this.state.featureCompValue}
            onChange={this.handleFeatureCompletedChange}
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
