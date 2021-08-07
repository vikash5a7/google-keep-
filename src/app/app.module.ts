import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/auth/login/login.component';
import { RegisterComponent } from './component/auth/register/register.component';
import { AngularMaterialModule } from './material/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoComponent } from './component/util/logo/logo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ForgetpasswordComponent } from './component/auth/forgetpassword/forgetpassword.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from './../environments/environment';
import { LayoutComponent } from './component/dashboard/layout/layout.component';

import { NotesComponent } from './component/keep/notes/notes.component';
import { NoteComponent } from './component/keep/note/note.component';
import { IconsComponent } from './component/keep/icons/icons.component';
import { MatSidenav } from '@angular/material/sidenav';
import { PageNotFoundComponent } from './component/util/page-not-found/page-not-found.component';
import { ReminderComponent } from './component/keep/reminder/reminder.component';
import { TrashComponent } from './component/keep/trash/trash.component';
import { ArchiveComponent } from './component/keep/archive/archive.component';
import { TestComponent } from './component/keep/test/test.component';
import { CreateNoteComponent } from './component/keep/create-note/create-note.component';
import { UpdateNoteComponent } from './component/keep/update-note/update-note.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { CollabratorComponentComponent } from './component/keep/collabrator-component/collabrator-component.component';
import { UploadProfileComponent } from './component/keep/upload-profile/upload-profile.component';
import { EditLabelComponent } from './component/keep/edit-label/edit-label.component';
import { LabelComponent } from './component/keep/label/label.component';
import { LabelSearchPipe } from './pipe/label-search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LogoComponent,
    ForgetpasswordComponent,
    LayoutComponent,
    NotesComponent,
    NoteComponent,
    IconsComponent,
    PageNotFoundComponent,
    ReminderComponent,
    TrashComponent,
    ArchiveComponent,
    TestComponent,
    CreateNoteComponent,
    UpdateNoteComponent,
    CollabratorComponentComponent,
    UploadProfileComponent,
    EditLabelComponent,
    LabelComponent,
    LabelSearchPipe,
  ],
  imports: [
    BrowserModule,
    MatNativeDateModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    MatInputModule,
  ],
  providers: [MatSidenav, MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
