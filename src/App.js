import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import Newsarea from './components/Newsarea';
import About from './components/About';
import { Route, Routes } from 'react-router-dom';

export default class App extends Component {

  render() {
    return (
      <div>
        <Navbar/>
        <Routes>
          <Route exact path='/'  element={<Newsarea category={"general"} key="general"/>}/>
          <Route exact path='/science' element={<Newsarea category={"science"}  key="science"/>}/>
          <Route exact path='/sports'  element={<Newsarea category={"sports"} key="sports"/>}/>
          <Route exact path='/technology'  element={<Newsarea category={"technology"} key="technology"/>}/>
          <Route exact path='/health' element={<Newsarea category={"health"}  key="health"/>}/>
          <Route exact path='/business'  element={<Newsarea category={"business"} key="business"/>}/>
          <Route exact path='/entertainment'  element={<Newsarea category={"entertainment"} key="entertainment"/>}/>
          <Route exact path='/About' element={<About/>}/>
        </Routes>
      </div>
    )
  }
}

