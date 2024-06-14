import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Redux/Store/store';
import DiscordLoginButton from './Component/DiscordLoginButton';
import './assets/scss/BootstrapCustom.scss';
import './index.css';
//import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Container>
        <App />
      </Container>
    </PersistGate>
  </Provider>
);

reportWebVitals();
