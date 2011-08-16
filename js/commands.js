if (typeof window['JsScrabble'] == 'undefined') {
    window['JsScrabble'] = {};
}

(function(JsScrabble){
    var LOGIN_COMMAND           = 0;
    var GAME_COMMAND            = 1;
    var CHAT_COMMAND            = 2;
    var PRIVATE_MESSAGE_COMMAND = 3;
    
    /**
     * Command creator
     */
    JsScrabble.CommandCreator = function()
    {
        this.parser = new JsScrabble.CommandParser();
    }
    
    JsScrabble.CommandCreator.prototype.createLoginCommand = function(username, password, version)
    {
        return this.parser.parseLoginCommand([username, password, JsScrabble.LOGIN_INIT, version]);
    }
    
    JsScrabble.CommandCreator.prototype.createNewUserCommand = function(username, password, isAdmin)
    {
        return this.parser.parseLoginCommand([username, password, JsScrabble.NEW_USER, isAdmin]);
    }
    
    JsScrabble.CommandCreator.prototype.createChangePasswordCommand = function(newPassword, oldPassword)
    {
        return this.parser.parseLoginCommand(['', newPassword, JsScrabble.CHANGE_PASSWORD, oldPassword]);
    }
    
    JsScrabble.CommandCreator.prototype.createGoodbyeCommand = function()
    {
        return this.parser.parseLoginCommand(['', '', JsScrabble.LOGOUT, '']);
    }
    
    /**
     * Command parser
     */
    JsScrabble.CommandParser = function()
    {
    }
    
    JsScrabble.CommandParser.prototype.parseLoginCommand = function(elements)
    {
        return new JsScrabble.LoginCommand(elements[0], elements[1], elements[2], elements[3]);
    }
    
    JsScrabble.CommandParser.prototype.parseChatCommand = function(elements)
    {
        return new JsScrabble.ChatCommand(elements[0], elements[1], elements[2]);
    }
    
    JsScrabble.CommandParser.prototype.parseGameCommand = function(elements)
    {
        return new JsScrabble.GameCommand(elements[0], elements[1], elements[2]);
    }
    
    JsScrabble.CommandParser.prototype.parsePrivateMessageCommand = function(elements)
    {
        return new JsScrabble.PrivateMessageCommand(elements[0], elements[1], elements[2], elements[3]);
    }
    
    /**
     * Abstract command
     */
    JsScrabble.Command = function(type)
    {
        this.type = type;
    }
    
    JsScrabble.Command.prototype.getCommand = function()
    {
        return this.command;
    }
    
    JsScrabble.Command.prototype.setCommand = function(command)
    {
        this.command = command;
    }
    
    JsScrabble.Command.prototype.getData = function()
    {
        return this.data;
    }
    
    JsScrabble.Command.prototype.setData = function(data)
    {
        this.data = data;
    }
    
    JsScrabble.Command.prototype.getUsername = function()
    {
        return this.username;
    }
    
    JsScrabble.Command.prototype.setUsername = function(username)
    {
        this.data = username;
    }
    
    /**
     * Chat command
     */
    JsScrabble.ChatCommand = function(username, command, data)
    {
        JsScrabble.Command.call(this, CHAT_COMMAND);
        
        this.command  = command;
        this.data     = data;
        this.username = username;
    }
    
    JsScrabble.ChatCommand.prototype             = new JsScrabble.Command();
    JsScrabble.ChatCommand.prototype.constructor = JsScrabble.ChatCommand;
    
    /**
     * Login command
     */
    JsScrabble.LoginCommand = function(username, password, command, data)
    {
        JsScrabble.Command.call(this, LOGIN_COMMAND);
        
        this.username = username;
        this.password = password;
        this.command  = command;
        this.data     = data;
    }
    
    JsScrabble.LoginCommand.prototype.getPassword = function()
    {
        return this.password;
    }
    
    JsScrabble.LoginCommand.prototype.setPassword = function(password)
    {
        this.password = password;
    }
    
    JsScrabble.LoginCommand.prototype             = new JsScrabble.Command();
    JsScrabble.LoginCommand.prototype.constructor = JsScrabble.LoginCommand;
    
    /**
     * Game command
     */
    JsScrabble.GameCommand = function(command, gameId, data)
    {
        JsScrabble.Command.call(this, GAME_COMMAND);
        
        this.command = command;
        this.gameId  = gameId;
        this.data    = data;
    }
    
    JsScrabble.GameCommand.prototype.getGameId = function()
    {
        return this.gameId;
    }
    
    JsScrabble.GameCommand.prototype.setGameId = function(gameId)
    {
        this.gameId = gameId;
    }
    
    JsScrabble.GameCommand.prototype             = new JsScrabble.Command();
    JsScrabble.GameCommand.prototype.constructor = JsScrabble.GameCommand;
    
    /**
     * Private message command
     */
    JsScrabble.PrivateMessageCommand = function(command, sender, recipient, data)
    {
        JsScrabble.Command.call(this, PRIVATE_MESSAGE_COMMAND);
        
        this.command   = command;
        this.sender    = sender;
        this.recipient = recipient;
        this.data      = data;
    }
    
    JsScrabble.PrivateMessageCommand.prototype.getSender = function()
    {
        return this.sender;
    }
    
    JsScrabble.PrivateMessageCommand.prototype.setSender = function(sender)
    {
        this.sender = sender;
    }
    
    JsScrabble.PrivateMessageCommand.prototype.getRecipient = function()
    {
        return this.recipient;
    }
    
    JsScrabble.PrivateMessageCommand.prototype.setRecipient = function(recipient)
    {
        this.recipient = recipient;
    }
    
    JsScrabble.PrivateMessageCommand.prototype             = new JsScrabble.Command();
    JsScrabble.PrivateMessageCommand.prototype.constructor = JsScrabble.PrivateMessageCommand;
})(window['JsScrabble']);

