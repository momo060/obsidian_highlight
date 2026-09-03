import { Editor, Notice, Plugin } from 'obsidian';

interface HighlightColor {
	id: string;
	name: string;
	value: string;
}

const HIGHLIGHT_COLORS: HighlightColor[] = [
	{ id: 'yellow', name: 'Yellow', value: '#fff3a3' },
	{ id: 'green', name: 'Green', value: '#b7f0c0' },
	{ id: 'pink', name: 'Pink', value: '#ffc2d1' },
	{ id: 'blue', name: 'Blue', value: '#bae6fd' },
	{ id: 'purple', name: 'Purple', value: '#ddd6fe' },
];

export function registerHighlightCommands(plugin: Plugin): void {
	for (const color of HIGHLIGHT_COLORS) {
		plugin.addCommand({
			id: `highlight-selection-${color.id}`,
			name: `Highlight selected text: ${color.name}`,
			editorCallback: (editor: Editor) => {
				applyHighlight(editor, color);
			},
		});
	}
}

function applyHighlight(editor: Editor, color: HighlightColor): void {
	const selection = editor.getSelection();

	if (!selection) {
		new Notice('Select some text before applying a highlight color.');
		return;
	}

	const escapedSelection = escapeHtml(selection);
	editor.replaceSelection(
		`<mark style="background-color: ${color.value};">${escapedSelection}</mark>`,
	);
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
