package com.zyyglxt.util;

import com.zyyglxt.dataobject.ResourcesDO;

import java.util.ArrayList;
import java.util.List;

/**
 * @Author wanglx
 * @Date 2020/10/31 0031 17:44
 * @Version 1.0
 */
public class MenuTreeUtil {
    private List<ResourcesDO> nodes;
    private List<ResourcesDO> checknodes;

    /**
     * 创建一个新的实例 Tree.
     *
     * @param nodes 将树的所有节点都初始化进来。
     */
    public MenuTreeUtil(List<ResourcesDO> nodes, List<ResourcesDO> checknodes) {
        this.nodes = nodes;
        this.checknodes = checknodes;
    }

    /**
     * buildTree
     * 描述: 创建树
     *
     * @return List<Map < String , Object>>
     * @throws
     * @since 1.0.0
     */
    public List<ResourcesDO> buildTreeGrid() {
        List<ResourcesDO> list = new ArrayList<>();
        for (ResourcesDO node : nodes) {
            //这里判断父节点，需要自己更改判断
            if (node.getResourcePcode().toString().equals("root")) {
                List<ResourcesDO> childs = buildTreeGridChilds(node);
                node.setResourcesDOList(childs);
                list.add(node);
            }
        }
        return list;
    }

    /**
     * buildChilds
     * 描述: 创建树下的节点。
     *
     * @param node
     * @return List<Map < String , Object>>
     * @throws
     * @since 1.0.0
     */
    private List<ResourcesDO> buildTreeGridChilds(ResourcesDO node) {
        List<ResourcesDO> list = new ArrayList<>();
        List<ResourcesDO> childNodes = getChilds(node);
        for (ResourcesDO childNode : childNodes) {
            //System.out.println("childNode"+childNode.getMenuName());
            List<ResourcesDO> childs = buildTreeGridChilds(childNode);
            childNode.setResourcesDOList(childs);
            list.add(childNode);
        }
        return list;
    }

    /**
     * getChilds
     * 描述: 获取子节点
     *
     * @param parentNode
     * @return List<Resource>
     * @throws
     * @since 1.0.0
     */
    public List<ResourcesDO> getChilds(ResourcesDO parentNode) {
        List<ResourcesDO> childNodes = new ArrayList<ResourcesDO>();
        for (ResourcesDO node : nodes) {
            //System.out.println(node.getParentId()+"-------"+parentNode.getId());
            //子节点和父节点作对比
            if (node.getResourcePcode().equals(parentNode.getResourceLevel())) {
                childNodes.add(node);
            }
        }
        return childNodes;
    }
}
