import Catalog from "./components/Catalog";
import NotificationManager from "./components/NotificationManager";

export default function App() {
	return (
		<div className='p-4 space-y-5'>
			<Catalog />

			<NotificationManager />
		</div>
	);
}
