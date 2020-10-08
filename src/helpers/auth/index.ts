import firebase from 'firebase/app';
import { auth } from '../../config/firebase';

async function signInWithGoogle() {
	const provider = new firebase.auth.GoogleAuthProvider();
	await auth.signInWithPopup(provider);
	goToHome();
}

async function signInWithGithub() {
	const provider = new firebase.auth.GithubAuthProvider();
	await auth.signInWithPopup(provider);
	goToHome();
}

async function signInWithFacebook() {
	const provider = new firebase.auth.FacebookAuthProvider();
	await auth.signInWithPopup(provider);
	goToHome();
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
