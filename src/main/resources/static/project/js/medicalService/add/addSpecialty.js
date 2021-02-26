(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg,modalUtil) {


            /*全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/medicalService/specialty"
            var hosps = {}
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var specialtyName = dictUtil.getDictByCode(dictUtil.DICT_LIST.dept);
            var specialtyLevel = dictUtil.getDictByCode(dictUtil.DICT_LIST.specialtyLevel)
            const editor = objectUtil.wangEditorUtil();

            /*设置科室下拉框的值*/

            $("#specialtyName").selectUtil(specialtyName);
            $("#specialtyLevel").selectUtil(specialtyLevel);

            /*点击返回按钮*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });

            $("#addHosp").unbind().on('click', function () {
                orange.redirect("/medicalService/add/addHosp");
                var elementsByClassName = document.getElementsByClassName("card");
               elementsByClassName[6].children[0].classList.remove("active")
                elementsByClassName[5].children[0].classList.add("active")

            })

            //保存和提交调用函数，保存和提交只是状态码不同
            function insert(saveStatus){
                var hosp;
                var entity;
                var requestUrl;
                /*拿到下拉框所选医院的信息*/
                hosp = hosps.find(function (obj) {return obj.itemcode === $("#hospitalName").val()});
                if (!updateStatus){
                    requestUrl = "/medicalService/specialty/add";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                        specialtyStatus: saveStatus
                    };
                }
                else {
                    requestUrl = "/medicalService/specialty/update";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode,
                        specialtyStatus: saveStatus
                    };
                }
                entity["specialtyName"] = specialtyName[$("#specialtyName").val()].text;
                entity["specialtyLevel"] = specialtyLevel[$("#specialtyLevel").val()].text;
                entity["specialtyDisease"] = $("#specialtyDisease").val();
                entity["specialtyPhone"] = $("#specialtyPhone").val();
                entity["specialtyBriefIntroduce"] = $("#specialtyBriefIntroduce").val();
                entity["specialtyAddressPro"] = hosp.hospitalAddressPro;
                entity["specialtyAddressCity"] = hosp.hospitalAddressCity;
                entity["specialtyAddressCounty"] = hosp.hospitalAddressCountry;
                entity["specialtyAddress"] = hosp.hospitalAddress;
                entity["specialtyLink"] = hosp.hospitalLink;
                entity["specialtyIntroduce"] = editor.txt.html();
                entity["hospitalCode"] = hosp.itemcode;
                entity["hospitalName"] = hosp.hospitalName;

                fileUtil.handleFile(updateStatus, entity.itemcode, uploadImg.getFiles()[0]);

                ajaxUtil.myAjax(null,requestUrl,entity,function (data) {
                    if(ajaxUtil.success(data)){
                        var submitConfirmModal = {
                            modalBodyID: "myTopicSubmitTip",
                            modalTitle: "提示",
                            modalClass: "modal-lg",
                            cancelButtonStyle: "display:none",
                            confirmButtonClass: "btn-danger",
                            modalConfirmFun: function () {
                                orange.redirect(jumpUrl);
                                return true;
                            }
                        }
                        var submitConfirm = modalUtil.init(submitConfirmModal);
                        submitConfirm.show();
                        return false;
                    }else {
                        alertUtil.alert(data.msg);
                    }
                },false,true);
                return false;
            }

            $("#btn_save").unbind().on('click',function () {
                insert('0');
                return false;
            });

            /*确认按钮处理*/
            $("#btn_insert").unbind().on('click',function () {
                var mySubmitToCZ = {
                    modalBodyID: "mySubmitModal",
                    modalTitle: "提交",
                    modalClass: "modal-lg",
                    confirmButtonClass: "btn-danger",
                    modalConfirmFun: function () {
                        insert('1');
                        return true;
                    },
                };
                var x = modalUtil.init(mySubmitToCZ);
                x.show();
                return false;
            });

            function isUpdate() {
                return (tempdata != null || tempdata != undefined)
            }

            /*初始化数据*/
            var init = function () {
                ajaxUtil.myAjax(null,"/medicalService/hosp/selectAllHosp",null,function (data) {
                    if(ajaxUtil.success(data)){
                        hosps = data.data
                        var html = "";
                        $.each(hosps,function (i,it) {
                            html = html + '<option value="'+it.itemcode+'">'+it.hospitalName+'</option>';
                        });
                        $("#hospitalName").html("");
                        $("#hospitalName").append(html);
                    }
                },false,true,"get");
                if (hosps.length == 0) {
                    alertUtil.info("医院信息为空，请先添加医院")
                }
                if (updateStatus){
                    $(".titleCSS").text("修改中医名科信息");
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    uploadImg.setImgSrc(tempdata.filePath)
                    $("#specialtyName").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() === tempdata.specialtyName) {
                            $this.attr("selected", true);
                        }
                    });
                    $("#specialtyLevel").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() === tempdata.specialtyLevel) {
                            $this.attr("selected", true);
                        }
                    });
                    $("#specialtyDisease").val(tempdata.specialtyDisease)
                    $("#specialtyBriefIntroduce").val(tempdata.specialtyBriefIntroduce)
                    //$("#hospitalName  option[value="+tempdata.hospitalCode+"] ").attr("selected",true);
                    $("#hospitalName").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() === tempdata.hospitalName) {
                            $this.attr("selected", true);
                        }
                    });
                    $("#specialtyPhone").val(tempdata.specialtyPhone);
                    $(".w-e-text").html(tempdata.specialtyIntroduce);
                }else{
                    $(".titleCSS").text("新增中医名科信息");
                }
            };
            uploadImg.init();
            init();


        });
})();
