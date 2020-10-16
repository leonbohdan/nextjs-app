import '../styles/globals.scss';
import { StateProvider } from '../components/StateContext';
// import App from 'next/app';
// import { Provider } from "react-redux";
// import withRedux from "next-redux-wrapper";
// import makeStore from '../store';

// class MyApp extends App {
//   static async getInitialProps({Component, ctx}) {
//     //Preload from the server side
//     ctx.store.dispatch({ 
//       type: 'reducerDate/setCounter', 
//       payload: 10
//     });

//     return {
//       pageProps: {
//         ...(Component.getInitialProps ? await 
//           Component.getInitialProps(ctx) : {})
//       }
//     }
//   }

//   render() {
//     const { Component, pageProps, store } = this.props;

//     return (
//       <Provider store={store}>
//         <div>
//           <Component {...pageProps} />
//         </div>
//       </Provider>
//     );
//   }
// }

// export default withRedux(makeStore)(MyApp);

// -----------------------------
function MyApp({ Component, pageProps }) {
  return (
    <StateProvider>
      <Component {...pageProps} />
    </StateProvider>
  ); 
}

export default MyApp;
