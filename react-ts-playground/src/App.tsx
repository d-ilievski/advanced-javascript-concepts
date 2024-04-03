import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import Home from './pages/Home';
import { AppContext, useGlobalStore } from './store/context-store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { reduxStore } from './store/redux-store';
import Login from './pages/Login';
import { Navbar } from './components/Navbar';

function App() {

  const store = useGlobalStore();
  const client = new QueryClient();


  return (
    <>
      <Provider store={reduxStore}>
        <QueryClientProvider client={client}>
          <AppContext.Provider value={store}>
            <Router>
              <Navbar></Navbar>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Navigate to='/' replace />} />
              </Routes>
            </Router>
          </AppContext.Provider>
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
