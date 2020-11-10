package com.zyyglxt.response;

import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import lombok.Data;

import java.io.Serializable;

/**
 *
 /**
 * Author:wangzh
 * Date: 2020/11/1 14:54
 *
 * @Description:接口调用返回内容实体
 * 包含code msg 和一个OBJECT
 * code 和 msg 为接口处理成功与否的  编码和描述
 * 构造方法 可传入【返回信息枚举类】和自定义异常类进行 初始化。
 *
 * PS :
 * 此处构造函数，特意规定只接受以上两个参数，修改此处需通知全体研发成员，
 *
 */

@Data
public class ResponseData implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer code;
    private String msg;
    private Object data;

    public ResponseData(EmBusinessError emBusinessError, Object data){
        this.code = emBusinessError.getErrCode();
        this.msg = emBusinessError.getErrMsg();
        this.data = data;
    }

    public ResponseData(EmBusinessError emBusinessError){
        this.code = emBusinessError.getErrCode();
        this.msg = emBusinessError.getErrMsg();
    }


    public ResponseData(BusinessException be){
        this.code = be.getErrCode();
        this.msg = be.getErrMsg();
    }

    public ResponseData(){
        this.code = EmBusinessError.fail.getErrCode();
        this.msg = EmBusinessError.fail.getErrMsg();
    }

}
