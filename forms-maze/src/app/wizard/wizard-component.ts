import {
    Component,
    Input,
    QueryList,
    Type,
    ViewChildren,
    ViewContainerRef,
  } from '@angular/core';

  import * as configs from './configs/index';
  
  @Component({
    selector: 'wizard',
    template: `
    <div *ngFor="let slot of storedConfigData">
    <div class="header" (click)="onHeaderClick(slot.id)">
      <i
        class="fa"
      ></i>
      {{ slot.header }}
    </div>
    <div class="content" [hidden]="!slot.open">
      <p *ngIf="!slot.content.componentType">{{ slot.content.text }}</p>
      <div *ngIf="slot.content.componentType">
        <ng-template #slotTemplate></ng-template>
      </div>
    </div>
  </div>
  `,
    styles: [`:host {
        width: 95%;
        position: absolute;
        top: 5rem;
        left: 50%;
        transform: translate(-50%, -0%);
      }
      
      .header {
        border: solid 1px black;
        padding: 0.25rem 0.75rem;
        display: flex;
        align-items: center;
      }
      
      .fa {
        width: 1rem;
        margin-right: 0.5rem;
        color: gray;
      }
      
      .content {
        border: solid 1px gray;
        border-top: none;
        padding: 0.5rem;
      }
      `],
  })
  export class WizardComponent {

    @Input() public version: keyof typeof configs = "v2";
    
    storedConfigData!: any[];
  
    @ViewChildren('slotTemplate', { read: ViewContainerRef })
    public slotTemplates!: QueryList<ViewContainerRef>;
  
    public ngOnInit(): void {
      this.storedConfigData = configs[this.version];
    }

    public ngAfterViewInit(): void {
      /*
       * SlotTemplates will not be fully populated at this point, but we need to create components
       * therein, so we defer to the end of the current microtask loop. If you'd prefer to defer to
       * the next change detection microloop use this instead of a Promise:
       * setTimeout(() => {...})
       */
      Promise.resolve().then(() =>
      {
        let i = 0;
        this.storedConfigData.forEach((slot) => {
          if (slot.content.componentType) {
            const comp = this.slotTemplates
              .get(i++)!
              .createComponent(slot.content.componentType as Type<any>);
            Object.keys(slot.content.inputs).forEach(
              (key) => (comp.instance[key] = slot.content.inputs[key])
            );
          }
        });
      });
    }
  
    public onHeaderClick(id: number) {
      const slotClicked = this.storedConfigData.find((slot: { id: number; }) => slot.id === id);
      slotClicked!.open = !slotClicked!.open;
    }
  }
  