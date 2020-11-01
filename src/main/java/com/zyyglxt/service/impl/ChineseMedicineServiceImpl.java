package com.zyyglxt.service.impl;

import com.zyyglxt.dao.ChineseMedicineDOMapper;
import com.zyyglxt.dataobject.ChineseMedicineDO;
import com.zyyglxt.dataobject.ChineseMedicineDOKey;
import com.zyyglxt.service.IChineseMedicineService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;
import java.util.UUID;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/10/30 11:51
 */
@Service
public class ChineseMedicineServiceImpl implements IChineseMedicineService {

    @Resource
    ChineseMedicineDOMapper chineseMedicineDOMapper;

    /*
    新建名老中医
     */
    @Override
    public int addChineseMedicine(ChineseMedicineDO chineseMedicineDO) {
        chineseMedicineDO.setItemcode(UUID.randomUUID().toString());
        return chineseMedicineDOMapper.insertSelective(chineseMedicineDO);
    }

    /*
    更改名老中医信息
     */
    @Override
    public int updateChineseMedicine(ChineseMedicineDO chineseMedicineDO) {
        return chineseMedicineDOMapper.updateByPrimaryKeySelective(chineseMedicineDO);
    }

    /*
    删除名老中医
    */
    @Override
    public int deleteChineseMedicine(ChineseMedicineDOKey chineseMedicineDOKey) {
        return chineseMedicineDOMapper.deleteByPrimaryKey(chineseMedicineDOKey);
    }

    /*查询所有名老中医*/
    @Override
    public List<ChineseMedicineDO> selectAllChineseMedicine() {
        return chineseMedicineDOMapper.selectAllChineseMedicine();
    }

    /*根据关键字搜索名老中医，在名字、类型、职称、主要就诊、科室、医院中搜索
    * 搜索某个科室或医院列出该科室或医院下的所有名老中医
    * */
    @Override
    public List<ChineseMedicineDO> searchChineseMedicine(String keyWord) {
        return chineseMedicineDOMapper.searchChineseMedicine(keyWord);
    }

    /*查询最新增加的五条记录*/
    @Override
    public List<ChineseMedicineDO> top5ChineseMedicine() {
        return chineseMedicineDOMapper.top5ChineseMedicine();
    }
}
