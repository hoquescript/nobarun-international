import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';

import client from '../apollo-client';
import store from '../store/configureStore';
import '../styles/main.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
