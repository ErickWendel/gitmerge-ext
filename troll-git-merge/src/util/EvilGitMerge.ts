import { window, Position, TextEditorEdit } from 'vscode'
export default class EvilGitMerge {
    private HEADTEXT = '<<<<<<< HEAD\n'
    private BODYTEXT = '=======\n'
    private FOOTERTEXT = '>>>>>>> troll-git-ext\n'

    public replace() {
        const editor = window.activeTextEditor
        if (!editor) return;

        const text = editor.document.getText()
        if (!text.length) return;

        // evitar que rode duas vezes
        const alreadyChanged = !!~text.indexOf(this.HEADTEXT)
        if (alreadyChanged) return;

        editor.edit(this.calculateMergeText(text))
    }
    private randomInteger(min: number, max: number) {
        return (
            Math.floor(
                Math.random() *
                (max - min + 1)
            )
            + 1
        )
    }

    private calculateMergeText(text: string) {
        return (builder: TextEditorEdit) => {
            const lines = text.split('\n')
            for (let i = 0; i < lines.length; i++) {
                const head = i
                const body = i + 2
                const footer = i + 3
                const randomLines = 4
                const nextPage = footer + this.randomInteger(1, randomLines)

                builder.insert(
                    new Position(head, 0), this.HEADTEXT
                )
                builder.insert(
                    new Position(body, 0), `${this.BODYTEXT}${lines[head + 1]}`
                )

                builder.insert(
                    new Position(footer, 0), this.FOOTERTEXT
                )

                // garantir que nao vai rodar na mesma linha
                i += nextPage

            }
        }
    }
}