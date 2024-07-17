const fs = require('fs');
const path = require('path');

const env = process.argv[2]; // get the environment argument

if (!env || (env !== 'local' && env !== 'host')) {
  console.error('Please specify an environment: local or host');
  process.exit(1);
}

const configFile = `config.${env}.json`;
const configFilePath = path.resolve(__dirname, 'config', configFile);
const targetConfigFile = path.resolve(__dirname, 'config.json');

if (!fs.existsSync(configFilePath)) {
  console.error(`Configuration file ${configFilePath} does not exist`);
  process.exit(1);
}

// Copy config file content to config.json
const configContent = fs.readFileSync(configFilePath, 'utf8');
fs.writeFileSync(targetConfigFile, configContent);
console.log(`Copied ${configFilePath} to config.json`);
