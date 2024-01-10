import React, {useState, useEffect} from 'react';
// import logo from './logo.svg';
import './App.css';
// import Login from './Login';
import RingLoader from 'react-spinners/RingLoader';
import SignInOutContainer from './Login';

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 8000)
  }, [])
  return (
    <div className="App">
      {
        loading ? (

        <RingLoader
        size={70}
        color={'#bc5912'}
        loading={loading}
        />
        

  ): ( 

        <header className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <SignInOutContainer/>
          {/* <Login/> */}
          {/* <a href='./login'><button>Login</button></a> */}
        </header>
  )
      }
      
    </div>
  );
}

export default App;
