import { useEffect } from 'react';
import '../styles/globals.scss';
import { StateProvider } from '../components/StateContext';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../utils/theme';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <StateProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </StateProvider>
      </ThemeProvider>
    </React.Fragment>
  ); 
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};
