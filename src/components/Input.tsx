import clsx from "clsx";

export default function Input({
	className,
	type,
	...props
}: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			className={clsx(
				`h-8 rounded-lg border bg-transparent px-2.5 py-1 text-base transition-colors
				focus-visible:ring-3 md:text-sm placeholder:text-muted-foreground w-full min-w-0 
				outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50`,
				className,
			)}
			{...props}
		/>
	);
}
