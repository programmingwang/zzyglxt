package com.zyyglxt.dao;

import com.zyyglxt.dataobject.IndustrialDevelopTalRecDO;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOKey;
import com.zyyglxt.dataobject.IndustrialDevelopTalRecDOWithBLOBs;

import java.util.List;

public interface IndustrialDevelopTalRecDOMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_industrial_develop_tal_rec
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int deleteByPrimaryKey(IndustrialDevelopTalRecDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_industrial_develop_tal_rec
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int insert(IndustrialDevelopTalRecDOWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_industrial_develop_tal_rec
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int insertSelective(IndustrialDevelopTalRecDOWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_industrial_develop_tal_rec
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    IndustrialDevelopTalRecDOWithBLOBs selectByPrimaryKey(IndustrialDevelopTalRecDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_industrial_develop_tal_rec
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKeySelective(IndustrialDevelopTalRecDOWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_industrial_develop_tal_rec
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKeyWithBLOBs(IndustrialDevelopTalRecDOWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_industrial_develop_tal_rec
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKey(IndustrialDevelopTalRecDO record);

    List<IndustrialDevelopTalRecDOWithBLOBs> selectByPage(int start, int end);

    List<IndustrialDevelopTalRecDOWithBLOBs> selectAll();
}