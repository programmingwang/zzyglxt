package com.zyyglxt.controller.govres;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.PostRefDO;
import com.zyyglxt.dataobject.UserDO;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IPostRefService;
import com.zyyglxt.service.UserService;
import com.zyyglxt.util.UsernameUtil;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @Author huangtao
 * @Date 2021/1/2 15:49
 * @Version 1.0
 */
@RestController
@RequestMapping(value = "postref")
@Api(tags = "发文关联关系表")
public class PostRefController {
    @Resource
    IPostRefService iPostRefService;

    @Resource
    UserService userService;

    @Resource
    UsernameUtil usernameUtil;

    //添加发文关联信息
    @RequestMapping(value = "/createPostRef", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加发文关联信息",logLevel ="3",creater ="",updater = "")
    public ResponseData insertSelective(@RequestBody List<PostRefDO> postRefDOList){
        for (PostRefDO postRefDO:postRefDOList){
            iPostRefService.insertSelective(postRefDO);
        }
        return new ResponseData(EmBusinessError.success);
    }

    //删除发文关联信息
    @RequestMapping(value = "/delPostRef", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除发文关联信息",logLevel ="4",creater ="",updater = "")
    public ResponseData delByDateCode(@RequestParam(value = "dateCode") String dateCode, @RequestParam(value = "receiverType") Integer receiverType) {
        iPostRefService.delByDateCode(dateCode,receiverType);
        return new ResponseData(EmBusinessError.success);
    }

    //修改发文关联信息
    @RequestMapping(value = "/updPostRef", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="修改发文关联信息",logLevel ="2",creater ="",updater = "")
    public ResponseData updPostRef(@RequestBody PostRefDO postRefDO) {
        iPostRefService.updPostRef(postRefDO);
        return new ResponseData(EmBusinessError.success);
    }

    //查询主送对象
    @RequestMapping(value = "/getMasterSend", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getMasterSend(@RequestParam(value = "dateCode") List<String> dateCode){
        List<PostRefDO> postRefDO = iPostRefService.getMasterSend(dateCode);
        return new ResponseData(EmBusinessError.success,postRefDO);
    }

    //查询抄送对象
    @RequestMapping(value = "/getCopySend", method = RequestMethod.GET)
    @ResponseBody
    public ResponseData getCopySend(@RequestParam(value = "dateCode") List<String> dateCode){
        List<PostRefDO> postRefDO = iPostRefService.getCopySend(dateCode);
        return new ResponseData(EmBusinessError.success,postRefDO);
    }

    //获取发送的对象
    @LogAnnotation(logTitle = "获取发送对象", logLevel = "1")
    @RequestMapping(value = "/alluser", method = RequestMethod.GET)
    public ResponseData selectAllUser() {
        List<UserDO> users = userService.selectAllUser3(usernameUtil.getItemCode(), usernameUtil.getOperateUser());
        return new ResponseData(EmBusinessError.success, users);
    }
}
