import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';

import { StatestoursComponent } from './shared/components/statestours/statestours.component';
import { DestinationtourComponent } from './shared/components/destinationtour/destinationtour.component';
import { ViewDeatailsComponent } from './shared/components/view-deatails/view-deatails.component';
import { ContactusComponent } from './shared/components/contactus/contactus.component';
import { AboutusComponent } from './shared/components/aboutus/aboutus.component';
import { FilterpackagesComponent } from './shared/components/filterpackages/filterpackages.component';
import { ReviewSliderComponent } from './shared/components/home/review-slider/review-slider.component';
import { HotelListComponent } from './shared/components/hotel-list/hotel-list.component';
import { ParticularHotelRoomDataComponent } from './shared/components/particular-hotel-room-data/particular-hotel-room-data.component';


export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'dss',
        component: FilterpackagesComponent
    },

    {
        path: 'states/:id',
        component: StatestoursComponent
    },
    {
        path: 'des/:id',
        component: DestinationtourComponent
    }, {
        path: 'view/:id',
        component: ViewDeatailsComponent
    },
    {
        path: "contact",
        component: ContactusComponent
    },
    {
        path: "about",
        component: AboutusComponent

    }, {
        path: "home",
        component: HomeComponent
    },
    {
        path: "ReviewSliderComponent",
        component: ReviewSliderComponent
    },{
        path:'Hotel-Rooms',
        component:HotelListComponent
    },
    {
        path:'paricular-hotel-room-data',
         component: ParticularHotelRoomDataComponent

    }
]

