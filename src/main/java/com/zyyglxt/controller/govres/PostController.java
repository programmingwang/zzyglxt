package com.zyyglxt.controller.govres;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dataobject.PostDO;
import com.zyyglxt.dataobject.PostDOKey;
import com.zyyglxt.dto.PostDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.service.IPostService;
import com.zyyglxt.util.ConvertDOToDTOUtil;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * Author:wangzh
 * Date: 2020/12/19 22:38
 * Version: 1.0
 * 发文管理
 */
@RestController
@RequestMapping(value = "post")
@Api(tags = "发文管理")
public class PostController {
    @Resource
    IPostService postService;

    @Resource
    IFileService fileService;

    //查询所有发文信息
    @GetMapping(value = "/getPost")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="查询所有发文信息",logLevel ="1",creater ="",updater = "")
    public ResponseData getPost(@RequestParam(value = "postDataStatus") List postDataStatus){
        List<PostDO> postDOS = postService.getPost(postDataStatus);
        List<PostDto> postDtos = new ArrayList<>();
        for (PostDO postDO : postDOS) {
            FileDO fileDO = fileService.selectFileByDataCode(postDO.getItemcode());
            postDtos.add(
                    ConvertDOToDTOUtil.convertFromDOToDTO(
                            postDO, fileDO.getFilePath(), fileDO.getFileName()));
        }
        return new ResponseData(EmBusinessError.success,postDtos);
    }

    //添加发文信息
    @RequestMapping(value = "/createPost", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="添加发文信息",logLevel ="3",creater ="",updater = "")
    public ResponseData createPost(@RequestBody PostDO postDO){
        postService.createPost(postDO);
        return new ResponseData(EmBusinessError.success);
    }

    //修改发文信息
    @RequestMapping(value = "/updatePost", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="修改发文信息",logLevel ="2",creater ="",updater = "")
    public ResponseData updatePost(@RequestBody PostDO postDO) {
        postService.updatePost(postDO);
        return new ResponseData(EmBusinessError.success);
    }

    //删除发文信息
    @RequestMapping(value = "/delPost", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除发文信息",logLevel ="4",creater ="",updater = "")
    public ResponseData delPost(PostDOKey key) {
        postService.delPost(key);
        return new ResponseData(EmBusinessError.success);
    }

    //查询文号的最大值
    @GetMapping(value = "/maxNum")
    @ResponseBody
    public ResponseData maxNum(){
        PostDO max = postService.maxNum();
        return new ResponseData(EmBusinessError.success,max);
    }

}
