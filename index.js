#!/usr/bin/env node
const inquirer = require('inquirer');
const path = require('path');
const clone = require('git-clone');
const shell = require('shelljs');

const QUESTIONS = [
  {
    name: 'name',
    type: 'input',
    message: 'Please input a new project name:',
  },
]

inquirer.prompt(QUESTIONS).then(answers => {
  const currentDir = process.cwd();
  const projectName = answers['name'];
  const tartgetPath = path.join(currentDir, projectName);
  const templateRepo = 'https://github.com/zander-br/node-boilerplate-typescript';

  clone(templateRepo, tartgetPath, () => {
    shell.cd(tartgetPath);
    shell.exec('yarn');
  });
});