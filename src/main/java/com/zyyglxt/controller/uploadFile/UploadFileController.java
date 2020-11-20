package com.zyyglxt.controller.uploadFile;

import com.zyyglxt.util.WangEditor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

/**
 * Author:wangzh
 * Date: 2020/11/17 13:26
 * Version: 1.0
 */
@Controller
@Slf4j
public class UploadFileController {

    @Value("${upload.addr}")
    private String nginx;
    @Value("${upload.port}")
    private String port;

    @RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
    @ResponseBody
    public WangEditor uploadFile(@Param("file") MultipartFile file) {
        //本地使用,上传位置
        String rootPath = "D://uploads//";
//        String rootPath = "/var/www/zyyglxt/upload";
        //文件的完整名称,如spring.jpeg
        String filename = file.getOriginalFilename();
        //文件名,如spring
        String name = filename.substring(0, filename.indexOf("."));
        //文件后缀,如.jpeg
        String suffix = filename.substring(filename.lastIndexOf("."));
        //目标文件
        File descFile = new File(rootPath + File.separator + File.separator + filename);
        int i = 1;
        //若文件存在重命名
        String newFilename = filename;
        while (descFile.exists()) {
            newFilename = name + "(" + i + ")" + suffix;
            String parentPath = descFile.getParent();
            descFile = new File(parentPath + File.separator + newFilename);
            i++;
        }
        //判断目标文件所在的目录是否存在
        if (!descFile.getParentFile().exists()) {
            //如果目标文件所在的目录不存在，则创建父目录
            descFile.getParentFile().mkdirs();
        }
        //将内存中的数据写入磁盘
        try {
            file.transferTo(descFile);
        } catch (Exception e) {
            e.printStackTrace();
            log.error("上传失败，cause:{}", e);
        }
        //完整的url
        String fileUrl = "http://localhost:8989/uploads/" + newFilename;
//        String fileUrl = "http://"+nginx+":"+port+"/upload/" + newFilename;
        //System.out.println(fileUrl);
        String[] data = {fileUrl};
        WangEditor we = new WangEditor(data);
        return we;
    }
}
