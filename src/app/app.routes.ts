import { Routes } from '@angular/router';
import { Step1 } from './components/step1/step1';
import { Step2 } from './components/step2/step2';
import { Step3 } from './components/step3/step3';
import { Step4EventBind } from './components/step4-event-bind/step4-event-bind';
import { Welcome } from './components/welcome/welcome';
import { Step6SimpleDatatableShow } from './components/step6-simple-datatable-show/step6-simple-datatable-show';
import { Step7ComponentOutput } from './components/step7-component-output/step7-component-output';
import { Step9ReactiveForms } from './components/step9-reactive-forms/step9-reactive-forms';
import { UserLogin } from './components/user-login/user-login';
import { CreateUser } from './components/create-user/create-user';
import { authGuard } from './shared/guards/auth-guard';
import { adminRoleGuard } from './shared/guards/admin-role-guard';

export const routes: Routes = [
  {path:'person-table-example', component: Step1},
  {path:'component-example', component: Step2},
  {path:'for-directive-example', component: Step3},
  {path:'event-bind-example', component: Step4EventBind},
  {path:'simple-datatable-example', component: Step6SimpleDatatableShow},
  {path:'component-output-example', component: Step7ComponentOutput},
  {path:'reactive-form-example', component: Step9ReactiveForms},
  {path:'login-example', component: UserLogin},
  {path:'create-example', component: CreateUser, canActivate:[authGuard, adminRoleGuard]},
  {path:'welcome', component: Welcome},
  {path:'', redirectTo:'welcome', pathMatch:'full'}
];
