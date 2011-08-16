$(document).ready(function(){
    var controller = new JsScrabble.Controller();
    controller.run();
});

if (typeof window['JsScrabble'] == 'undefined') {
    window['JsScrabble'] = {};
}

(function(JsScrabble){
    JsScrabble.Controller = function()
    {
        var controller = this;
        this.client    = new JsScrabble.Client(function(){
            var dialog  = $('#dialog');
            var title   = dialog.find('div.title');
            var content = dialog.find('div.content');

            content.fadeOut('slow', function(){
                title.text('Sign In');

                dialog.find('div.activity').hide();
                
                var ul = $('<ul/>'), li;
                
                var username = $('<input type="text"/>');
                li = $('<li/>').append('<label>Username:</labrl>');
                li.append(username);
                ul.append(li);
                
                var password = $('<input type="password"/>');
                li = $('<li/>').append('<label>Password:</labrl>');
                li.append(password);
                ul.append(li);
                
                var hostname = $('<input type="text"/>');
                li = $('<li/>').append('<label>Hostname:</label>');
                li.append(hostname);
                ul.append(li);
                
                var submit = $('<input type="button" value="Login"/>');
                li = $('<li/>').append(submit);
                ul.append(li);
                
                content.append(ul);

                content.show();
                controller.centerDialog(function(){
                    content.fadeIn('slow', function(){
                        username.focus();
                    });
                });
                content.hide();

                submit.bind('click', function(){
                    var usernameValue = $.trim(username.val());
                    var passwordValue = $.trim(password.val());
                    var hostnameValue = $.trim(hostname.val());

                    if (usernameValue == '') {
                        window.alert('Please enter a username.');
                        return;
                    }

                    if (passwordValue == '') {
                        window.alert('Please enter a password.');
                        return;
                    }
                    
                    if (hostnameValue == '') {
                        window.alert('Please enter a hostname.');
                        return;
                    }
                    
                    if (hostnameValue.indexOf(':') == -1) {
                        window.alert('Hostname value must be hostname:port.');
                        return;
                    }
                    
                    var host = hostnameValue.split(':')[0];
                    var port = hostnameValue.split(':')[1];
                    
                    if ((parseFloat(port) == parseInt(port)) && !isNaN(port)) {
                        port = parseInt(port);
                    } else {
                        window.alert('Port must be a number.');
                        return;
                    }

                    content.find('ul').hide();
                    content.find('div.activity').show();

                    controller.client.connect(host, port, function(){
                        controller.client.login(usernameValue, JsScrabble.hashPassword(passwordValue), JsScrabble.VERSION);
                    });
                });
            });
        });
    }
    
    JsScrabble.Controller.prototype.send = function(command, data)
    {
        this.socket.send(
            JSON.stringify({
                command: command,
                data:    data
            })
        );
    }

    JsScrabble.Controller.prototype.run = function()
    {
        var dialog   = $('<div id="dialog"/>');
        var activity = $('<div class="activity"/>');
        var title    = $('<div class="title"/>').text('Connecting to server…');
        var content  = $('<div class="content"/>');

        content.append(activity);
        dialog.append(title);
        dialog.append(content);

        var backgroundPosition = 0;
        this.activityInterval  = window.setInterval(function(){
            backgroundPosition = (backgroundPosition + 1) % 18;

            activity.css({
                backgroundPosition: backgroundPosition + 'px 0'
            });
        }, 40);
        
        $('body').append(dialog);
        this.centerDialog();

        this.client.init();
    }

    JsScrabble.Controller.prototype.centerDialog = function(animate)
    {
        var dialog = $('#dialog');
        var prevWidth  = dialog.width();
        var prevHeight = dialog.height();

        dialog.css({
            width: 'auto',
            height: 'auto'
        });
        
        var width   = dialog.width();
        var height  = dialog.height();

        dialog.css({
            width:  prevWidth + 'px',
            height: prevHeight + 'px'
        });

        var paddingTop    = parseInt(dialog.css('padding-top'));
        var paddingBottom = parseInt(dialog.css('padding-bottom'));
        var borderTop     = parseInt(dialog.css('border-top-width'));
        var borderBottom  = parseInt(dialog.css('border-bottom-width'));
        var mediaBorder   = (borderTop + borderBottom) / 2;
        var mediaPadding  = (paddingTop + paddingBottom) / 2;
        var halfWidth     = (width / 2) * (-1);
        var halfHeight    = ((height / 2) * (-1)) - mediaPadding - mediaBorder;

        var properties = {
            height:     height + 'px',
            width:      width + 'px',
            top:        '50%',
            left:       '50%',
            marginTop:  halfHeight + 'px',
            marginLeft: halfWidth + 'px'
        };

        if (animate) {
            dialog.animate(properties, 'slow', function(){
                animate();
            });
        } else {
            dialog.css(properties);
        }
    }
})(window['JsScrabble']);

