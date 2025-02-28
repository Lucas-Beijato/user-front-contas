import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './pages/login/login.guard';
import { DashComponent } from './pages/dash/dash.component';
import { authGuard } from './services/Auth/auth.guard';
import { AccountsComponent } from './pages/dash/accounts/accounts.component';
import { EditComponent } from './pages/dash/edit/edit.component';
import { NewAccountComponent } from './pages/dash/new-account/new-account.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    {
        path: 'dash', component: DashComponent, canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'accounts', pathMatch: 'full' },
            { path: 'accounts', component: AccountsComponent },
            { path: 'edit/:id', component: EditComponent },
            { path: 'new-account', component: NewAccountComponent }
        ]
    }
];
