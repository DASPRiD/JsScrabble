if (typeof window['JsScrabble'] == 'undefined') {
    window['JsScrabble'] = {};
}

(function(JsScrabble){
    JsScrabble.hashPassword = function(password)
    {
        var hash   = JsScrabble.SHA1(password);
        var binary = '';
        
        for (var i = 0; i < 20; i++) {
            binary += String.fromCharCode(parseInt(hash[i * 2] + hash[i * 2 + 1], 16));
        }

        return JsScrabble.base64Encode(binary);
    }
    
    JsScrabble.SHA1 = function(msg)
    {
        function rotateLeft(n, s)
        {
            return (n << s) | (n >>> (32 - s));
        }

        function lsbHex(val)
        {
            var str = '', i, vh, vl;

            for (i = 0; i <= 6; i += 2 ) {
                vh   = (val >>> (i * 4 + 4)) & 0x0f;
                vl   = (val >>> (i * 4)) & 0x0f;
                str += vh.toString(16) + vl.toString(16);
            }
            
            return str;
        }

        function cvtHex(val)
        {
            var str = '', i, v;

            for (i = 7; i >= 0; i--) {
                v    = (val >>> (i * 4)) & 0x0f;
                str += v.toString(16);
            }
            
            return str;
        }

        function utf8Encode(string)
        {
            string = string.replace(/\r\n/g, "\n");
            var utftext = '';

            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n);

                if (c < 128) {
                    utftext += String.fromCharCode(c);
                } else if ((c > 127) && (c < 2048)) {
                    utftext += String.fromCharCode((c >> 6) | 192);
                    utftext += String.fromCharCode((c & 63) | 128);
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224);
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                    utftext += String.fromCharCode((c & 63) | 128);
                }
            }

            return utftext;
        }

        var blockstart;
        var i, j;
        var W = new Array(80);
        var H0 = 0x67452301;
        var H1 = 0xEFCDAB89;
        var H2 = 0x98BADCFE;
        var H3 = 0x10325476;
        var H4 = 0xC3D2E1F0;
        var A, B, C, D, E;
        var temp;

        msg = utf8Encode(msg);

        var msgLen    = msg.length;
        var wordArray = new Array();
        
        for (i = 0; i < msgLen - 3; i += 4 ) {
            wordArray.push(msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 | msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3));
        }

        switch (msgLen % 4) {
            case 0:
                i = 0x080000000;
                break;
                
            case 1:
                i = msg.charCodeAt(msgLen - 1) << 24 | 0x0800000;
                break;

            case 2:
                i = msg.charCodeAt(msgLen - 2) << 24 | msg.charCodeAt(msgLen-1) << 16 | 0x08000;
                break;

            case 3:
                i = msg.charCodeAt(msgLen - 3) << 24 | msg.charCodeAt(msgLen-2) << 16 | msg.charCodeAt(msgLen - 1) << 8 | 0x80;
                break;
        }

        wordArray.push( i );

        while ((wordArray.length % 16) != 14 ) {
            wordArray.push(0);
        }

        wordArray.push(msgLen >>> 29 );
        wordArray.push((msgLen << 3) & 0x0ffffffff);

        for (blockstart = 0; blockstart < wordArray.length; blockstart += 16 ) {
            for (i = 0; i < 16; i++) {
                W[i] = wordArray[blockstart + i];
            }
            
            for (i = 16; i <= 79; i++) {
                W[i] = rotateLeft(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
            }

            A = H0;
            B = H1;
            C = H2;
            D = H3;
            E = H4;

            for (i = 0; i <= 19; i++) {
                temp = (rotateLeft(A, 5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B, 30);
                B = A;
                A = temp;
            }

            for (i = 20; i <= 39; i++) {
                temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B, 30);
                B = A;
                A = temp;
            }

            for (i = 40; i <= 59; i++) {
                temp = (rotateLeft(A, 5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B, 30);
                B = A;
                A = temp;
            }

            for (i = 60; i <= 79; i++) {
                temp = (rotateLeft(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
                E = D;
                D = C;
                C = rotateLeft(B ,30);
                B = A;
                A = temp;
            }

            H0 = (H0 + A) & 0x0ffffffff;
            H1 = (H1 + B) & 0x0ffffffff;
            H2 = (H2 + C) & 0x0ffffffff;
            H3 = (H3 + D) & 0x0ffffffff;
            H4 = (H4 + E) & 0x0ffffffff;
        }

        temp = cvtHex(H0) + cvtHex(H1) + cvtHex(H2) + cvtHex(H3) + cvtHex(H4);

        return temp.toLowerCase();
    }
    
    JsScrabble.base64Encode = function(data)
    {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0, ac = 0, enc = '', tmp_arr = [];
        
         if (!data) {
            return data;
        }

        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++); 
            
            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');

        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + '==';
                break;
                
            case 2:
                enc = enc.slice(0, -1) + '=';
                break;
        }

        return enc;
    }
})(window['JsScrabble']);

