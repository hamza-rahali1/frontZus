import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppUserService } from './appuser.service';
import { HttpClientModule } from '@angular/common/http';import { FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjetsComponent } from './projets/projets.component';
import { ProjetService } from './projet.service';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    ProjetsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule,
    AppRoutingModule
  ],
  providers: [AppUserService, ProjetService],
  bootstrap: [AppComponent]
})
export class AppModule { }