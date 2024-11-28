import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import ProductPage from './pages/ProductPage';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <ProductPage />
    </Provider>
  );
}

export default App;

// Limitations:
// 1. No persistent state between page refreshes
// 2. Search is debounced with a 500ms delay
// 3. Load more button might not work perfectly with search/category combination
// 4. No error handling for network failures beyond console logging
// 5. No detailed product view implemented