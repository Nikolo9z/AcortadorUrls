import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { RedirectComponent } from './redirect/redirect.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent:() => import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: ':code',
        loadComponent:() => import('./redirect/redirect.component').then(m => m.RedirectComponent)
    },

];
