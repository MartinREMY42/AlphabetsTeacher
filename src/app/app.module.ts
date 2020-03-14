import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterrogationComponent } from './interrogation/interrogation.component';

@NgModule({
    declarations: [
        AppComponent,
        InterrogationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule { }