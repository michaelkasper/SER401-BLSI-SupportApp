import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header className='header'>
          <div className='algorithmTitle'>
            <p>BLSI Algorithm</p>
          </div>
          <div className='options'>
            {/* Substitute for options button */}
            <img src={logo} className='optionsBtn' alt='Options' />
          </div>
        </header>
        <body>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque congue lobortis sollicitudin. Nunc sit amet orci vitae sapien viverra ultrices. Praesent ut lectus sit amet sem congue accumsan ac sit amet libero. Fusce id diam urna. Vestibulum tempus id diam id placerat. In pretium aliquam odio, quis maximus ipsum efficitur a. Maecenas fringilla velit sed egestas imperdiet. Aliquam ullamcorper at ex et malesuada. Morbi sed velit ac nisl iaculis facilisis eu ut odio. Quisque sed bibendum urna, sit amet malesuada nulla. Nunc cursus augue in pellentesque vestibulum. Fusce pretium nisl sit amet sapien rutrum, ut hendrerit sapien mollis. Morbi eget imperdiet arcu.</p>
          <p>Aenean et libero est. Nullam gravida leo id ullamcorper pellentesque. Suspendisse tincidunt molestie lacus id eleifend. Donec consequat orci et lectus bibendum, quis porttitor nisl aliquam. Vivamus eu lorem nisi. Quisque at ornare nulla. Cras quis commodo libero.</p>
          <p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla laoreet in mi quis porta. Interdum et malesuada fames ac ante ipsum primis in faucibus. Mauris eget vestibulum metus. Aenean consectetur elit vitae risus tincidunt, ac cursus velit gravida. Pellentesque sit amet mauris eget felis imperdiet tincidunt. In ultricies, massa sed lacinia laoreet, lectus risus porttitor odio, id malesuada nibh sem pharetra nisi. Quisque eget velit quis tortor maximus sodales. Fusce cursus urna quis lorem euismod, ac porttitor nulla tempor. Donec eu scelerisque erat, nec consectetur tellus. Cras in pellentesque augue, vitae porttitor dui.</p>
        </body>
      </div>
    );
  }
}

export default App;
