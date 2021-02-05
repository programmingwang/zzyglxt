(function() {
    define('selectUtil', ['jquery','objectUtil','dictUtil'], function(jquery,objectUtil,dictUtil) {


        $.fn.extend({
            selectUtil: function (data,topicMan = false) {
                var html = "";
                if(!topicMan){
                    $.each(data,function (i,it) {
                        html = html + '<option value="'+it.id+'">'+it.text+'</option>';
                    });
                }else {
                    $.each(data,function (i,it) {
                        html = html + '<option value="' + i + '">' + it.username + '</option>';
                    });
                }
                $(this).html("");
                $(this).append(html);
                return $(this);
            }
        });

        function getRoleTabletwo(role,preUrl,status,medStatus) {
            if (role !=null) {
                return preUrl + "?status=1";
            }
        }

        function getRoleOperatetwo(value, row, index, role, status,medStatus) {
                $('#btn_addTask').attr('style', "display:block");
                if (status == medStatus[0].id) {
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="shelf" style="margin:0 1em;text-decoration: none;color:#4df115;" data-toggle="modal" data-target="" >上架</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                } else if (status == medStatus[1].id ) {
                    return [
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                } else if (status == medStatus[2].id) {
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                        '<a class="shelf" style="margin:0 1em;text-decoration: none;color:#4df115;" data-toggle="modal" data-target="" >上架</a>',
                    ].join('');
                }
        }
        
        function getRoleTable(role,preUrl,status,webStatus) {
            if(role === "文化宣传科员"){
                $('#btn_addTask').attr('style',"display:block");
                // return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[6].id;
                return preUrl + "?"+status+"=1";
            }else if(role === "文化宣传处长"){
                // return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id;
                return preUrl + "?"+status+"=2";
            }else if(role === "文化宣传综合处处长"){
                // return preUrl + "?"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[5].id;
                return preUrl + "?"+status+"=3";
            }else if(role === "政务资源科员"){
                $('#btn_addTask').attr('style',"display:block");
                //return preUrl + "?"+status+"="+webStatus[0].id+"&"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id+"&"+status+"="+webStatus[4].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[6].id+"&"+status+"="+webStatus[7].id;
                return preUrl + "?"+status+"=1";
            }else if(role === "政务资源处长"){
                //return preUrl + "?"+status+"="+webStatus[1].id+"&"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[3].id;
                return preUrl + "?"+status+"=2";
            }else if(role === "政务资源综合处处长") {
                //return preUrl + "?"+status+"="+webStatus[2].id+"&"+status+"="+webStatus[5].id+"&"+status+"="+webStatus[7].id;
                return preUrl + "?"+status+"=3";
            }
        }
        
        function getRoleOperate(value, row, index, role, status,webStatus) {
            if(role === "文化宣传科员"){
                if(status == webStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[2].id || status == webStatus[3].id || status == webStatus[4].id || status == webStatus[6].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[1].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                    ].join('');
                }else if(status ==webStatus[5].id ){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }

            }else if(role === "文化宣传处长"){
                if(status == webStatus[1].id){
                    return [
                        '<a  class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[2].id || status == webStatus[3].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                    ].join('');
                }else if(status ==webStatus[5].id ){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }

            }else if(role === "文化宣传综合处处长"){
                if(status == webStatus[2].id){
                    return [
                        '<a class="pass "  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#4df115;">通过</a>',
                        '<a class="fail"  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#ed0f09;">不通过</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[5].id){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }else if(status == webStatus[4].id){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }

            }else if(role === "政务资源科员"){
                if(status == webStatus[0].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[2].id || status == webStatus[3].id || status == webStatus[4].id || status == webStatus[6].id){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == webStatus[1].id){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="no-submit" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="" >取消提交</a>',
                    ].join('');
                }else if(status ==webStatus[5].id ){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }

            }else if(role === "政务资源处长"){
                if(status == webStatus[1].id){
                    return [
                        '<a  class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#4df115;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-target="#staticBackdrop" >不通过</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[2].id || status == webStatus[3].id){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                    ].join('');
                }else if(status ==webStatus[5].id ){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }

            }else if(role === "政务资源综合处处长"){
                if(status == webStatus[2].id){
                    return [
                        '<a class="pass "  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#4df115;">通过</a>',
                        '<a class="fail"  data-toggle="modal" data-target="#staticBackdrop" style="margin:0 1em;text-decoration: none;color:#ed0f09;">不通过</a>',
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#348eff;" data-target="" >查看</a>',
                    ].join('');
                }else if(status == webStatus[5].id){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#ed0f09;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }else if(status == webStatus[4].id){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#348eff;" data-toggle="modal" data-target="" >查看</a>',
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

        function inSearchStatus(){
            var status = [
                { id: "0",text: "保存"},
                { id: "1",text: "审核中"},
                { id: "2",text: "审核未通过"},
                { id: "3",text: "已上架"},
                { id: "4",text: "已下架"},
                { id: "99",text: "全部状态"},
                ]
            return status;
        }


        return {
            getRoleTable:getRoleTable,
            getRoleOperate:getRoleOperate,
            getStatus: getStatus,
            getRoleTabletwo:getRoleTabletwo,
            getRoleOperatetwo:getRoleOperatetwo,
            inSearchStatus: inSearchStatus,
        }
    })
})();