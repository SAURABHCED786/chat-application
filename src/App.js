import { AppProvider } from '@shopify/polaris';
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';
import Login from './components/Login';
function App() {
  return (
  
      <AppProvider>
      <Provider store={store}>
        <div className="App">
          <Login />
        </div>
        </Provider>
      </AppProvider>
  );
}

export default App;
