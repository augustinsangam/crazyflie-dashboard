import { Component, Input } from '@angular/core';

/**
 * Class to represent a chip
 *
 * A chip is a bordered that may have an indicator which could be blinking or not
 * A chip could be use to represent a state.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'chip-component',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss'],
})
export class ChipComponent {
  /**
   * The color of the chip
   */
  @Input() color = 'white';
  /**
   * Indicates when the indicator is blinking or not
   */
  @Input() blinking = false;
  /**
   * Indicates whether to show the indicator or not
   */
  @Input() showIndicator = true;
}
