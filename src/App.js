// src/App.js
import React from 'react';
import './App.css';
import FormRecognizerComponent from './FormRecognizer.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Azure Form Recognizer</h1>
        <FormRecognizerComponent />
      </header>
    </div>
  );
}

export default App;
