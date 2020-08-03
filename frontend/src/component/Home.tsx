import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  static displayName = Home.name;

  // test if backend proxy works
  componentDidMount(){
    console.log('abc');
    axios.get('/api/weatherforecast').then( r => {console.log(r)});
  }
  render() {
    return (
      <div>
        <h1>Hello, HoyaConnection.</h1>
      </div>
    )
  }
}
