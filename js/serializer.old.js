if (typeof window['JsScrabble'] == 'undefined') {
    window['JsScrabble'] = {};
}

(function(JsScrabble){    
    JsScrabble.Serializer = function()
    {
        this.header = 'SRW3';
        
        this.protocol = {
            'ServerBulletin':   'a',
            'BooleanType':      'b',
            'PlayerInfo':       'c',
            'timedelta':        'd',
            'Time':             'e',
            'TimeDeltaWrapper': 'f',
            'ScrabbleGameInfo': 'g',
            'audit.Action':     'h',
            'RingList':         'i',
            'helper.Command':   'j',
            'Letter':           'l',
            'Move':             'm',
            'Player':           'p',
            'PrivateMessage':   'r',
            'ServerMessage':    's',
            'struct_time':      't',
            'User':             'u',
            'LongType':         'B',
            'DictType':         'D',
            'FloatType':        'F',
            'IntType':          'I',
            'ListType':         'L',
            'NoneType':         'N',
            'StringType':       'S',
            'TupleType':        'T',
            'UnicodeType':      'U'
        };
    }

    JsScrabble.Serializer.prototype.xFor = function(objType, data)
    {
        var result = null;
        
        if (typeof data[objType] !== 'undefined') {
            result = data[objType];
        } else {
            for (var d in data) {
                
            }
        }
        
        if (result != null) {
            return result;
        } else {
            throw 'Could not find matching object type in data.';
        }
    }

    JsScrabble.Serializer.prototype.protocolFor = function(objType)
    {
        return this.xFor(objType, this.protocols);
    }
    
    JsScrabble.Serializer.prototype.encoderFor = function(obj)
    {
        switch (typeof obj) {
            case 'string':
                return self.encodeString;
                
            case 'number':
                if ((parseFloat(obj) == parseInt(obj)) && !isNaN(obj)) {
                    return self.encodeInteger;
                } else {
                    return self.encodeFloat;
                }
                
            case 'object':
                return self.encodeObject;
        }
    }
    
    JsScrabble.Serializer.prototype.encodeInteger = function(obj)
    {
        return self.format('{0}{1}', self.protocol['IntType'], self.packLong(obj));
    }
    
    JsScrabble.Serializer.prototype.encodeFloat = function(obj)
    {
        throw 'Packing floats not implemented';
    }
    
    JsScrabble.Serializer.prototype.encodeString = function(obj)
    {
        return self.format('{0}{1}{2}', self.protocol['StringType'], self.packLong(obj.length), obj);
    }
    
    JsScrabble.Serializer.prototype.encodeTuple = function(obj)
    {
        var data = [];
        
        for (var name in obj) {
            var value = obj[name];
            data.push(self.encoderFor(value)(value));
        }
        
        data = data.join('');
        
        return this.format('{0}{1}{2}', self.protocol['TupleType'], self.packLong(data.length), data);
    }
    
    JsScrabble.Serializer.prototype.encodeObject = function(obj)
    {
        var data = [], protocol;
        
        for (var name in obj) {
            var value = obj[name];
            
            if (typeof value == 'function') {
                continue;
            }

            data.push(self.encodeTuple([name, value]));
        }
        
        data = data.join('');
        
        switch (true) {
            case obj instanceof JsScrabble.Command:
                protocol = self.protocol['helper.Command'];
                break;
        }
        
        return self.format('{0}{1}{2}', protocol, self.packLong(data.length), data);
    }
    
    JsScrabble.Serializer.prototype.dumps = function(obj)
    {
        var option = 'N';
        
        var data = self.encoderFor(obj)(obj);
        
        return self.format('{0}{1}{2}', self.header, option, data);
    }
    
    JsScrabble.Serializer.prototype.format = function(string)
    {
        var args = arguments;

        return string.replace(/{(\d+)}/g, function(match, number) { 
            var index = parseInt(number) + 1;

            return typeof args[index] != 'undefined'
                ? args[index]
                : '{' + number + '}';
        });
    }
    
    JsScrabble.Serializer.prototype.packLong = function(number)
    {
        var result = '';
        
        result += String.fromCharCode(number & 0xff)
        result += String.fromCharCode(number >> 8 & 0xff)
        result += String.fromCharCode(number >> 16 & 0xff)
        result += String.fromCharCode(number >> 24 & 0xff)
        
        return result;
    }
    
    JsScrabble.Serialize = new JsScrabble.Serializer();
    var self = JsScrabble.Serialize;
})(window['JsScrabble']);
