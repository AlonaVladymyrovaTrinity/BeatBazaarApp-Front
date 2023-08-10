import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { createServer } from 'miragejs';
import UserProfile from './components/UserProfile';
import { createTheme, ThemeProvider } from '@mui/material/styles';

createServer({
  routes() {
    this.get('http://localhost:8000/api/v1', { data: 'This is a music app' }),
      this.passthrough('http://localhost:8000/*'); // everything else will try to actually call the backend
  },
});

const URL = 'http://localhost:8000/api/v1/';

function App() {
  const defaultTheme = createTheme();
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      const myData = await getAllData(URL);
      setMessage(myData.data);
    })();

    return () => {
      console.log('unmounting');
    };
  }, []);

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <h1>{message}</h1>
        <UserProfile />
      </ThemeProvider>
    </>
  );
}

export default App;
