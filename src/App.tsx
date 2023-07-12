import React from 'react';
import logo from './logo.svg';
import './App.css';
import CommentBlogSection from './commentChallenge/CommentBlogSection';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>AllComments</h1>
        <CommentBlogSection />
      </header>
    </div>
  );
}

export default App;
