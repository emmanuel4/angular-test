# Paloittest
This project was generated with Angular version 13.1.2, for the styles I used the library Angular Material version 13.3.9, and for the backend I use the library Angular Fire version 7.4.1 to comunicate with firebase.

## Description

For this project we can create, archive, edit and delete users. 

For users I generated an model interface with the followin properties:
`id, name, lastname, age, email, description`

To consume the firebase functions I create a service `users.service.ts`, where these functions are imported and used, most of them return a promise, so to avoid the asyncronity I use `async / await`, and the other functions return an observable.

From UI Kit I use the `card, icon, button, input, dialog and snackbar` componets.
