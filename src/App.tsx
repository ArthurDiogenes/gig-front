import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './App.css';
import AppRoutes from './routes/AppRoutes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,	
			staleTime: 1000 * 60 * 5, // 5 minutes
			gcTime: 1000 * 60 * 10, // 5 minutes
		}
	}
});

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
