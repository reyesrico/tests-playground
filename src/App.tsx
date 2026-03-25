import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';
import Test2 from './components/Test2';
import Test3 from './components/Test3';
import Test4 from './components/Test4';
import Practice from './components/Practice';
import MyPromise from './components/MyPromise';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="App-home-link">
            <h1>Tests Playground</h1>
          </Link>
        </header>
        <main className="App-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/test4" element={<Test4 />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/mypromise" element={<MyPromise />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
