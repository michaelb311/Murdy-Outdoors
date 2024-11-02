import './styles.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../../API/userContext';
import { loginUser } from '../../../API/user';
import { useNavigate } from 'react-router-dom';

//figure out user data structure and user function types

const UserLogin = () => {
	const { dispatch } = useContext(UserContext);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		identifier: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		loginUser(formData)
			.then((data) => {
				if (data.jwt) {
					dispatch({ type: 'SET_USER', payload: data.user });
				}
			})
			.catch((error) => {
				console.error('Login failed:', error);
				// handle error appropriately
			});
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
				<div className='user-login-button-container'>
					<button type='submit' className='user-login-button'>
						Login
					</button>
					<button
						type='button'
						onClick={() => navigate('/user/register')}
						className='user-register-button'
					>
						Register
					</button>
				</div>
			</form>
		</section>
	);
};

export default UserLogin;
