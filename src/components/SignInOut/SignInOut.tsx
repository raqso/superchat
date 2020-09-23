import React from "react";
import firebase from "firebase/app";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const SignInOut = () => {
	const [user] = useAuthState(auth);

	const signInWithGoogle = () => {
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider);
	};

	const signOut = () => {
		auth.signOut();
	};

	if (!user) {
		return <button onClick={signInWithGoogle}>Sign in with Google</button>;
	}

	return <button onClick={signOut}>Sign out</button>;
};
