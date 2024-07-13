import React, { Component } from "react";


class Hours extends Component
{
    constructor()
    {
        super()
        this.state = {
            hourly: ''
        }
    }

    getData()
    {
        fetch("https://api.weatherapi.com/v1/forecast.json?key=033eee285fa04f66b9a154233240807&q=" + this.props.lat + ',' + this.props.lon + "&days=1")
            .then(response => response.json())
            .then(data => {console.log(data)
                this.setState({
                hourly: data['forecast']['forecastday'][0]['hour']
            })})
            .catch(error => console.log(error))
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (this.state.data !== prevState.data)
        {
            console.log(this.data)
        }
        if (this.props.lat !== prevProps.lat)
        {
            this.getData()
        }
    }

    addComponent()
    {
        const ListItems = []
        if (typeof this.state.hourly[0] !== 'undefined')
        {
            for (let i = 0; i < 24; i +=2)
            {
                ListItems.push(<div key={i} className="box">
                    <p className="t" style={{fontWeight:'bold'}}>{this.state.hourly[i]['time'].slice(10, 16)}</p>
                    <img src={this.state.hourly[i]['condition']['icon']} alt="img"/>
                    <p className="t" style={{fontWeight:'bold'}}>{this.state.hourly[i]['temp_c']}°C</p>
                </div>)
            }
        }
        return ListItems
    }

    render()
    {
        return (
            <div className="hours sec"> 
                <p className="w">Hourly forecast</p>
                <div className="container">
                    {this.addComponent()}
                </div>
            </div>
        )
    }
}

export default Hours;