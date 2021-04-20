import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component to represent the code editor. The editor comes form the library CodeMirror
 *
 * @see https://www.npmjs.com/package/codemirror
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  /**
   * Represent actual value of the code editor.
   */
  @Input() value = 'Type your code here \n';

  /**
   * Fire an event anytime the code changes.
   * The value emitted is the new code in a string format
   */
  @Output() valueChange = new EventEmitter<string>();

  /**
   * Fire an event anything the user ask to reset the code
   */
  @Output() resetCode = new EventEmitter<null>();

  options = {
    lineNumbers: true,
    theme: 'material-ocean',
    mode: 'text/x-c++src',
    viewportMargin: Infinity,
  };
}
