import enquirer from 'enquirer';
import path from 'path';
import fs from 'fs';
import simpleGit, { SimpleGit } from 'simple-git';

const git: SimpleGit = simpleGit();

const init = async () => {
  const { appname } = await enquirer.prompt<{ appname: string }>({
    type: 'input',
    name: 'appname',
    message: 'Application app name?',
  });
  const templateRepoUrl = 'https://github.com/l2700l/vkma-ts-template';
  const currentDirectory = process.cwd();
  const destinationPath = path.join(currentDirectory, appname ?? 'vkma');
  try {
    console.log('Downloading template...');
    await downloadTemplate(templateRepoUrl, destinationPath);
    console.log('Template downloaded successfully!');
    instruction(appname ?? 'vkma');
  } catch (error) {
    console.error('Error downloading template:', error);
  }
};

const downloadTemplate = async (
  templateUrl: string,
  destinationPath: string
) => {
  await git.clone(templateUrl, destinationPath, ['--depth=1']);
  const gitFolderPath = path.join(destinationPath, '.git');
  if (fs.existsSync(gitFolderPath)) {
    fs.rmSync(gitFolderPath, { recursive: true });
  }
};

const instruction = (appname: string) => {
  const userAgent = process.env.npm_config_user_agent ?? '';
  const packageManager = /pnpm/.test(userAgent)
    ? 'pnpm'
    : /yarn/.test(userAgent)
      ? 'yarn'
      : 'npm';
  console.log();
  console.log('Next steps:');
  console.log('1. cd', appname);
  console.log('2.', packageManager, 'install');
  console.log('3.', packageManager, 'run dev');
  console.log();
  console.log('Happy coding!');
};

init();
