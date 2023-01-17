import { Component, Input } from '@angular/core';

@Component({
  selector: 'snippet-content',
  template: `
    <p>Snippet Version 1</p>
    <p>{{description}}</p>
    <pre><code>{{snippet}}</code></pre>
  `,
  styles: [
    `
    code { white-space: break-spaces; }
  `,
  ],
})
export class SnippetContentComponent_v1 {
  @Input() public description: string | undefined;
  @Input() public snippet: string | undefined;
}
