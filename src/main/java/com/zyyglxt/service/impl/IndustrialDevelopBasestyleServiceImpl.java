package com.zyyglxt.service.impl;

import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopBasestyleDto;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.DateUtils;
import com.zyyglxt.util.UUIDUtils;
import com.zyyglxt.util.UsernameUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

import com.zyyglxt.dataobject.IndustrialDevelopBasestyle;
import com.zyyglxt.dao.IndustrialDevelopBasestyleMapper;
import com.zyyglxt.service.IndustrialDevelopBasestyleService;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author lrt
 * @Date 2020/11/6 20:00
 * @Version 1.0
 **/
@Service
@Slf4j
public class IndustrialDevelopBasestyleServiceImpl implements IndustrialDevelopBasestyleService {

    @Resource
    private IndustrialDevelopBasestyleMapper industrialDevelopBasestyleMapper;

    @Resource
    private IFileService fileService;

    @Resource
    private UsernameUtil usernameUtil;



    @Override
    public int deleteByPrimaryKey(Integer itemid, String itemcode) {
        return industrialDevelopBasestyleMapper.deleteByPrimaryKey(itemid, itemcode);
    }

    @Override
    public int insert(IndustrialDevelopBasestyle record) {
        return industrialDevelopBasestyleMapper.insert(record);
    }

    @Override
    public int insertSelective(IndustrialDevelopBasestyle record) {
        if(record == null){
            record.setItemcode(UUIDUtils.getUUID());
        }
        record.setCreater(usernameUtil.getOperateUser());
        record.setItemcreateat(DateUtils.getDate());
        record.setUpdater(usernameUtil.getOperateUser());
        record.setOrgCode(usernameUtil.getOrgCode());
        log.warn("aaaaaaaaaaaaaaaaaaaaaaaaa:::::"+fileService.selectFileByDataCode(record.getItemcode()).getItemcode());
        record.setFileCode(fileService.selectFileByDataCode(record.getItemcode()).getItemcode());
        return industrialDevelopBasestyleMapper.insertSelective(record);
    }

    @Override
    public IndustrialDevelopBasestyle selectByPrimaryKey(Integer itemid, String itemcode) {
        return industrialDevelopBasestyleMapper.selectByPrimaryKey(itemid, itemcode);
    }

    @Override
    public int updateByPrimaryKeySelective(IndustrialDevelopBasestyle record) {
        return industrialDevelopBasestyleMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(IndustrialDevelopBasestyle record) {
        return industrialDevelopBasestyleMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<IndustrialDevelopBasestyleDto> selectAll() {
        List<IndustrialDevelopBasestyleDto> resList = new ArrayList<>();
        List<IndustrialDevelopBasestyle> list = industrialDevelopBasestyleMapper.selectAll();
        for (IndustrialDevelopBasestyle item : list){
            IndustrialDevelopBasestyleDto obj = new IndustrialDevelopBasestyleDto();
            BeanUtils.copyProperties(item,obj);
            obj.setFilePath(fileService.selectFileByDataCode(item.getItemcode()).getFilePath());
            resList.add(obj);
        }
        return resList;
    }

}
