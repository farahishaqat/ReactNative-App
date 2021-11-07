import Layout from './src/layout';
import { Provider } from 'react-redux';
import React from 'react';
import store from './src/redux/reducers/store';

const App = () => {
  return (
    <Provider store={store}>
    <Layout />
    </Provider>

  );
}

export default App;