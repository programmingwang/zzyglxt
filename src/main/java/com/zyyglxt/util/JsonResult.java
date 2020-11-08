package com.zyyglxt.util;


import com.zyyglxt.error.EmBusinessError;

import java.io.Serializable;

/**
 * @Description: 统一返回实体
 */
public class JsonResult<T> implements Serializable {
    private Boolean success;
    private Integer errorCode;
    private String errorMsg;
    private T data;

    public JsonResult() {
    }

    public JsonResult(boolean success) {
        this.success = success;
        this.errorCode = success ? EmBusinessError.success.getErrCode() : EmBusinessError.fail.getErrCode();
        this.errorMsg = success ? EmBusinessError.success.getErrMsg() : EmBusinessError.fail.getErrMsg();
    }

    public JsonResult(boolean success, EmBusinessError resultEnum) {
        this.success = success;
        this.errorCode = success ? EmBusinessError.success.getErrCode() : (resultEnum == null ? EmBusinessError.fail.getErrCode() : resultEnum.getErrCode());
        this.errorMsg = success ? EmBusinessError.success.getErrMsg() : (resultEnum == null ? EmBusinessError.fail.getErrMsg() : resultEnum.getErrMsg());
    }

    public JsonResult(boolean success, T data) {
        this.success = success;
        this.errorCode = success ? EmBusinessError.success.getErrCode() : EmBusinessError.fail.getErrCode();
        this.errorMsg = success ? EmBusinessError.success.getErrMsg() : EmBusinessError.fail.getErrMsg();
        this.data = data;
    }

    public JsonResult(boolean success, EmBusinessError resultEnum, T data) {
        this.success = success;
        this.errorCode = success ? EmBusinessError.success.getErrCode() : (resultEnum == null ? EmBusinessError.fail.getErrCode() : resultEnum.getErrCode());
        this.errorMsg = success ? EmBusinessError.success.getErrMsg() : (resultEnum == null ? EmBusinessError.fail.getErrMsg() : resultEnum.getErrMsg());
        this.data = data;
    }

    public Boolean getsuccess() {
        return success;
    }

    public void setsuccess(Boolean success) {
        this.success = success;
    }

    public Integer getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(Integer errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMsg() {
        return errorMsg;
    }

    public void setErrorMsg(String errorMsg) {
        this.errorMsg = errorMsg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
