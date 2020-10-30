package com.zyyglxt;

import com.zyyglxt.dao.HospDOMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.HospDOKey;
import com.zyyglxt.service.IHospService;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
class ZyyglxtApplicationTests {

    @Resource
    IHospService hospService;
    @Resource
    HospDOMapper hospDOMapper;

    @Test
    void hosp(){
        HospDOKey hospDOKey = new HospDOKey();
        hospDOKey.setItemid(123456);
        hospDOKey.setItemcode("123456");
        hospDOMapper.deleteByPrimaryKey(hospDOKey);
    }

    @Test
    void hosp1(){
        List<HospDO> hospDOList = hospService.searchHosp("医");
        for (HospDO hospDO:hospDOList){
            System.out.println(hospDO.getHospitalName());
        }
    }

    @Test
    void hosp2(){
        List<HospDO> hospDOList = hospService.getAllHosp();
        for (HospDO hospDO:hospDOList){
            System.out.println(hospDO.getHospitalName());
        }
    }
}
