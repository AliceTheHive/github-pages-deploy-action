"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const { pusher, repository } = github.context.payload;
exports.isTest = process.env.UNIT_TEST;
exports.workspace = process.env.GITHUB_WORKSPACE;
exports.folder = core.getInput("FOLDER", { required: true });
exports.isTest = process.env.UNIT_TEST;
exports.root = ".";
// Required action data.
exports.action = {
    accessToken: core.getInput("ACCESS_TOKEN"),
    baseBranch: core.getInput("BASE_BRANCH"),
    build: exports.folder,
    branch: core.getInput("BRANCH"),
    commitMessage: core.getInput("COMMIT_MESSAGE"),
    clean: core.getInput("CLEAN"),
    cleanExclude: core.getInput("CLEAN_EXCLUDE"),
    defaultBranch: process.env.GITHUB_SHA ? process.env.GITHUB_SHA : "master",
    ssh: core.getInput("SSH"),
    email: pusher && pusher.email
        ? pusher.email
        : `${process.env.GITHUB_ACTOR ||
            "github-pages-deploy-action"}@users.noreply.github.com`,
    gitHubRepository: repository && repository.full_name
        ? repository.full_name
        : process.env.GITHUB_REPOSITORY,
    gitHubToken: core.getInput("GITHUB_TOKEN"),
    name: pusher && pusher.name
        ? pusher.name
        : process.env.GITHUB_ACTOR
            ? process.env.GITHUB_ACTOR
            : "GitHub Pages Deploy Action",
    targetFolder: core.getInput("TARGET_FOLDER")
};
// Token Types
exports.tokenType = exports.action.ssh
    ? "SSH"
    : exports.action.accessToken
        ? "Access Token"
        : exports.action.gitHubToken
            ? "GitHub Token"
            : "...";
// Repository path used for commits/pushes.
exports.repositoryPath = exports.action.ssh
    ? `git@github.com:${exports.action.gitHubRepository}`
    : `https://${exports.action.accessToken ||
        `x-access-token:${exports.action.gitHubToken}`}@github.com/${exports.action.gitHubRepository}.git`;
