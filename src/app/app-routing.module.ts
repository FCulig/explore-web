import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewRouteComponent } from './pages/new-route/new-route.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RoutePageComponent } from './pages/route-page/route-page.component';
import { RoutesPageComponent } from './pages/routes-page/routes-page.component';
import { SettingsPageComponent } from './pages/settings-page/settings-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'profile/:username', component: ProfilePageComponent},
  { path: 'routes', component: RoutesPageComponent},
  { path: 'route/add', component: NewRouteComponent, canActivate: [AuthGuard] },
  { path: 'route/:id', component: RoutePageComponent},
  { path: '**', redirectTo:'', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
