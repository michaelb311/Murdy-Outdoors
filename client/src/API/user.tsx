import { UserLoginType, UserType } from '../Types/userTypes';

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

		const data = (await response.json()) as UserType;
		console.log(data);
		return data;
	} catch (error) {
		console.error('Error logging in user:', error);
		throw error;
	}
};
