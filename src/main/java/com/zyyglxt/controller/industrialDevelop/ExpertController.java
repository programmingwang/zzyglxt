package com.zyyglxt.controller.industrialDevelop;

import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.*;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopExpertDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IIndustrialDevelopExpertService;
import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**i
 * @Author zs
 * @Date 2020/11/15 17:08
 * @Version 1.0
 **/
@Api(tags = "产业发展-专家信息")
@RestController
@RequestMapping(value = "industrialdevelop")
public class ExpertController {
    @Resource
    IIndustrialDevelopExpertService industrialExpertService;


    @RequestMapping(value = "/expert/insert", method = RequestMethod.POST)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="产业发展-专家管理-新增专家账号",logLevel ="3",creater ="",updater = "")
        public ResponseData addExpert(@RequestBody IndustrialDevelopExpertDto industrialDevelopExpertDto) {
        industrialExpertService.addExpert(industrialDevelopExpertDto);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert/resetPassword/{itemID}/{itemCode}", method = RequestMethod.PUT)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="产业发展-专家管理-重置密码",logLevel ="2",creater ="",updater = "")
    public ResponseData resetPassword(@PathVariable("itemID") Integer itemid,@PathVariable("itemCode") String itemCode) {
        industrialExpertService.resetPassword(itemid,itemCode);
        return new ResponseData(EmBusinessError.success);
    }

    @RequestMapping(value = "/expert/delete/{itemCode}", method = RequestMethod.DELETE)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="产业发展-专家管理-删除",logLevel ="4",creater ="",updater = "")
    public ResponseData delExpert(@PathVariable("itemCode") String itemCode) {
        industrialExpertService.delExpert(itemCode);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/expert/selectAll")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="产业发展-专家管理-显示所有信息",logLevel ="1",creater ="",updater = "")
    public ResponseData getExpert() {
        return new ResponseData(EmBusinessError.success,industrialExpertService.getExperts());
    }

    @RequestMapping(value = "/expert/select/{itemCode}",method = RequestMethod.GET)
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="产业发展-专家管理-查看个人信息",logLevel ="1",creater ="",updater = "")
    public ResponseData selectByPrimaryKey( @PathVariable("itemCode") String itemCode){
        UserDO expertDto = industrialExpertService.selectByPrimaryKey(itemCode);
        return new ResponseData(EmBusinessError.success,expertDto);
    }
}
