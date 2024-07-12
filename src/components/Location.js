import React, { Component } from "react";

const deviceIPApi = 'https://api.ipify.org?format=json'

class Location extends Component
{
    constructor()
    {
        super()
        this.state = {
            city: '',
            country: '',
            region:''
        }

        this.setState = this.setState.bind(this)
    }

    componentDidMount()
    {
        this.setState({
            city: this.props.cityName
        })
        if (this.state.city == '')
        {
            this.getCurrentLocationIP()
        }
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.cityName != this.props.cityName)
        {
            this.setState({
                city: this.props.cityName
            })
        }
    }

    getCurrentLocationIP()
    {
        fetch(deviceIPApi)
            .then((response) => {return response.json()})
            .then((data) => {
                fetch('https://ipinfo.io/' + data['ip'] + '/geo')
                    .then((response) => {return response.json()})
                    .then((data) => {
                        this.setState({city : data['city']}, () =>this.props.changeCity(this.state.city))
                    })
            } )
    }

    render()
    {
        return(
            <div className="cloc sec">
                <p className="t-city">{this.state.city}</p>
                <p className="t-city-rc">{this.props.regionName}, {this.props.countryName}</p>
            </div>
        )
    }
}

export default Location;