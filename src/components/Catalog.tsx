import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import type { Component } from "../lib/types";

type GetComponentsQuery = {
	components: Component[];
};

const GET_COMPONENTS: TypedDocumentNode<GetComponentsQuery> = gql`
	query GetComponents {
		components {
			id
			name
		}
	}
`;

export default function Catalog() {
	const { loading, error, data } = useQuery(GET_COMPONENTS);

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error: {error.message}</p>;
	}

	return (
		<div>
			<h1 className='text-lg'>Component Catalog:</h1>
			<ul className='list-disc pl-6'>
				{data?.components.map((component) => (
					<li key={component.id}>{component.name}</li>
				))}
			</ul>
		</div>
	);
}
