/* Imports: Required modules to setup the app =================================================== */
import {App, os, read, update, readFlavor, readStyle} from '@onejs-dev/core';
import {Text, View, Input, Icon} from '@onejs-dev/components';
import homeIcon from '../assets/icons/oneJS.svg';
import aboutIcon from '../assets/icons/book.svg';

/* State: Any variable subject to change needs to be part of the state ========================== */
const state = {
  /* Routes: The source for their value is the url. True when matches false otherwise */
  home:       {source: {url: '/'}}, 
  about:      {source: {url: '/about'}},

  /* Standard variables: The value provided is their default/initial value */
  fontFamily: 'Avenir Next',
  opacity:    1,

  /* Stored variable: It is stored and retrieved from local storage using the key 'greeting' */
  greeting:   {default: 'World', source: {local: 'greeting'}, storage: {local: 'greeting'}},
};

/* Fonts: Optional, import custom fonts ========================================================= */
const font = { 
  'Avenir Next': require('../assets/fonts/AvenirNext.otf'),
  'Domine': require('../assets/fonts/Domine.ttf'),
};

/* Style: Customize the look and feel =========================================================== */
const style = {
  page:          {backgroundColor: '#F1F1F1', position: 'absolute', height: '100%', width: '100%'},
  navbar:        {position: 'absolute', bottom: 0, height: 80, width: '100%', 
                  backgroundColor: '#fff'},
  bigSpaceTop:   {marginTop: 80},
  smallSpaceTop: {marginTop: 20}
};

/* Template function: Returns the structure to be rendered ====================================== */
const template = () => {
  return [
  /* Home page */
  View({visible: read('home'), animation: {visible: ['fade-in', 'fade-out']}, 
        self: {expand: 1}, content: {h: 'center', v: 'top', direction: 'column'},
        style: readStyle('page')})([
    /* Greeting text */
    Text({flavor: readFlavor('title', 'primary'), style: {opacity: read('opacity'), 
          fontFamily: read('fontFamily'), marginTop: 80}})('Hello ' + read('greeting') + '!'),

    /* Text input to update greeting */
    Text({style: readStyle('smallSpaceTop')})('Greeting text: '),
    Input({type: 'text', onChange: update('greeting'), value: read('greeting')}),

    /* List input to update font family */
    Text({style: readStyle('smallSpaceTop')})('Font family: '),
    Input({type: 'list', onChange: update('fontFamily'), value: read('fontFamily'), 
           options: ['Avenir Next', 'Domine']}),

    /* Range input to update opacity */
    Text({style: readStyle('smallSpaceTop')})('Font opacity: '),
    Input({type: 'range', min: 0, max: 1, step: 0.1, value: read('opacity'), 
           onChange: update('opacity')}),
  ]),

  /* About page */
  View({visible: read('about'), animation: {visible: ['fade-in', 'fade-out']}, 
        self: {expand: 1}, content: {h: 'center', v: 'top', direction: 'column'},
        style: readStyle('page')})([
    /* About page text */
    Text({flavor: readFlavor('header'), 
          style: readStyle('bigSpaceTop')})('Developed with ❤️ by oneJS'),
    Text({style: readStyle('smallSpaceTop')})('Running on ' + os)
  ]),

  /* Navbar */
  View({content: {h: 'distribute', v: 'center'}, style: readStyle('navbar')})([
    /* Home navbar item */
    Input({type: 'button', icon: homeIcon, title: 'Home', url: '/', 
           content: {h: 'center', v: 'center', direction: 'column'}, 
           flavor: readFlavor((read('home') ? 'selected' : 'unselected'), 'flat')}),
    /* About navbar item */
    Input({type: 'button', icon: aboutIcon, title: 'About', url: '/about',
          content: {h: 'center', v: 'center', direction: 'column'}, 
          flavor: readFlavor((read('about') ? 'selected' : 'unselected'), 'flat')}),
  ])];
}

/* App: Run the app with the parameters provided ================================================ */
App({theme: 'oneJS', state: state, font: font, style: style})(template);

/* Learn: Refer to the docs section to learn all about oneJS: https://onejs.dev/docs============= */