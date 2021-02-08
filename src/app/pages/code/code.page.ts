import { Component } from '@angular/core';
import { Options } from 'simplebar';
import { CompilerOutput } from 'src/app/components/editor/compiler-output';
import { SocketService } from 'src/app/services/communication/socket.service';

const startingCode = `#include <iostream>

using namespace std;

int main() {
  cout << "Hello World!";
  return 0;
}`;

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'code-page',
  templateUrl: './code.page.html',
  styleUrls: ['./code.page.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CodePage {
  code = `#include <iostream>

using namespace std;

int main() {
  cout << "Hello World!";
  return 0;
}`;

  options: Options = {
    autoHide: false,
    scrollbarMinSize: 100,
  };

  isBusy = false;

  editorOutput: CompilerOutput | undefined;

  constructor(public readonly socketService: SocketService) {}

  onResetCode(): void {
    this.code = startingCode;
  }

  onCompileCode(): void {
    this.isBusy = true;
    this.editorOutput = {
      status: 'loading',
      message: 'Building the program...',
    };
    try {
      // TODO : Insert the logic
      setTimeout(() => {
        this.editorOutput = {
          status: 'success',
          message: 'Program built successfully !',
        };
        this.isBusy = false;
      }, 1000);
    } catch (error) {
      console.log(error);
      this.isBusy = false;
    }
  }

  onSendCode(): void {
    this.isBusy = true;
    this.editorOutput = {
      status: 'loading',
      message: 'Sending the program...',
    };
    try {
      // TODO : Insert the logic
      setTimeout(() => {
        this.editorOutput = {
          status: 'success',
          message: 'Program sent successfully !',
        };
        this.isBusy = false;
      }, 1000);
    } catch (error) {
      console.log(error);
      this.isBusy = false;
    }
  }

  private wait(ms: number): void {
    const start = Date.now();
    let now = start;
    while (now - start < ms) {
      now = Date.now();
    }
  }
}
