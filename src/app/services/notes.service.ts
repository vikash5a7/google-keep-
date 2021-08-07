import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { finalize, take, takeUntil, tap } from 'rxjs/operators';
import { FileUpload } from '../Model/file-upload.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private basePath = '/uploads';
  searchNotes = new BehaviorSubject<any>(null);
  isList = new BehaviorSubject(false);
  clicked = new BehaviorSubject(false);
  currentFileUploadedUrl?: any;
  currentURL = new BehaviorSubject(null);
  private ngUnsubscribe: Subject<any> = new Subject();
  userData: any;
  constructor(
    private storage: AngularFireStorage,
    private storageRef: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.userData = user?.uid;
      console.log(this.userData);
      if (!user) {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
      }
    });
  }

  createOrUpdateNote(id: any, note: any): Promise<any> {
    if (id) {
      return this.storageRef.doc(`notes/${id}`).update(note);
    } else {
      const date = new Date();
      note['creator'] = this.auth.userId;
      note['created_at'] = date;
      return this.storageRef.collection('notes').add(note);
    }
  }
  getAllArchivedNotes() {
    let id = localStorage.getItem('UID');
    console.log('id', id);
    return this.storageRef
      .collection('notes', (ref) =>
        ref
          .where('creator', '==', id)
          .where('isTrash', '==', false)
          .where('archive', '==', true)
          .orderBy('index', 'asc')
      )
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.ngUnsubscribe));
  }
  getUserUnpinedNotes() {
    let id = localStorage.getItem('UID');
    console.log('id', id);
    return this.storageRef
      .collection('notes', (ref) =>
        ref
          .where('creator', '==', id)
          .where('archive', '==', false)
          .where('isTrash', '==', false)
          .where('isPin', '==', false)
      )
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.ngUnsubscribe));
  }
  getUserPinedNotes() {
    let id = localStorage.getItem('UID');
    console.log('id', id);
    return this.storageRef
      .collection('notes', (ref) =>
        ref
          .where('creator', '==', id)
          .where('archive', '==', false)
          .where('isPin', '==', true)
          .where('isTrash', '==', false)
      )
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.ngUnsubscribe));
  }
  getUserNotes() {
    let id = localStorage.getItem('UID');
    console.log('id', id);
    return this.storageRef
      .collection('notes', (ref) =>
        ref
          .where('creator', '==', id)
          .where('archive', '==', false)
          .where('isTrash', '==', false)
      )
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  getAllTrashedNotes() {
    let id = localStorage.getItem('UID');
    console.log('id', id);
    return this.storageRef
      .collection('notes', (ref) =>
        ref.where('creator', '==', id).where('isTrash', '==', true)
      )
      .valueChanges({ idField: 'id' })
      .pipe(takeUntil(this.ngUnsubscribe));
  }

  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const random = new Date();
    const filePath = `${this.basePath}/${random + fileUpload.file.name}`;
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

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  getNoteFiltered(filter: any) {
    let id = localStorage.getItem('UID');
    const end = '\uf8ff';
    return this.storageRef
      .collection('notes', (ref) =>
        ref
          .where('creator', '==', id)
          .where('archive', '==', false)
          .where('isTrash', '==', false)
          .orderBy('title')
          .startAt(filter)
          .endAt(filter + '~')
      )
      .valueChanges({ idField: 'id' });
  }
  public getNotelById(id: any): Observable<any> {
    return this.storageRef.doc(`notes/${id}`).valueChanges().pipe(take(1));
  }

  public updatePin(noteId: any, value: boolean) {
    this.storageRef.doc(`notes/${noteId}`).update({ isPin: value });
  }
  public updateColor(noteId: any, value: string) {
    this.storageRef.doc(`notes/${noteId}`).update({ color: value });
  }
  public updateArchive(noteId: any, value: any) {
    this.storageRef.doc(`notes/${noteId}`).update({ archive: value });
  }
  public deleteNotes(noteId: any, value: any) {
    this.storageRef.doc(`notes/${noteId}`).update({ isTrash: value });
  }
  public removeReminder(noteId: any) {
    return from(
      this.storageRef.doc(`notes/${noteId}`).update({ reminder: null })
    );
  }

  public removeImage(noteId: any) {
    return from(this.storageRef.doc(`notes/${noteId}`).update({ image: null }));
  }
  public deleteNotesPermanently(noteId: any): Observable<any> {
    return from(this.storageRef.doc(`notes/${noteId}`).delete());
  }
  public addReminder(noteId: any, value: string) {
    this.storageRef.doc(`notes/${noteId}`).update({ reminder: value });
  }
}
