import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'editor-component',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() value = 'Type your code here \n';
  @Input() disableSend = true;

  @Output() valueChange = new EventEmitter<string>();
  @Output() resetCode = new EventEmitter<null>();

  options = {
    lineNumbers: true,
    theme: 'material-ocean',
    mode: 'text/x-c++src',
    viewportMargin: Infinity,
  };

}
