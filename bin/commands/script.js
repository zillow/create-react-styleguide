module.exports = options => {
    const index = process.argv.indexOf(options.argv.script);
    const flags = Array.prototype.slice.call(process.argv, index + 1);
    const script = options.argv.script.replace(':', '_');

    // eslint-disable-next-line
    require(`./scripts/${script}`)({ ...options, flags });
};
