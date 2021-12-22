/**
 * This is a fork of nwb's createProject to support a new react styleguide template.
 * https://github.com/insin/nwb/blob/v0.22.0/src/createProject.js
 */
const path = require('path');
const runSeries = require('run-series');
const semver = require('semver');
const install = require('../util/install');
const pkg = require('../../package.json');
const { initGit, initialCommit } = require('../util/git');
const inquirer = require('inquirer');
const copyTemplate = require('../util/copy-template');

const STABLE_DEPENDENCIES = {
    'prop-types': pkg.devDependencies['prop-types'],
    'react': pkg.devDependencies.react,
    'react-dom': pkg.devDependencies['react-dom'],
    'styled-components': pkg.devDependencies['styled-components'],
};

const STABLE_DEV_DEPENDENCIES = {
    'create-react-styleguide': pkg.version,
    'husky': '4.3.8',
    'react-test-renderer': pkg.devDependencies['react-test-renderer'],
};

/**
 * Create an npm module project skeleton.
 */
function createModuleProject(args, name, targetDir, cliAnswers, cb) {
    let dependencies = Object.keys(STABLE_DEPENDENCIES);
    let devDependencies = Object.keys(STABLE_DEV_DEPENDENCIES);

    if (args.styles !== 'styled-components') {
        dependencies = dependencies.filter(dep => dep !== 'styled-components');
    }

    const baseTemplateDir = path.join(__dirname, '../../templates/base');

    let templateDir = path.join(__dirname, '../../templates/inline-styles');
    if (args.styles === 'styled-components') {
        templateDir = path.join(__dirname, '../../templates/styled-components');
    }

    const templateVars = {
        name,
        author: cliAnswers.author,
        homepage: cliAnswers.homepage,
        eslintPackageConfig:
            args.eslint === 'zillow'
                ? '\n    "eslint": "create-react-styleguide script eslint",\n    "eslint:fix": "create-react-styleguide script eslint:fix",'
                : '',
        huskyConfig: args.eslint === 'zillow' ? 'npm run eslint && npm run test' : 'npm run test',
    };

    let copyEslintTemplate = callback => callback();
    if (args.eslint === 'zillow') {
        const eslintTemplateDir = path.join(__dirname, '../../templates/zillow-eslint');
        copyEslintTemplate = callback =>
            copyTemplate(eslintTemplateDir, targetDir, templateVars, callback);
    }

    // By default, the latest caret version of all dependencies are installed.
    // If for some reason that fails, we can fall back to a previously known stable release.
    const versionMap = dep => {
        const version = semver.clean({ ...STABLE_DEPENDENCIES, ...STABLE_DEV_DEPENDENCIES }[dep]);
        if (version) {
            return `${dep}@${args.stable ? '' : '^'}${version}`;
        }
        return dep;
    };
    devDependencies = devDependencies.map(versionMap);
    dependencies = dependencies.map(versionMap);

    runSeries(
        [
            callback => copyTemplate(baseTemplateDir, targetDir, templateVars, callback),
            callback => copyTemplate(templateDir, targetDir, templateVars, callback),
            copyEslintTemplate,
            callback => initGit(args, targetDir, callback),
            callback =>
                install(
                    devDependencies,
                    { cwd: targetDir, save: true, dev: true, legacyPeerDeps: args.legacyPeerDeps },
                    callback
                ),
            callback =>
                install(
                    dependencies,
                    { cwd: targetDir, save: true, dev: false, legacyPeerDeps: args.legacyPeerDeps },
                    callback
                ),
            callback => initialCommit(args, targetDir, callback),
        ],
        cb
    );
}

module.exports = ({ argv, callback }) => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'author',
                message: 'author:',
            },
            {
                type: 'input',
                name: 'homepage',
                message: 'homepage:',
            },
        ])
        .then(answers => {
            createModuleProject(
                argv,
                argv.projectDirectory,
                argv.projectDirectory,
                answers,
                callback
            );
        });
};
