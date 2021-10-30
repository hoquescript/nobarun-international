import type { AppProps } from 'next/app';
import { Provider as SessionProvider } from 'next-auth/client';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';

import Layout from '../layout';
import Alert from '../components/shared/Alert';

import useAuthProvider from '../hooks/useAuthProvider';
import store from '../store/configureStore';

import '../styles/main.scss';
import 'react-nestable/dist/styles/index.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-quill/dist/quill.snow.css';

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
  const { createApolloClient } = useAuthProvider();

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
