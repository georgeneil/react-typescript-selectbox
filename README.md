# React Select-Box using Typescript

This is a react based select-box component developed using Typescript.

## Snapshot
![Snapshot of SelectBoxes](https://github.com/georgeneil/react-typescript-selectbox/blob/master/snapshot/screenshot.gif)

## Features
  - [x] Pass the Label Value
  - [x] Pass the Default Value
  - [x] Down-Arrow Icon
  - [x] Separation as an Underline
  - [x] Drop-down Menu, Menu Item
  - [ ] Floating Effect for Label
  - [ ] Option's change handler
  - [ ] Disable Mode
  - [ ] Auto Width
  - [ ] Scrollable Select Menu
  - [ ] Secondary description for selected Menu Item

```typescript
interface Props extends React.Props<SelectBox> {
    label : string;
    value: number;
};
```

## Usage

### Basic:

```jsx
<SelectBox
  label="Development Status ?"
  value={2}
>
    <MenuItem itemValue={1} primaryText="Completed" />
    <MenuItem itemValue={2} primaryText="Active" />
    <MenuItem itemValue={3} primaryText="Deprecated" />
</SelectBox>
```
## Related Projects
[React TypeScript Checkbox](https://github.com/georgeneil/react-typescript-checkbox)

## To install dependencies
```
npm install
```
## To run in development mode
```
npm start
```
## To build the pages
```
npm run build
```
## Contributing
Contributions are always welcome. Just send a pull request. Feel free to contact me [GitHub](https://github.com/georgeneil).

## License

MIT License
