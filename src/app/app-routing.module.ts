import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { HomeComponent } from './demo/components/contasoft/home/home.component';
import { ConfigurationComponent } from './demo/components/configuration/configuration.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'contasoft', component: AppLayoutComponent,
                children: [
                    { path: 'dashboard', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'mod', loadChildren: () => import('./demo/components/contasoft/contasoft.module').then(m => m.ContasoftModule) },
                ]
            },
            { path: '',component: HomeComponent },

            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            // { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: 'configuration', component:ConfigurationComponent},
            { path: 'register', loadChildren: () => import('./demo/components/auth/register/register.module').then(m => m.RegisterModule) },

            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
