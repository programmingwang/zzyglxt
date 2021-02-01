package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseMedicineDOMapper;
import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.dto.ChineseMedicineDto;
import com.zyyglxt.dto.StatusDto;
import com.zyyglxt.error.BusinessException;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.service.IChineseMedicineService;
import com.zyyglxt.util.UsernameUtil;
import com.zyyglxt.validator.ValidatorImpl;
import com.zyyglxt.validator.ValidatorResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/30 11:51
 */
@Service
public class ChineseMedicineServiceImpl implements IChineseMedicineService {

    @Resource
    private ChineseMedicineDOMapper chineseMedicineDOMapper;
    @Autowired
    private ValidatorImpl validator;
    @Autowired
    private UsernameUtil usernameUtil;
    /*
    新建名老中医
     */
    @Override
    public int addChineseMedicine(ChineseMedicineDO chineseMedicineDO) {
        ValidatorResult result = validator.validate(chineseMedicineDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        chineseMedicineDO.setItemcreateat(new Date());
        chineseMedicineDO.setCreater(usernameUtil.getOperateUser());
        chineseMedicineDO.setUpdater(usernameUtil.getOperateUser());
        return chineseMedicineDOMapper.insertSelective(chineseMedicineDO);
    }

    /*
    更改名老中医信息
     */
    @Override
    public int updateChineseMedicine(ChineseMedicineDO chineseMedicineDO) {
        ValidatorResult result = validator.validate(chineseMedicineDO);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        chineseMedicineDO.setUpdater(usernameUtil.getOperateUser());
        return chineseMedicineDOMapper.updateByPrimaryKeySelective(chineseMedicineDO);
    }

    /*
    删除名老中医
    */
    @Override
    public int deleteChineseMedicine(ChineseMedicineDOKey chineseMedicineDOKey) {
        ValidatorResult result = validator.validate(chineseMedicineDOKey);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return chineseMedicineDOMapper.deleteByPrimaryKey(chineseMedicineDOKey);
    }

    /*查询所有名老中医*/
    @Override
    public List<ChineseMedicineDto> selectAllChineseMedicine(List<String> chineseMedicineStatus) {
        List<ChineseMedicineDto> list = new ArrayList<>();
        for (String status : chineseMedicineStatus) {
            list.addAll(chineseMedicineDOMapper.selectByStatus(status));
        }
        return list;
    }

    /*根据关键字搜索名老中医，在名字、类型、职称、主要就诊、科室、医院中搜索
    * 搜索某个科室或医院列出该科室或医院下的所有名老中医
    * */
    @Override
    public List<ChineseMedicineDto> searchChineseMedicine(String keyWord) {
        if(keyWord == "" || keyWord == null){
            throw new BusinessException("关键字不能为空", EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        return chineseMedicineDOMapper.searchChineseMedicine(keyWord);
    }

    @Override
    public List<ChineseMedicineDto> selectBySpecialtyCode(String specialtyCode) {
        return chineseMedicineDOMapper.selectBySpecialtyCode(specialtyCode);
    }

    @Override
    public int updateStatus(StatusDto statusDto) {
        ValidatorResult result = validator.validate(statusDto);
        if(result.isHasErrors()){
            throw new BusinessException(result.getErrMsg(), EmBusinessError.PARAMETER_VALIDATION_ERROR);
        }
        statusDto.setUpdater(usernameUtil.getOperateUser());
        return chineseMedicineDOMapper.updateStatusByPrimaryKey(statusDto);
    }

}
