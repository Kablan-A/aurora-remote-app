import * as React from "react";
import Input from "./Input";
import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Notification, UserProfile } from "../lib/types";
import { useMutation } from "@apollo/client/react";
import emitter from "../emitter";

const MIN_AGE = 18;

type CreateProfileMutation = {
	createProfile: UserProfile;
};

type CreateProfileVariables = Omit<UserProfile, "id">;

const CREATE_PROFILE: TypedDocumentNode<
	CreateProfileMutation,
	CreateProfileVariables
> = gql`
	mutation CreateProfile($name: String!, $age: Int!) {
		createProfile(name: $name, age: $age) {
			id
			name
			age
		}
	}
`;

export default function Form() {
	const [createProfile, { loading }] = useMutation(CREATE_PROFILE);

	const [formData, setFormData] = React.useState({
		name: "",
		age: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		await createProfile({
			variables: {
				name: formData.name,
				age: parseInt(formData.age, 10),
			},
		})
			.then(({ data, error }) => {
				const notificationMessage = error
					? `Error creating profile: ${error.message}`
					: `Profile created successfully: ${data?.createProfile.name} (${data?.createProfile.age} years old)`;

				const newNotification: Notification = {
					id: crypto.randomUUID(),
					message: notificationMessage,
					date: new Date().toString(),
				};

				emitter.emit("new-notification", newNotification);
			})
			.finally(() => {
				setFormData({ name: "", age: "" });
			});
	};

	const isSubmitDisabled =
		!formData.name || parseInt(formData.age, 10) < MIN_AGE || loading;

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
					value={formData.name}
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
					value={formData.age}
					onChange={handleChange}
				/>
			</div>

			<button
				className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg border
				border-transparent text-sm font-medium focus-visible:ring-3
				disabled:pointer-events-none disabled:opacity-50 outline-none cursor-pointer
				transition-colors'
				disabled={isSubmitDisabled}
			>
				{loading ? "Submitting..." : "Submit"}
			</button>
		</form>
	);
}
