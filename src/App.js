import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter,
  Routes,
  Route,
  //Link,
} from "react-router-dom";

export default class App extends Component {
  c = 'everybody '
  apikey=process.env.REACT_APP_NEWS_API

  state={
    progress:0
  }
  setProgress= (progress)=>{
    this.setState({progress:progress});
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar />
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={6} country='us' category="general" />} />
            <Route exact path="/Business" element={<News setProgress={this.setProgress} apikey={this.apikey} key="business" pagesize={6} country='us' category="business" />} />
            <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} apikey={this.apikey} key="entertainment" pagesize={6} country='us' category="entertainment" />} />
            <Route exact path="/General" element={<News setProgress={this.setProgress} apikey={this.apikey} key="general" pagesize={6} country='us' category="general" />} />
            <Route exact path="/Health" element={<News setProgress={this.setProgress} apikey={this.apikey} key="health" pagesize={6} country='us' category="health" />} />
            <Route exact path="/Science" element={<News setProgress={this.setProgress} apikey={this.apikey} key="science" pagesize={6} country='us' category="science" />} />
            <Route exact path="/Sports" element={<News setProgress={this.setProgress} apikey={this.apikey} key="sports" pagesize={6} country='us' category="sports" />} />
            <Route exact path="/Technology" element={<News setProgress={this.setProgress} apikey={this.apikey} key="technology" pagesize={6} country='us' category="technology" />} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}

