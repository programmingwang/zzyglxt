package com.zyyglxt.error;


/**
 * Author:wangzh
 * Date: 2020/11/1 14:54
 * Version: 1.0
 */
public enum EmBusinessError implements CommonError {
    fail(99999, "服务器内部开了点小差，请重试。。。。。"),                 //此错误代码仅仅可用于，拦截到未知异常，其他业务异常请自行定义
    success(88888, "请求处理成功"),  //特殊
    //错误信息只需要向下延申就行了
    //通用错误类型一般是10001
    //因为很多地方要用到参数校验，这个通用错误码就很方便，但是msg不一定都是一样的，于是会有
    //一个方案去改动这个errMsg
    PARAMETER_VALIDATION_ERROR(10001, "参数不合法"),

    UNKNOWN_ERROR(10000, "未知错误"),

    //用20000开头来表示用户模块的错误信息
    USER_NOT_LOGIN(20001, "用户未登录"),
    USER_LOGIN_FAILED(20002, "登录失败，用户名或密码错误"),
    USER_REGISTER_FAILED(20003, "注册失败，用户名已存在"),
    MOBILEPHONE_ERROR(20004, "手机号码错误"),
    INPUT_NOT_NULL(20005, "输入不能为空"),
    OLDPASSWORD_ERROR(20006, "原密码错误"),
    NEWPASSWORD_NOT_(20006, "原密码错误")
    ;

    EmBusinessError(int errCode, String msg) {
        this.errCode = errCode;
        this.errMsg = msg;
    }

    private int errCode;
    private String errMsg;

    @Override
    public int getErrCode() {
        return this.errCode;
    }

    @Override
    public String getErrMsg() {
        return this.errMsg;
    }

    @Override
    public CommonError setErrMsg(String errMsg) {
        this.errMsg = errMsg;
        return this;
    }
}
