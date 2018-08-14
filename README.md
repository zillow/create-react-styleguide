# create-react-styleguide

`create-react-styleguide` (a la `create-react-app`) is a tool for quickly generating style guides and component libraries. Generate your first project with the following command:

```
npx create-react-styleguide new my-new-styleguide
```

Projects are generated and configured with working style guide documentation. To view your new living style guide, run the following and visit http://localhost:6060:

```
cd my-new-styleguide && npm start
```

## npm scripts

Generated projects include the following npm scripts out of the box:

| Script    | Description |
| --------- | ----------- |
| npm start | Start the style guide server on http://localhost:6060 |
| npm run build | Build the component library to the `lib` folder |
| npm run build:watch | Watch the `src` folder for changes and run the build script |
| npm run build:styleguide | Build the style guide to the `styleguide` folder |
| npm run clean | Clean generated folders |
| npm run eslint | Run eslint on all .js and .jsx files in the `src` folder |
| npm run eslint:fix | Run eslint with the `--fix` option |
| npm test | Run unit tests |

## crs.config.js

crs.config.js is an optional configuration file that can be added to the root of your project for further customization.

```javascript
module.exports = {
    // {array} An array of CRS npm modules (the module must be installed as a dependency to your project)
    styleguides: [
        '@zillow/my-first-component-library',
        '@zillow/my-second-component-library'
    ],
    // {array} An array of paths to be included by the babel-loader (`src` and `styleguidist` will be included by default).
    babelIncludes: [
         path.join(__dirname, 'path/to/folder')
    ]
};
```

## Linking multiple styleguides

A useful feature of create-react-styleguide is the ability to link multiple CRS component libraries into a single project. This means that separate teams can manage and own their own individual CRS libraries, and then bring them all together into a master project for broader visibility.

For a styleguide to be linked, it must first be published to npm. Running `npm publish` will build and publish your component library so that it can be consumed by the master project.

From the master project, first install the published CRS module. Second, you will want to add a [crs.config.js](#crsconfigjs) file (if it does not already exist), and update the `styleguides` property to include the name of the module you just installed. That's it! Running `npm start` will now show components from all linked libraries.

## STYLEGUIDE.md

This is an optional file at the root of your project that describes your component library as a whole. This will be shown at the top of your living styleguide, and at the beginning of your section wherever this styleguide is linked.

## Under the covers

`create-react-styleguide` leverages [nwb](https://github.com/insin/nwb) under the covers for its build and testing tasks. [react-styleguidist](https://react-styleguidist.js.org/) is used for the living style guide.
