import {
	UserResponseType,
	UserRegisterType,
	UserLoginType,
	GuestType,
	UserType,
} from '../Types/userTypes';

const baseURL = import.meta.env.VITE_DATABASE_URL as string;

export const loginUser = (formData: UserLoginType) => {
	return fetch(`${baseURL}/auth/local`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	})
		.then((response) => {
			if (!response.ok) {
				return response.text().then((errorText) => {
					console.error('Login failed:', errorText);
					throw new Error(`Login failed: ${response.statusText}`);
				});
			}
			return response.json();
		})
		.then((data: UserResponseType) => {
			return fetch(
				`${baseURL}/users/me?populate[bookings][populate][hunt]=*&status=published`,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${data.jwt}`,
					},
				}
			)
				.then((userResponse) => {
					if (!userResponse.ok) {
						return userResponse.text().then((errorText) => {
							console.error('Fetching user data failed:', errorText);
							throw new Error(
								`Fetching user data failed: ${userResponse.statusText}`
							);
						});
					}
					return userResponse.json();
				})
				.then((userData) => {
					const completeData = { ...data, user: userData as UserType };
					storeLocalUser(completeData);
					return completeData;
				});
		})
		.catch((error) => {
			console.error('Error logging in user:', error);
			throw error;
		});
};

export const registerUser = async (formData: UserRegisterType) => {
	try {
		const response = await fetch(`${baseURL}/auth/local/register?populate=*`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
			// credentials: 'include',
		});

		const data = (await response.json()) as UserResponseType;
		storeLocalUser(data);
		return data;
	} catch (error) {
		console.error('Error registering user:', error);
		throw error;
	}
};

export const getUserData = async () => {
	const localUser = getLocalUserData();
	if (localUser.user === null) {
		return false;
	}

	const user = await fetch(
		`${baseURL}/users/me?populate[bookings][populate][hunt]=*&status=published`,
		{
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localUser.user.jwt}`,
			},
		}
	);

	const userData = (await user.json()) as UserType;
	return userData;
};

//auth/verify gets 404 error
//this is for http only cookies - not working - using localstorage for now
// export const verifyUser = async () => {
// 	try {
// 		const response = await fetch(`${baseURL}/auth/verify`, {
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			// credentials: 'include',
// 		});

// 		if (!response.ok) {
// 			const errorText = await response.text();
// 			console.error('API Error:', errorText);
// 			throw new Error(`Failed to verify user: ${response.statusText}`);
// 		}

// 		const data = (await response.json()) as UserResponseType;
// 		console.log(data);
// 		return data;
// 	} catch (error) {
// 		console.error('Error verifying user:', error);
// 		throw error;
// 	}
// };

export const storeLocalGuest = (data: GuestType) => {
	localStorage.setItem('guest', JSON.stringify(data));
};

export const storeLocalUser = (data: UserResponseType) => {
	if (!data.user || !data.jwt) {
		console.error('No user or JWT provided to storeUser');
		return;
	}
	localStorage.setItem(
		'user',
		JSON.stringify({
			user: data.user,
			jwt: data.jwt,
		})
	);
	const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
	localStorage.setItem('userExpiration', expirationTime.toString());
};

export const getLocalUserData = () => {
	const stringifiedUser = localStorage.getItem('user') ?? 'null';
	const userExpiration = localStorage.getItem('userExpiration') ?? '0';

	return {
		user: JSON.parse(stringifiedUser) as UserResponseType,
		userExpiration: userExpiration,
	};
};

export const getLocalGuestData = () => {
	const stringifiedGuest = localStorage.getItem('guest') ?? 'null';
	return {
		guest: JSON.parse(stringifiedGuest) as GuestType,
	};
};

export const updateLocalUser = (newUserData: UserType) => {
	// Retrieve the current user data from localStorage
	const localUser = getLocalUserData();
	if (localUser.user === null) {
		console.error('No existing user data found in localStorage');
		return;
	}

	// Merge the new user data with the existing data
	const updatedUser = {
		...localUser.user.user, // Keep existing user structure
		...newUserData, // Overwrite with new user data
	};

	// Create the updated user data structure
	const updatedUserData = {
		user: updatedUser,
		jwt: localUser.user.jwt,
	};

	console.log('updating local user', updatedUser);
	// Save the updated user data back to localStorage
	localStorage.setItem('user', JSON.stringify(updatedUserData));
};

export const verifyLocalUser = (): UserResponseType | false => {
	const user = getLocalUserData();

	if (user.user === null) {
		return false;
	}

	if (new Date().getTime() > parseInt(user.userExpiration)) {
		logoutLocalUser();
		return false;
	}

	return user.user;
};

//needs to redirect to login page or homepage
export const logoutLocalUser = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('userExpiration');
};
