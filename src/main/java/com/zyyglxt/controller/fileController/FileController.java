package com.zyyglxt.controller.fileController;

import com.github.tobato.fastdfs.domain.fdfs.StorePath;
import com.github.tobato.fastdfs.service.FastFileStorageClient;
import com.zyyglxt.annotation.LogAnnotation;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dto.FileDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.UsernameUtil;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.annotation.Resource;
import java.io.IOException;
import java.util.List;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/4 16:37
 */
@RestController
@RequestMapping("/file")
public class FileController {
    @Resource
    private IFileService fileService;
    @Resource
    private FastFileStorageClient fastFileStorageClient;
    @Value("${fdfs.tracker-list}")
    private String nginx;
    @Value("${fdfs.http_tracker_http_port}")
    private String port;
    @Autowired
    private UsernameUtil usernameUtil;

    @PostMapping("/upload")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="文件上传",logLevel ="1",creater ="",updater = "")
    public ResponseData upload(FileDto fileDto) throws IOException {
        fileService.uploadFile(saveFile(fileDto));
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping("/delete")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="删除文件",logLevel ="4",creater ="",updater = "")
    public ResponseData delete(String dataCode){
        List<FileDO> fileDOList = fileService.selectMultipleFileByDataCode(dataCode);
        String filePath = null;
        for (FileDO fileDO : fileDOList){
            filePath = fileDO.getFilePath();
            try {
                fastFileStorageClient.deleteFile(filePath.substring(0, filePath.indexOf("?")));//去除掉后面的fileName属性
            }catch (Exception e){
                fastFileStorageClient.deleteFile(filePath);
            }
        }
        fileService.deleteFileByDataCode(dataCode);
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping(value = "/deleteItemCode")
    @ResponseBody
    @LogAnnotation(appCode ="",logTitle ="依据itemCode删除文件",logLevel ="4",creater ="",updater = "")
    public ResponseData deleteItemCode(String itemcode){
        fileService.deleteFileByItemCode(itemcode);
        return new ResponseData(EmBusinessError.success);
    }

    //通过itemcode查询课题
    @GetMapping(value = "/getByItemCode")
    @ResponseBody
    public ResponseData getByItemCode(@RequestParam(value = "itemcode") String itemCode){
        FileDO fileDO = fileService.getByItemCode(itemCode);
        return new ResponseData(EmBusinessError.success,fileDO);
    }

    @GetMapping("/get/{datacode}")
    @ResponseBody
    public ResponseData get(@PathVariable String datacode){
        return new ResponseData(EmBusinessError.success,fileService.selectFileByDataCode(datacode));
    }

    private FileDO saveFile(FileDto fileDto) {
        FileDO fileDO = new FileDO();
        BeanUtils.copyProperties(fileDto,fileDO);
        /*从数据传输对象中拿到文件*/
        MultipartFile multipartFile = fileDto.getFile();
        StorePath storePath = null;
        try {
            storePath = fastFileStorageClient.uploadFile(
                    multipartFile.getInputStream(),
                    multipartFile.getSize(),
                    FilenameUtils.getExtension(multipartFile.getOriginalFilename()),
                    null);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String fileName = multipartFile.getOriginalFilename();
        fileDO.setFileName(fileName);
        fileDO.setFileType(FilenameUtils.getExtension(fileName));//文件扩展名
        fileDO.setFileSize((double) multipartFile.getSize());
        String path = "http://" + nginx.substring(0,nginx.indexOf(":")+1) + port + "/" + storePath.getFullPath() + "?filename=" + fileName;//字符串拼接路径
        fileDO.setFilePath(path);
        if (null != usernameUtil.getOperateUser()){
            fileDO.setUploader(usernameUtil.getOperateUser());
        }else {
            fileDO.setUploader("注册上传");
        }

        return fileDO;
    }
}
