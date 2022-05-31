import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { from, map, mergeMap, Observable } from 'rxjs';
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
    this.firebaseAuth.currentUser.then((user) => {
      this.fireStore
        .collection('training')
        .doc(user?.uid)
        .update({
          [this.getFormattedDate()]: JSON.parse(JSON.stringify(videos)),
        });
    });
  }

  public hasCompletedToday(): Observable<boolean> {
    return from(this.firebaseAuth.currentUser).pipe(
      mergeMap((user) => {
        return this.fireStore
          .collection('training')
          .doc(user?.uid)
          .valueChanges()
          .pipe(
            map((data: any) => {
              return data[this.getFormattedDate()] !== undefined;
            })
          );
      })
    );
  }

  private getFormattedDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
