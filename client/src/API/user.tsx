import {
	UserLoginResponseType,
	UserRegisterResponseType,
	UserRegisterType,
	UserLoginType,
} from '../Types/userTypes';

const baseURL = import.meta.env.VITE_DATABASE_URL as string;

export const loginUser = async (formData: UserLoginType) => {
	try {
		const response = await fetch(`${baseURL}/auth/local`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		const data = (await response.json()) as UserLoginResponseType;
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error logging in user:', error);
		throw error;
	}
};

export const registerUser = async (formData: UserRegisterType) => {
	try {
		const response = await fetch(`${baseURL}/auth/local/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		});

		const data = (await response.json()) as UserRegisterResponseType;
		return data;
	} catch (error) {
		console.error('Error registering user:', error);
		throw error;
	}
};
