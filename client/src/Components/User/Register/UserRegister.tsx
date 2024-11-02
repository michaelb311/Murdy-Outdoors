import { FaExclamationCircle } from 'react-icons/fa';
import { registerUser } from '../../../API/user';
import { UserContext } from '../../../API/userContext';
import { UserRegisterType } from '../../../Types/userTypes';
import './styles.css';
import { useContext, useState } from 'react';

const UserRegister = () => {
	const { dispatch } = useContext(UserContext);
	const [formData, setFormData] = useState<UserRegisterType>({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [errors, setErrors] = useState<UserRegisterType>({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	//not validating correctly
	const validateForm = () => {
		if (!formData.firstName || !formData.lastName) {
			setErrors({
				...errors,
				firstName: 'First and last name are required',
				lastName: 'First and last name are required',
			});
			return false;
		}

		if (formData.password !== formData.confirmPassword) {
			setErrors({
				...errors,
				confirmPassword: 'Passwords do not match',
			});
			return false;
		}
		if (!formData.username) {
			setErrors({
				...errors,
				username: 'Username is required',
			});
			return false;
		}
		if (!formData.email.includes('@')) {
			setErrors({
				...errors,
				email: 'Please enter a valid email address',
			});
			return false;
		}
		if (formData.password.length < 8) {
			setErrors({
				...errors,
				password: 'Password must be at least 8 characters',
			});
			return false;
		}
		if (
			!/[A-Z]/.test(formData.password) ||
			!/[0-9]/.test(formData.password) ||
			!/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)
		) {
			setErrors({
				...errors,
				password:
					'Password must contain at least one uppercase letter, one number, and one special character',
			});
			return false;
		}
		return true;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const validationResult = validateForm();
		if (validationResult === true) {
			registerUser(formData)
				.then((data) => {
					if (data.jwt) {
						dispatch({ type: 'SET_USER', payload: data.user });
					}
				})
				.catch((error) => {
					// Handle the error appropriately
					console.error('Registration failed:', error);
				});
		} else {
			console.log(errors);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='register-form-group'>
				<label htmlFor='firstName'>First Name</label>
				<input type='text' name='firstName' onChange={handleChange} />
				{errors.firstName && (
					<div className='errorMessage'>
						<FaExclamationCircle className='errorIcon' />
						{errors.firstName}
					</div>
				)}
			</div>
			<div className='register-form-group'>
				<label htmlFor='lastName'>Last Name</label>
				<input type='text' name='lastName' onChange={handleChange} />
				{errors.lastName && (
					<div className='errorMessage'>
						<FaExclamationCircle className='errorIcon' />
						{errors.lastName}
					</div>
				)}
			</div>
			<div className='register-form-group'>
				<label htmlFor='username'>Username</label>
				<input type='text' name='username' onChange={handleChange} />
				{errors.username && (
					<div className='errorMessage'>
						<FaExclamationCircle className='errorIcon' />
						{errors.username}
					</div>
				)}
			</div>
			<div className='register-form-group'>
				<label htmlFor='email'>Email</label>
				<input type='email' name='email' onChange={handleChange} />
				{errors.email && (
					<div className='errorMessage'>
						<FaExclamationCircle className='errorIcon' />
						{errors.email}
					</div>
				)}
			</div>
			<div className='register-form-group'>
				<label htmlFor='password'>Password</label>
				<input type='password' name='password' onChange={handleChange} />
				{errors.password && (
					<div className='errorMessage'>
						<FaExclamationCircle className='errorIcon' />
						{errors.password}
					</div>
				)}
			</div>
			<div className='register-form-group'>
				<label htmlFor='confirmPassword'>Confirm Password</label>
				<input type='password' name='confirmPassword' onChange={handleChange} />
				{errors.confirmPassword && (
					<div className='errorMessage'>
						<FaExclamationCircle className='errorIcon' />
						{errors.confirmPassword}
					</div>
				)}
			</div>
			<button type='submit'>Register</button>
		</form>
	);
};

export default UserRegister;
