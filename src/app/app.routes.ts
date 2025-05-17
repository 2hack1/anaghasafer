import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

import { StatestoursComponent } from './shared/components/statestours/statestours.component';
import { DestinationtourComponent } from './shared/components/destinationtour/destinationtour.component';
import { ViewDeatailsComponent } from './shared/components/view-deatails/view-deatails.component';
import { combineLatest } from 'rxjs';
import { ContactusComponent } from './shared/components/contactus/contactus.component';
import { AboutusComponent } from './shared/components/aboutus/aboutus.component';



export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    }, {
        path: 'states/:id',
        component: StatestoursComponent
    },
    {
        path: 'des/:id',
        component: DestinationtourComponent
    },{
        path:"view",
        component:ViewDeatailsComponent
    },
    {
       path:"contact",
        component:ContactusComponent
    },
    {path:"about",
        component: AboutusComponent
    },
]

  