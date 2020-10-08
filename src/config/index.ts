if (!process.env.REACT_APP_GIPHY_API_KEY) {
	throw Error('No Giphy API key provided!');
}

if (!process.env.REACT_APP_LOG_ROCKET_APP_ID) {
	throw Error('No LogRocket App ID provided!');
}

const config = {
	firebase: {
		apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
		authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
		databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
		projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
		storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
		appId: process.env.REACT_APP_FIREBASE_APP_ID,
		measurementId: process.env.REACT_APP_FIREBASE_MEASURMENT_ID,
	},
	firebaseDbHost: process.env.REACT_APP_FIREBASE_DB_HOST,
	giphyApiKey: process.env.REACT_APP_GIPHY_API_KEY,
	logRocketAppId: process.env.REACT_APP_LOG_ROCKET_APP_ID,
};

export { config };
