import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Login from './routes/Home';

if (document.getElementById('root')) {
    ReactDOM.render(<Login />, document.getElementById('root'));
}

window.generateLaravelDate = function(d) {
    var year = d.getFullYear();
    var month = ("0" + (d.getMonth() + 1)).slice(-2);
    var day = ("0" + d.getDate()).slice(-2);
    var hour = ("0" + d.getHours()).slice(-2);
    var minutes = ("0" + d.getMinutes()).slice(-2);
    var seconds = ("0" + d.getSeconds()).slice(-2);
    return year + "-" + month + "-" + day + " "+ hour + ":" + minutes + ":" + seconds;
}