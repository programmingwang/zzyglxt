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
    /* 用户错误 */
    USER_ACCOUNT_EXPIRED(2002, "账号已过期"),
    USER_NOT_LOGIN(20001, "用户未登录"),
    USER_CREDENTIALS_ERROR(2003, "密码错误"),
    USER_CREDENTIALS_EXPIRED(2004, "密码过期"),
    USER_ACCOUNT_DISABLE(2005, "账号不可用"),
    USER_ACCOUNT_LOCKED(2006, "账号被锁定"),
    USER_ACCOUNT_NOT_EXIST(2007, "账号不存在"),
    USER_ACCOUNT_ALREADY_EXIST(2008, "账号已存在"),
    USER_ACCOUNT_USE_BY_OTHERS(2009, "账号下线"),
    USER_REGISTER_FAILED(2010, "注册失败"),
    MOBILEPHONE_ERROR(2011, "手机号不正确"),
    IDNO_ERROR(2011, "身份证号不正确"),
    USER_LOGIN_FAILED(2012, "登陆失败"),
    MODIFY_USER_MESSAGE_FAILED(2013, "修改用户信息失败"),
    OLDPASSWORD_ERROR(2014, "旧密码错误"),
    INPUT_NOT_NULL(2015, "密码输入不能为空，请重新输入"),
    NEWPASSWORD_NOT_EQUAL(2016, "两次输入的新密码不一致，请重新输入"),
    ORG_NAME_ERROR(2016, "企业名称错误，请检查是否与注册时一致"),
    /* 业务错误 */
    NO_PERMISSION(10002, "没有权限"),
    INTEGRITY_CONSTRAINT_ERROE(40001,"违反数据完整性，请检查是否有其他数据关联"),
    NO_FILE_UPLOAD(1003,"没有文件上传，如需上传请编辑上传！")



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
