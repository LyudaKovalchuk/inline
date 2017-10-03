const util = require('util'),
    fs = require('fs'),
    exists = util.promisify(fs.exists),
    mkdir = util.promisify(fs.mkdir),
    open = util.promisify(fs.open);

function generate (name) {
    const folder_name = `${process.cwd()}/migration/migrations`,
        script_name = `${Date.now()}_${name}.js`,
        full_path = `${folder_name}/${script_name}`;

    console.log('sdfsa');

    return exists(folder_name)
        .then((exists) => exists ? undefined : mkdir(folder_name))
        .then(() => open(full_path, 'a'))
        .then(() => console.log(`${full_path} was created`))
        .catch((error) => console.error(`Error during creating ${full_path}: ${error}`));
}

module.exports = generate;