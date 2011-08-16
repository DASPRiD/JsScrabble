if (typeof window['JsScrabble'] == 'undefined') {
    window['JsScrabble'] = {};
}

(function(JsScrabble){
    JsScrabble.Serializer = {};
    
    JsScrabble.Serializer.serialize = function(object)
    {
        return JSON.stringify(encoderFor(object)(object));
    }
       
    var encoderFor = function(obj)
    {
        switch (typeof obj) {
            case 'string':
                return encodeString;
                
            case 'number':
                if ((parseFloat(obj) == parseInt(obj)) && !isNaN(obj)) {
                    return encodeInteger;
                } else {
                    return encodeFloat;
                }
                
            case 'object':
                return encodeObject;
        }
    }
    
    var encodeInteger = function(object)
    {
        return {type: 'integer', value: object};
    }
    
    var encodeFloat = function(object)
    {
        return {type: 'float', value: object};
    }
    
    var encodeString = function(object)
    {
        return {type: 'string', value: object};
    }
    
    var encodeObject = function(object)
    {
        var data = {}, type;
        
        for (var name in object) {
            var value = object[name];
            
            if (typeof value == 'function') {
                continue;
            }

            data[name] = encoderFor(value)(value);
        }
        
        switch (true) {
            case object instanceof JsScrabble.Command:
                type = 'JsScrabble.Command'
                break;
        }
        
        return {type: 'object', value: {type: type, data: data}};
    }
})(window['JsScrabble']);
