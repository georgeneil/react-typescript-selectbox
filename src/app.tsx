import * as React from 'react';

import SelectBox from './components/selectbox/SelectBox';
import MenuItem from './components/menuItem/MenuItem';

interface Props extends React.Props<App> {
}
const styles = {
  block: {
    maxWidth: 250,
    padding: 20
  },
  checkbox: {
    marginBottom: 16
  }
};

export default class App extends React.Component<Props, {}> {
  public render() {
    return (
      <div>
        <h1>React Component using Typescript</h1>
        <h2>SelectBox</h2>
        <div style={styles.block}>
          <SelectBox
            label="Simple"
            value={1}
          >
              <MenuItem dvalue={1} primaryText="Never" />
              <MenuItem dvalue={2} primaryText="Every Night" />
              <MenuItem dvalue={3} primaryText="Weeknights" />
              <MenuItem dvalue={4} primaryText="Weekends" />
              <MenuItem dvalue={5} primaryText="Weekly" />
          </SelectBox>
        </div>
      </div>
    );
  }
}
