require.paths.unshift('.')

var http   = require('http'),
    io     = require('socket.io'),
    net    = require('net'),
    Put    = require('put');

var server = http.createServer(function(request, result){
    result.writeHead(200, {'Content-Type': 'text/html'});
    result.end('<h1>JsScrabble</h1>');
});
server.listen(8070);

var socket = io.listen(server, {
    flashPolicyServer: false
});

socket.on('connection', function(client){
    client.stream = null;
    
    client.on('disconnect', function(){
        if (client.stream != null) {
            client.stream = null;
        }
    });

    client.on('message', function(message){
        var command = JSON.parse(message);

        switch (command.command) {
            case 'connect':
                client.stream = net.createConnection(command.data.port, command.data.host);
                
                client.stream.on('data', function(data){
                    console.log(data);
                    client.send(data);
                }).on('connect', function(){
                    client.send('connected');
                }).on('end', function(){
                    client.emit('disconnect');
                    console.log('disconnected');
                });
                break;
                
            case 'disconnect':
                client.stream = null;
                break;

            case 'send':
                var put  = Put();
                var temp = encode(JSON.parse(command.data)).buffer();
                
                put.put(new Buffer(temp.length + ':', 'ascii'));
                put.put(temp);
                put.put(new Buffer(',', 'ascii'));
                
                var buffer = put.buffer();

                console.log(buffer.toString('ascii'));
                client.stream.write(buffer);
                break;
        }
    });
});

var encode;

(function(){
    encode = function(object)
    {
        var put = Put().put(new Buffer('SRW3N', 'ascii'));
        
        encodeObject(object, put);
        
        return put
    }
    
    var encodeObject = function(object, put)
    {
        var buffer, name, data, protocol, length, value, encoded, offset, temp;
        
        switch (object.type) {
            case 'object':
                temp     = Put();
                protocol = '';

                for (name in object.value.data) {
                    encodeObject({type: 'tuple', value: [{type: 'string', value: name}, object.value.data[name]]}, temp);
                }
                
                temp = temp.buffer();

                switch (object.type) {
                    case 'JsScrabble.Command':
                        protocol = 'j';
                        break;
                }
                
                put.put(new Buffer(protocol, 'ascii'));
                put.word32be(temp.length);
                put.put(temp);
                break;
                
            case 'tuple':
                temp = Put();
                
                for (name in object.value) {
                    encodeObject(object.value[name], temp);
                }
                
                temp = temp.buffer();
                
                put.put(new Buffer('T', 'ascii'));
                put.word32be(temp.length);
                put.put(temp);
                break;
                
            case 'string':
                put.put(new Buffer('S', 'ascii'));
                put.word32be(Buffer.byteLength(object.value, 'ascii'));
                put.put(new Buffer(object.value, 'ascii'));
                break;
                
            case 'integer':
                put.put(new Buffer('I', 'ascii'));
                put.word32be(object.value);
                break;
                
            case 'float':
                put.put(new Buffer('F', 'ascii'));
                put.floatle(object.value);
                break;
        }
    }
})();
