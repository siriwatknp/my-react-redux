import FireBase from 'firebase';

const config = {
	apiKey: "AIzaSyAN8a_o9IIYnIU3N-lVIQD9LrKC-4iP9Vk",
	authDomain: "assez-9815e.firebaseapp.com",
	databaseURL: "https://assez-9815e.firebaseio.com",
	storageBucket: "assez-9815e.appspot.com",
	messagingSenderId: "13528629705"
};

const FireBaseApp = FireBase.initializeApp(config);

export const db = FireBaseApp.database();
export const auth = FireBaseApp.auth();
export const storage = FireBaseApp.storage();