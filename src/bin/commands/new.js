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
        'husky@next',
    ];
    if (args.eslint === 'zillow') {
        devDependencies.push('eslint-plugin-zillow', 'eslint-plugin-jest');
    }

    const dependencies = ['prop-types'];
    if (args.styles === 'emotion') {
        dependencies.push('emotion', 'react-emotion', 'emotion-theming');
        devDependencies.push('jest-emotion');
    }

    let templateDir = path.join(__dirname, '../../../templates/inline-styles');
    if (args.styles === 'emotion') {
        templateDir = path.join(__dirname, '../../../templates/emotion-styles');
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

    // CBA making this part generic until it's needed
    if (args.react) {
        devDependencies = devDependencies.map(depPkg => `${depPkg}@${args.react}`);
        // YOLO
        templateVars.reactPeerVersion = `^${args.react}`;
    } else {
        // TODO Get from npm so we don't have to manually update on major releases
        templateVars.reactPeerVersion = '16.x';
    }

    let copyEslintTemplate = callback => callback();
    if (args.eslint === 'zillow') {
        const eslintTemplateDir = path.join(__dirname, '../../../templates/zillow-eslint');
        copyEslintTemplate = callback =>
            copyTemplate(eslintTemplateDir, targetDir, templateVars, callback);
    }

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
