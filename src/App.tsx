import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<AppRoutes />
				<ToastContainer />
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
