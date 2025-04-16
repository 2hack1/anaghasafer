import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './shared/components/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent

    },
];
