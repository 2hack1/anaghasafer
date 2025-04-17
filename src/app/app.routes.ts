import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './shared/components/login/login.component';
import { StatestoursComponent } from './shared/components/statestours/statestours.component';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent, 
        
        


    },{path:"states", component:StatestoursComponent},
];
