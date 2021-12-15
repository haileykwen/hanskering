import { Provider } from 'react-redux';
import './App.css';
import MainRouter from './router';
import store from './services/redux/store';

function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

export default App;
