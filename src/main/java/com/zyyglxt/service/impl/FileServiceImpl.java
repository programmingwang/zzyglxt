package com.zyyglxt.service.impl;

import com.zyyglxt.dao.FileDOMapper;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.FileDOKey;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/1 17:52
 */
@Service
public class FileServiceImpl implements IFileService {

    @Resource
    FileDOMapper fileDOMapper;
    @Autowired
    private ValidatorImpl validator;

    @Override
    public int addFile(FileDO fileDO) {
        ValidatorResult result = validator.validate(fileDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
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
    public int deleteFile(FileDOKey fileDOKey) {
        ValidatorResult result = validator.validate(fileDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.deleteByPrimaryKey(fileDOKey);
    }

    @Override
    public List<FileDO> selectAllFile() {
        return fileDOMapper.selectAllFile();
    }

    @Override
    public List<FileDO> searchFile(String keyWord) {
        if(keyWord.isEmpty()){
            throw new BusinessException("关键字不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.searchFile(keyWord);
    }

    @Override
    public List<FileDO> top5File() {
        return fileDOMapper.top5File();
    }

    @Override
    public List<FileDO> selectFileByDataCode(String dataCode) {
        if(dataCode.isEmpty()){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.selectFileByDataCode(dataCode);
    }

    @Override
    public FileDO selectFileByDataCodeAndType(String dataCode, String fileType) {
        if(dataCode.isEmpty()){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (fileType.isEmpty()){
            throw new BusinessException("文件类型不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.selectFileByDataCodeAndType(dataCode,fileType);
    }

    @Override
    public FileDO selectFileByDataCodeAndName(String dataCode, String fileName) {
        if(dataCode.isEmpty()){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (fileName.isEmpty()){
            throw new BusinessException("文件名称不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.selectFileByDataCodeAndName(dataCode,fileName);
    }

    @Override
    public int deleteFileByDataCode(String dataCode) {
        if(dataCode.isEmpty()){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.deleteByDataCode(dataCode);
    }

    @Override
    public int deleteFileByDataCodeAndType(String dataCode, String fileType) {
        if(dataCode.isEmpty()){
            throw new BusinessException("数据源code不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        if (fileType.isEmpty()){
            throw new BusinessException("文件类型不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return fileDOMapper.deleteByDataCodeAndType(dataCode,fileType);
    }

}
