(function () {
    require(['jquery','objectUtil','ajaxUtil','alertUtil','stringUtil','dictUtil','fileUtil','uploadImg','modalUtil'],
        function (jquery,objectUtil,ajaxUtil,alertUtil,stringUtil,dictUtil,fileUtil,uploadImg,modalUtil) {
            const editor = objectUtil.wangEditorUtil();
            const editor2 = objectUtil.wangEditorUtil("#div2");


            /*q全局变量*/
            var tempdata = JSON.parse(localStorage.getItem("rowData"));
            var updateStatus = isUpdate()
            var jumpUrl = "/medicalService/chineseMedicine"
            var specialtys = {}
            var hosps = {}
            var webStatus = dictUtil.getDictByCode(dictUtil.DICT_LIST.webStatus);
            var chineseMedicineType = dictUtil.getDictByCode(dictUtil.DICT_LIST.expertType)


            uploadImg.init();

            /*设置中医类型下拉框的值*/
            $("#chineseMedicineType").selectUtil(chineseMedicineType);


            /*处理出诊地点下拉框，改变则发送请求获取科室*/
            $("#hospitalName").unbind().on("change",specialtySelect)

            /*处理科室下拉框点击事件，若选择默认医院，则请求默认医院信息*/
            $("#specialtyName").unbind().on('click',function () {
                if (specialtys.length == undefined || JSON.stringify(specialtys)=="{}"){
                    specialtySelect()
                }
            })

            /*点击返回按钮*/
            $("#cancel").unbind().on('click',function () {
                orange.redirect(jumpUrl);
            });


            //保存和提交调用函数，保存和提交只是状态码不同
            function insert(saveStatus){
                var hosp;
                var specialty;
                var entity;
                var requestUrl;
                /*拿到下拉框所选的值的其他信息*/
                hosp = hosps.find(function (obj) {return obj.itemcode === $("#hospitalName").val()});
                specialty = specialtys.find(function (obj) {return obj.itemcode === $("#specialtyName").val()});
                if (!updateStatus){
                    requestUrl = "/medicalService/chineseMedicine/add";
                    entity = {
                        itemcode: stringUtil.getUUID(),
                        chineseMedicineStatus: saveStatus
                    };
                }
                else {
                    requestUrl = "/medicalService/chineseMedicine/update";
                    entity = {
                        itemid: tempdata.itemid,
                        itemcode: tempdata.itemcode,
                        chineseMedicineStatus: saveStatus
                    };
                }
                entity["chineseMedicineName"] = $("#chineseMedicineName").val();
                entity["chineseMedicineTitle"] = $("#chineseMedicineTitle").val();
                entity["chineseMedicineType"] = chineseMedicineType[$("#chineseMedicineType").val()].text;
                entity["hospCode"] = hosp.itemcode;
                entity["hospitalName"] = hosp.hospitalName;
                entity["deptCode"] = specialty.itemcode;
                entity["specialtyName"] = specialty.specialtyName;
                entity["visitTime"] = $("#visitTime").val()
                entity["phone"] = $("#phone").val();
                entity["mainVisit"] = $("#mainVisit").val();
                entity["expertBriefIntroduce"] = $("#expertBriefIntroduce").val();
                entity["expertIntroduce"] = editor.txt.html();
                entity["medicineRecords"] = editor2.txt.html();

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

            //保存按钮处理
            $("#btn_save").unbind().on('click',function () {
                insert('0');
                return false;
            });

            /*提交按钮处理*/
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


            /*初始化数据*/
            (function init() {
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
                if (isUpdate()){
                    var tempdata = JSON.parse(localStorage.getItem("rowData"));
                    $("#chineseMedicineName").val(tempdata.chineseMedicineName);
                    uploadImg.setImgSrc(tempdata.filePath)
                    $("#chineseMedicineTitle").val(tempdata.chineseMedicineTitle);
                    $("#chineseMedicineType").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() == tempdata.chineseMedicineType) {
                            $this.attr("selected", true);
                        }
                    });
                    $("#hospitalName  option[value="+tempdata.hospCode+"] ").attr("selected",true);
                    specialtySelect()
                    $("#specialtyName").find("option").each(function (data) {
                        var $this = $(this);
                        if($this.text() == tempdata.specialtyName) {
                            $this.attr("selected", true);
                        }
                    });
                    $("#visitTime").val(tempdata.visitTime);
                    $("#phone").val(tempdata.phone);
                    $("#mainVisit").val(tempdata.mainVisit);
                    $("#expertBriefIntroduce").val(tempdata.expertBriefIntroduce);
                    editor.txt.html(tempdata.expertIntroduce);
                    editor2.txt.html(tempdata.medicineRecords);
                }
            }());


            function isUpdate() {
                return (localStorage.getItem("rowData") != null || localStorage.getItem("rowData") != undefined)
            }

            /*请求科室信息*/
            function specialtySelect(){
                ajaxUtil.myAjax(null,"/medicalService/specialty/selectByHospCode?hospCode=" + $("#hospitalName").val(),null,function (data) {
                    if(ajaxUtil.success(data)){
                        specialtys = data.data
                        if (specialtys.length == 0) {
                            alertUtil.info("该医院的科室信息为空，请先为该医院添加科室")
                        }
                        var html = "";
                        $.each(specialtys,function (i,it) {
                            html = html + '<option value="'+it.itemcode+'">'+it.specialtyName+'</option>';
                        });
                        $("#specialtyName").html("");
                        $("#specialtyName").append(html);
                    }
                },false,true,"get");
            }



        });
})();
