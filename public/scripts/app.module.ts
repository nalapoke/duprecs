import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './components/appContainer/appContainer-component';
import { NavbarComponent } from './components/navbar/navbar-component';
import { routing } from './app.routes';
import { ReleaseListComponent } from './components/userContainer/releaseList/releaseList-component';
import { GridViewComponent } from './components/userContainer/releaseList/gridView/gridView-component';
import { ListViewComponent } from './components/userContainer/releaseList/listView/listView-component';
import { UserService } from './services/user-service';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        ReleaseListComponent,
        GridViewComponent,
        ListViewComponent
    ],
    imports: [
        BrowserModule,
        routing
    ],
    providers: [
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {

}
