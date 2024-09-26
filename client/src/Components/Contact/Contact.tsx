import './styles.css';

const Contact = () => {
	return (
		<section id='contact' className='contact-container'>
			<h1 className='contact-title'>Contact Us</h1>
			<form
				action='https://formsubmit.co/mbrady8008@gmail.com'
				method='post'
				className='contact-form'
			>
				<div className='form-item'>
					<input
						type='text'
						name='name'
						className='form-input'
						placeholder='John/Jane Doe'
						required
					></input>
					<label htmlFor='name' className='form-label'>
						{' '}
						Name{' '}
					</label>
				</div>
				<div className='form-item'>
					<input
						type='email'
						name='email'
						className='form-input'
						placeholder='youremail@email.com'
						required
					></input>
					<label htmlFor='email' className='form-label'>
						Email
					</label>
				</div>
				<div className='form-item'>
					<textarea
						name='message'
						className='form-input'
						placeholder='Goals'
						required
					></textarea>
					<label htmlFor='message' className='form-label'>
						Message
					</label>
				</div>
				<input
					type='hidden'
					name='_autoresponse'
					value="Thank you for reaching out!  If you're not too busy, why not take time to read the blogs on the website?"
				></input>
				<button type='submit' className='submit-button'>
					Submit
				</button>
			</form>
		</section>
	);
};
export default Contact;
