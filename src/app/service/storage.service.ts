import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private fireStore: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {}

  public test(): void {
    this.getDoc().then((doc) => {
      doc.get().forEach((x) => console.log(x.data()));
      doc.update({ videos: [1, 2, 3] });
    });
  }

  private getDoc(): Promise<AngularFirestoreDocument<unknown>> {
    return this.firebaseAuth.currentUser.then((user) => {
      return this.fireStore.collection('training').doc(user?.uid!);
    });
  }
}
