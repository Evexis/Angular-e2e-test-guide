import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { ManageUserComponent } from 'app/shared/manage-user/manage-user.component/manage-user.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: ManageUserComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule {}
