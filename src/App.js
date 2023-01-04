/* Imports: Required modules to setup the app =================================================== */
import {app, os, read, update, readFlavor, readStyle} from '@onejs-dev/core';
import {Text, View, Input} from '@onejs-dev/components';
import {icons} from '@onejs-dev/icons';

/* State: Variable configuration definition ===================================================== */
const state = {
    /* Routes: The source for their value is the url. 'true' when matches, 'false' otherwise */
    home: {source: {url: '/'}},
    about: {source: {url: '/about'}},

    /* Standard variables: The value provided is their default/initial value */
    fontFamily: 'Avenir Next',
    opacity: 1,

    /* Stored variable: It is stored and retrieved from local storage using the key 'greeting' */
    greeting: {
        default: 'World',
        source: {local: 'greeting'},
        storage: {local: 'greeting'}
    }
};

/* Fonts: Import custom fonts =================================================================== */
const font = {
    'Avenir Next': require('../assets/fonts/AvenirNext.otf'),
    Domine: require('../assets/fonts/Domine.ttf')
};

/* Style: Customize the look and feel =========================================================== */
const style = {
    page: {
        backgroundColor: '#F1F1F1',
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        height: 80,
        width: '100%',
        backgroundColor: '#fff',
        zIndex: 10
    }
};

/* App function: Returns the structure to be rendered =========================================== */
const App = () => {
    return [
        /* Home page */
        View({
            visible: read('home'),
            animation: {visible: ['fade-in', 'fade-out']},
            self: {expand: 1},
            content: {h: 'center', v: 'center', direction: 'column', gap: 10},
            style: readStyle('page')
        })([
            /* Greeting text */
            Text({
                flavor: readFlavor('title', 'primary'),
                style: {
                    opacity: read('opacity'),
                    fontFamily: read('fontFamily'),
                    fontWeight: 'normal'
                }
            })('Hello ' + read('greeting') + '!'),

            /* Text input to update greeting */
            Text()('Greeting text: '),
            Input({
                type: 'text',
                onChange: update('greeting'),
                value: read('greeting')
            }),

            /* List input to update font family */
            Text()('Font family: '),
            Input({
                type: 'list',
                onChange: update('fontFamily'),
                value: read('fontFamily'),
                options: ['Avenir Next', 'Domine']
            }),

            /* Range input to update opacity */
            Text()('Font opacity: '),
            Input({
                type: 'range',
                min: 0,
                max: 1,
                step: 0.1,
                value: read('opacity'),
                onChange: update('opacity'),
                style: {marginBottom: 100}
            })
        ]),

        /* About page */
        View({
            visible: read('about'),
            animation: {visible: ['fade-in', 'fade-out']},
            self: {expand: 1},
            content: {h: 'center', v: 'center', direction: 'column', gap: 20},
            style: readStyle('page')
        })([
            /* About page text */
            Text({
                flavor: readFlavor('section'),
                link: [{text: 'oneJS', target: '_blank', url: 'https://onejs.dev'}]
            })('Developed with ❤️ by oneJS'),
            Text()('Running on ' + os)
        ]),

        /* Navbar */
        View({
            content: {h: 'distribute', v: 'center'},
            style: readStyle('navbar')
        })([
            /* Home navbar item */
            Input({
                type: 'button',
                // icon: icons['oneJS'], //Currently not ready for native. Uncomment for web
                title: 'Home',
                url: '/',
                content: {h: 'center', v: 'center', direction: 'column'},
                flavor: readFlavor(read('home') ? 'selected' : 'unselected', 'flat')
            }),
            /* About navbar item */
            Input({
                type: 'button',
                // icon: icons['book'], //Currently not ready for native. Uncomment for web
                title: 'About',
                url: '/about',
                content: {h: 'center', v: 'center', direction: 'column'},
                flavor: readFlavor(read('about') ? 'selected' : 'unselected', 'flat')
            })
        ])
    ];
};

/* App: Render the app with the parameters provided ============================================== */
app({
    component: App,
    theme: {preset: 'oneJS'},
    state: state,
    font: font,
    style: style
});

/* Learn: Refer to the 'learn' section to learn all about oneJS: https://onejs.dev/learn ======== */
