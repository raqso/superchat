import firebase from 'firebase/app';
import { auth } from '../../config/firebase';

function signInWithGoogle() {
	const provider = new firebase.auth.GoogleAuthProvider();
	return auth.signInWithPopup(provider);
}

function signInWithGithub() {
	const provider = new firebase.auth.GithubAuthProvider();
	return auth.signInWithPopup(provider);
}

function signInWithFacebook() {
	const provider = new firebase.auth.FacebookAuthProvider();
	return auth.signInWithPopup(provider);
}

function signInWithEmail(email: string, password: string) {
	return auth.signInWithEmailAndPassword(email, password);
}

function signUpWithEmail(email: string, password: string) {
	return auth.createUserWithEmailAndPassword(email, password);
}

function signOut() {
	return auth.signOut();
}

export {
	signOut,
	signInWithGoogle,
	signInWithGithub,
	signInWithFacebook,
	signInWithEmail,
	signUpWithEmail,
};
