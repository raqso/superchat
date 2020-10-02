import firebase from 'firebase/app';
import { auth } from '../../config/firebase';

function signInWithGoogle() {
	const provider = new firebase.auth.GoogleAuthProvider();
	auth.signInWithPopup(provider);
}

function signInWithGithub() {
	const provider = new firebase.auth.GithubAuthProvider();
	auth.signInWithPopup(provider);
}

function signInWithFacebook() {
	const provider = new firebase.auth.FacebookAuthProvider();
	auth.signInWithPopup(provider);
}

function signOut() {
	auth.signOut();
}

export { signOut, signInWithGoogle, signInWithGithub, signInWithFacebook };
