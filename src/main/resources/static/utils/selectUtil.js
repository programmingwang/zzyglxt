(function() {
    define('selectUtil', ['jquery','objectUtil'], function(jquery,objectUtil) {


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

        function getRoleTable(role,preUrl,status) {
            preUrl = preUrl + "?"+status+"=已下架&"+status+"=展示中"
            if(role === "文化宣传科员"){
                return preUrl + "&"+status+"=--&"+status+"=待审核"
            }else if(role === "文化宣传处长"){
                return preUrl + "&"+status+"=处长已审核&"+status+"=待审核"
            }else if(role === "文化宣传综合处处长"){
                return preUrl + "&"+status+"=处长已审核"
            }
        }

        function getRoleOperate(value, row, index, role, status) {
            if(role === "文化宣传科员"){
                $('#btn_addTask').attr('style',"display:block");
                if(status === "--"){
                    return [
                        '<a class="edit" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >编辑</a>',
                        '<a class="submit"  style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >提交</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == "展示中"){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if(status == "已下架"){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="delete" style="margin:0 1em;text-decoration: none;color:#D60000;" data-toggle="modal" data-target="#staticBackdrop" >删除</a>',
                    ].join('');
                }else if(status == "待审核"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="no-submit btn btn-danger btn-sm" data-toggle="modal" data-target="" >取消提交</button>',
                    ].join('');
                }

            }else if(role === "文化宣传处长"){
                if(status == "待审核"){
                    return [
                        '<a  class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a  class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(status == "处长已审核" || status == "已下架" ||status == "展示中"){
                    return [
                        '<a class="view" data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="" >查看</a>',
                    ].join('');
                }

            }else if(role === "文化宣传综合处处长"){
                if(status == "处长已审核"){
                    return [
                        '<a class="pass"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#775637;" data-target="#staticBackdrop" >通过</a>',
                        '<a class="fail"  data-toggle="modal" style="margin:0 1em;text-decoration: none;color:#D60000;" data-target="#staticBackdrop" >不通过</a>',
                    ].join('');
                }else if(status == "已下架"){
                    return [
                        '<a class="view"  style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                    ].join('');
                }else if(status == "展示中"){
                    return [
                        '<a  class="view"  style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="" >查看</a>',
                        '<a  class="under-shelf" style="margin:0 1em;text-decoration: none;color:#775637;" data-toggle="modal" data-target="#staticBackdrop" >下架</a>',
                    ].join('');
                }

            }
        }

        function getStatus(role) {
            if(role === "文化宣传科员"){
                return "待审核"
            }else if(role === "文化宣传处长"){
                return "处长已审核"
            }else if(role === "文化宣传综合处处长"){
                return "展示中"
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