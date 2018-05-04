#!/usr/bin/env node

import yargs from 'yargs';

const commandHandler = argv => {
    // eslint-disable-next-line
    require(`./commands/${argv._[0]}`)(argv);
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
                    'build:styleguide',
                    'clean',
                    'start',
                    'test',
                    'test:coverage',
                    'test:watch',
                    'prepublishOnly',
                ],
            });
        },
        handler: commandHandler,
    }).argv;
