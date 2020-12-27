package com.zyyglxt.util;

import com.zyyglxt.dataobject.HealthCareFamPreDO;
import com.zyyglxt.dataobject.ReceiptDO;
import com.zyyglxt.dataobject.RequestReportDO;
import com.zyyglxt.dto.HealthCareFamPreDto;
import com.zyyglxt.dto.ReceiptDto;
import com.zyyglxt.dto.RequestReportDto;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

/**
 * @version 1.0
 * @Author huangwj
 * @time 2020/11/11 21:40
 */
public class ConvertDOToCareFamPre {
    public static HealthCareFamPreDto convertFromCareFamPre(HealthCareFamPreDO healthCareFamPreDO, String filePath, String fileName) {
        if (StringUtils.isEmpty(filePath)) {
            filePath = "已经损坏了";
        }
        HealthCareFamPreDto healthCareFamPreDto = new HealthCareFamPreDto();
        BeanUtils.copyProperties(healthCareFamPreDO, healthCareFamPreDto);
        healthCareFamPreDto.setFilePath(filePath);
        healthCareFamPreDto.setFileName(fileName);
        return healthCareFamPreDto;
    }
    public static ReceiptDto convertFromReceipt(ReceiptDO receiptDO, String filePath, String fileName) {
        if (StringUtils.isEmpty(filePath)) {
            filePath = "已经损坏了";
        }
        ReceiptDto receiptDto = new ReceiptDto();
        BeanUtils.copyProperties(receiptDO, receiptDto);
        receiptDto.setFilePath(filePath);
        receiptDto.setFileName(fileName);
        return receiptDto;
    }
    public static RequestReportDto convertFromRequestReport(RequestReportDO requestReportDO, String filePath, String fileName) {
        if (StringUtils.isEmpty(filePath)) {
            filePath = "已经损坏了";
        }
        RequestReportDto requestReportDto = new RequestReportDto();
        BeanUtils.copyProperties(requestReportDO, requestReportDto);
        requestReportDto.setFilePath(filePath);
        requestReportDto.setFileName(fileName);
        return requestReportDto;
    }
}
