import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAkrw_I-wjdzRjMWYJOBLPgN7rKeh9LdvI",
    authDomain: "expensify-20319.firebaseapp.com",
    databaseURL: "https://expensify-20319.firebaseio.com",
    projectId: "expensify-20319",
    storageBucket: "expensify-20319.appspot.com",
    messagingSenderId: "526611733821"
  };
  
  firebase.initializeApp(config);
  const database = firebase.database();

export { firebase, database as default }

//   database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

//   database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

//   database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
//   });

// database.ref('expenses').on('value', (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });
//     console.log(expenses);
// });

//   expenses.map((expense) => {
//     let {amount, createdAt, description, note} = expense;
//     database.ref('expenses').push({
//         amount,
//         createdAt,
//         description,
//         note
//     });
//   });


//   const onValueChange = database.ref().on('value', (snapshot) => {
//     const obj = snapshot.val();
//     console.log(`${obj.name} lives in ${obj.location.city}, ${obj.location.country}.`);
//   }, (e) => {
//       console.log('error', e);
//   });

//    database.ref().once('value')
//     .then((snapshot) => {
//         const val = snapshot.val();
//         console.log(val);
//     })
//     .catch((e) => {
//         console.log('error', e)
//     });

   // console.log('before');
//   database.ref().set(
//       {
//           name: 'Dan Martin',
//           age: 54,
//           isSingle: false,
//           location: {
//               city: 'Phoenix',
//               country: 'United States'
//           }
//       }
//   ).then((data) => {
//     console.log('success', data);
//   }).catch((error) => {
//     console.log('error ', error);
//   });

// console.log('after');

// database.ref().update({
//     name: 'Daniel Leo Martin',
//     age: 29,
//     isSinge: null,
//     isSingle: true
// });

// database.ref().remove().then((data) => {
//     console.log('success', data);
// }).catch((error) => {
//     console.log('error ', error);
// });
