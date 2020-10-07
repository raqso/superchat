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

async function signInWithEmail(email: string, password: string) {
	try {
		await auth.signInWithEmailAndPassword(email, password);
		goToHome();
	} catch (error) {
		console.error(error);
	}
}

async function signUpWithEmail(email: string, password: string) {
	try {
		await auth.createUserWithEmailAndPassword(email, password);
		goToHome();
	} catch (error) {
		console.error(error);
	}
}

function goToHome() {
	window.location.href = '/';
}

function signOut() {
	auth.signOut();
}

export {
	signOut,
	signInWithGoogle,
	signInWithGithub,
	signInWithFacebook,
	signInWithEmail,
	signUpWithEmail,
};
