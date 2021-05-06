import { Provider } from 'react-redux';
import './App.css';
import { Autocomplete } from './components/Autocomplete';
import { store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Autocomplete />
      </Provider>
    </div>
  );
}

export default App;
