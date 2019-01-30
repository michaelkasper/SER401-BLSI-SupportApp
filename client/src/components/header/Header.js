import React, {Component} from 'react';
import '../../styles/Header.css';

class Header extends Component {
    render() {
        return (
            <div className='headerContainer'>
                <div className='algorithmTitle'>
                    <p>BLSI Algorithm</p>
                </div>
                <div className='options'>
                    {/* Options button, can use optionsBtn style */}
                </div>
            </div>
        );
    }
}

export default Header;
