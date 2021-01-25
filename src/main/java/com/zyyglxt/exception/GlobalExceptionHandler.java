package com.zyyglxt.exception;

import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * Author:wangzh
 * Date: 2020/11/1 14:54
 * Version: 1.0
 */
@ControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 处理自定义的业务异常
     * @param e
     * @return
     */
    @ExceptionHandler(value = BusinessException.class)
    @ResponseBody
    public ResponseData bizExceptionHandler(BusinessException e){
        logger.error("发生业务异常！原因是：{}",e.getErrMsg());
        return new ResponseData(e);
    }


    /**
     * 处理其他异常
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public ResponseData exceptionHandler(Exception e){
        if(StringUtils.contains(e.getMessage(),"Field error in object 'fileDto' on field 'file': rejected value [undefined]; codes [typeMismatch.fileDto.file,typeMismatch.file,typeMismatch.org.springframework.web.multipart.MultipartFile,typeMismatch];")){
            return new ResponseData(EmBusinessError.NO_FILE_UPLOAD);
        }
        logger.error("未知异常！原因是:",e);
        return new ResponseData();
    }

    /**
     * 处理图片空参异常
     * @param e
     * @return
     */
    @ExceptionHandler(value =org.springframework.validation.BindException.class)
    @ResponseBody
    public ResponseData blankFileExceptionHandler(org.springframework.validation.BindException e){
        logger.error("未知异常！原因是:",e);
        return new ResponseData("上传的图片或者附件不能为空！");
    }

    /**
     * 处理权限不足异常
     * @param e
     * @return
     */
    @ExceptionHandler(value = AccessDeniedException.class)
    @ResponseBody
    public ResponseData accessDeniedExceptionHandler(AccessDeniedException e){
        logger.error("发生权限异常！原因是：{}",e);
        return new ResponseData(EmBusinessError.NO_PERMISSION);
    }

}
