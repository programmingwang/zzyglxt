package com.zyyglxt;

import com.zyyglxt.dao.DataDOMapper;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

@SpringBootTest
class ZyyglxtApplicationTests {

    @Resource
    private DataDOMapper dataDOMapper;

    @Test
    void contextLoads() {
    }

    @Test
    void insertSelective(){
        DataDO dataDO = new DataDO();
        dataDO.setItemid(1);
        dataDO.setItemcode("2");
        int aa = dataDOMapper.insertSelective(dataDO);
        System.out.println(aa);
    }



}
