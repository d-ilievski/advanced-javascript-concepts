import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home';
import { useGlobalStore } from './store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {

  const { AppContext, ...rest } = useGlobalStore();
  const client = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <AppContext.Provider value={{ ...rest }} >
          <Router>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Routes>
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </div >
  );
}

export default App;
