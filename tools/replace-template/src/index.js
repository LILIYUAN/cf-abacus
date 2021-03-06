'use strict';

// Replace manifest.yml template using credentials file or environment variables

const commander = require('commander');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const yaml = require('js-yaml');

let credentialsFile;
let abacusConfigDir;

const parseCommandLineArgs = (args) => {
  commander
    .arguments('<abacus-config-directory> [credentials-file]')
    .action(function(configDir, credentials) {
      abacusConfigDir = configDir;
      credentialsFile = credentials;
    })
    .parse(args);
};

const replaceEnvironmentValues = (environment, credentials, credentialsKey) => {
  if (!environment)
    return;

  for (let appEnvKey in environment)
    if (environment.hasOwnProperty(appEnvKey)) {
      const appEnvValue = environment[appEnvKey];
      if (typeof appEnvValue === 'string')
        environment[appEnvKey] =
          appEnvValue.replace(credentialsKey, credentials[credentialsKey]);
    }
};

const replaceFiles = (credentials, files) => {
  console.log('Substituting in:');
  for (let templateFile of files)
    fs.readFile(templateFile, 'utf8', function(err, content) {
      if (err)
        throw err;

      const templateYml = yaml.load(content);

      for (let credentialsKey in credentials)
        for (let application of templateYml.applications)
          replaceEnvironmentValues(application.env,
            credentials, credentialsKey);

      const templatePath = path.dirname(templateFile);
      const templateBaseName = path.basename(templateFile);
      const manifestBaseName = templateBaseName.replace(/\.template/g, '');
      const manifestFile = path.join(templatePath, manifestBaseName);

      const manifestContent = yaml.dump(templateYml);
      fs.writeFile(manifestFile, manifestContent, 'utf8', (err) => {
        if (err)
          throw err;
      });
      console.log('   %s', manifestFile);
    });
};

const runCLI = () => {
  parseCommandLineArgs(process.argv);

  if (typeof abacusConfigDir === 'undefined') {
    console.error('No abacus-config directory specified!');
    process.exit(1);
  }
  if (!fs.statSync(abacusConfigDir).isDirectory()) {
    console.error('Invalid abacus-config directory %s specified!',
      abacusConfigDir);
    process.exit(1);
  }
  console.log('Abacus config: %s', abacusConfigDir);

  const credentials = [];
  if (credentialsFile) {
    console.log('Using credentials file: %s', credentialsFile);
    fs.readFile(credentialsFile, 'utf8', (err, content) => {
      if (err)
        throw err;

      const credentialsYml = yaml.load(content);
      for (let key in credentialsYml)
        if (credentialsYml.hasOwnProperty(key)) {
          const envVariableName = '$' + key.toUpperCase().replace(/-/g, '_');
          credentials[envVariableName] = credentialsYml[key];
        }
    });
  }
  else {
    console.log('Using environment variables');
    for (let key in process.env)
      if (process.env.hasOwnProperty(key)) {
        const envVariableName = '$' + key;
        credentials[envVariableName] = process.env[key];
      }
  }

  glob(abacusConfigDir + '/lib/**/manifest.yml.template', (err, files) => {
    if (err)
      throw err;
    replaceFiles(credentials, files);
  });
};

// Export our CLI
module.exports.runCLI = runCLI;
