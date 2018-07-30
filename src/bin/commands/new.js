/**
 * This is a fork of nwb's createProject to support a new react styleguide template.
 * https://github.com/insin/nwb/blob/v0.22.0/src/createProject.js
 */

import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import copyTemplateDir from 'copy-template-dir';
import runSeries from 'run-series';
import install from '../util/install';
import pkg from '../../../package.json';

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
 * Initialise a Git repository if the user has Git, unless there's already one
 * present or the user has asked us could we not.
 */
function initGit(args, cwd, cb) {
    // Allow git init to be disabled with a --no-git flag
    if (args.git === false) {
        process.nextTick(cb);
        return;
    }
    // Bail if a git repo already exists (e.g. nwb init in an existing repo)
    if (fs.existsSync(path.join(cwd, '.git'))) {
        process.nextTick(cb);
        return;
    }

    exec('git --version', { cwd, stdio: 'ignore' }, err => {
        if (err) {
            cb();
            return;
        }
        const spinner = ora('Initing Git repo').start();
        runSeries(
            [
                callback => exec('git init', { cwd }, callback),
                callback => exec('git add .', { cwd }, callback),
                callback =>
                    exec(
                        `git commit -m "Initial commit from create-react-styleguide v${
                            pkg.version
                        }"`,
                        { cwd },
                        callback
                    ),
            ],
            error => {
                if (error) {
                    spinner.fail();
                    // eslint-disable-next-line no-console
                    console.log(chalk.red(error.message));
                    cb();
                    return;
                }
                spinner.succeed();
                cb();
            }
        );
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
            callback =>
                install(devDependencies, { cwd: targetDir, save: true, dev: true }, callback),
            callback => install(dependencies, { cwd: targetDir, save: true, dev: false }, callback),
            callback => initGit(args, targetDir, callback),
        ],
        cb
    );
}

export default (argv, callback) => {
    createModuleProject(argv, argv.projectDirectory, argv.projectDirectory, callback);
};
