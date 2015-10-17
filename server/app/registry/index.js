/**
 * Created by taylorks on 10/16/15.
 */

var udp = require('dgram');
var log = require('util').log;
var port = 13337;


var _server = udp.createSocket('udp4');

var _commands = {};

var registry = {};

/**
 *
 * @param command
 * @param fn
 */
registry.use = function (command, fn) {
    _commands[command.toUpperCase()] = fn;
};


registry.listen = function listen() {
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
        }, cb);

    });
};


app.use('/foo', function (req, res) {

});
