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
    UsernameUtil usernameUtil;


    @Override
    public List<AuditDto> getAll() {
        List<AuditDto> resList = new ArrayList<>();
        List<IndustrialDevelopChiMed> chiMedList;
        List<IndustrialDevelopTecSerOrg> tecSerOrgList;
        List<IndustrialDevelopSchool> schoolList;
        List<HospDO> hospDOList;
        String city;
        if (usernameUtil.getRoleName().equals("产业发展-省级")){
            chiMedList = auditMapper.getAllChiMed();
            tecSerOrgList = auditMapper.getAllTecOrg();
            schoolList = auditMapper.getAllSchool();
            hospDOList = auditMapper.getAllHospital();
        }else {
            city = usernameUtil.getCityId();
            chiMedList = auditMapper.getAllChiMedByCity(city);
            tecSerOrgList = auditMapper.getAllTecOrgByCity(city);
            schoolList = auditMapper.getAllSchoolByCity(city);
            hospDOList = auditMapper.getAllHospitalByCity(city);
        }


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
        return auditMapper.getDetailChiMed(itemid, itemcode);
    }

    @Override
    public IndustrialDevelopTecSerOrgDto getDetailTecSerOrg(Integer itemid, String itemcode) {
        return auditMapper.getDetailTecSerOrg(itemid, itemcode);
    }

    @Override
    public IndustrialDevelopSchoolDto getDetailSchool(Integer itemid, String itemcode) {
        return auditMapper.getDetailSchool(itemid, itemcode);
    }

    @Override
    public HospDto getDetailHospital(Integer itemid, String itemcode) {
        return auditMapper.getDetailHospital(itemid, itemcode);
    }

    @Override
    public int changeChiMedStatus(AuditDto record) {
        if (record.getStatus().equals("6")){
            auditMapper.changeUserStatus(record.getOrgCode());
        }
        record.setUpdater(usernameUtil.getOperateUser());
        return auditMapper.changeChiMedStatus(record);
    }

    @Override
    public int changeTecSerOrgStatus(AuditDto record) {
        record.setUpdater(usernameUtil.getOperateUser());
        return auditMapper.changeTecSerOrgStatus(record);
    }

    @Override
    public int changeSchoolStatus(AuditDto record) {
        record.setUpdater(usernameUtil.getOperateUser());
        return auditMapper.changeSchoolStatus(record);
    }

    @Override
    public int changeHospitalStatus(AuditDto record) {
        record.setUpdater(usernameUtil.getOperateUser());
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
            obj.setName(item.getSchoolName());
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
        if (usernameUtil.getRoleName().equals("产业发展-省级")){
            target.removeIf(item -> item.getStatus().equals("1"));
            target.removeIf(item -> item.getStatus().equals("2"));
            target.removeIf(item -> item.getStatus().equals("3"));
            target.removeIf(item -> item.getStatus().equals("5"));
        }else if (usernameUtil.getRoleName().equals("产业发展-市级")){
            target.removeIf(item -> !item.getAddressCity().equals(usernameUtil.getCityId()));
        }
        for (AuditDto item : target) {
            item.setType(typeMap.get(item.getType()));
            if (item.getStatus().equals("1")){
                item.setStatus("待审核");
            }else {
                item.setStatus(proMap.get(item.getStatus()));
            }
        }
    }
}
