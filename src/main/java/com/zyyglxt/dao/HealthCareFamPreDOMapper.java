package com.zyyglxt.dao;

import com.zyyglxt.dataobject.FamPreDOKey;
import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.HealthCareFamPreDOKey;
import com.zyyglxt.dto.HealthCareFamPreDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface HealthCareFamPreDOMapper {

    int deleteByPrimaryKey(@Param("key")HealthCareFamPreDOKey key);

    int insert(HealthCareFamPreDO record);

    int insertSelective(HealthCareFamPreDO record);

    HealthCareFamPreDO selectByPrimaryKey(HealthCareFamPreDOKey key);

    int updateByPrimaryKeySelective(HealthCareFamPreDO record);

    int updateByPrimaryKeyWithBLOBs(HealthCareFamPreDO record);

    int updateByPrimaryKey(HealthCareFamPreDO record);

    List<HealthCareFamPreDto> selectAllHealthCareFamPre(@Param("status") String status);//查询所有国医话健康所有数据

    int updateVisitNumHealthCareFamPre(HealthCareFamPreDOKey key);

    int changeStatusToCareFam(@Param("key") HealthCareFamPreDOKey key,@Param("status") String status);//国医话健康数据状态
}