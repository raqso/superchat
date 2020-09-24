import React from "react";
import firebase from "firebase/app";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const buttonClasses =
	"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded";

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
		return (
			<button className={buttonClasses} onClick={signInWithGoogle}>
				Sign in with Google
			</button>
		);
	}

	return (
		<button className={buttonClasses} onClick={signOut}>
			Sign out
		</button>
	);
};