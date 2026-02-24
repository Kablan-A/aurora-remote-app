import * as React from "react";
import Input from "./Input";

export default function Form() {
	const [formData, setFormData] = React.useState({
		name: "",
		age: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	return (
		<form className='p-4 space-y-4'>
			<div className='space-y-2'>
				<label htmlFor='name' className='block'>
					Name:
				</label>
				<Input
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
					id='age'
					placeholder='Enter your age'
					type='number'
					name='age'
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
