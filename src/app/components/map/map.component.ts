import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import * as svgPanZoom from 'svg-pan-zoom';
import { MissionMap } from '../missions-history/missions-history.component';

/**
 * Component that display a map. A map contains drone positions, borders,
 * axis. The map is an svg mouse-resizable canvas.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('svg', {
    static: false,
  })
  svgRef: ElementRef<SVGSVGElement>;

  /**
   * The mission map to display
   */
  @Input() mission: MissionMap;

  ngAfterViewInit(): void {
    svgPanZoom(this.svgRef.nativeElement);
  }
}
