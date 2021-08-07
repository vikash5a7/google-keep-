import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Observable, from } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LabelService {
  constructor(
    private storageRef: AngularFirestore,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {}
  createOrUpdateLabel(id = null, label: any): Promise<any> {
    if (id) {
      return this.storageRef.doc(`label/${id}`).update({ name: label });
    } else {
      const date = new Date();
      label['creator'] = this.auth.userId;
      label['created_at'] = date;
      label['update_at'] = '';
      return this.storageRef.collection('label').add(label);
    }
  }
  async addNotesToLabel(labelId = null, NoteBookeId: any): Promise<any> {
    await this.storageRef.doc(`label/${labelId}`).update({
      notes: firebase.firestore.FieldValue.arrayUnion(NoteBookeId),
    });
    this.storageRef.doc(`notes/${NoteBookeId}`).update({
      label: firebase.firestore.FieldValue.arrayUnion(labelId),
    });
  }

  async removeLabel(labelId = null, NoteBookeId: any): Promise<any> {
    await this.storageRef.doc(`label/${labelId}`).update({
      notes: firebase.firestore.FieldValue.arrayRemove(NoteBookeId),
    });
    this.storageRef.doc(`notes/${NoteBookeId}`).update({
      label: firebase.firestore.FieldValue.arrayRemove(labelId),
    });
  }
  getAllLabel() {
    let id = localStorage.getItem('UID');
    console.log('id', id);
    return this.storageRef
      .collection('label', (ref) => ref.where('creator', '==', id))
      .valueChanges({ idField: 'id' });
  }
  public deleteLable(labelId: any): Observable<any> {
    return from(this.storageRef.doc(`label/${labelId}`).delete());
  }
  public getLabelById(id: any): Observable<any> {
    return this.storageRef
      .doc(`label/${id}`)
      .valueChanges({ idField: 'id' })
      .pipe(take(1));
  }
}
