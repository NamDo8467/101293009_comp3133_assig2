import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  logUserIn(username, password) {
    return this.apollo.watchQuery({
      query: gql`
        query {
          login(username: "${username}", password: "${password}") {
            username
            password
            email
          }
        }
      `,
    }).valueChanges;
  }

  addUser(username, email, password) {
    return this.apollo.mutate({
      mutation: gql`
       mutation {
          addUser(username: "${username}", email:"${email}", password: "${password}") {
            username, email, password
          }
        }
      `,
    })  ;
  }
}
