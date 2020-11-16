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

        
        function getRoleTable(role,preUrl,status,webStatus) {
            console.log(webStatus);
            if(role === "文化宣传科员"){
                return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[6].id;
            }else if(role === "文化宣传处长"){
                return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id;
            }else if(role === "文化宣传综合处处长"){
                return preUrl + "?"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[5].id;
            }else if(role === "政务资源科员"){
                return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[6].id;
            }else if(role === "政务资源处长"){
                return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id;
            }else if(role === "政务资源综合处处长") {
                return preUrl + "?"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[5].id;
            }
        }
        
        function getRoleOperate(value, row, index, role, status,webStatus) {
            if(role === "文化宣传科员"){
                $('#btn_addTask').attr('style',"display:block");
                if(status === webStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[5].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[3].id || status == webStatus[4].id || status == webStatus[6].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[1].id){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="no-submit btn btn-danger btn-sm" data-toggle="modal" data-target="" >取消提交</button>',
                    ].join('');
                }

            }else if(role === "文化宣传处长"){
                if(status == webStatus[1].id){
                    return [
                        '<a  class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(status == webStatus[2].id || status == webStatus[3].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }

            }else if(role === "文化宣传综合处处长"){
                if(status == webStatus[2].id){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == webStatus[5].id){
                    return [
                        '<a class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(status == webStatus[5].id){
                    return [
                        '<a class="view"  style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[3].id || status == webStatus[4].id || status == webStatus[6].id){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }

            }
        }

        function getStatus(role,webStatus) {
            if(role === "文化宣传科员"){
                return webStatus[1].id
            }else if(role === "文化宣传处长"){
                return webStatus[2].id
            }else if(role === "文化宣传综合处处长"){
                return webStatus[5].id
            }else if(role === "政务资源科员"){
                return webStatus[1].id
            }else if(role === "政务资源处长"){
                return webStatus[2].id
            }else if(role === "政务资源综合处处长"){
                return webStatus[5].id
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