import React, { Component } from 'react'
import Header from './components/Header'
import Location from './components/Location'
import './App.css'
import WeatherData from './components/WeatherData'
import Hours from './components/Hours'
import Daily from './components/Daily'

class App extends Component
{
  constructor(props)
  {
    super(props)
    this.state = {
      city:'',
      region:'',
      country:'',
      cords: ['',''],
      weatherInfo: null,
    }

    this.changeCity.bind(this)
  }

  componentDidUpdate(prevProps, prevState)
  {
    if (prevState.city !== this.state.city)
    {
      setInterval(this.getLocationInfo(), 1000 * 3600)
    }
  }
  
  getLocationInfo()
  {
      const locAPI = 'https://api.weatherapi.com/v1/current.json?key=033eee285fa04f66b9a154233240807&q=' + this.state.city
      fetch(locAPI)
          .then(response => {return response.json()})
          .then(data => {
            this.setState({
              weatherInfo: data
            }, () => {this.changeState()})
          })
          .catch(error => {console.log(error)})
  }

  changeState()
  {
    if (typeof this.state.weatherInfo['location'] != 'undefined')
    {
      this.setState({
        region: this.state.weatherInfo['location']['region'],
        country: this.state.weatherInfo['location']['country'],
        cords: [this.state.weatherInfo['location']['lat'], this.state.weatherInfo['location']['lon']]
      })
    }
  }

  changeCity = (x) => {
    this.setState({
      city: x
    })
  }

  render()
  {
    return (
      <div className='App'>
        <Header changeState={this.changeCity}/>
        <Location cityName={this.state.city} regionName={this.state.region} countryName={this.state.country} changeCity={this.changeCity}/>
        <WeatherData Data={this.state.weatherInfo}/>
        <Hours lat={this.state.cords[0]} lon={this.state.cords[1]}/>
        <Daily lat={this.state.cords[0]} lon={this.state.cords[1]}/>
      </div>
    )
  }
}

export default App;