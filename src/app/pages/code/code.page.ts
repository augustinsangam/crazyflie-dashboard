import { Component } from '@angular/core';
import { Options } from 'simplebar';
import { ProjectType } from 'src/app/models/software-update';
import { SoftwareUpdateService } from 'src/app/services/software-update/software-update.service';

const startingCode = `
#define DEBUG_MODULE "SANDBOX_PROJECT"

// FreeRTOS imports
extern "C" {
#include <FreeRTOS.h>
#include <app.h> /* appMain */
#include <debug.h> /* DEBUG_PRINT */
}

// Crazyflie Firmware imports
extern "C" {
#include <led.h>
#include <task.h> /* vTaskDelay */
}

void appMain() {
  // Toggle LEDs indefinitely
	for (;;) {
		DEBUG_PRINT("Setting all leds\\n");
		ledSetAll();
		vTaskDelay(M2T(1000));
		DEBUG_PRINT("Clearing all leds\\n");
		ledClearAll();
		vTaskDelay(M2T(1000));
	}
}
`;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'code-page',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CodePage {
  code = startingCode.toString();

  options: Options = {
    autoHide: false,
    scrollbarMinSize: 100,
  };

  projectType: ProjectType = 'sandbox';
  projectTypeOptions = [
    { value: 'cdr', label: 'Critical Design Review Project' },
    { value: 'rr', label: 'Readiness Review Project' },
    { value: 'sandbox', label: 'Custom project coded using editor playground' },
  ];

  constructor(public readonly service: SoftwareUpdateService) {}

  onResetCode(): void {
    this.code = startingCode;
  }

  send(): void {
    try {
      this.service.sendProject(this.projectType, this.code);
      this.service.logs = [
        {
          date: new Date().toISOString(),
          message: 'Sent drone update command',
          type: 'info',
        },
        ...this.service.logs,
      ];
    } catch (error) {
      console.error(error);
      this.service.logs = [
        {
          date: new Date().toISOString(),
          message: 'Unable to send drone update command',
          type: 'error',
        },
        ...this.service.logs,
      ];
    }
  }
}
