if (typeof window['JsScrabble'] == 'undefined') {
    window['JsScrabble'] = {};
}

(function(JsScrabble){
    JsScrabble.REQUIRED_VERSION = '1.6.1';
    JsScrabble.VERSION          = '1.6.2.7';
    
    // Login Commands
    JsScrabble.LOGIN_HEADER     = 'LOGIN';
    JsScrabble.LOGIN_INIT       = 'login_init';
    JsScrabble.LOGIN_OK         = 'login_ok';
    JsScrabble.LOGIN_DENIED     = 'login_denied';
    JsScrabble.LOGOUT           = 'logout';
    JsScrabble.CHANGE_PASSWORD  = 'change_password';
    JsScrabble.NEW_USER         = 'new_user';
    JsScrabble.BOOTED           = 'booted';
    JsScrabble.SERVER_NUM_USERS = 'server_num_users';

    // Chat Commands
    JsScrabble.CHAT_HEADER    = 'CHAT';
    JsScrabble.CHAT_JOIN      = 'chat_join';
    JsScrabble.CHAT_LEAVE     = 'chat_leave';
    JsScrabble.CHAT_MESSAGE   = 'chat_message';
    JsScrabble.CHAT_USERS     = 'chat_users';
    JsScrabble.ERROR          = 'error';
    JsScrabble.USER_INFO      = 'user_info';
    JsScrabble.SERVER_STATS   = 'server_stats';
    JsScrabble.INFO           = 'info';
    JsScrabble.CHECK_MESSAGES = 'check_messages';
    JsScrabble.GET_MESSAGES   = 'get_messages';
    JsScrabble.DELETE_MESSAGE = 'delete_message';

    // Game Commands
    JsScrabble.GAME_HEADER             = 'GAME';
    JsScrabble.GAME_SEND_MOVE          = 'game_send_move';
    JsScrabble.GAME_ACCEPT_MOVE        = 'game_accept_move';
    JsScrabble.GAME_REJECT_MOVE        = 'game_reject_move';
    JsScrabble.GAME_GET_LETTERS        = 'game_get_letters';
    JsScrabble.GAME_JOIN               = 'game_join';
    JsScrabble.GAME_JOIN_OK            = 'game_join_ok';
    JsScrabble.GAME_JOIN_DENIED        = 'game_join_denied';
    JsScrabble.GAME_LEAVE              = 'game_leave';
    JsScrabble.GAME_CREATE             = 'game_create';
    JsScrabble.GAME_START              = 'game_start';
    JsScrabble.GAME_LIST               = 'game_list';
    JsScrabble.GAME_USER_LIST          = 'game_user_list';
    JsScrabble.GAME_TURN_CURRENT       = 'game_turn_current';
    JsScrabble.GAME_TURN_OTHER         = 'game_turn_other';
    JsScrabble.GAME_ERROR              = 'game_error';
    JsScrabble.GAME_PASS               = 'game_pass';
    JsScrabble.GAME_INFO               = 'game_info';
    JsScrabble.GAME_PAUSE              = 'game_pause';
    JsScrabble.GAME_UNPAUSE            = 'game_unpause';
    JsScrabble.GAME_TRADE_LETTERS      = 'game_trade_letters';
    JsScrabble.GAME_CHAT_MESSAGE       = 'game_chat';
    JsScrabble.GAME_SPECTATOR_JOIN     = 'game_spectator_join';
    JsScrabble.GAME_SPECTATOR_LEAVE    = 'game_spectator_leave';
    JsScrabble.GAME_SPECTATE_JOIN_OK   = 'game_spectate_join_ok';
    JsScrabble.GAME_SPECTATOR_CHAT_SET = 'game_spectator_chat_set';
    JsScrabble.GAME_SEND_STATS         = 'game_send_stats';
    JsScrabble.GAME_BAG_EMPTY          = 'game_bag_empty';
    JsScrabble.GAME_SEND_SPECTATORS    = 'game_send_specs';
    JsScrabble.GAME_SEND_OPTIONS       = 'game_send_options';
    JsScrabble.GAME_OVER               = 'game_over';
    JsScrabble.GAME_TIME_EXPIRE        = 'game_time_expire';
    JsScrabble.GAME_MOVE_TIME_EXPIRE   = 'game_m_time_expire';
    JsScrabble.GAME_SPECTATOR_SET      = 'game_spec_set';
    JsScrabble.GAME_BOOT               = 'game_boot';
    JsScrabble.GAME_DISTRIBUTION       = 'game_dist';
    
    // Private Message
    JsScrabble.PRIVATE_MESSAGE_HEADER = 'private_message';
    JsScrabble.PRIVATE_MESSAGE_SEND   = 'private_message_send';
})(window['JsScrabble']);

