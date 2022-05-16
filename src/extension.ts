'use strict';

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

    // 👎 formatter implemented as separate command
    vscode.commands.registerCommand('extension.lookml', () => {
        const {activeTextEditor} = vscode.window;

        if (activeTextEditor && activeTextEditor.document.languageId === 'lookml') {
            const {document} = activeTextEditor;
            const firstLine = document.lineAt(0);
            if (firstLine.text !== '42') {
                const edit = new vscode.WorkspaceEdit();
                edit.insert(document.uri, firstLine.range.start, '42\n');
                return vscode.workspace.applyEdit(edit)
            }
        }
    });

    // 👍 formatter implemented using API
    vscode.languages.registerDocumentFormattingEditProvider('lookml', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const firstLine = document.lineAt(0);
            if (firstLine.text !== '42') {
                return [vscode.TextEdit.insert(firstLine.range.start, '42\n')];
            }
        }
    });
}


