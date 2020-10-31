package com.zyyglxt.permissionsService;

import com.zyyglxt.dataobject.ResourcesDO;
import com.zyyglxt.dataobject.ResourcesDOKey;

import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/29 0029 11:58
 * @Version 1.0
 */
public interface ResourcesService {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table resource
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int deleteByPrimaryKey(ResourcesDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table resource
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int insert(ResourcesDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table resource
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int insertSelective(ResourcesDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table resource
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    ResourcesDO selectByPrimaryKey(ResourcesDOKey key);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table resource
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKeySelective(ResourcesDO record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table resource
     *
     * @mbg.generated Wed Oct 28 16:25:52 CST 2020
     */
    int updateByPrimaryKey(ResourcesDO record);

    /**
     * 查询所有Resources
     * @return
     */
    List<ResourcesDO> selectAllResources();

    /**
     * 根据等级或父节点查询菜单信息
     * @param level 等级
     * @param parentid 父节点编号
     * @return 菜单信息
     */
    List<ResourcesDO> selectMenuByLevelOrParentid(Character level,Character parentid);

    /**
     * 查询菜单（父子菜单对应形式）
     * @return
     */
    List<ResourcesDO> SelectMenuByparent(ResourcesDO m,String level,String parentid);
}
