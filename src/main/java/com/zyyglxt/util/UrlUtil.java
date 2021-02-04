package com.zyyglxt.util;

/**
 * @Author wanglx
 * @Date 2020/11/10 0010 14:43
 * @Version 1.0
 */
public class UrlUtil {
    public static String getUrl(String requestUrl){
        if (requestUrl.contains("/cul/fac/culRel/delCulRel")
                ||requestUrl.contains("/cul/fac/culRel/toUpdCulRel")
                ||requestUrl.contains("/cul/fac/culRel/cgCulRelSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/fac/culVen/delCulVen")
                ||requestUrl.contains("/cul/fac/culVen/toUpdCulVen")
                ||requestUrl.contains("/cul/fac/culVen/cgCulVenSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/fac/inCuHe/delInCuHe")
                ||requestUrl.contains("/cul/fac/inCuHe/toUpdInCuHe")
                ||requestUrl.contains("/cul/fac/inCuHe/cgInCuHeSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/pro/carAll/delCarAll")
                ||requestUrl.contains("/cul/pro/carAll/toUpdCarAll")
                ||requestUrl.contains("/cul/pro/carAll/cgCarAllSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/pro/comGam/delComGam")
                ||requestUrl.contains("/cul/pro/comGam/toUpdComGam")
                ||requestUrl.contains("/cul/pro/comGam/cgComGamSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/pro/movTv/delMovTv")
                ||requestUrl.contains("/cul/pro/movTv/toUpdMovTv")
                ||requestUrl.contains("/cul/pro/movTv/cgMovTvSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/res/traCul/delTraCul")
                ||requestUrl.contains("/cul/res/traCul/toUpdTraCul")
                ||requestUrl.contains("/cul/res/traCul/cgTraCulSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/res/traDoc/delTraDoc")
                ||requestUrl.contains("/cul/res/traDoc/toUpdTraDoc")
                ||requestUrl.contains("/cul/res/traDoc/cgTraDocSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/res/traSch/delTraSch")
                ||requestUrl.contains("/cul/res/traSch/toUpdTraSch")
                ||requestUrl.contains("/cul/res/traSch/cgTraSchSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/cul/trav/trav/delTrav")
                ||requestUrl.contains("/cul/trav/trav/toUpdTrav")
                ||requestUrl.contains("/cul/trav/trav/cgTravSta")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/datado/announcement/deleteByPrimaryKey")
                ||requestUrl.contains("/datado/announcement/changeStatus")
                ||requestUrl.contains("/datado/announcement/selectByPrimaryKey")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/datado/newsInf/selectByPrimaryKey")
                ||requestUrl.contains("/datado/newsInf/deleteByPrimaryKey")
                ||requestUrl.contains("/datado/newsInf/changeStatus")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/datado/process/selectByPrimaryKey")
                ||requestUrl.contains("/datado/process/deleteByPrimaryKey")
                ||requestUrl.contains("/datado/process/changeStatus")
                ||requestUrl.contains("/datado/leader/deleteByPrimaryKey")
                ||requestUrl.contains("/datado/leader/changeStatus")
                ||requestUrl.contains("/datado/leader/selectByPrimaryKey")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/datado/regulation/selectByPrimaryKey")
                ||requestUrl.contains("/datado/regulation/deleteByPrimaryKey")
                ||requestUrl.contains("/datado/regulation/changeStatus")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/dictdo/selectDictDO")
                ||requestUrl.contains("/dictdo/deleteDictDO")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/dictitemdo/selectDictitemDO")
                ||requestUrl.contains("/dictitemdo/deleteDictitemDO")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        if (requestUrl.contains("/deletefamprerdo")
                ||requestUrl.contains("/deletehealthcarechinesemedicinedo")
                ||requestUrl.contains("/deletehealthcarefampredo")
                ||requestUrl.contains("/deletehealthsciknowdo")
        ){
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
            requestUrl = requestUrl.substring(0, requestUrl.lastIndexOf("/"));
        }
        return requestUrl;
    }
    public static String getUrl(String requestUrl, String method){
        if (method.equals("POST")){
            requestUrl = requestUrl+"-add";
        }
        if (method.equals("PUT")){
            requestUrl = requestUrl+"-upd";
        }
        if (method.equals("DELETE")){
            requestUrl = requestUrl+"-del";
        }
        return requestUrl;
    }
}
