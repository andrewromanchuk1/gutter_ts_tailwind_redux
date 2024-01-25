import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistedStore, store } from './store/store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter >
    <ToastContainer />  
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
