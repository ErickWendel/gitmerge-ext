import * as vscode from 'vscode';
import EvilGitMerge from './util/EvilGitMerge';
import EvilGitMergeController from './util/EvilGitMergeController';


export function activate(context: vscode.ExtensionContext) {
	const evilGitMerge = new EvilGitMerge()
	const evilGitMergeController = new EvilGitMergeController(evilGitMerge)
	evilGitMergeController.activate()
}

export function deactivate() {}
