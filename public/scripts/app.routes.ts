import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home-component';
import { UserContainerComponent } from './components/userContainer/userContainer-component';

const appRoutes: Routes = [
    { path: '', name: 'Home', component: HomeComponent },
    { path: '/user/:username', name: 'User', component: UserContainerComponent },
    { path: '**', redirectTo: ['Home'] }
];

export const routing = RouterModule.forRoot(appRoutes);
