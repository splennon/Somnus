import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { WizardComponent } from './wizard/wizard-component';
import { WIZARD_COMPONENTS } from './wizard/components'
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { NoRouteReuseStrategy } from './NoRouteReuseStrategy';

@NgModule({
  declarations: [
    AppComponent,
    WizardComponent,
    WIZARD_COMPONENTS
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ClarityModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: NoRouteReuseStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
