import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _firestore: Firestore) { }

  userRef = collection(this._firestore, 'users');

  getUsers():Observable<User[]> {
    const usersObservable:any = collectionData(query(this.userRef), {idField: 'id'});
    return usersObservable;
  }

  async getUser(id:string) {
    return await getDoc(doc(this._firestore, 'users', id));
  }

  async addUser(user:User) {
    return await setDoc(doc(this.userRef, user.id), {
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      description: user.description
    })
  }

  async updateUser(user: User) {
    return await updateDoc(doc(this._firestore, 'users', user.id!), {
      name: user.name,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      description: user.description
    })
  }

  async deleteUser(id: string) {
    return await deleteDoc(doc(this._firestore, "users", id))
  }
}
