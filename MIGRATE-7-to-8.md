# Migrate from 7x to 8x

`create-react-styleguide@8` introduced breaking changes around the build processes and config files.

## Package config

You will need to modify output file pointers and dependencies.

## Output files

The new build process uses Rollup and creates 4 bundles, dev and prod for ESM and CJS. An application, which imports your package, will select a correct bundle, based on node environment and bundler capabilities. In example, ESM for Vite or CJS for Webpack 4.

Modify your `package.json` to use the following:

```json
{
    "main": "dist/cjs/index.js",
    "module": "dist/es/index.js",
    "exports": {
        ".": {
            "import": "./dist/es/index.js",
            "require": "./dist/cjs/index.js"
        }
    }
}
```

### Dependencies

All `babel`, `eslint`, and `jest` packages are now required by CRS and not needed as dependencies in your project. Also, all peer dependencies became regular dependencies. Rollup build will exclude them from the final bundle, but they will still be available in `node_modules` as transient dependencies. Please be mindful that a project, which uses your library, can overwrite the dependencies, in example `react` or `lodash` version.

Your project package dependencies should look like this:

```json
{
    "dependencies": {
        "prop-types": "x.y.z",
        "react": "x.y.z",
        "react-dom": "x.y.z",
        "styled-components": "x.y.z",
        "// other-prod-packages": "x.y.z"
    },
    "devDependencies": {
        "create-react-styleguide": "x.y.z",
        "husky": "x.y.z",
        "react-test-renderer": "x.y.z",
        "// other-dev-packages": "x.y.z"
    }
}
```

## NEW Rollup config

Add `rollup.config.js` to the root of your project with the snippet from `./templates/base/rollup.config.js`.

Feel free to customize it to your liking. In example:

```diff
const { rollupConfig } = require('create-react-styleguide');
+const yourRollupPlugin = require('your-rollup-plugin');

module.exports = {
    ...rollupConfig,
+    plugins: [...rollupConfig.plugins, yourRollupPlugin()],
};
```

## NEW Prettier config

Add, or modify, `prettier.config.js` on the root of your project with the snippet from `./templates/base/prettier.config.js`.

## Babel config

Modify your `babel.config.js` and use the snippet from `./templates/base/babel.config.js` as inspiration.

Feel free to customize it to your liking. In example:

```diff
const { babelConfig } = require('create-react-styleguide');

module.exports = {
    ...babelConfig,
+    presets: [...babelConfig.presets, ['your-babel-preset', {}]],
+    plugins: [...babelConfig.plugins, ['your-babel-plugin', {}]],
};
```

In order to modify `babel-preset-zillow` you will need a more advanced changes, in example:

```js
const { babelConfig, NODE_ENVIRONMENTS } = require('create-react-styleguide');

const { NODE_ENV } = process.env;
const isTest = NODE_ENV === NODE_ENVIRONMENTS.TEST;

// Find our custom `babel-zillow-preset` config
const zillowPreset = babelConfig.presets.find(preset => preset[0] === 'babel-preset-zillow');

// Modify `styled-components` preset config
zillowPreset[1]['styled-components'] = {
    ...zillowPreset[1]['styled-components'],
    namespace: isTest ? 'sc' : `my-library-name`,
};

// Modify `remove-prop-types` preset config
zillowPreset[1].removePropTypes = {
    ...zillowPreset[1].removePropTypes,
    additionalLibraries: [/\/custom-prop-types$/],
};

// Export custom config
module.exports = {
    ...babelConfig,
    presets: [...babelConfig.presets.filter(preset => preset[0] !== zillowPreset[0]), zillowPreset],
};
```

### Remove prop types config

Previously, `prop-types` import and object would remain in the output bundle. In 8x we try our best to remove them in production mode. However, in some components, the import and prop types object persist. In those cases you can annotate a component and force a removal. [See here](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types#with-comment-annotation) for more information.

```jsx
SomeComponent.propTypes /* remove-proptypes */ = {};
```

## Jest config

Modify your `jest.config.js` and use the snippet from `./templates/base/jest.config.js` as inspiration.

Feel free to customize it to your liking. In example:

```diff
const { jestConfig } = require('create-react-styleguide');

module.exports = {
    ...jestConfig,
+    setupFilesAfterEnv: [...jestConfig.setupFilesAfterEnv, '<rootDir>/jest.setup.js'],
+    coveragePathIgnorePatterns: [
+        ...jestConfig.coveragePathIgnorePatterns,
+        '<rootDir>/src/thirdparty/',
+    ],
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
