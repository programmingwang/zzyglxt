(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


            //请求后台url
            var url = "/industrialdevelop/audits";

            var auditUrl = "/industrialdevelop/audits";

            var rolename = sessionStorage.getItem("rolename");

            var dictMap = new Map();

            var dicList = dictUtil.getDictByCode(dictUtil.DICT_LIST.projectStatus);

            for (const t of dicList){
                if (t.id === "1"){
                    dictMap.set("待审核", t.id);
                }else {
                    dictMap.set(t.text, t.id );
                }
            }

            var pass;

            var nopass;

            if (rolename === "产业发展-市级")
            {
                pass = "4";
                nopass = "5";
            }
            else if (rolename === "产业发展-省级")
            {
                pass = "6";
                nopass = "7";
            }

            // var getUrl = url + "/" + sessionStorage.getItem("orgCode");
            var getUrl = url;
            var aParam = {

            };

            //操作
            function operation(value, row, index){
                let code = dictMap.get(row.status)
                let tcode = parseInt(code);
                let tpass = parseInt(pass);
                let tnopass = parseInt(nopass);
                if ((tcode < tpass && tcode % 2 === 0 && tcode !== 0) || (tcode === 1 && rolename === "产业发展-市级")){
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="pass" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >通过</a>',
                        '<a class="nopass" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >不通过</a>',
                    ].join('')
                }
                else if (tcode >= tpass && tcode % 2 === 0 && tcode !== 0)
                {
                    return [
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>'
                    ].join('')
                }
                else if (tcode % 2 !== 0 && tcode !== tnopass )
                {
                    return [
                        '<a class="reason" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>'
                    ].join('')
                }
                else if (tcode % 2 !== 0 && tcode === tnopass)
                {
                    return [
                        '<a class="reason" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >理由</a>',
                        '<a class="view" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >查看</a>',
                        '<a class="pass" style="margin:0 1em;text-decoration: none;color: #775637" data-toggle="modal" data-target="" >通过</a>',
                        '<a class="nopass" style="margin:0 1em;text-decoration: none;color:#D60000;"  data-toggle="modal" data-target="#staticBackdrop" >不通过</a>'
                    ].join('')
                }
            }

            //修改事件
            window.orgEvents = {
                'click .view' : function(e, value, row, index) {
                    let viewUrl = "";
                    var data = {};
                    let modalData ={
                        modalBodyID : "",
                        modalTitle : "查看详情",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    let myTravelModal;
                    let type = dictUtil.getCode(dictUtil.DICT_LIST.orgType, row.type);
                    switch (type) {
                        case "tec":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewTecModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#name").val(data.name);
                                $("#projectName").val(data.projectName);
                                $("#contacts").val(data.contacts);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#intruduce").html(data.intruduce);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "lab":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewLabModal";
                                let myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#name").val(data.name);
                                $("#contacts").val(data.contacts);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#intruduce").html(data.intruduce);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "tour":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewTecModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#name").val(data.name);
                                $("#areaCoverd").val(data.areaCoverd);
                                $("#specialService").val(data.specialService);
                                $("#contacts").val(data.contacts);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#intruduce").html(data.intruduce);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "plant":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewPlantModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#name").val(data.name);
                                $("#areaCoverd").val(data.areaCoverd);
                                $("#plantType").val(data.plantType);
                                $("#contacts").val(data.contacts);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#intruduce").html(data.intruduce);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "process":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewProcessModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#name").val(data.name);
                                $("#areaCoverd").val(data.areaCoverd);
                                $("#processingType").val(data.processingType);
                                $("#contacts").val(data.contacts);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#intruduce").html(data.intruduce);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "sale":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewSaleModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#name").val(data.name);
                                $("#salesCategory").val(data.salesCategory);
                                $("#sellingDrugs").val(data.sellingDrugs);
                                $("#contacts").val(data.contacts);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#intruduce").html(data.intruduce);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "produce":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewProduceModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#name").val(data.name);
                                $("#peoduceDrug").val(data.peoduceDrug);
                                $("#peoduceType").val(data.peoduceType);
                                $("#contacts").val(data.contacts);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#intruduce").html(data.intruduce);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "school":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewSchoolModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#myImg").attr('src', data.filePath);
                                $("#schoolName").val(data.schoolName);
                                $("#schoolIntroduce").val(data.schoolIntroduce);
                                $("#secondaryCollege").val(data.secondaryCollege);
                                $("#enrollmentMajor").val(data.enrollmentMajor);
                                $("#graduateEnrollmentMajor").val(data.graduateEnrollmentMajor);
                                $("#onlineAddress").val(data.onlineAddress);
                                $("#phone").val(data.phone);
                                $("#address").val(data.addressPro + data.addressCity + data.addressCountry + data.address);
                                $("#schoolText").html(data.schoolText);
                                $("#creater").val(data.creater);
                                $("#itemcreateat").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                        case "hospital":
                            data = {};
                            viewUrl = "/industrialdevelop/audits/" + type + "/" + row.itemcode + "/" + row.itemid;
                            ajaxUtil.myAjax(null, viewUrl,null, function (res) {
                                data = res.data;
                                modalData.modalBodyID = "myViewHospModal";
                                myTravelModal = modalUtil.init(modalData);
                                $("#hospitalImg").attr('src', data.filePath);
                                $("#hospitalName").val(data.hospitalName);
                                $("#hospitalLevel").val(data.hospitalLevel);
                                $("#hospitalTelephone").val(data.hospitalTelephone);
                                $("#hospitalLink").val(data.hospitalLink);
                                $("#hospitalIntroduce").val(data.hospitalIntroduce);
                                $("#onlineAddress").val(data.onlineAddress);
                                $("#hospitalStatus").parent().parent().remove();
                                $("#phone").val(data.phone);
                                $("#hospitalAddress").val(data.hospitalAddressPro + data.hospitalAddressCity + data.hospitalAddressCountry + data.hospitalAddress);
                                $("#creater").val(data.creater);
                                $("#itemCreateAt").val(data.itemcreateat);

                                myTravelModal.show();
                            },false,true,"get");
                            break;
                    }
                },
                'click .pass': function (e, value, row, index) {
                    var param = {
                        itemid: row.itemid,
                        itemcode: row.itemcode,
                        type: dictUtil.getCode(dictUtil.DICT_LIST.orgType, row.type),
                        status: pass
                    };
                    ajaxUtil.myAjax(null,auditUrl,param,function (data) {
                        alertUtil.info("修改成功");
                        refreshTable()
                    }, true,true,"put")
                },
                'click .nopass' : function(e, value, row, index) {
                    var param = {
                        itemid: row.itemid,
                        itemcode: row.itemcode,
                        type: dictUtil.getCode(dictUtil.DICT_LIST.orgType, row.type),
                        reason: "",
                        status: nopass
                    };

                    var myModalData ={
                        modalBodyID : "myInputReason", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "输入理由",
                        modalClass : "modal-lg",
                        modalConfirmFun:function () {
                            param.reason = $("#inputReason").val();
                            ajaxUtil.myAjax(null,auditUrl,param,function (data) {
                                alertUtil.info("修改成功");
                                myTravelModal.hide();
                                refreshTable();
                            }, true,true,"put")
                        },
                    };
                    var myTravelModal = modalUtil.init(myModalData);

                    myTravelModal.show();

                },
                'click .reason' : function(e, value, row, index) {
                    var myModalData ={
                        modalBodyID : "myViewReasonHtml", //公用的在后面给span加不同的内容就行了，其他模块同理
                        modalTitle : "查看理由",
                        modalClass : "modal-lg",
                        confirmButtonStyle: "display:none",
                    };
                    var myTravelModal = modalUtil.init(myModalData);
                    $("#reason").html(row.reason);

                    myTravelModal.show();
                },
            };


            $("#search").unbind().on("click",function () {
                var param = {

                };
                $('#table').bootstrapTable("destroy");
                bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
            });

            var pl;
            if (rolename == "产业发展-市级"){
                pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.orgAuditStatus);
                $("#chargePersonSearch").selectUtil(pl);
                pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.orgType);
                $("#orgTypeSelect").selectUtil(pl);
            }else if (rolename == "产业发展-省级"){
                pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.orgAuditStatus);
                $("#chargePersonSearch").selectUtil(pl);
                pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.orgType);
                $("#orgTypeSelect").selectUtil(pl);
            }


            //增加全部选项
            var option = $("<option />");
            option.html("全部");
            option.val("all");
            $("#orgTypeSelect").prepend(option);
            $("#orgTypeSelect").val("all");
            //增加全部选项

            $("#orgTypeSelect").unbind("change").on("change",function () {
                let code = $("#orgTypeSelect").val();
                if (code != "all"){
                    getUrl = url + "/" + code;
                    refreshTable();
                }else {
                    getUrl = url;
                    refreshTable();
                }
            });

            var aCol;

            if (rolename == "产业发展-市级"){
                aCol = [{field: 'name', title: '机构名称'},
                    {field: 'type', title: '机构类型'},
                    {field: 'itemcreateat', title: '申请时间'},
                    {field: 'status', title: '审核状态'},
                    {field: 'action',  title: '操作',formatter: operation,events:orgEvents}]
            }else if (rolename == "产业发展-省级"){
                aCol = [{field: 'name', title: '机构名称'},
                    {field: 'type', title: '机构类型'},
                    {field: 'addressCity', title: '所属地市'},
                    {field: 'status', title: '审核状态'},
                    {field: 'action',  title: '操作',width: '254px',formatter: operation,events:orgEvents}]
            }


            var myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, aParam, aCol);

            function refreshTable() {
                var param = {};
                myTable.free();
                myTable = bootstrapTableUtil.myBootStrapTableInit("table", getUrl, param, aCol);
            }

            // bootstrapTableUtil.globalSearch("table",getUrl,aParam, aCol,"status");
            $("#btnSearch").unbind().on('click',function() {
                var newArry = [];
                var addstr=document.getElementById("chargePersonSearch").value;
                switch (addstr) {
                    case "0" : addstr = "待审核"; break;
                    case "1" : addstr = "地市局用户审核通过"; break;
                    case "2" : addstr = "地市局用户审核不通过"; break;
                    case "3" : addstr = "省局用户审核通过"; break;
                    case "4" : addstr = "省局用户审核不通过"; break;
                }
                var str = document.getElementById("taskNameSearch").value.toLowerCase();
                var allTableData = JSON.parse(localStorage.getItem("2"));
                if(str.indexOf("请输入")!=-1){
                    str=""
                }
                for (var i in allTableData) {
                    for (var v in aCol){
                        var textP = allTableData[i][aCol[v].field];
                        var isStatusSlot=false;           // 默认状态为true
                        //状态条件判断,与表格字段的状态一致,这里根据自己写的修改
                        var status= allTableData[i]["status"]
                        // console.log("addstr:"+addstr)
                        // console.log("status:"+status)
                        //调试时可以先打印出来，进行修改
                        if(addstr==status){
                            isStatusSlot=true;
                        }
                        //当存在时将条件改为flase
                        if (textP == null || textP == undefined || textP == '') {
                            textP = "1";
                        }
                        if($("#closeAndOpen").text().search("展开")!= -1 && textP.search(str) != -1){
                            isStatusSlot = false;
                            newArry.push(allTableData[i])
                        }
                        if($("#closeAndOpen").text().search("收起")!= -1 && textP.search(str) != -1 && isStatusSlot){
                            newArry.push(allTableData[i])
                        }
                    }
                }
                var newArr=new Set(newArry)
                newArry=Array.from(newArr)
                $("#table").bootstrapTable("load", newArry);
                if(newArry.length == 0){
                    alertUtil.warning("搜索成功,但此搜索条件下没有数据");
                }else{
                    alertUtil.success("搜索成功");
                }
            })

            var aria=this.ariaExpanded;
            $("#closeAndOpen").unbind().on('click',function(){
                this.innerText="";
                if (aria==="true"){
                    this.innerText="展开";
                    aria = "false";
                } else {
                    this.innerText="收起";
                    aria = "true";
                }
            })
        })
})();
