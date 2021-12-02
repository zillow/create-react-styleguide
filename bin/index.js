#!/usr/bin/env node

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const onCommandComplete = code => process.exit(code);

const commandHandler = argv => {
    // eslint-disable-next-line
    require(`./commands/${argv._[0]}`)({ argv, callback: onCommandComplete });
};

// eslint-disable-next-line no-unused-expressions
yargs(hideBin(process.argv))
    .usage('Usage: create-react-styleguide <command> [options]')
    .demandCommand(1)
    .command(
        'new <project-directory>',
        'Create a new project in the given directory',
        y =>
            y.positional('project-directory', {
                describe: 'The directory to create',
                type: 'string',
            }),
        argv => commandHandler(argv)
    )
    .command(
        'script <script>',
        'Run the given create-react-styleguide script',
        y =>
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
            }),
        argv => commandHandler(argv)
    )
    .option('stable', {
        desc: 'By default, the latest version of all project dependencies are installed. If that does not work for some reason, you can use this to revert to the last known stable configuration (use this with caution as this can quickly become out-of-date).',
        type: 'boolean',
        default: false,
    })
    .option('styles', {
        desc: 'The styling library to use when creating a new project',
        default: 'styled-components',
        choices: ['styled-components', 'none'],
    })
    .option('eslint', {
        desc: 'Add eslint configuration when creating a new project',
        default: 'zillow',
        choices: ['zillow', 'none'],
    })
    .option('legacy-peer-deps', {
        desc: 'Use "--legacy-peer-deps" when doing an "npm install"',
        type: 'boolean',
        default: false,
    }).argv;
