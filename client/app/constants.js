/**
 * 定义全局常量
 * @type {{EVENT_NAME: {}, STORAGE_KEY: {}}}
 */
module.exports = {
  //事件名称
  EVENT_NAME: {
    CACHE_CLEAR: 'cache_clear',
    USER_INVALID: 'user_invalid',
    PULL_TO_REFRESH: 'pull_to_refresh',
    DIALOGUE: 'dialogue',
    DIALOGUES: 'dialogues'
  },
  //angular-forage key
  FORAGE_KEY: {
    CURRENT_USER: 'current_user@user',
    //VERSION_REMINDER: 'version@reminder',
    CONTACTS: 'contacts@user',
    HR_BU_DICT: 'hr_bu_dict@user',
    HR_BU_TYPE_DICT: 'hr_bu_type_dict@user',
    HR_ROLE_DICT: 'hr_role_dict@user',
    RST_STATUS_DICT: 'rst_status_dict@user',
    RST_GROUP_LIST: 'rst_group_list@user',
    ORDER_ZONE_LIST: 'order_zone_list@user',
    WORKTABLE_THIRD_PARTY: 'worktable_third_party@user',
    DIALOGUES_PREFIX: 'dialogues-',
    DIALOGUES_POSTFIX: '@user',
    CHATS: 'chats@user',
    CHAT_PREFIX: 'chat-',
    CHAT_POSTFIX: '@user'
  },

  //浏览器 localStorage key : 仅在同步调用时使用
  LOCAL_STORAGE_KEY: {
    RE_LOGIN: 'eve#re_login',
    RE_ASK_PERMISSION: 'eve#re_ask_permission',
    ACTIVE_TAB_INDEX: 'eve#active_tab_index',
    CURRENT_USER: 'eve#current_user'
  },
  USER_EMAIL_POSTFIX: '@ele.me',

  ERROR: {
    GET_PUSH_TOKEN_FAILED: {
      code: 'get_push_token_failed',
      msg: '获取推送令牌失败'
    },
    UNAUTHORIZED: {
      code: 401,
      msg: '用户认证失败'
    },
    FORBIDDEN: {
      code: 403,
      msg: '没有权限'
    }
  }
};