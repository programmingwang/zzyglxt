package com.zyyglxt.util;


import com.zyyglxt.error.EmBusinessError;

import java.io.Serializable;

/**
 * @Description: 统一返回实体
 */
public class JsonResult<T> implements Serializable {
    private Boolean success;
    private Integer code;
    private String msg;
    private T data;

    public JsonResult() {
    }

    public JsonResult(boolean success) {
        this.success = success;
        this.code = success ? EmBusinessError.success.getErrCode() : EmBusinessError.fail.getErrCode();
        this.msg = success ? EmBusinessError.success.getErrMsg() : EmBusinessError.fail.getErrMsg();
    }

    public JsonResult(boolean success, EmBusinessError resultEnum) {
        this.success = success;
        this.code = success ? EmBusinessError.success.getErrCode() : (resultEnum == null ? EmBusinessError.fail.getErrCode() : resultEnum.getErrCode());
        this.msg = success ? EmBusinessError.success.getErrMsg() : (resultEnum == null ? EmBusinessError.fail.getErrMsg() : resultEnum.getErrMsg());
    }

    public JsonResult(boolean success, T data) {
        this.success = success;
        this.code = success ? EmBusinessError.success.getErrCode() : EmBusinessError.fail.getErrCode();
        this.msg = success ? EmBusinessError.success.getErrMsg() : EmBusinessError.fail.getErrMsg();
        this.data = data;
    }

    public JsonResult(boolean success, EmBusinessError resultEnum, T data) {
        this.success = success;
        this.code = success ? EmBusinessError.success.getErrCode() : (resultEnum == null ? EmBusinessError.fail.getErrCode() : resultEnum.getErrCode());
        this.msg = success ? EmBusinessError.success.getErrMsg() : (resultEnum == null ? EmBusinessError.fail.getErrMsg() : resultEnum.getErrMsg());
        this.data = data;
    }

    public Boolean getsuccess() {
        return success;
    }

    public void setsuccess(Boolean success) {
        this.success = success;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
