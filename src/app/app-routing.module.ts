import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetpasswordComponent } from './component/auth/forgetpassword/forgetpassword.component';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { LayoutComponent } from './component/dashboard/layout/layout.component';
import { NotesComponent } from './component/keep/notes/notes.component';
import { ReminderComponent } from './component/keep/reminder/reminder.component';
import { TrashComponent } from './component/keep/trash/trash.component';
import { PageNotFoundComponent } from './component/util/page-not-found/page-not-found.component';
import { TestComponent } from './component/keep/test/test.component';
import { ArchiveComponent } from './component/keep/archive/archive.component';
import { LabelComponent } from './component/keep/label/label.component';
import { AuthGurdGuard } from './guard/auth-gurd.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'test',
    component: TestComponent,
  },
  {
    path: 'forget-password',
    component: ForgetpasswordComponent,
  },
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGurdGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard/notes',
        pathMatch: 'full',
      },
      {
        path: 'notes',
        canActivate: [AuthGurdGuard],
        component: NotesComponent,
      },
      {
        path: 'remider',
        canActivate: [AuthGurdGuard],
        component: ReminderComponent,
      },
      {
        path: 'trash',
        canActivate: [AuthGurdGuard],
        component: TrashComponent,
      },

      {
        path: 'archive',
        canActivate: [AuthGurdGuard],
        component: ArchiveComponent,
      },
      {
        path: 'label/:id',
        canActivate: [AuthGurdGuard],
        component: LabelComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
