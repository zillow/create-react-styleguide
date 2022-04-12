# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [8.2.0](https://github.com/zillow/create-react-styleguide/compare/v8.1.3...v8.2.0) (2022-04-12)


### Features

* add CSS files to side effects in order to tree-shake CSS imports ([37c973d](https://github.com/zillow/create-react-styleguide/commit/37c973d5c02d2be6874218d6eab776522136a2a3))

### [8.1.3](https://github.com/zillow/create-react-styleguide/compare/v8.1.2...v8.1.3) (2022-03-03)


### Bug Fixes

* enable ssr in dev mode and revert cjs index change ([d15c375](https://github.com/zillow/create-react-styleguide/commit/d15c3759d0b927d891a2f66f3b277a8a80af508c))

### [8.1.2](https://github.com/zillow/create-react-styleguide/compare/v8.1.1...v8.1.2) (2022-02-25)

### [8.1.1](https://github.com/zillow/create-react-styleguide/compare/v8.1.0...v8.1.1) (2022-02-25)


### Bug Fixes

* conditional exports ([bb0076b](https://github.com/zillow/create-react-styleguide/commit/bb0076b85e296863ec6e8b3ed706743cd8f12b52))
* replicate  across all formats ([1c5e19e](https://github.com/zillow/create-react-styleguide/commit/1c5e19ea595ccf7de7422cb7b1dbd3a0a1dca9eb))

## [8.1.0](https://github.com/zillow/create-react-styleguide/compare/v8.0.0...v8.1.0) (2022-02-03)


### Features

* run build tasks in parallel ([ddb49c8](https://github.com/zillow/create-react-styleguide/commit/ddb49c849d856090ce4f5f762c4b4e9b2687cfd0))

## [8.0.0](https://github.com/zillow/create-react-styleguide/compare/v7.1.0...v8.0.0) (2021-12-22)


### ⚠ BREAKING CHANGES

* drop IE11 support
* Add rollup support, update configs, and dependencies
* add `.nvmrc` with Node 14

### Features

* add prettier config support ([03d4fb1](https://github.com/zillow/create-react-styleguide/commit/03d4fb1347a2dce1205bdadcb72b1b52c8c1e598))


### Bug Fixes

* do not install husky in CI pipeline ([316e14f](https://github.com/zillow/create-react-styleguide/commit/316e14fde3d2c8080f1dfe3b6f270cf6bb01e5b5))
* only run eslint and test during prepublish script ([f0c5ac7](https://github.com/zillow/create-react-styleguide/commit/f0c5ac75d11b5262182d25a4ba69368a4214251e))
* update husky config to match v7 ([387d0b8](https://github.com/zillow/create-react-styleguide/commit/387d0b86420c15e0bbec8273d2eca77e5c703cd9))


### Build System

* add `.nvmrc` with Node 14 ([3c51977](https://github.com/zillow/create-react-styleguide/commit/3c51977e2c9fe8591e6c55d5407c3cee29b8ecdb))
* Add rollup support, update configs, and dependencies ([87d7b59](https://github.com/zillow/create-react-styleguide/commit/87d7b596fa23a038417cea721dc4d1ab71b5f83d))
* drop IE11 support ([3704937](https://github.com/zillow/create-react-styleguide/commit/3704937200f308628c8f6c3795ca91c6c9e58124))
* move `bin` and `lib` to root and remove build process for CRS itself ([3ec932b](https://github.com/zillow/create-react-styleguide/commit/3ec932b0a6fcb91674a616f39dfb51ddc2751a9b))

## [7.1.0](https://github.com/zillow/create-react-styleguide/compare/v7.0.1...v7.1.0) (2021-09-28)


### Features

* add support for `--legacy-peer-deps` when installing dependencies ([22ee588](https://github.com/zillow/create-react-styleguide/commit/22ee588b8c210a504b32e6c270270de9d41867ab))

### [7.0.1](https://github.com/zillow/create-react-styleguide/compare/v7.0.0...v7.0.1) (2021-06-08)


### Bug Fixes

* add `eval-source-map` to styleguidist webpack config to fix source maps ([a9c37aa](https://github.com/zillow/create-react-styleguide/commit/a9c37aa640e81218fe15961c294223bab8e6f3b4))

## [7.0.0](https://github.com/zillow/create-react-styleguide/compare/v6.0.0...v7.0.0) (2021-03-30)


### ⚠ BREAKING CHANGES

* default `coverageThreshold` is now `100`, default `testEnvironment` is now `jsdom`,
`clearMocks` is now enabled by default

### Features

* update inline-styles template ([83bcd8c](https://github.com/zillow/create-react-styleguide/commit/83bcd8c1b2696bdac78b63828a490c1c307e143f))
* **createStyleguideConfig:** add `ie11ModuleTransforms` option ([5cd3c73](https://github.com/zillow/create-react-styleguide/commit/5cd3c7378d5aa55b92e8b471486235fc8a925aba))
* update default jest config ([96f6f20](https://github.com/zillow/create-react-styleguide/commit/96f6f20eeb624b182c4732a241063e19de3e2c5a))
* update styled-components template ([786c253](https://github.com/zillow/create-react-styleguide/commit/786c253b3fb6f491e0d39ac8e616e7e8422f4da8))

## [6.0.0](https://github.com/zillow/create-react-styleguide/compare/v5.2.0...v6.0.0) (2020-09-08)


### ⚠ BREAKING CHANGES

* Prettier 2.0 has some changes in formatting that may break your existing linting/tests/snapshots.
https://prettier.io/blog/2020/03/21/2.0.0.html

### Build System

* update outdated dependencies including prettier@^2 ([5a91140](https://github.com/zillow/create-react-styleguide/commit/5a91140c9134201fcc7516dd4c046577559e5d2f))

## [5.2.0](https://github.com/zillow/create-react-styleguide/compare/v5.1.0...v5.2.0) (2020-02-14)


### Features

* update dependencies, including react-styleguidist@10.6.2 ([99880ab](https://github.com/zillow/create-react-styleguide/commit/99880ab))



## [5.1.0](https://github.com/zillow/create-react-styleguide/compare/v5.0.0...v5.1.0) (2019-10-23)


### Bug Fixes

* **deps:** Add direct acorn@6 dependency to match transitive peer ([c2c09ab](https://github.com/zillow/create-react-styleguide/commit/c2c09ab))
* Avoid passing empty objects repeatedly to root config.sections ([4dc6599](https://github.com/zillow/create-react-styleguide/commit/4dc6599))
* Correct math on depth tracking via env var ([04c1a8e](https://github.com/zillow/create-react-styleguide/commit/04c1a8e))
* Inject newline after child styleguide logging only ([024111d](https://github.com/zillow/create-react-styleguide/commit/024111d))
* Resolve linked styleguide section globs relative to CWD, same as top-level styleguide ([9fdc25c](https://github.com/zillow/create-react-styleguide/commit/9fdc25c))


### Features

* **styleguidist:** Configure `serverPort` when `process.env.PORT` is set ([2ac88b4](https://github.com/zillow/create-react-styleguide/commit/2ac88b4))
* Bump dependencies ([a319b26](https://github.com/zillow/create-react-styleguide/commit/a319b26))
* **webpack:** Add IE11 support to styleguidist-generated website ([9961967](https://github.com/zillow/create-react-styleguide/commit/9961967))
* **webpack:** Always resolve singleton packages to the root ([55cfa8f](https://github.com/zillow/create-react-styleguide/commit/55cfa8f))
* **webpack:** Check for circular dependencies in local styleguide components ([da4d70b](https://github.com/zillow/create-react-styleguide/commit/da4d70b))
* Make `createStyleguideConfig` DEBUG output fancier ([b48bf58](https://github.com/zillow/create-react-styleguide/commit/b48bf58))


### Tests

* Add fixture-based tests of section config generation ([eee0c68](https://github.com/zillow/create-react-styleguide/commit/eee0c68))



## [5.0.0](https://github.com/zillow/create-react-styleguide/compare/v4.0.6...v5.0.0) (2019-07-03)


### Bug Fixes

* correctly interpret the `--stable` flag as a boolean ([556b5a0](https://github.com/zillow/create-react-styleguide/commit/556b5a0))


### Build System

* **npm:** update dependencies, notably eslint@6.x ([d1fd0f4](https://github.com/zillow/create-react-styleguide/commit/d1fd0f4))


### Features

* allow passing flags to npm scripts with `--` ([6e5b505](https://github.com/zillow/create-react-styleguide/commit/6e5b505))
* update stable dependencies when bootstrapping a new project ([a6e0c34](https://github.com/zillow/create-react-styleguide/commit/a6e0c34))


### BREAKING CHANGES

* **npm:** eslint has been upgraded to 6.x, see the migration notes here:
https://eslint.org/docs/user-guide/migrating-to-6.0.0



### [4.0.6](https://github.com/zillow/create-react-styleguide/compare/v4.0.5...v4.0.6) (2019-06-24)


### Build System

* **npm:** update outdated npm dependencies ([acfed01](https://github.com/zillow/create-react-styleguide/commit/acfed01))



### [4.0.5](https://github.com/zillow/create-react-styleguide/compare/v4.0.4...v4.0.5) (2019-06-18)


### Build System

* **npm:** update outdated npm dependencies ([e507c16](https://github.com/zillow/create-react-styleguide/commit/e507c16))



### [4.0.4](https://github.com/zillow/create-react-styleguide/compare/v4.0.3...v4.0.4) (2019-05-14)


### Build System

* **npm:** update outdated npm dependencies ([5f98e7e](https://github.com/zillow/create-react-styleguide/commit/5f98e7e))



<a name="4.0.3"></a>
## [4.0.3](https://github.com/zillow/create-react-styleguide/compare/v4.0.2...v4.0.3) (2019-04-08)


### Bug Fixes

* correctly resolve paths when sections defines an array of components globs ([04e1ed9](https://github.com/zillow/create-react-styleguide/commit/04e1ed9))



<a name="4.0.2"></a>
## [4.0.2](https://github.com/zillow/create-react-styleguide/compare/v4.0.1...v4.0.2) (2019-04-08)



<a name="4.0.1"></a>
## [4.0.1](https://github.com/zillow/create-react-styleguide/compare/v4.0.0...v4.0.1) (2019-04-08)


### Bug Fixes

* do not link the styleguides of a linked styleguide ([ea42ea8](https://github.com/zillow/create-react-styleguide/commit/ea42ea8))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/zillow/create-react-styleguide/compare/v3.1.1...v4.0.0) (2019-04-05)


### Migrating to 4.x

* Update your markdown examples for the 9.x release of react-styleguidist: https://github.com/styleguidist/react-styleguidist/releases/tag/v9.0.0
* Move the `styleguidist` folder into `src` (clean up referenced paths)
    - The babel configuration has been simplified such that there is no longer a separate `include` path for the `styleguidist` folder.
* Move `styleguides` configuration option from `crs.config.js` to `styleguide.config.js`, and delete the `crs.config.js` file
    - `crs.config.js` has been removed in favor of API options on `createStyleguideConfig`.
* Move `STYLEGUIDE.md` to a `docs` folder at the root of the project and add `sections` configuration to `styleguide.config.js`
    - The behavior around `STYLEGUIDE.md` was a little too magical. 4.x now supports your own `sections` configuration in `styleguide.config.js`, so we should leverage React Styleguidist customization options directly. Read more about `sections` configuration here: https://react-styleguidist.js.org/docs/components.html#sections
* Remove `"STYLEGUIDE.md"` from the `files` array of `package.json` and add `"docs"` and `"styleguide.config.js"`
    - Published libraries need to include the `docs` folder and `styleguide.config.js` in order to be linked in other libraries
* Add `setupFilesAfterEnv: ['<rootDir>/jest.setup.js']` to your `jest.config.js`
    - The `jest.setup.js` file is not a built-in feature of jest, and was a little too magical. If you want to continue to use this convention, you can add the configuration to your own config.
* Update `babel-preset-zillow` to `latest` and remove any configuration for `babel-plugin-styled-components`
    - `babel-preset-zillow` now includes `babel-plugin-styled-components` by default.


### Bug Fixes

* update stable versions of eslint-plugin-zillow and babel-preset-zillow ([2be7b6c](https://github.com/zillow/create-react-styleguide/commit/2be7b6c))


### build

* update project dependency, including a major bump of react-styleguidist ([0361ba3](https://github.com/zillow/create-react-styleguide/commit/0361ba3))


### Features

* `createJestConfig` now accepts a config object as its only argument which will be shallowly merged with its own config ([657a347](https://github.com/zillow/create-react-styleguide/commit/657a347))
* `createStyleguideConfig` now supports custom sections ([c306725](https://github.com/zillow/create-react-styleguide/commit/c306725))
* update template generation for new configuration APIs ([1f585fc](https://github.com/zillow/create-react-styleguide/commit/1f585fc))


### BREAKING CHANGES

* react-styleguidist@9.x has breaking changes to how examples are loaded, read more here:
https://github.com/styleguidist/react-styleguidist/releases/tag/v9.0.0. Also note, react-styleguidist is
hard pinned to `9.0.4` due to the following issue: https://github.com/styleguidist/react-styleguidist/issues/1321.
* `crs.config.js` has been removed in favor of passing options directly to `createStyleguideConfig`.
`createStyleguideConfig` now takes two params, the first is a config object that will be shallowly merged,
the second is an options object that takes the old `styleguides` option for the removed `crs.config.js`.
A few other options have been added for customizing how sections are displayed, and this also works with
the `DEBUG=true` environmental variable.



<a name="3.1.1"></a>
## [3.1.1](https://github.com/zillow/create-react-styleguide/compare/v3.1.0...v3.1.1) (2019-03-25)


### Bug Fixes

* narrow "components" subdirectory change to only the styleguidist folder ([d60a644](https://github.com/zillow/create-react-styleguide/commit/d60a644))



<a name="3.1.0"></a>
# [3.1.0](https://github.com/zillow/create-react-styleguide/compare/v3.0.1...v3.1.0) (2019-03-25)


### Features

* update component glob to support component subdirectories and other file extensions ([b4dfbee](https://github.com/zillow/create-react-styleguide/commit/b4dfbee))



<a name="3.0.1"></a>
## [3.0.1](https://github.com/zillow/create-react-styleguide/compare/v3.0.0...v3.0.1) (2019-03-14)


### Bug Fixes

* **jest:** Migrate setup to new config field ([57a4c59](https://github.com/zillow/create-react-styleguide/commit/57a4c59))
* convert jest config into function declaration ([3d87118](https://github.com/zillow/create-react-styleguide/commit/3d87118))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/zillow/create-react-styleguide/compare/2.0.0...v3.0.0) (2019-01-30)


### Bug Fixes

* linked styleguides will now run with the project's babel config ([b1e21bb](https://github.com/zillow/create-react-styleguide/commit/b1e21bb))


### build

* update project dependencies ([bc7998e](https://github.com/zillow/create-react-styleguide/commit/bc7998e))


### Features

* add crs.config.js and STYLEGUIDE.md template files for ease-of-use/discoverability ([b282765](https://github.com/zillow/create-react-styleguide/commit/b282765))
* ask for author and homepage when bootstrapping a new project ([3362f52](https://github.com/zillow/create-react-styleguide/commit/3362f52))


### BREAKING CHANGES

* Update to Jest 24



<a name="2.0.0"></a>
# 2.0.0 (2018-11-12)


### Major changes

* Update to babel 7
* Swap enzyme for react-test-renderer in test template
* Drop support for bootstrapping with emotion styles


### Migration notes for existing projects

* Install the latest babel preset

    ```
    npm i babel-preset-zillow@latest
    ```

* Install the latest eslint plugin

    ```
    npm i eslint-plugin-zillow@latest
    ```

* Update .eslintrc

    ```diff
    {
    +  "extends": ["plugin:zillow/recommended", "plugin:zillow/jest"]
    -  "extends": "plugin:zillow/recommended",
    -  "overrides": [{
    -    "files": [ "**/*.test.js"],
    -    "env": {
    -      "jest": true,
    -      "jest/globals": true
    -    },
    -    "plugins": ["jest"]
    -  }]
    }
    ```
