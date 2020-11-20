package com.zyyglxt.service.impl;

import com.zyyglxt.dao.FileDOMapper;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.FileDOKey;
import com.zyyglxt.dto.FileDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 17:52
 */
@Service
public class FileServiceImpl implements IFileService {


    @Resource
    private FileDOMapper fileDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Resource
    private IFileService fileService;

    @Override
    public int addFile(FileDO fileDO) {
        ValidatorResult result = validator.validate(fileDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        fileDO.setItemcreateat(new Date());
        return fileDOMapper.insertSelective(fileDO);
    }

    @Override
    public int updateFile(FileDO fileDO) {
        ValidatorResult result = validator.validate(fileDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.updateByPrimaryKeySelective(fileDO);
    }

    @Override
    public int deleteFileByKey(FileDOKey fileDOKey) {
        ValidatorResult result = validator.validate(fileDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.deleteByPrimaryKey(fileDOKey);
    }

    @Override
    public FileDO selectFileByDataCode(String dataCode) {
        if(dataCode == null || dataCode == ""){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        FileDO fileDO = fileDOMapper.selectFileByDataCode(dataCode);
        if(fileDO == null){
            return new FileDO();
        }
        return fileDO;
    }

    @Override
    public int deleteFileByDataCode(String dataCode) {
        if(dataCode == null || dataCode == ""){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.deleteByDataCode(dataCode);
    }

    @Override
    public void uploadFile(FileDO fileDO) {
        ValidatorResult result = validator.validate(fileDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        FileDO f = fileDOMapper.selectFileByDataCode(fileDO.getDataCode());
        /*对文件上传记录表操作，记录上传信息*/
        if (f == null){
            fileService.addFile(fileDO);
        }
        else {
            fileService.updateFile(fileDO);
        }
    }

    @Override
    public List<FileDO> selectMultipleFileByDataCode(String dataCode) {
        if(dataCode == null || dataCode == ""){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        List<FileDO> fileDOList = fileDOMapper.selectMultipleFileByDataCode(dataCode);
        if(fileDOList == null){
            return new ArrayList<>();
        }
        return fileDOList;
    }


}
