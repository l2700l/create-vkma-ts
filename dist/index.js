"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enquirer_1 = __importDefault(require("enquirer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const simple_git_1 = __importDefault(require("simple-git"));
const git = (0, simple_git_1.default)();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const { appname } = yield enquirer_1.default.prompt({
        type: 'input',
        name: 'appname',
        message: 'Application app name?',
    });
    const templateRepoUrl = 'https://github.com/l2700l/vkma-ts-template';
    const currentDirectory = process.cwd();
    const destinationPath = path_1.default.join(currentDirectory, appname !== null && appname !== void 0 ? appname : 'vkma');
    try {
        console.log('Downloading template...');
        yield downloadTemplate(templateRepoUrl, destinationPath);
        console.log('Template downloaded successfully!');
        instruction(appname !== null && appname !== void 0 ? appname : 'vkma');
    }
    catch (error) {
        console.error('Error downloading template:', error);
    }
});
const downloadTemplate = (templateUrl, destinationPath) => __awaiter(void 0, void 0, void 0, function* () {
    yield git.clone(templateUrl, destinationPath, ['--depth=1']);
    const gitFolderPath = path_1.default.join(destinationPath, '.git');
    if (fs_1.default.existsSync(gitFolderPath)) {
        fs_1.default.rmSync(gitFolderPath, { recursive: true });
    }
});
const instruction = (appname) => {
    var _a;
    const userAgent = (_a = process.env.npm_config_user_agent) !== null && _a !== void 0 ? _a : '';
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
