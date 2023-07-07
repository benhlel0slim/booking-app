import React from 'react';
import ReactDOM from 'react-dom/client';
import 'react-calendar/dist/Calendar.css';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RecoilRoot } from 'recoil';
import 'react-calendar-timeline/lib/Timeline.css';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();
const theme = createTheme({
	palette: {
		primary: {
			main: '#EC691A',
		},
	},
});

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<ThemeProvider theme={theme}>
				<RecoilRoot>
					<App />
				</RecoilRoot>
			</ThemeProvider>
		</QueryClientProvider>
	</React.StrictMode>
);
