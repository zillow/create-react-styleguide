/**
 * This is a fork of nwb's createProject to support a new react styleguide template.
 * https://github.com/insin/nwb/blob/v0.22.0/src/createProject.js
 */
import path from 'path';
import chalk from 'chalk';
import copyTemplateDir from 'copy-template-dir';
import runSeries from 'run-series';
import install from '../util/install';
import pkg from '../../../package.json';
import { initGit, initialCommit } from '../util/git';

const STABLE_VERSIONS = {
    // dependencies
    'prop-types': '15.6.2',
    'styled-components': '4.1.3',
    // devDependencies
    'babel-plugin-styled-components': '1.10.0',
    'babel-preset-zillow': '2.1.1',
    'eslint-plugin-jest': '22.2.1',
    'eslint-plugin-zillow': '2.2.1',
    husky: '1.3.1',
    'jest-styled-components': '6.3.1',
    react: '16.7.0',
    'react-dom': '16.7.0',
    'react-test-renderer': '16.7.0',
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
function createModuleProject(args, name, targetDir, cb) {
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

    let templateDir = path.join(__dirname, '../../../templates/inline-styles');
    if (args.styles === 'styled-components') {
        templateDir = path.join(__dirname, '../../../templates/styled-components');
    }

    const templateVars = {
        name,
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

export default (argv, callback) => {
    createModuleProject(argv, argv.projectDirectory, argv.projectDirectory, callback);
};
