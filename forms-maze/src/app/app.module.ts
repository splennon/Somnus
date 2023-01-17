import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DynamicHooksModule, HookParserEntry } from 'ngx-dynamic-hooks';
import { ContainerComponent } from './container/container.component';
import { VersionableSelector } from './versionables/versionable_selector';


@NgModule({
  declarations: [
    AppComponent,
    ContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    DynamicHooksModule.forRoot({
      globalParsers: [ VersionableSelector ]
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
