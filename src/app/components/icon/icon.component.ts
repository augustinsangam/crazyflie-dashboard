import { Component, Input } from '@angular/core';

/**
 * Component to show an svg icon
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'icon-component',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  /**
   * The name of the icon. The icon will be retrieved from /assets/symbols.svg
   * base on its name.
   */
  @Input() iconName = '';
}
