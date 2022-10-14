import React, { useState } from 'react';
import { NETWORK_NAME } from '../api/Api';

export const FaqForm: React.FC = () => {
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		question: '',
	});
		const handleInputChange = (e) => {
		const target = e.target;

		// Name attribute of the target input element must match formValues key
		// to update the state
		const formValuesKey = target.name;

		setFormValues((prev) => {
		const newFormValues = Object.assign({}, prev);

		newFormValues[`${formValuesKey}`] = target.value;

		return newFormValues;
		});
	};
	const handleFormSubmit = async (e) => {
    	e.preventDefault();
		console.log(formValues);
		try {
			if (formValues.name && formValues.email && formValues.question) {
				const formData = new FormData();
				formData.append('name', formValues.name);
				formData.append('email', formValues.email);
				formData.append('content', formValues.question);
		
				let res = await fetch(`https://api.imma.club/api/ethereum/${NETWORK_NAME}/supportQuestion`, {
					method: "POST",
					body: formData,
				});

				console.log('res');
				console.log(res);
		
				if (res.status === 200) {
					alert('Your Message has been sent, and will be respond by our representative shortly');
					setFormValues({
						name: '',
						email: '',
						question: '',
					});
				} else {
					alert("Some error occured");
				}
			}
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<div className="faq-form__wrapper">
			<div className="faq-form__note">
				<p>Didn't find an answer to&nbsp;your question?</p>
				<p>
					Write to us and <span>we will answer</span> immediately!
				</p>
			</div>
			<form className="faq-form" action="">
				<label className="faq-form__label">
					Name
					<input
						className="faq-form__input"
						id="name"
						type="text"
						name="name"
            			onChange={(evt) => handleInputChange(evt)}
            			value={formValues.name}
						required
					/>
				</label>
				<label className="faq-form__label">
					E-mail*
					<input
						className="faq-form__input"
						id="email"
						type="email"
						name="email"
						onChange={(evt) => handleInputChange(evt)}
            			value={formValues.email}
						required
					/>
				</label>
				<label className="faq-form__label">
					Your Question
					<input
						className="faq-form__input"
						id="question"
						type="text"
						name="question"
            			onChange={(evt) => handleInputChange(evt)}
            			value={formValues.question}
						required
					/>
				</label>
				<div className="faq-form__submit-wrapper">
					<button
						onClick={(evt) => handleFormSubmit(evt)}
						className="btn-arrow faq-form__submit"
						type="submit"
					>
						Send
					</button>
				</div>
			</form>
		</div>
	);
};
