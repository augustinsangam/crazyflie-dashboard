import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as marked from 'marked';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'about-page',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class AboutPage implements OnInit {
  html: SafeHtml;

  constructor(
    private readonly sanitizer: DomSanitizer,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('/assets/about.md', { responseType: 'text' }).subscribe((data) => {
      this.html = this.sanitizer.bypassSecurityTrustHtml(marked(data));
    });
  }
}
