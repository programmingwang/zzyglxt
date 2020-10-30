package com.zyyglxt.service.impl;

import com.zyyglxt.dao.HospSpecialtyRefDOMapper;
import com.zyyglxt.dao.SpecialtyDOMapper;
import com.zyyglxt.dataobject.HospSpecialtyRefDO;
import com.zyyglxt.dataobject.HospSpecialtyRefDOKey;
import com.zyyglxt.dataobject.SpecialtyDO;
import com.zyyglxt.dataobject.SpecialtyDOKey;
import com.zyyglxt.service.ISpecialtyService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/29 17:32
 */
@Service
public class SpecialtyServiceImpl implements ISpecialtyService {

    @Resource
    SpecialtyDOMapper specialtyDOMapper;
    @Resource
    HospSpecialtyRefDOMapper hospSpecialtyRefDOMapper;

    /*在控制层将数据封装好再传进service层*/

    /*增加科室，同时也将科室与医院记录插入*/
    @Override
    public void addSpecialty(SpecialtyDO specialtyDO, HospSpecialtyRefDO hospSpecialtyRefDO) {
        specialtyDOMapper.insertSelective(specialtyDO);
        hospSpecialtyRefDOMapper.insertSelective(hospSpecialtyRefDO);
    }

    /*更新科室信息，同步更新医院科室关系表*/
    @Override
    public void updateSpecialty(SpecialtyDO specialtyDO, HospSpecialtyRefDO hospSpecialtyRefDO) {
        specialtyDOMapper.updateByPrimaryKeySelective(specialtyDO);
        hospSpecialtyRefDOMapper.updateByPrimaryKeySelective(hospSpecialtyRefDO);
    }

    /*删除科室记录，包括科室表和关系表*/
    @Override
    public void deleteSpecialty(SpecialtyDOKey specialtyDOKey, HospSpecialtyRefDOKey hospSpecialtyRefDOKey) {
        hospSpecialtyRefDOMapper.deleteByPrimaryKey(hospSpecialtyRefDOKey);
        specialtyDOMapper.deleteByPrimaryKey(specialtyDOKey);
    }

    /*查询所有科室*/
    @Override
    public List<SpecialtyDO> selectAllSpecialty() {
        return specialtyDOMapper.selectAllSpecialty();
    }

    /*
    搜索关键字，包括专科名，专科介绍，专科所在省市县，手动输入地址，专科所属医院名
     */
    @Override
    public List<SpecialtyDO> searchSpecialty(String keyWord) {
        return specialtyDOMapper.searchSpecialty(keyWord);
    }

    /*查询前五条记录*/
    @Override
    public List<SpecialtyDO> top5Specialty() {
        return specialtyDOMapper.top5Specialty();
    }


}
