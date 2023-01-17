import { Component, Input } from '@angular/core';

@Component({
  selector: 'list-content',
  template: `
    <p>List Version 1</p>
    <ul>
      <li *ngFor="let item of items">{{item}}</li>
    </ul>
  `,
})
export class ListContentComponent_v1 {
  @Input() public items: any[] | undefined;
}
