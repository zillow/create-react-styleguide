import { exec } from 'child_process';
import fs from 'fs';
import ora from 'ora';
import path from 'path';
import chalk from 'chalk';
import runSeries from 'run-series';
import pkg from '../../../package.json';

/**
+ * Run git related commands
+ */
function runGitCommands(args, cwd, cb, commands, message) {
    exec('git --version', { cwd, stdio: 'ignore' }, err => {
        if (err) {
            cb();
            return;
        }
        const spinner = ora(message).start();
        runSeries(commands, error => {
            if (error) {
                spinner.fail();
                // eslint-disable-next-line no-console
                console.log(chalk.red(error.message));
                cb();
                return;
            }
            spinner.succeed();
            cb();
        });
    });
}

/**
 * Initialise a Git repository if the user has Git, unless there's already one
 * present or the user has asked us could we not.
 */
export function initGit(args, cwd, cb) {
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

    runGitCommands(
        args,
        cwd,
        cb,
        [callback => exec('git init', { cwd }, callback)],
        'Initing Git repo'
    );
}

/**
 * Perform initial commit unless user has asked us to not init git
 */
export function initialCommit(args, cwd, cb) {
    // Exit if git init is disabled
    if (args.git === false) {
        process.nextTick(cb);
        return;
    }

    runGitCommands(
        args,
        cwd,
        cb,
        [
            callback => exec('git add .', { cwd }, callback),
            callback =>
                exec(
                    `git commit -m "Initial commit from create-react-styleguide v${pkg.version}"`,
                    { cwd },
                    callback
                ),
        ],
        'Adding initial commit in Git repo'
    );
}
