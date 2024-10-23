import './styles.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../../API/userContext';
import { loginUser } from '../../../API/user';

const UserLogin = () => {
	const { state, dispatch } = useContext(UserContext);
	const [formData, setFormData] = useState({
		identifier: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const data = await loginUser(formData);
		if (data.jwt) {
			console.log(data);
		}
	};

	return (
		<section className='user-login-section'>
			<h2 className='user-login-title'>Login</h2>
			<form className='user-login-form' onSubmit={handleSubmit}>
				<label htmlFor='identifier'>Email</label>
				<input
					type='email'
					id='identifier'
					name='identifier'
					onChange={handleChange}
				/>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					name='password'
					onChange={handleChange}
				/>
				<button type='submit'>Login</button>
			</form>
		</section>
	);
};

export default UserLogin;
