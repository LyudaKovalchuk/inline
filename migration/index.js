const program = require('commander'),
    generate = require('./generate'),
    run = require('./run');

program
    .version('1.0')
    .description('Inline cli for neo4j migration');

program
    .command('generate <name>')
    .alias('g')
    .description('Generate new migration script')
    .action(generate);

program
    .command('run')
    .alias('r')
    .description('Run migration script')
    .action(run);

program.parse(process.argv);