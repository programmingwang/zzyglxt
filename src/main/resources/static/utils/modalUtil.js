/**
 * @Author yqz
 * @Date 2020/10/11 11:46
 * @Description :
 *
 *
 *
 *
 *   var myData ={
 *              // 目标 DIV ID
                modalPosition:"fir_body",

                //模态框ID 必须唯一 如果不设置默认UUID
                modalId : "myid",

                //模态框标题，如果不设置默认空
                modalTitle : "更新",

                //模态框内容
                modalBody : "内容",

                //模态框样式  modal-xl 大   modal-lg 中  modal-sm小  默认 大
                modalClass : "modal-lg",

                //取消按钮文字  默认取消
                modalCancel : "取消",

                //确认按钮文字 默认确认
                modalConfirm : "确认",

                //确认按钮点击事件
                modalConfirmFun:function () {
                    alertUtil.alert("123456789");
                },

                //取消按钮点击事件
                modalCancelFun:function () {
                    alertUtil.alert("987654321");
                },

                //模态框弹出前
                onModalShow:function () {
                    alertUtil.alert("00000000");
                },

                //模态框弹出后
                onModalShown:function () {
                    alertUtil.alert("11111111");
                },

                //模态框关闭前，在确认和取消按钮点击事件后调用
                onModalHide:function () {
                    alertUtil.alert("222222");
                },

                //模态框关闭后
                onModalHidden:function () {
                    alertUtil.alert("3333333");
                },

            };

         //初始化模态框  将模态框追加到当前页面
        modalUtil.init(myData);


         //显示模态框
        modalUtil.show();
         $("#myid").modal("show");

         //隐藏模态框
        modalUtil.hide();
         $("#myid").modal("hide");


 */

(function() {
    define('modalUtil', ['jquery','objectUtil', 'stringUtil', 'alertUtil','modalHtml', 'bootstrap'], function(jquery, objectUtil,stringUtil,alertUtil,modalHtml) {


        function _myModalDestory(obj) {
            $("#" + obj.modalID).remove();
        }

        function _init(data) {
            if(data == undefined || data == null || objectUtil.isEmptyObject(data)) {
                alertUtil.error("模态框入参不能为空");
                return;
            }


            if(stringUtil.isBlank(data.modalBodyID)){
                alertUtil.error("模态框ID不能为空");
                return;
            }else{
                data.modalBody = modalHtml[data.modalBodyID];
            }



            data.modalID = stringUtil.isBlank(data.modalID) ? stringUtil.getUUID(): data.modalID;
            data.modalPosition = stringUtil.isBlank(data.modalPosition) ? "fir_body": data.modalPosition;
            data.modalTitle = stringUtil.isBlank(data.modalTitle) ? "" : data.modalTitle;
            var defaultClass = "modal-dialog modal-dialog-centered modal-dialog-scrollable ";
            data.modalClass = stringUtil.isBlank(data.modalClass) ? defaultClass + "modal-xl" :  defaultClass + data.modalClass;
            data.modalCancel = stringUtil.isBlank(data.modalCancel) ? "关闭" : data.modalCancel;
            data.modalConfirm = stringUtil.isBlank(data.modalConfirm) ? "确认" : data.modalConfirm;
            data.modalCancelID = stringUtil.getUUID();
            data.modalConfirmID = stringUtil.getUUID();
            var defaultConfirmButtonClass = "btn ";

            data.confirmButtonClass = defaultConfirmButtonClass + (stringUtil.isBlank(data.confirmButtonClass) ? "btn-danger" : data.confirmButtonClass);






            var _ml = modalHtml.defaultModalHtml(data);

            $('#' + data.modalPosition).append(_ml);

            if(!objectUtil.strIsBlank(data.modalConfirmFun)){
                var isClick = true;
                    $("#"+data.modalConfirmID).on("click",function () {
                        if(isClick) {
                            isClick = false;
                            if (data.modalConfirmFun()) {
                                $("#" + data.modalID).modal("hide");
                            }
                            setTimeout(function() {
                                isClick = true;
                            }, 3000);//三秒内不能重复点击
                        }
                        else{
                            alertUtil.warning("请勿重复点击！！")
                        }
                    })

                }




            if(!objectUtil.strIsBlank(data.modalCancelFun)){
                $("#"+data.modalCancelID).on("click",function () {
                    data.modalCancelFun();
                })
            }

            if(!objectUtil.strIsBlank(data.onModalShow)){
                $('#'+data.modalID).on('show.bs.modal', function (event) {
                    data.onModalShow();
                });
            }

            if(!objectUtil.strIsBlank(data.onModalShown)){
                $('#'+data.modalID).on('shown.bs.modal', function (event) {
                    data.onModalShown();
                });
            }

            if(!objectUtil.strIsBlank(data.onModalHide)){
                $('#'+data.modalID).on('hide.bs.modal', function (event) {
                    data.onModalHide();
                });
            }

            if(!objectUtil.strIsBlank(data.onModalHidden)){
                $('#'+data.modalID).on('hidden.bs.modal', function (event) {
                    data.onModalHidden();
                    _myModalDestory();
                });
            }

            var obj = data;
            obj.show = function show(){
                $("#"+data.modalID).modal("show");
            };
            obj.hide = function show(){
                $("#"+data.modalID).modal("hide");
            };

            $('#'+data.modalID).on('hidden.bs.modal', function (event) {
                _myModalDestory(data);
            });

            return obj;
        }



        return {
            init: _init
        };

    });
})();