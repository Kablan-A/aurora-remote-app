import * as React from "react";
import Input from "./Input";

const MIN_AGE = 18;

export default function Form() {
	const [formData, setFormData] = React.useState({
		name: "",
		age: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted with data:", formData);
		setFormData({ name: "", age: "" });
	};

	return (
		<form className='p-4 space-y-4' onSubmit={handleSubmit}>
			<div className='space-y-2'>
				<label htmlFor='name' className='block'>
					Name:
				</label>
				<Input
					required
					id='name'
					placeholder='Enter your name'
					name='name'
					onChange={handleChange}
				/>
			</div>

			<div className='space-y-2'>
				<label htmlFor='age' className='block'>
					Age:
				</label>
				<Input
					required
					id='age'
					placeholder='Enter your age'
					type='number'
					name='age'
					min={MIN_AGE}
					onChange={handleChange}
				/>
			</div>

			<button
				className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg border
				border-transparent text-sm font-medium focus-visible:ring-3
				disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer
				transition-colors'
			>
				Submit
			</button>
		</form>
	);
}
