package com.zyyglxt.validator;


import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Component;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import java.util.Set;


@Component
public class ValidatorImpl implements InitializingBean {

    private Validator validator;

    @Override
    public void afterPropertiesSet() throws Exception{
        //将hibernate validator通过工厂的初始化方式使其初始化
        this.validator = Validation.buildDefaultValidatorFactory().getValidator();

    }


    //实现校验方法并返回校验结果
    public ValidatorResult validate(Object bean,Class<?>... group){
        ValidatorResult result = new ValidatorResult();
        Set<ConstraintViolation<Object>> validateSet = validator.validate(bean,group);
        if(validateSet.size()> 0){
            result.setHasErrors(true);
            validateSet.forEach(validate -> {
                String errMsg = validate.getMessage();
                String propertyName = validate.getPropertyPath().toString();
                result.getErrorMsgMap().put(propertyName,errMsg);
            });
        }
        return result;
    }

}
