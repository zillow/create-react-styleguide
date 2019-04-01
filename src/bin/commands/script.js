module.exports = (argv, callback) => {
    // eslint-disable-next-line
    require(`./scripts/${argv.script.replace(':', '_')}`)(argv, callback);
};
