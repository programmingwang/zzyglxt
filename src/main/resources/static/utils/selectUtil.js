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
        
        function getRoleTable(role,preUrl) {
            if(role === "文化宣传科员"){
                return preUrl + "&chineseCulturalStatus=--&&chineseCulturalStatus=待审核"
            }else if(role === "文化宣传处长"){
                return preUrl + "&chineseCulturalStatus=处长已审核&&chineseCulturalStatus=待审核"
            }else if(role === "文化宣传综合处处长"){
                return preUrl + "&chineseCulturalStatus=处长已审核"
            }else if(role === "政务资源科员"){
                return preUrl + "&dataStatus=--&&dataStatus=待审核"
            }else if(role === "政务资源处长"){
                return preUrl + "&dataStatus=处长已审核&&dataStatus=待审核"
            }else if(role === "政务资源综合处处长") {
                return preUrl + "&dataStatus=处长已审核"
            }
            // else if(role === "管理员") {
            //     return preUrl + "&chineseCulturalStatus=--&&chineseCulturalStatus=待审核"
            // }
        }
        
        function getRoleOperate(value, row, index, role, status) {
            if(role === "文化宣传科员"){
                $('#btn_addTask').attr('style',"display:block");
                if(status === "--"){
                    return [
                        '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 3px" data-toggle="modal" data-target="" >编辑</button>',
                        '<button type="button" class="submit btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >提交</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" style="margin-right: 10px"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                }else if(status == "展示中"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }else if(status == "已下架"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
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
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == "处长已审核" || status == "已下架" ||status == "展示中"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }

            }else if(role === "文化宣传综合处处长"){
                if(status == "处长已审核"){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == "已下架"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }else if(status == "展示中"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="under-shelf btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >下架</button>',
                    ].join('');
                }

            }else if(role === "政务资源科员"){
                $('#btn_addTask').attr('style',"display:block");
                if(status === "--"){
                    return [
                        '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 3px" data-toggle="modal" data-target="" >修改</button>',
                        '<button type="button" class="submit btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >提交</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" style="margin-right: 10px"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                }else if(status == "展示中"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }else if(status == "已下架"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="delete btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
                    ].join('');
                }else if(status == "待审核"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="no-submit btn btn-danger btn-sm" data-toggle="modal" data-target="" >取消提交</button>',
                    ].join('');
                }

            }else if(role === "政务资源处长"){
                if(status == "待审核"){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == "处长已审核" || status == "已下架" ||status == "展示中"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }

            }else if(role === "政务资源综合处处长"){
                if(status == "处长已审核"){
                    return [
                        '<button type="button" class="pass btn btn-primary btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >通过</button>',
                        '<button type="button" class="fail btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >不通过</button>',
                    ].join('');
                }else if(status == "已下架"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                    ].join('');
                }else if(status == "展示中"){
                    return [
                        '<button type="button" class="view btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >查看</button>',
                        '<button type="button" class="under-shelf btn btn-danger btn-sm" data-toggle="modal" data-target="#staticBackdrop" >下架</button>',
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
            }else if(role === "政务资源科员"){
                return "待审核"
            }else if(role === "政务资源处长"){
                return "处长已审核"
            }else if(role === "政务资源综合处处长"){
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