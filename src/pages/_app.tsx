import { KytesoftProvider } from '@/kytesoft-client/providers';
import { wrapper } from '@/store/configureStore';
import { CacheProvider } from '@emotion/react';
import '@scss/main.scss';
import { createEmotionCache } from '@utils/createEmotionCache';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, ...pageProps }: any) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <KytesoftProvider hydrateState={pageProps.dehydratedState}>
          <ToastContainer />
          <Component {...props.pageProps} key={router.asPath} />
        </KytesoftProvider>
      </Provider>
    </CacheProvider>
  );
}

export default App;
