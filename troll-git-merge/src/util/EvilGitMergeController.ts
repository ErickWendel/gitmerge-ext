import EvilGitMerge from './EvilGitMerge';
import { window } from 'vscode'
export default class EvilGitMergeController {
    private _evilGitMerge: EvilGitMerge

    constructor(evilGitMerge: EvilGitMerge) {
        this._evilGitMerge = evilGitMerge
    }

    public activate() {
        window.onDidChangeTextEditorSelection(this._onEvent, this)
    }

    private _onEvent() {
        this._evilGitMerge.replace()
    }
}