package com.zyyglxt.controller.dataDOController;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.DataDO;
import com.zyyglxt.dataobject.DataDOKey;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dto.DataDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IDataLeaderService;
import com.zyyglxt.service.IFileService;
import org.springframework.beans.BeanUtils;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

/**
 * @Author wanglx
 * 领导讲话控制器
 */
@RestController
@RequestMapping("/datado/leader")
public class DataLeaderController {
    @Resource
    IDataLeaderService iDataLraderService;

    @Resource
    private IFileService fileService;

    /**
     * 查看领导讲话的所有数据
     * @return
     */
    @RequestMapping(value = "/selectAll", method = RequestMethod.GET)
    @LogAnnotation(appCode ="",logTitle ="查看所有领导讲话的数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectLeaderList(@RequestParam(value = "dataStatus") List dataStatus){
        return new ResponseData(EmBusinessError.success,iDataLraderService.selectLeaderList(dataStatus));
    }

    /**
     * 删除领导讲话记录
     * @param itemID
     * @param itemCode
     */
    @RequestMapping(value = "/deleteByPrimaryKey/{itemID}/{itemCode}", method = RequestMethod.DELETE)
    @LogAnnotation(appCode ="",logTitle ="删除领导讲话记录",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteByPrimaryKey(@PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        iDataLraderService.deleteLeader(dataDOKey);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 增加领导讲话记录
     * @param record
     */
    @RequestMapping(value = "/insertLeader", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="增加领导讲话记录",logLevel ="3",creater ="",updater = "")
    public ResponseData insertLeader(@RequestBody DataDO record) {
        iDataLraderService.insertLeader(record);
        return new ResponseData(EmBusinessError.success);
    }

    /**
     * 更新领导讲话记录
     * @param record
     */
    @RequestMapping(value = "/updateLeader", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="更新领导讲话记录",logLevel ="2",creater ="",updater = "")
    public ResponseData updateLeader(@RequestBody DataDO record) {
        iDataLraderService.updateLeader(record);
        return new ResponseData(EmBusinessError.success);
    }

    //修改展示状态
    @RequestMapping(value = "/changeLeaderStatus/{itemID}/{itemCode}", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="修改展示状态",logLevel ="2",creater ="",updater = "")
    public ResponseData changeStatus(@RequestParam(value = "dataDelayedRelease",required = false) String dataDelayedRelease, @RequestParam("dataStatus") String dataStatus, @PathVariable("itemID") Integer itemID, @PathVariable("itemCode")String itemCode){
        DataDOKey dataDOKey = new DataDOKey();
        dataDOKey.setItemid(itemID);
        dataDOKey.setItemcode(itemCode);
        iDataLraderService.changeStatus(dataDOKey,dataDelayedRelease,dataStatus);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/selectLeaderMain")
    @LogAnnotation(appCode ="",logTitle ="查询首页前五条领导讲话的数据",logLevel ="1",creater ="",updater = "")
    public ResponseData selectRegulationForMain(){
        return new ResponseData(EmBusinessError.success,iDataLraderService.selectForMainPage());
    }


    private List<DataDto> DoToDto(List<DataDO> DOList){
        List<DataDto> DtoList = new ArrayList<>();
        if (!DOList.isEmpty()){
            for (DataDO DO:DOList){
                DataDto Dto = new DataDto();
                BeanUtils.copyProperties(DO,Dto);
                FileDO fileDO= fileService.selectFileByDataCode(Dto.getItemcode());
                Dto.setFileName(fileDO == null ? null:fileDO.getFileName());
                Dto.setFilePath(fileDO == null ? null:fileDO.getFilePath());
                DtoList.add(Dto);
            }
        }
        return DtoList;
    }
}
