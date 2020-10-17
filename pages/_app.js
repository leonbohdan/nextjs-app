import '../styles/globals.scss';
import { StateProvider } from '../components/StateContext';

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  ); 
}

export default MyApp;
