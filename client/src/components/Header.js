import React, {Component} from 'react';
import './Header.css';
import logo from '../logo.svg';

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='algorithmTitle'>
                    <p>BLSI Algorithm</p>
                </div>
                <div className='options'>
                    {/* Substitute for options button */}
                    <img src={logo} className='optionsBtn' alt='Options' />
                </div>
            </div>
        );
    }
}

export default Header;
