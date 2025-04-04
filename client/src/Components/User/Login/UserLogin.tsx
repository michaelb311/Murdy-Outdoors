import './styles.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../../API/userContext';
import { loginUser } from '../../../API/user';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
	const { userDispatch } = useContext(UserContext);
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
					userDispatch({ type: 'SET_USER', payload: data.user });
					navigate('/user');
				} else {
					console.log('Login failed:', data);
					//use some alert to tell user to register
					navigate('/user/register');
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
				<div className='user-login-form-group'>
					<label htmlFor='identifier'>Email</label>
					<input
						type='email'
						id='identifier'
						name='identifier'
						onChange={handleChange}
					/>
				</div>
				<div className='user-login-form-group'>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						id='password'
						name='password'
						onChange={handleChange}
					/>
				</div>
				<div className='user-login-button-container'>
					<button
						type='button'
						onClick={() => navigate('/user/register')}
						className='user-register-button'
					>
						Register
					</button>
					<button type='submit' className='user-login-button'>
						Login
					</button>
				</div>
			</form>
		</section>
	);
};

export default UserLogin;
