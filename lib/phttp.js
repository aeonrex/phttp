/**
 * Created by taylorks on 10/16/15.
 */

var udp = require('dgram');
var log = require('util').log;
var port = 13337;


var _server = udp.createSocket('udp4');

var _commands = {};


module.exports = exports = phttp = {};


/**
 *
 * @param command
 * @param fn
 */
phttp.use = function (command, fn) {
    _commands[command.toUpperCase()] = fn;
};


phttp.listen = function listen() {
    var self = this;
    _server.on('listening', function () {
        self._address = _server.address();
    });

    _server.on('message', function (data, remoteInfo) {
        function __execute(command) {
            return _commands[command];
        }

        try {
            data = JSON.parse(data);
        } catch (e) {
            return;
        }

        var type = data.type || 'default';

        _commands['DEFAULT'] = () => {
        };

        __execute(type.toUpperCase())({
            data: data,
            address: remoteInfo
        }, new phttp.Request());

    });
};

var ex = {
    host: '192.168.1.64',
    port: 11111,
    resource: '/user',
    data: {
        name: 'taylor'
    }
};

/**
 *
 * @param options
 * @constructor
 */
function Request(options) {

    this._udp = _server;

    this.host = options.host;
    this.port = options.port;
    this.resource = options.resource; // possibly instead of type? or interchangeable
    this.data = options.data;

}

phttp.Request = Request;

Request.prototype.send = function (message) {
    // udp.send
};
