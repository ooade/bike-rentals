import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { APIErrorResponse } from '../interfaces';
import Routes from '../modules/Routes';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: (failureCount, error) => {
				const { status_code } = error as APIErrorResponse;

				if (status_code === 401 || failureCount > 2) {
					return false;
				}
				return true;
			},
		},
	},
});

const theme = extendTheme({
	styles: {
		global: {
			a: {
				color: 'blue.600',
				cursor: 'pointer',
				textDecoration: 'underline',
			},
		},
	},
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ChakraProvider theme={theme}>
					<Routes />
				</ChakraProvider>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
