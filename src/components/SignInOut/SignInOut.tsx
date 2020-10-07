import React from 'react';

import { signOut } from '../../helpers/auth';

export const SignOut = () => (
	<button
		className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white ml-5 px-2 sm:py-0 sm:px-2 border border-blue-500 hover:border-transparent rounded"
		onClick={signOut}
	>
		Sign out
	</button>
);
