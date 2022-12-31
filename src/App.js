
import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter , Route,Routes } from 'react-router-dom';


export class App extends Component {
  render() {
    return (
      <>
      <BrowserRouter>
        <Navbar />

        
        <Routes>
          <Route  exact path='/'  element={ <News key="general" pageSize={9} country='in' />}/>
          <Route  exact path='/buisness' element={ <News key="buisness" pageSize={9} country='in' category='buisness' />} />
          <Route  exact path='/entertainment' element={ <News key="entertainment" pageSize={9} country='in' category='entertainment' />} />
          <Route  exact path='/general' element={ <News  key="general" pageSize={9} country='in' category='general' />} />
          <Route  exact path='/health' element={ <News key="health" pageSize={9} country='in' category='health' />} />
          <Route  exact path='/science' element={ <News key="science" pageSize={9} country='in' category='science' />} />
          <Route  exact path='/sports' element={ <News key="sport" pageSize={9} country='in' category='sport' />} />
          <Route  exact path='/technology' element={ <News  key="technology"  pageSize={9} country='in' category='technology' />} />
        </Routes>
       
      </BrowserRouter>  
      </>
    )
  }
}

export default App

