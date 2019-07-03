/**
 * This is a fork of nwb's createProject to support a new react styleguide template.
 * https://github.com/insin/nwb/blob/v0.22.0/src/createProject.js
 */
const path = require('path');
const chalk = require('chalk');
const copyTemplateDir = require('copy-template-dir');
const runSeries = require('run-series');
const install = require('../util/install');
const pkg = require('../../../package.json');
const { initGit, initialCommit } = require('../util/git');
const inquirer = require('inquirer');

const STABLE_VERSIONS = {
    // dependencies
    'prop-types': '15.7.2',
    'styled-components': '4.3.2',
    // devDependencies
    'babel-plugin-styled-components': '1.10.6',
    'babel-preset-zillow': '4.1.0',
    'eslint-plugin-jest': '22.7.1',
    'eslint-plugin-zillow': '3.3.1',
    'husky': '3.0.0',
    'jest-styled-components': '6.3.3',
    'react': '16.8.6',
    'react-dom': '16.8.6',
    'react-test-renderer': '16.8.6',
    // Always use the latest version of create-react-styleguide
    'create-react-styleguide': '',
};

/**
 * Copy a project template and log created files if successful.
 */
function copyTemplate(templateDir, targetDir, templateVars, cb) {
    copyTemplateDir(templateDir, targetDir, templateVars, (err, createdFiles) => {
        if (err) {
            cb(err);
            return;
        }
        createdFiles.sort().forEach(createdFile => {
            const relativePath = path.relative(targetDir, createdFile);
            // eslint-disable-next-line no-console
            console.log(`  ${chalk.green('create')} ${relativePath}`);
        });
        cb();
    });
}

/**
 * Create an npm module project skeleton.
 */
function createModuleProject(args, name, targetDir, cliAnswers, cb) {
    let devDependencies = [
        'react',
        'react-dom',
        'create-react-styleguide',
        'babel-preset-zillow',
        'husky',
        'react-test-renderer',
    ];
    if (args.eslint === 'zillow') {
        devDependencies.push('eslint-plugin-zillow', 'eslint-plugin-jest');
    }

    let dependencies = ['prop-types'];
    if (args.styles === 'styled-components') {
        dependencies.push('styled-components');
        devDependencies.push('babel-plugin-styled-components', 'jest-styled-components');
    }

    const baseTemplateDir = path.join(__dirname, '../../../templates/base');

    let templateDir = path.join(__dirname, '../../../templates/inline-styles');
    if (args.styles === 'styled-components') {
        templateDir = path.join(__dirname, '../../../templates/styled-components');
    }

    const templateVars = {
        name,
        author: cliAnswers.author,
        homepage: cliAnswers.homepage,
        eslintPackageConfig:
            args.eslint === 'zillow'
                ? '\n    "eslint": "create-react-styleguide script eslint",\n    "eslint:fix": "create-react-styleguide script eslint:fix",'
                : '',
        createReactStyleguideVersion: pkg.version,
        huskyConfig: args.eslint === 'zillow' ? 'npm run eslint && npm run test' : 'npm run test',
    };

    // TODO Get from npm so we don't have to manually update on major releases
    templateVars.reactPeerVersion = '16.x';

    let copyEslintTemplate = callback => callback();
    if (args.eslint === 'zillow') {
        const eslintTemplateDir = path.join(__dirname, '../../../templates/zillow-eslint');
        copyEslintTemplate = callback =>
            copyTemplate(eslintTemplateDir, targetDir, templateVars, callback);
    }

    // By default, the latest caret version of all dependencies are installed.
    // If for some reason that fails, we can fall back to a previously known stable release.
    const versionMap = dep => {
        const version = STABLE_VERSIONS[dep];
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
                install(devDependencies, { cwd: targetDir, save: true, dev: true }, callback),
            callback => install(dependencies, { cwd: targetDir, save: true, dev: false }, callback),
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
