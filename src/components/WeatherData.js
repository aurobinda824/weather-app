import React, { Component } from "react";
import moment from 'moment-timezone';

class WeatherData extends Component
{  
    constructor(props)
    {
        super(props)
        this.state ={
            condition: '',
            temp: '',
            wind: '',
            humidity: '',
            tz_id:'',
            date:'',
            time: '',
        }
    }

    componentDidMount() 
    {
        this.intervalId = setInterval(() => {
          this.updateTime();
        }, 1000);
    }
    
    componentWillUnmount() 
    {
        clearInterval(this.intervalId);
    }

    componentDidUpdate(prevProps)
    {
        if (prevProps.Data !== this.props.Data)
        {
            if (typeof this.props.Data['current'] !== 'undefined' && typeof this.props.Data['location'] !== 'undefined')
            {
                this.setState({
                    condition : this.props.Data['current']['condition'],
                    temp : this.props.Data['current']['temp_c'],
                    wind: this.props.Data['current']['wind_kph'],
                    humidity: this.props.Data['current']['humidity'],
                    tz_id: this.props.Data['location']['tz_id']
                })    
            }
        }
    }

    updateTime()
    {
        const current = moment.tz(this.state.tz_id).format('YYYY-MM-DD HH:mm:ss');
        this.setState({ time: current.slice(11, 20) });
        this.setState({date: current.slice(0, 11)})
    }

    getImageUrl(img)
    {
        if (typeof img === 'undefined')
        {
            return ''
        }
        return img
    }

    getEmojiTemp(temp)
    {
        if (temp === '')
        {
            return ''
        }
        if (temp <= 10)
        {
            return '🥶'
        }
        if (temp >= 40)
        {
            return '🥵'
        }
        return '😊'
    }

    getWindInfo(wind)
    {
        if (wind === '')
        {
            return ''
        }
        if (wind <= 16)
        {
            return 'Light Wind'
        }
        if (wind <= 32)
        {
            return 'Breezy'
        }
        if (wind <= 48)
        {
            return 'Windy'
        }
        if (wind <= 64)
        {
            return 'Very Windy'
        }
        if (wind <= 80)
        {
            return 'Extremely Windy'
        }
        return 'Hurricane'
    }

    getHumidityInfo(x)
    {
        if (x === '')
        {
            return ['', '']
        }
        if (x <= 30)
        {
            return ['Very Dry', 'Uncomfortable, dry air']
        }
        if (x <= 50)
        {
            return ['Dry', "Comfortable, but slightly dry"]
        }
        if(x <= 60)
        {
            return ['Comfortable', 'Ideal humidity range, comfortable for most people']
        }
        if(x <= 70)
        {
            return ['Humid', "Noticeably humid, but still comfortable"]
        }
        if (x <= 80)
        {
            return ['Muggy', "Uncomfortable, humid air"]
        }
        if (x <= 90)
        {
            return ['Very Humid', "Oppressive, humid air"]
        }
        return ['Extremely Humid', "Almost unbearable, extremely humid air"]
    }

    render()
    {
        return (
            <div className="we-data sec">
                <p className="t">WeatherData</p>
                <div className="container">
                    <div className="box">
                        <img className="condition" src={this.getImageUrl(this.state.condition['icon'])} alt="img"></img>
                        <p className="p t">{this.state.condition['text']}</p>
                    </div>
                    <div className="box">
                        <p className="p t temp">{this.state.temp}°C</p>
                        <p className="emoji">{this.getEmojiTemp(this.state.temp)}</p>
                    </div>
                    <div className="box">
                        <p className="t w">{this.state.wind} KPH</p>
                        <p className="t w">{this.getWindInfo(this.state.wind)}</p>
                    </div>
                    <div className="box">
                        <p className="t w">{this.state.humidity}</p>
                        <p className="t w">{this.getHumidityInfo(this.state.humidity)[0]}</p>
                        <p style={{textAlign: "center"}}>{this.getHumidityInfo(this.state.humidity)[1]}</p>
                    </div>
                    <div className="box" style={{flexGrow : 3}}>
                        <p className="t w">{this.state.date}</p>
                        <p className="t w">{this.state.time}</p>
                        <p className="w">{this.state.tz_id}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default WeatherData;