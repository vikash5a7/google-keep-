import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { take, switchMap, tap, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { FileUpload } from '../Model/file-upload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;
  userId: any;
  currentUser = new BehaviorSubject(null);
  private basePath = '/user-profile';
  currentFileUploadedUrl?: any;
  currentURL = new BehaviorSubject(null);
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private storage: AngularFireStorage,
    private storageRef: AngularFirestore
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        this.userId = user.uid;
        localStorage.setItem('UID', user.uid);
      } else {
        localStorage.clear();
      }
    });
  }

  signUp(credentials: any) {
    let date: Date = new Date();
    return from(
      this.afAuth
        .createUserWithEmailAndPassword(credentials.email, credentials.password)
        .then((data: any) => {
          return this.db.doc(`users/${data.user.uid}`).set({
            user_id: data.user.uid,
            first_name: credentials.first_name,
            last_name: credentials.last_name,
            email: data.user.email,
            role: 'USER',
            profile:
              'https://firebasestorage.googleapis.com/v0/b/keep-f8158.appspot.com/o/avatardefault_92824.png?alt=media',
            created: date,
          });
        })
    );
  }

  signIn(credentials: any): Observable<any> {
    return from(
      this.afAuth.signInWithEmailAndPassword(
        credentials.email,
        credentials.password
      )
    ).pipe(
      switchMap((user: any) => {
        if (user) {
          return this.db
            .doc(`users/${user.user.uid}`)
            .valueChanges()
            .pipe(take(1));
        } else {
          return of(null);
        }
      })
    );
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigateByUrl('/login');
      localStorage.clear();
    });
  }

  resetPw(email: any) {
    return this.afAuth.sendPasswordResetEmail(email);
  }

  setUserInfo(user: any) {
    localStorage.setItem('image', user.profile);
    localStorage.setItem('userEmail', user.email);
    localStorage.setItem('LoggedIn', 'y');
  }

  getsingleUserId() {
    let id = localStorage.getItem('UID');
    console.log('id', id);
    return this.db.doc(`users/${id}`).valueChanges({ idField: 'id' });
  }

  uploadPic(fileUpload: FileUpload): Observable<number | undefined> {
    const random = new Date();
    const filePath = `${this.basePath}/fileUpload.id/${
      random + fileUpload.file.name
    }`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            this.currentFileUploadedUrl = downloadURL;
            console.log(this.currentFileUploadedUrl);
            this.currentURL.next(this.currentFileUploadedUrl);
          });
        })
      )
      .pipe(
        tap(() => {
          this.currentURL.next(this.currentFileUploadedUrl);
        })
      )
      .subscribe();
    return uploadTask.percentageChanges();
  }
  public updateProfile(noteId: any, url: any) {
    this.storageRef.doc(`users/${noteId}`).update({ profile: url });
  }
}
