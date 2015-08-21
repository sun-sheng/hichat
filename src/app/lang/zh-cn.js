module.exports = function () {
  return {
    global: {
      text: {
        ok: '确认',
        cancel: '取消',
        search: '搜索',
        loading: '正在加载中…',
        modal_title: '提醒',
        success: '成功',
        failure: '失败',
        back_button_warn: '再按一次退出应用'
      },
      error: {
        only_support_mobile: '只支持移动设备'
      },
      attachment: {
        upload_success: '附件上传成功',
        upload_failure: '附件上传失败',
        had_selected: '附件已经选取过了',
        remove_success: '删除附件成功',
        remove_failure: '删除附件失败',
        select_failure: '附件选取失败',
        exceed_max_count: '最多上传5个附件'
      },
      camera: {
        get_picture_failure: '图片选取失败'
      }
    },
    user: {
      login_fail: ''
    },
    order: {
      load_sn_list_failure: '加载流水号列表失败',
      load_delivering_list_failure: '加载配送单列表失败',
      load_exception_list_failure: '加载异常配送单列表失败',
      load_detail_failure: '配送单详细信息加载失败',
      create_success: '配送单创建成功',
      create_failure: '配送单创建失败',
      create_some_failure: '部分配送单创建失败',
      scan_failure: '扫码失败',
      take_sn_failure: '取走流水号失败',
      call_receiver_success: '呼叫用户失败',
      call_receiver_failure: '呼叫用户失败',
      mark_normal_success: '已将配送单恢复为正常',
      mark_normal_failure: '配送单恢复正常失败',
      mark_exception_success: '已将配送单标记为异常',
      mark_exception_failure: '配送单标记异常失败',
      confirm_deliver_success: '确认送达成功',
      confirm_deliver_failure: '确认送达失败',
      cancel_deliver_success: '取消配送成功',
      cancel_deliver_failure: '取消配送失败'
    },
    geo: {
      loading_geo: '正在获取您所在的位置...',
      permission_denied: '您拒绝了系统定位的权限申请',
      position_unavailable: '无法获取到您所在的地理位置信息',
      timeout: '获取地理位置信息超时',
      confirm_clean_geo: '您将清除定位的地理信息'
    }
  };
};