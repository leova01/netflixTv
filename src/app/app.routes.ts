import { Routes } from '@angular/router';
import { BrowseComponent } from './pages/browse/browse.component';
import { DetailsComponent } from './pages/details/details.component';


export const routes: Routes = [

    { path: '', component: BrowseComponent },
    { path: 'Home', component: BrowseComponent },
    { path: 'details/:id', component: DetailsComponent}
];
