import * as React from "react";
import type { Notification } from "../lib/types";
import emitter from "../emitter";

export default function NotificationManager() {
	const [notificationsList, setNotificationsList] = React.useState<
		Notification[]
	>([]);

	React.useEffect(() => {
		const ws = new WebSocket(import.meta.env.VITE_NOTIFICATION_WS_URL);

		ws.onopen = () => {
			console.log("WebSocket connection established.");
		};

		ws.onmessage = (event) => {
			const notification = JSON.parse(event.data) as Notification;

			setNotificationsList((prev) => [...prev, notification]);

			emitter.emit("new-notification", notification);
		};

		ws.onerror = (ev) => {
			console.error("WebSocket error:", ev);

			const errorNotification: Notification = {
				id: crypto.randomUUID(),
				message: "WebSocket connection error",
				date: new Date().toString(),
			};

			emitter.emit("new-notification", errorNotification);
		};

		return () => {
			ws.close();
		};
	}, []);

	return (
		<div>
			<h2>Notifications ({notificationsList.length}):</h2>
			<ul className='list-disc pl-6 overflow-y-auto max-h-56'>
				{notificationsList.map(({ id, message, date }) => (
					<li
						key={id}
						className='animate-[pulse_1s_cubic-bezier(0.4,0,0.6,1)_250ms]'
					>
						{message}: {date}
					</li>
				))}
			</ul>
		</div>
	);
}
