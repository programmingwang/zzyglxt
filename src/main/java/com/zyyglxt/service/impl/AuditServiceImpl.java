package com.zyyglxt.service.impl;

import com.zyyglxt.dao.AuditMapper;
import com.zyyglxt.dataobject.HospDO;
import com.zyyglxt.dataobject.IndustrialDevelopChiMed;
import com.zyyglxt.dataobject.IndustrialDevelopSchool;
import com.zyyglxt.dataobject.IndustrialDevelopTecSerOrg;
import com.zyyglxt.dto.HospDto;
import com.zyyglxt.dto.industrialDevelop.AuditDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopChiMedDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopSchoolDto;
import com.zyyglxt.dto.industrialDevelop.IndustrialDevelopTecSerOrgDto;
import com.zyyglxt.service.IAuditService;
import com.zyyglxt.service.IDictService;
import com.zyyglxt.service.IFileService;
import com.zyyglxt.util.UsernameUtil;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;

/**
 * @Author lrt
 * @Date 2020/11/16 9:21
 * @Version 1.0
 **/
@Service
public class AuditServiceImpl implements IAuditService {
    @Resource
    AuditMapper auditMapper;

    @Resource
    IDictService dictService;

    @Resource
    IFileService fileService;

    @Resource
    UsernameUtil usernameUtil;

    @Override
    public List<AuditDto> getAll() {
        List<AuditDto> resList = new ArrayList<>();
        List<IndustrialDevelopChiMed> chiMedList = auditMapper.getAllChiMed();
        List<IndustrialDevelopTecSerOrg> tecSerOrgList = auditMapper.getAllTecOrg();
        List<IndustrialDevelopSchool> schoolList = auditMapper.getAllSchool();
        List<HospDO> hospDOList = auditMapper.getAllHospital();

        convertChiMed(chiMedList, resList);

        convertTecSerOrg(tecSerOrgList, resList);

        convertSchool(schoolList, resList);

        convertHospital(hospDOList, resList);

        filter(resList);

        resList.sort(Comparator.comparing(AuditDto::getItemcreateat).reversed());
        return resList;
    }

    @Override
    public List<AuditDto> getAllByType(String type) {
        List<AuditDto> resList = new ArrayList<>();
        switch (type) {
            case "tec":
            case "lab":
            case "tour":
                List<IndustrialDevelopTecSerOrg> tecSerOrgList = auditMapper.getAllTecOrgByType(type);
                convertTecSerOrg(tecSerOrgList, resList);
                break;
            case "plant":
            case "process":
            case "sale":
            case "produce":
                List<IndustrialDevelopChiMed> chiMedList = auditMapper.getAllChiMedByType(type);
                convertChiMed(chiMedList, resList);
                break;
            case "school":
                List<IndustrialDevelopSchool> schoolList = auditMapper.getAllSchool();
                convertSchool(schoolList, resList);
                break;
            case "hospital":
                List<HospDO> hospDOList = auditMapper.getAllHospital();
                convertHospital(hospDOList, resList);
                break;
        }
        filter(resList);
        resList.sort(Comparator.comparing(AuditDto::getItemcreateat).reversed());
        return resList;
    }

    @Override
    public IndustrialDevelopChiMedDto getDetailChiMed(Integer itemid, String itemcode) {
        IndustrialDevelopChiMed chiMed = auditMapper.getDetailChiMed(itemid, itemcode);
        IndustrialDevelopChiMedDto dto = new IndustrialDevelopChiMedDto();
        BeanUtils.copyProperties(chiMed, dto);
        dto.setFilePath(fileService.selectFileByDataCode(dto.getItemcode()).getFilePath());
        return dto;
    }

    @Override
    public IndustrialDevelopTecSerOrgDto getDetailTecSerOrg(Integer itemid, String itemcode) {
        IndustrialDevelopTecSerOrg org = auditMapper.getDetailTecSerOrg(itemid, itemcode);
        IndustrialDevelopTecSerOrgDto dto = new IndustrialDevelopTecSerOrgDto();
        BeanUtils.copyProperties(org,dto);
        dto.setFilePath(fileService.selectFileByDataCode(dto.getItemcode()).getFilePath());
        return dto;
    }

    @Override
    public IndustrialDevelopSchoolDto getDetailSchool(Integer itemid, String itemcode) {
        IndustrialDevelopSchool school = auditMapper.getDetailSchool(itemid, itemcode);
        IndustrialDevelopSchoolDto dto = new IndustrialDevelopSchoolDto();
        BeanUtils.copyProperties(school,dto);
        dto.setFilePath(fileService.selectFileByDataCode(dto.getItemcode()).getFilePath());
        return dto;
    }

    @Override
    public HospDto getDetailHospital(Integer itemid, String itemcode) {
        HospDO hospDO = auditMapper.getDetailHospital(itemid, itemcode);
        HospDto hospDto = new HospDto();
        BeanUtils.copyProperties(hospDO, hospDto);
        hospDto.setFilePath(fileService.selectFileByDataCode(hospDO.getItemcode()).getFilePath());
        return hospDto;
    }

    @Override
    public int changeChiMedStatus(AuditDto record) {
        return auditMapper.changeChiMedStatus(record);
    }

    @Override
    public int changeTecSerOrgStatus(AuditDto record) {
        return auditMapper.changeTecSerOrgStatus(record);
    }

    @Override
    public int changeSchoolStatus(AuditDto record) {
        return auditMapper.changeSchoolStatus(record);
    }

    @Override
    public int changeHospitalStatus(AuditDto record) {
        return auditMapper.changeHospitalStatus(record);
    }

    public void convertChiMed(List<IndustrialDevelopChiMed> source, List<AuditDto> target) {
        for (IndustrialDevelopChiMed item : source) {
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item, obj);
            target.add(obj);
        }
    }

    public void convertTecSerOrg(List<IndustrialDevelopTecSerOrg> source, List<AuditDto> target) {
        for (IndustrialDevelopTecSerOrg item : source) {
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item, obj);
            target.add(obj);
        }
    }

    public void convertSchool(List<IndustrialDevelopSchool> source, List<AuditDto> target) {
        for (IndustrialDevelopSchool item : source) {
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item, obj);
            obj.setType("school");
            target.add(obj);
        }
    }

    public void convertHospital(List<HospDO> source, List<AuditDto> target) {
        for (HospDO item : source) {
            AuditDto obj = new AuditDto();
            BeanUtils.copyProperties(item, obj);
            obj.setAddressCity(item.getHospitalAddressCity());
            obj.setName(item.getHospitalName());
            obj.setStatus(item.getHospitalStatus());
            obj.setType("hospital");
            target.add(obj);
        }
    }

    public void filter(List<AuditDto> target) {
        Map<String, String> proMap = dictService.getDictMapByCode("projectStatus");
        Map<String, String> typeMap = dictService.getDictMapByCode("orgType");
        target.removeIf(item -> item.getStatus().equals("0"));
        for (AuditDto item : target) {
            item.setType(typeMap.get(item.getType()));
            item.setStatus(proMap.get(item.getStatus()));
        }
    }
}
