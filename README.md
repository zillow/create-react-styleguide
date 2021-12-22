# create-react-styleguide

[![npm version](https://img.shields.io/npm/v/create-react-styleguide.svg)](https://www.npmjs.com/package/create-react-styleguide)
[![Build Status](https://travis-ci.org/zillow/create-react-styleguide.svg?branch=master)](https://travis-ci.org/zillow/create-react-styleguide)

`create-react-styleguide` (a la [`create-react-app`](https://github.com/facebook/create-react-app)) is a tool for quickly generating styleguides and component libraries.

## Quickstart

Generate your first project with the following command:

```
npx create-react-styleguide new my-new-styleguide
```

Projects are generated and configured with working styleguide documentation. To start your styleguide server run the following:

```
cd my-new-styleguide && npm start
```

Finally visit http://localhost:6060 to view your living styleguide!

## Options

You can see all options for project generation with the following command:

```
npx create-react-styleguide --help
```

### `--stable`

By default, the project will be built with the latest caret (^) version of all dependencies. If this configuration fails, use the `--stable` flag to generate with a known working configuration.

```
npx create-react-styleguide new my-new-styleguide --stable
```

## NPM Scripts

Generated projects include the following npm scripts out of the box:

| Script                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| npm start                | Start the styleguide server on http://localhost:6060        |
| npm run build            | Build the component library to the `dist` folder            |
| npm run build:styleguide | Build the styleguide to the `styleguide` folder             |
| npm run build:watch      | Watch the `src` folder for changes and run the build script |
| npm run clean            | Clean generated folders                                     |
| npm run eslint           | Run eslint on all .js and .jsx files in the `src` folder    |
| npm run eslint:fix       | Run eslint with the `--fix` option                          |
| npm test                 | Run unit tests                                              |
| npm run test:coverage    | Run unit tests with code coverage                           |
| npm run test:update      | Update unit test snapshots                                  |
| npm run test:watch       | Run unit tests while watching for changes                   |

## Document Styleguide

By default, we expose some meta data from your `package.json` file at the top of your styleguide -- at the very least, make sure you set the `"version"`, `"homepage"`, and `"author"` properties. You can further document your library with markdown files using the [`sections`](https://react-styleguidist.js.org/docs/configuration.html#sections-1) configuration from [React Styleguidist](https://react-styleguidist.js.org/). By convention, additional markdown documentation should go in the `docs` folder so that they get properly packaged when [linking multiple styleguides](#linking-multiple-styleguides).

![Customized style guide](assets/customized.png)

## Modify Rollup Config

You can customize Rollup configuration to your requirements. In example, you can update `rollup.config.js` with a sample plugin and a banner for each output file.

```diff
const { rollupConfig } = require('create-react-styleguide');
+const sampleRollupPlugin = require('sample-rollup-plugin');

module.exports = {
    ...rollupConfig,

+    output: {
+        ...rollupConfig.output,
+        banner: '/* (c) My Company Inc. */',
+    },

+    plugins: [
+        ...rollupConfig.plugins,
+        sampleRollupPlugin(),
+    ],
};
```

## Modify Babel Config

You can customize Babel configuration to your requirements. In example, you can add SVG support with the [inline-react-svg](https://github.com/airbnb/babel-plugin-inline-react-svg) babel plugin. `npm i --save-dev babel-plugin-inline-react-svg` and then update `babel.config.js` file as follows:

```diff
const { babelConfig } = require('create-react-styleguide');

module.exports = {
    ...babelConfig,
+    plugins: [
+        ...babelConfig.plugins,
+        'inline-react-svg',
+    ],
};
```

You should now be able to import and use SVGs as if they were react components!

## Modify Jest Config

You can customize Jest configuration to your requirements. In example, you can update `jest.config.js` with new threshold values.

```diff
const { jestConfig } = require('create-react-styleguide');

module.exports = {
    ...jestConfig,
+    coverageThreshold: {
+        global: {
+            branches: 80,
+            functions: 80,
+            lines: 80,
+            statements: 80,
+        },
+    },
};
```

## Styleguide Config

Require the module:

```js
// styleguide.config.js
const { createStyleguideConfig } = require('create-react-styleguide');
```

### `createStyleguideConfig(config, options)`

Creates a [React Styleguidist configuration object](https://react-styleguidist.js.org/docs/configuration.html) with some default configuration.

-   `config [object]` - A configuration object to be shallowly merged with the rest of the configuration
-   `options.styleguides [array]` - An array of CRS npm modules (the module must be installed as a dependency to your project)
-   `options.packageSection [boolean]` - Include `package.json` details as a top level section (default: `true`)
-   `options.packageSectionComponents [boolean]` - Include `components` configuration in the top-level package section (default: `false`)
-   `options.componentsSection [boolean]` - Include `components` configuration as its own separate section (default: `true`)

## Linking Styleguides

A useful feature of `create-react-styleguide` is the ability to link multiple CRS component libraries into a single project. This means that separate teams can manage and own their own individual CRS libraries, and then bring them all together into a master project for broader visibility.

For a styleguide to be linked, it must first be published to npm. Running `npm publish` will build and publish your component library so that it can be consumed by the master project.

From the master project, first install the published CRS module. Second, you will want to add a `styleguides` property to the options of your [`createStyleguideConfig`](#createstyleguideconfigconfig-options) function in `styleguide.config.js`.

```diff
 const { createStyleguideConfig } = require('create-react-styleguide');

 module.exports = createStyleguideConfig({
     /* your own config shallowly merged here */
+}, {
+    styleguides: [
+        '@zillow/my-first-component-library',
+        '@zillow/my-second-component-library'
+    ]
 });
```

That's it! Running `npm start` will now show components from all linked libraries.

![Linked style guide](assets/linked.png)

## Deploying Styleguide to GitHub Pages

Install the `gh-pages` module:

```
npm i --save-dev gh-pages
```

Add the following scripts to your `package.json`:

```diff
 "scripts": {
+  "predeploy": "npm run build:styleguide",
+  "deploy": "gh-pages -d styleguide"
 }
```

Running `npm run deploy` will now deploy your styleguide to Github Pages!

## Environment Variables

### `DEBUG`

All config files will log their results to the console when the `DEBUG` environment variable is set to any non-empty value (such as `true` or `1`). A quick way to see the configuration these functions are creating is to run the following:

```
DEBUG=true node styleguide.config.js
```

or

```
DEBUG=true node jest.config.js
```

### `PORT`

By default, `npm start` will run the `react-styleguidist` server on its default port, `6060`. To change this, set the `PORT` environment variable to your custom value:

```
PORT=12345 npm start
```

## Under the covers

`create-react-styleguide` leverages [react-styleguidist](https://react-styleguidist.js.org/) under the covers for its living style guide.

Builds are created by running the `src` directory through [Rollup](https://rollupjs.org/) and [Babel](https://babeljs.io/). The build will create 4 bundles, dev and prod for CJS and ESM formats. An application, which imports your package, will select a correct bundle, based on node environment and bundler capabilities. In example, ESM for Vite or CJS for Webpack 4.

## Migration Guide from 7x to 8x

Please read our [migration guide](./MIGRATE-7-to-8.md) to streamline your update efforts.
