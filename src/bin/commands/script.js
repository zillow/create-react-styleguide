export default argv => {
    // eslint-disable-next-line
    require(`./scripts/${argv.script.replace(':', '_')}`)(argv);
};
