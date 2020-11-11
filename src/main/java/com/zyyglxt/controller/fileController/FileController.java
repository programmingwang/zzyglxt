package com.zyyglxt.controller.fileController;

import com.github.tobato.fastdfs.domain.fdfs.StorePath;
import com.github.tobato.fastdfs.service.FastFileStorageClient;
import com.zyyglxt.dataobject.FileDO;
import com.zyyglxt.dto.FileDto;
import com.zyyglxt.error.EmBusinessError;
import com.zyyglxt.response.ResponseData;
import com.zyyglxt.service.IFileService;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import javax.annotation.Resource;
import java.io.IOException;

/**
 * @author qjc
 * @version 1.0
 * @date 2020/11/4 16:37
 */
@RestController
@PropertySource("classpath:application.properties")
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

    @PostMapping("/upload")
    @ResponseBody
    public ResponseData upload(FileDto fileDto) throws IOException {
        fileService.uploadFile(saveFile(fileDto));
        return new ResponseData(EmBusinessError.success);
    }

    @GetMapping("/delete")
    @ResponseBody
    public ResponseData delete(String dataCode){
        FileDO fileDO = fileService.selectFileByDataCode(dataCode);
        fastFileStorageClient.deleteFile(fileDO.getFilePath());
        fileService.deleteFileByDataCode(dataCode);
        return new ResponseData(EmBusinessError.success);
    }

    @PostMapping("/update")
    @ResponseBody
    public ResponseData update(FileDto fileDto){
        delete(fileDto.getDataCode());
        fileService.updateFile(saveFile(fileDto));
        return new ResponseData(EmBusinessError.success);
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
        String path = "http://" + nginx.substring(0,nginx.indexOf(":")+1) + port + "/" + storePath.getFullPath();//字符串拼接路径
        fileDO.setFilePath(path);
        return fileDO;
    }
}
