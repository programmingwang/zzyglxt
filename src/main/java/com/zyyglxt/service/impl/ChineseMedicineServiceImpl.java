package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseMedicineDOMapper;
import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.service.IChineseMedicineService;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/30 11:51
 */
public class ChineseMedicineServiceImpl implements IChineseMedicineService {

    @Resource
    ChineseMedicineDOMapper chineseMedicineDOMapper;

    @Override
    public int addChineseMedicine(ChineseMedicineDO chineseMedicineDO) {
        return chineseMedicineDOMapper.insertSelective(chineseMedicineDO);
    }

    @Override
    public int updateChineseMedicine(ChineseMedicineDO chineseMedicineDO) {
        return chineseMedicineDOMapper.updateByPrimaryKeySelective(chineseMedicineDO);
    }

    @Override
    public int deleteChineseMedicine(ChineseMedicineDOKey chineseMedicineDOKey) {
        return chineseMedicineDOMapper.deleteByPrimaryKey(chineseMedicineDOKey);
    }

    @Override
    public List<ChineseMedicineDO> selectAllChineseMedicine() {
        return chineseMedicineDOMapper.selectAllChineseMedicine();
    }

    @Override
    public List<ChineseMedicineDO> searchChineseMedicine(String keyWord) {
        return chineseMedicineDOMapper.searchChineseMedicine(keyWord);
    }

    @Override
    public List<ChineseMedicineDO> top5ChineseMedicine() {
        return chineseMedicineDOMapper.top5ChineseMedicine();
    }
}
