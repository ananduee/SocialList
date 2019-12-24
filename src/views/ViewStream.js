import React from 'react';
var App = require('./App')
var ReactDOMServer = require('react-dom/server');

export function get() {
    const View = App.default;
    return ReactDOMServer.renderToNodeStream(<View />);
}
