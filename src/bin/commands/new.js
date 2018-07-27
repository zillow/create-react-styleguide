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
import inquirer from 'inquirer';
import { typeOf, install, toSource } from '../util/utils';
import pkg from '../../../package.json';

const CONFIG_FILE_NAME = 'nwb.config.js';

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
 * Prompt the user for preferences related to publishing a module to npm, unless
 * they've asked us not to or have already provided all the possible options via
 * arguments.
 */
function getNpmModulePrefs(args, cb) {
    // An ES modules build is enabled by default, but can be disabled with
    // --no-es-modules or --es-modules=false (or a bunch of other undocumented
    // stuff)
    const esModules =
        args['es-modules'] !== false && !/^(0|false|no|nope|off)$/.test(args['es-modules']);
    // Pass a UMD global variable name with --umd=MyThing, or pass --no-umd to
    // indicate you don't want a UMD build.
    const umd = typeOf(args.umd) === 'string' ? args.umd : false;

    // Don't ask questions if the user doesn't want them, or already told us all
    // the answers.
    if (args.f || args.force || ('umd' in args && 'es-modules' in args)) {
        process.nextTick(cb, null, { umd, esModules });
        return;
    }

    inquirer
        .prompt([
            {
                when: () => !('es-modules' in args),
                type: 'confirm',
                name: 'esModules',
                message:
                    'Do you want to create an ES modules build for use by compatible bundlers?',
                default: esModules,
            },
            {
                when: () => !('umd' in args),
                type: 'confirm',
                name: 'createUMD',
                message: 'Do you want to create a UMD build for global usage via <script> tag?',
                default: umd,
            },
            {
                when: ({ createUMD }) => createUMD,
                type: 'input',
                name: 'umd',
                message: 'Which global variable should the UMD build set?',
                validate(input) {
                    return input.trim() ? true : 'Required to create a UMD build';
                },
                default: umd || '',
            },
        ])
        .then(answers => cb(null, answers), err => cb(err));
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
 * Write an nwb config file.
 */
function writeConfigFile(dir, config, cb) {
    fs.writeFile(path.join(dir, CONFIG_FILE_NAME), `module.exports = ${toSource(config)}\n`, cb);
}

/**
 * Create an npm module project skeleton.
 */
function createModuleProject(args, name, targetDir, cb) {
    let devDependencies = ['react', 'react-dom', 'create-react-styleguide', 'husky@next'];
    if (args.eslint === 'zillow') {
        devDependencies.push('eslint-plugin-zillow', 'eslint-plugin-jest');
    }

    const dependencies = ['prop-types'];
    if (args.styles === 'emotion') {
        dependencies.push('emotion', 'react-emotion', 'emotion-theming');
        devDependencies.push('jest-emotion');
    }

    const externals = { react: 'React' };
    const projectType = 'react-component';

    getNpmModulePrefs(args, (err, prefs) => {
        if (err) {
            cb(err);
            return;
        }
        const { umd, esModules } = prefs;

        let templateDir = path.join(__dirname, '../../../templates/inline-styles');
        if (args.styles === 'emotion') {
            templateDir = path.join(__dirname, '../../../templates/emotion-styles');
        }

        const templateVars = {
            name,
            esModules,
            esModulesPackageConfig: esModules ? '\n  "module": "es/index.js",' : '',
            eslintPackageConfig:
                args.eslint === 'zillow'
                    ? '\n    "eslint": "create-react-styleguide script eslint",\n    "eslint:fix": "create-react-styleguide script eslint:fix",'
                    : '',
            createReactStyleguideVersion: pkg.version,
            huskyConfig:
                args.eslint === 'zillow' ? 'npm run eslint && npm run test' : 'npm run test',
        };
        const nwbConfig = {
            type: projectType,
            npm: {
                esModules,
                umd: umd ? { global: umd, externals } : false,
            },
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
                callback => writeConfigFile(targetDir, nwbConfig, callback),
                callback =>
                    install(devDependencies, { cwd: targetDir, save: true, dev: true }, callback),
                callback =>
                    install(dependencies, { cwd: targetDir, save: true, dev: false }, callback),
                callback => initGit(args, targetDir, callback),
            ],
            cb
        );
    });
}

export default (argv, callback) => {
    createModuleProject(argv, argv.projectDirectory, argv.projectDirectory, callback);
};
