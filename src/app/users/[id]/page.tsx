import React from 'react'

export default function Page(props: unknown) {
	const id = (props as { params?: { id?: string } })?.params?.id
	return (
		<div className="p-4">
			<h1 className="text-lg font-semibold">User: {id}</h1>
			<p className="text-sm text-muted-foreground">User detail page (placeholder)</p>
		</div>
	)
}
