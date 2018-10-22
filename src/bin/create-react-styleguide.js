#!/usr/bin/env node

import yargs from 'yargs';

const onCommandComplete = code => process.exit(code);

const commandHandler = argv => {
    // eslint-disable-next-line
    require(`./commands/${argv._[0]}`)(argv, onCommandComplete);
};

// eslint-disable-next-line no-unused-expressions
yargs
    .wrap(120)
    .usage('Usage: create-react-styleguide <command> [options]')
    .command({
        command: 'new <project-directory>',
        desc: 'Create a new project in the given directory',
        builder: y => {
            y.positional('project-directory', {
                describe: 'The directory to create',
                type: 'string',
            });
        },
        handler: commandHandler,
    })
    .command({
        command: 'script <script>',
        desc: 'Run the given create-react-styleguide script',
        builder: y => {
            y.positional('script', {
                describe: 'The script to run',
                choices: [
                    'build',
                    'build:watch',
                    'build:styleguide',
                    'clean',
                    'eslint',
                    'eslint:fix',
                    'start',
                    'test',
                    'test:coverage',
                    'test:update',
                    'test:watch',
                    'prepublishOnly',
                ],
            });
        },
        handler: commandHandler,
    })
    .option('stable', {
        desc:
            'By default, the latest version of all project dependencies are installed. If that does not work for some reason, you can use this to revert to the last known stable configuration (use this with caution as this can quickly become out-of-date).',
        default: false,
    })
    .option('styles', {
        desc: 'The styling library to use when creating a new project',
        default: 'styled-components',
        choices: ['styled-components', 'emotion', 'none'],
    })
    .option('eslint', {
        desc: 'Add eslint configuration when creating a new project',
        default: 'zillow',
        choices: ['zillow', 'none'],
    }).argv;
