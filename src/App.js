import logo from './logo.svg';
import './App.css';
import Body from './components/Body';
import Header from './components/Header';
import { Route,Routes } from 'react-router-dom';
import Footer from './components/Footer';



function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Body />}/>
      </Routes>
     <Footer />
    </div>
  );
}

export default App;
