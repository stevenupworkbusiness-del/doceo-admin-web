import { Amplify } from 'aws-amplify';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import '@stream-io/stream-chat-css/dist/css/index.css';
import '@/assets/css/globals.css';

import store from '@/lib/store';

import PrivateRoute from '@/components/private-route';
import Spinner from '@/components/ui/Spinner';
import Layout from '@/components/layout/default';

/* Amplify Init */
import awsConfig from '@/aws-exports.js';
import { GetstreamProvider } from '@/lib/getstream/context';
import { useEffect } from 'react';
import { CREATE_TOKEN, GET_CATEGORIES, GET_TAGS } from '@/lib/constants/actions';
import { useAuth } from '@/lib/hooks/useAuth';
Amplify.configure({
	...awsConfig,
	ssr: true
});

function App({ Component, pageProps }: AppProps) {
	const authProps = (Component as any).authenticate;
	const currentUser = useAuth();

	useEffect(() => {
		store.dispatch({ type: GET_TAGS });
		store.dispatch({ type: GET_CATEGORIES });
	}, [])

	useEffect(() => {
		if(currentUser) {
			store.dispatch({
				type: CREATE_TOKEN,
				payload: {
					id: currentUser.attributes.sub
				}
			})
		}
	}, [currentUser])

	return (
		<Provider store={store}>
			<PersistGate loading={<Spinner size={20} />} persistor={store._persistor}>
				<GetstreamProvider>
					{authProps ?
						<PrivateRoute>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</PrivateRoute>
						: <Component {...pageProps} />
					}
				</GetstreamProvider>
			</PersistGate>
		</Provider>
	)
}

export default App;