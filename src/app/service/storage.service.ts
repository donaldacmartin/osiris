import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore
} from '@angular/fire/compat/firestore';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(
    private fireStore: AngularFirestore,
    private firebaseAuth: AngularFireAuth
  ) {}

  public saveVideos(videos: Video[]): void {
    let today = new Date().toISOString().split("T")[0];

    this.firebaseAuth.currentUser.then((user) => {
      let jsObject = videos.map(video => Object.assign({}, video));

      this
        .fireStore
        .collection('training')
        .doc(user?.uid)
        .update({[today]: jsObject});
    });
  }

}
