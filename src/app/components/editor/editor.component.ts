import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CompilerOutput } from './compiler-output';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() value = 'Type your code here \n';
  @Input() output: CompilerOutput | undefined;
  @Input() disableSend = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() resetCode = new EventEmitter<null>();
  @Output() compileCode = new EventEmitter<null>();
  @Output() sendCode = new EventEmitter<null>();

  options = {
    lineNumbers: true,
    theme: 'material-ocean',
    mode: 'text/x-c++src',
    viewportMargin: Infinity,
  };

}
