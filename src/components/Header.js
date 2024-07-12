import React, { Component } from 'react'

class Header extends Component
{
    render()
    {
        return (
            <div className='header'>
                <input id='city-input' placeholder='Enter Your Location..'  />
                <button onClick={() => {
                    this.props.changeState(document.getElementById('city-input').value)
                }}>Search</button>
            </div>
        )
    }
}

export default Header;