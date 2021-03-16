#!/usr/bin/env node
const inquirer = require('inquirer');
const path = require('path');
const clone = require('git-clone');
const shell = require('shelljs');
const chalk = require('chalk');
const log = console.log;

const QUESTIONS = [
  {
    name: 'name',
    type: 'input',
    message: '🤖 Please input a new project name:',
  },
]

inquirer.prompt(QUESTIONS).then(answers => {
  const currentDir = process.cwd();
  const projectName = answers['name'];
  const tartgetPath = path.join(currentDir, projectName);
  const templateRepo = 'https://github.com/zander-br/node-boilerplate-typescript';

  log(chalk.blue(`\n🚀 Cloning boilerplate from ${chalk.bold(templateRepo)}`));

  clone(templateRepo, tartgetPath, () => {
    shell.cd(tartgetPath);
    log(chalk.blue('📦 Install all dependences using yarn'));
    shell.exec('yarn install --silent');

    log(chalk.red('❌ Removing git repository'));
    shell.exec('rm -rf .git');

    log(chalk.blue('✅ Init git repository'));
    shell.exec('git init -q');

    log(chalk.blue('🐶 Install git hooks'));
    shell.exec('yarn husky install');

    log(chalk.blue('🧲 Add all files to git repository'));
    shell.exec('git add .');

    log(chalk.blue('⌛️ Create first commit'));
    shell.exec('git commit -m "chore: initial commit" --quiet');

    log(chalk.green('\n\n🙌 Success! ') + chalk.white(`Created ${projectName} at ${tartgetPath}\nInside that directory, you can run several commands: \n`));
    log(chalk.blue('  yarn test'));
    log(chalk.white('    Starts the all tests.\n'));
    log(chalk.blue('  yarn build'));
    log(chalk.white('    Builds the app for production.\n'));
    log(chalk.blue('  yarn start'));
    log(chalk.white('    Runs the built app in production mode.\n'));
    log(chalk.white('We suggest that you begin by typing:\n\n'));
    log(chalk.blue('  cd ') + chalk.white(projectName));
    log(chalk.blue('  yarn test\n\n'));
  });
});