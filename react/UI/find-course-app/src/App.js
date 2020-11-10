import React from 'react';
import './App.css';
import NavBar from './Components/NavBar';
import CourseList from './Components/CourseList';

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <CourseList></CourseList>
    </div>
  );
}

export default App;
