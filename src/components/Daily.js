import React, { Component } from 'react'

class Daily extends Component
{
    constructor()
    {
        super()
        this.state ={
            daily: ''
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (prevProps.lat !== this.props.lat)
        {
            //fetch data
            fetch("https://api.weatherapi.com/v1/forecast.json?key=033eee285fa04f66b9a154233240807&q=" + this.props.lat + ',' + this.props.lon + "&days=7")
                .then(response => response.json())
                .then(data => this.setState({daily : data['forecast']['forecastday']}))
                .catch(error => console.log(error))
        }
    }

    getDay(i)
    {
        const Day = new Date(this.state.daily[i]['date']).getDay()
        const DayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        return DayName[Day]
    }

    getComponent()
    {
        const ListItems = []
        if (typeof this.state.daily[0] !== 'undefined' )
        {
            for (let i = 0; i < this.state.daily.length ; i++)
            {
                ListItems.push(
                    <div key={i} className='box'>
                        <img src={this.state.daily[i]['day']['condition']['icon']} alt='img' />
                        <p style={{textAlign:'center'}}>{this.state.daily[i]['day']['condition']['text']}</p>
                        <p><b>Temp: </b> {this.state.daily[i]['day']['maxtemp_c']}°C - {this.state.daily[i]['day']['mintemp_c']}°C</p>
                        <p><b>Chance of Rain: </b>{this.state.daily[i]['day']['daily_chance_of_rain']}</p>
                        <p style={{textAlign:'center', margin:0}}><b>{this.state.daily[i]['date'].slice(5, 10)}</b></p>
                        <p style={{textAlign:'center', fontWeight:'bold'}}>{this.getDay(i)}</p>
                    </div>
                )
            }
        }
        return ListItems
    }

    render()
    {
        return (
            <div className='daily sec'>
                <p><b style={{fontSize:'30px'}}>Daily forecast</b></p>
                <div className='container'>
                    {this.getComponent()}
                </div>
            </div>
        )
    }
}

export default Daily;