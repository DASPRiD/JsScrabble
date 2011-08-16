WEB_SOCKET_SWF_LOCATION = 'http://home.dasprids.de:8070/socket.io/lib/vendor/web-socket-js/WebSocketMain.swf';

if (typeof window['JsScrabble'] == 'undefined') {
    window['JsScrabble'] = {};
}

(function(JsScrabble){
    /**
     * Client
     */
    JsScrabble.Client = function(initCallback)
    {
        var client = this;
        
        this.command = new JsScrabble.CommandCreator();
        
        this.socket = new io.Socket('home.dasprids.de', {
            port: 8070
        });
          
        this.socket.on('connect', initCallback);

        this.socket.on('disconnect', function(){
            window.alert('Disconnected from server, reloading.');
            window.location.reload();
        });

        this.socket.on('message', function(data){           
            if (data == 'connected') {
                client.connectCallback();
            }
        });
    }
    
    JsScrabble.Client.prototype.init = function()
    {
        this.socket.connect();
    }
    
    JsScrabble.Client.prototype.connect = function(host, port, callback)
    {
        this.connectCallback = callback;
        
        this.socket.send(JSON.stringify({command: 'connect', data: {host: host, port: port}}));
    }
    
    JsScrabble.Client.prototype.login = function(username, password, version)
    {
        this.sendCommand(this.command.createLoginCommand(username, password, version));
    }
    
    JsScrabble.Client.prototype.sendCommand = function(command)
    {        
        this.socket.send(JSON.stringify({
            command: 'send',
            data:    JsScrabble.Serializer.serialize(command)
        }));
    }
})(window['JsScrabble']);

