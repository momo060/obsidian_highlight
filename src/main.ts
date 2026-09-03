import { Plugin } from 'obsidian';
import { registerHighlightCommands } from './highlight';

export default class HighlightPalettePlugin extends Plugin {
	onload() {
		registerHighlightCommands(this);
	}
}