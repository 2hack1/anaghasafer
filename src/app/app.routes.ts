import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

import { StatestoursComponent } from './shared/components/statestours/statestours.component';
import { DestinationtourComponent } from './shared/components/destinationtour/destinationtour.component';
import { ViewDeatailsComponent } from './shared/components/view-deatails/view-deatails.component';



export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    }, {
        path: "states",
        component: StatestoursComponent
    },
    {
        path: "des",
        component: DestinationtourComponent
    },{
        path:"view",
        component:ViewDeatailsComponent
    },
]

  