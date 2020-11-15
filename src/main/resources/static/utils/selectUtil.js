(function() {
    define('selectUtil', ['jquery','objectUtil','dictUtil'], function(jquery,objectUtil,dictUtil) {


        $.fn.extend({
            selectUtil: function (data) {
                var html = "";
                $.each(data,function (i,it) {
                    html = html + '<option value="'+it.id+'">'+it.text+'</option>';
                });
                $(this).html("");
                $(this).append(html);
                return $(this);
            }
        });

        console.log(dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus));


        
        function getRoleTable(role,preUrl,status,webStatus) {
            console.log(webStatus);
            if(role === "文化宣传科员"){
                return preUrl + "?"+status+"="+webStatus[0].text+"&"+status+"="+webStatus[1].text+"&"+status+"="+webStatus[3].text+"&"+status+"="+webStatus[4].text+"&"+status+"="+webStatus[6].text;
            }else if(role === "文化宣传处长"){
                return preUrl + "?"+status+"="+webStatus[1].text+"&"+status+"="+webStatus[2].text+"&"+status+"="+webStatus[3].text;
            }else if(role === "文化宣传综合处处长"){
                return preUrl + "?"+status+"="+webStatus[2].text+"&"+status+"="+webStatus[5].text;
            }else if(role === "政务资源科员"){
                return preUrl + "?"+status+"="+webStatus[0].text+"&"+status+"="+webStatus[1].text+"&"+status+"="+webStatus[3].text+"&"+status+"="+webStatus[4].text+"&"+status+"="+webStatus[6].text;
            }else if(role === "政务资源处长"){
                return preUrl + "?"+status+"="+webStatus[1].text+"&"+status+"="+webStatus[2].text+"&"+status+"="+webStatus[3].text;
            }else if(role === "政务资源综合处处长") {
                return preUrl + "?"+status+"="+webStatus[2].text+"&"+status+"="+webStatus[5].text;
            }
        }
        
        function getRoleOperate(value, row, index, role, status,webStatus) {
            if(role === "文化宣传科员"){
                $('#btn_addTask').attr('style',"display:block");
                if(status === webStatus[0].text){
                    return [
                        '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 3px" data-toggle="modal" data-target="" >编辑</button>',
                        '<button type="button" class="submit btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >提交</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" style="margin-right: 10px"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                }else if(status == webStatus[5].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }else if(status == webStatus[3].text || status == webStatus[4].text || status == webStatus[6].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                }else if(status == webStatus[1].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="no-submit btn btn-danger btn-sm" data-toggle="modal" data-target="" >取消提交</button>',
                    ].join('');
                }

            }else if(role === "文化宣传处长"){
                if(status == webStatus[1].text){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == webStatus[2].text || status == webStatus[3].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }

            }else if(role === "文化宣传综合处处长"){
                if(status == webStatus[2].text){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == webStatus[5].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="under-shelf btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >下架</button>',
                    ].join('');
                }

            }else if(role === "政务资源科员"){
                $('#btn_addTask').attr('style',"display:block");
                if(status === webStatus[0].text){
                    return [
                        '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 3px" data-toggle="modal" data-target="" >修改</button>',
                        '<button type="button" class="submit btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >提交</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" style="margin-right: 10px"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                }else if(status == webStatus[5].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }else if(status == webStatus[3].text || status == webStatus[4].text || status == webStatus[6].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                }else if(status == webStatus[1].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="no-submit btn btn-danger btn-sm" data-toggle="modal" data-target="" >取消提交</button>',
                    ].join('');
                }

            }else if(role === "政务资源处长"){
                if(status == webStatus[1].text){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == webStatus[2].text || status == webStatus[3].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }

            }else if(role === "政务资源综合处处长"){
                if(status == webStatus[2].text){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == webStatus[5].text){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="under-shelf btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >下架</button>',
                    ].join('');
                }

            }
        }

        function getStatus(role,webStatus) {
            if(role === "文化宣传科员"){
                return webStatus[1].text
            }else if(role === "文化宣传处长"){
                return webStatus[2].text
            }else if(role === "文化宣传综合处处长"){
                return webStatus[5].text
            }else if(role === "政务资源科员"){
                return webStatus[1].text
            }else if(role === "政务资源处长"){
                return webStatus[2].text
            }else if(role === "政务资源综合处处长"){
                return webStatus[5].text
            }
            // else if(role === "管理员") {
            //     return
            // }
        }

        return {
            getRoleTable:getRoleTable,
            getRoleOperate:getRoleOperate,
            getStatus: getStatus,
        }
    })
})();