# create-react-styleguide

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

#### `--stable`

By default, the project will be built with the latest caret (^) version of all dependencies. If this configuration fails, use the `--stable` flag to generate with a known working configuration.

```
npx create-react-styleguide new my-new-styleguide --stable
```

## npm scripts

Generated projects include the following npm scripts out of the box:

| Script                   | Description                                                 |
| ------------------------ | ----------------------------------------------------------- |
| npm start                | Start the styleguide server on http://localhost:6060        |
| npm run build            | Build the component library to the `lib` folder             |
| npm run build:styleguide | Build the styleguide to the `styleguide` folder             |
| npm run build:watch      | Watch the `src` folder for changes and run the build script |
| npm run clean            | Clean generated folders                                     |
| npm run eslint           | Run eslint on all .js and .jsx files in the `src` folder    |
| npm run eslint:fix       | Run eslint with the `--fix` option                          |
| npm test                 | Run unit tests                                              |
| npm run test:coverage    | Run unit tests with code coverage                           |
| npm run test:update      | Update unit test snapshots                                  |
| npm run test:watch       | Run unit tests while watching for changes                   |

## Document your styleguide

By default, we expose some meta data from your `package.json` file at the top of your styleguide -- at the very least, make sure you set the `"version"`, `"homepage"`, and `"author"` properties. You can further document your library with markdown files using the [`sections`](https://react-styleguidist.js.org/docs/configuration.html#sections-1) configuration from [React Styleguidist](https://react-styleguidist.js.org/). By convention, additional markdown documentation should go in the `docs` folder so that they get properly packaged when [linking multiple styleguides](#linking-multiple-styleguides).

![Customized style guide](assets/customized.png)

## Adding SVG support

You can add SVG support with the [inline-react-svg](https://github.com/airbnb/babel-plugin-inline-react-svg) babel plugin. `npm i --save-dev babel-plugin-inline-react-svg` and then update your `babel.config.js` file as follows:

```diff
 module.exports = {
     presets: [['zillow', { modules: false }]],
+    plugins: ['inline-react-svg'],
     env: {
         cjs: {
             presets: ['zillow']
         },
         test: {
             presets: ['zillow']
         }
     }
 };
```

You should now be able to import and use SVGs as if they were react components!

## Linking multiple styleguides

A useful feature of create-react-styleguide is the ability to link multiple CRS component libraries into a single project. This means that separate teams can manage and own their own individual CRS libraries, and then bring them all together into a master project for broader visibility.

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

## Deploying your styleguide to GitHub Pages

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

## Node API

Require the module:

```javascript
const { createStyelguideConfig, createJestConfig } = require('create-react-styleguide');
```

### `createStyleguideConfig(config, options)`

Creates a [React Styleguidist configuration object](https://react-styleguidist.js.org/docs/configuration.html) with some default configuration.

-   `config [object]` - A configuration object to be shallowly merged with the rest of the configuration
-   `options.styleguides [array]` - An array of CRS npm modules (the module must be installed as a dependency to your project)
-   `options.packageSection [boolean]` - Include `package.json` details as a top level section (default: `true`)
-   `options.packageSectionComponents [boolean]` - Include `components` configuration in the top-level package section (default: `false`)
-   `options.componentsSection [boolean]` - Include `components` configuration as its own separate section (default: `true`)

### `createJestConfig(config)`

Creates a [Jest configuration object](https://jestjs.io/docs/en/configuration) with some default configuration.

-   `config [object]` - A configuration object to be shallowly merged with the rest of the configuration

## Environment Variables

### `DEBUG`

Both `createStyleguideConfig` and `createJestConfig` will log their results to the console when the `DEBUG` environment variable is set to any non-empty value (such as `true` or `1`). A quick way to see the configuration these functions are creating is to run the following:

```
DEBUG=true node styleguide.config.js
```

or

```
DEBUG=true node jest.config.js
```

## Under the covers

`create-react-styleguide` leverages [react-styleguidist](https://react-styleguidist.js.org/) under the covers for its living style guide.

Builds are created by simple running the `src` directory through [Babel](https://babeljs.io/) using whatever configuration is in your `.babelrc` file. The build will run twice, once with the default configuration which builds ES modules compatible with tree shaking, and once with the `"cjs"` env configuration which builds CommonJS modules.
