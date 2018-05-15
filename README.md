# create-react-styleguide

`create-react-styleguide` (a la `create-react-app`) is a tool for quickly generating style guides and component libraries. Generate your first project with the following command:

```
npx create-react-styleguide new my-new-styleguide
```

Projects are generated and configured with working style guide documentation. To view your new living style guide, run the following:

```
cd my-new-styleguide && npm start
```

## npm scripts

Generated projects include the following npm scripts out of the box:

| Script    | Description |
| --------- | ----------- |
| npm start | Start the style guide server on http://localhost:6060 |
| npm run build | Build the component library to the `lib` folder |
| npm run build:styleguide | Build the style guide to the `styleguide` folder |
| npm run clean | Clean generated folders |
| npm test | Run unit tests |

## Under the covers

`create-react-styleguide` leverages [nwb](https://github.com/insin/nwb) under the covers for its build and testing tasks. [react-styleguidist](https://react-styleguidist.js.org/) is used for the living style guide.
