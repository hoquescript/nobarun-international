import { ApolloProvider } from '@apollo/client';
import { Provider as SessionProvider } from 'next-auth/client';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { Provider as AlertProvider, positions, transitions } from 'react-alert';
import { Provider } from 'react-redux';

import Alert from '../components/shared/Alert';
import Layout from '../layout';

import useApolloClient from '../hooks/useApolloClient';
import store from '../store/configureStore';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-nestable/dist/styles/index.css';
import 'react-quill/dist/quill.snow.css';
import '../styles/main.scss';

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '10px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const createApolloClient = useApolloClient();

  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ApolloProvider client={createApolloClient()}>
          <AlertProvider template={Alert} {...options}>
            {router.pathname.startsWith('/auth') ? (
              <Component {...pageProps} />
            ) : (
              <Layout>
                <Component {...pageProps} />
              </Layout>
            )}
          </AlertProvider>
        </ApolloProvider>
      </Provider>
    </SessionProvider>
  );
}
export default MyApp;
