(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


        var url = "/datado/newsInf/selectAllNewsRot";
        var addUrl = "/data/add/addNewsRotations";
        var aParam = {

        };

        //操作
        function operation(value, row, index){
            return [
                '<button type="button" class="edit btn btn-primary btn-sm" style="margin-right: 5px" data-toggle="modal" data-target="" >编辑</button>',
                '<button type="button" class="delete btn btn-danger btn-sm"  data-toggle="modal" data-target="#staticBackdrop" >删除</button>',
            ].join('');
        }


            //修改事件
            window.orgEvents = {
                'click .edit' : function(e, value, row, index) {
                    localStorage.setItem("rowData", JSON.stringify(row));
                    orange.redirect(addUrl);
                },

                'click .delete': function (e, value, row, index) {
                    var myDeleteModalData ={
                        modalBodyID : "myDeleteNewsRotations",
                        modalTitle : "删除新闻轮播图",
                        modalClass : "modal-lg",
                        confirmButtonClass : "btn-danger",
                        modalConfirmFun:function () {
                            var isSuccess = false;
                            ajaxUtil.myAjax(null,"/datado/newsInf/deleteByPrimaryKey/"+row.itemid+"/"+row.itemcode,null,function (data) {
                                if(ajaxUtil.success(data)){
                                    ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                        if(!ajaxUtil.success(data)){
                                            return alertUtil.error("图片删除失败");
                                        }
                                    },false,"","get");
                                    alertUtil.info("删除新闻轮播图成功");
                                    isSuccess = true;
                                    refreshTable();
                                }
                            },false,true,"delete");
                            return isSuccess;
                        }
                    };
                    var myDeleteModal = modalUtil.init(myDeleteModalData);
                    myDeleteModal.show();
                },

                'click .pass' : function (e, value, row, index) {

                },

                'click .fail' : function (e, value, row, index) {

                },
            };


        $("#btn_addTask").unbind().on('click',function () {
            localStorage.removeItem("rowData");
            orange.redirect(addUrl);
        });

        var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
        $("#chargePersonSearch").selectUtil(pl);

        var aCol = [
            {field: 'dataTitle', title: '新闻标题'},
            {field: 'filePath', title: '新闻图片', formatter:function (value, row, index) {
                if(value == "已经损坏了"){
                    return '<p>'+value+'</p>';
                }else{
                    return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                }
            }},
            {field: 'dataLocation', title: '所属位置'},
            {field: 'itemcreateat', title: '创建时间'},
            {field: 'dataStatus', title: '展示状态'},
            {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
        ];

        var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

        function refreshTable() {
            var param = {};
            myTable.free();
            myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
        }
            var oTab=document.getElementById("table");
            var btns=document.getElementsByClassName("atext");
            for(var i=1;i<btns.length;i++){
                btns[i].onclick=function(){
                    for(var l=0;l<btns.length;l++){
                        btns[l].setAttribute("style","background-color:")
                    }
                    //btns.setAttribute("style","backgroundColor:''")

                    this.setAttribute("style","background-color:red")
                    //btns.style(backgroundColor,'');
                    //this.style(backgroundColor,'red');
                    // console.log(oTab.tBodies[0].rows);
                    for(var j=0;j<oTab.tBodies[0].rows.length;j++)
                    {
                        var str1=oTab.tBodies[0].rows[j].cells[3].innerText;
                        var str2=this.innerHTML;
                        // console.log(str1);
                        // console.log(str2);
                        if(str1==str2){
                            // console.log("aaaa")
                            // console.log(oTab.tBodies[0].rows[j])
                            oTab.tBodies[0].rows[j].hidden=false;
                        }
                        else{
                            oTab.tBodies[0].rows[j].hidden=true;
                        }
                    }
                }
            }
            btns[0].onclick=function(){
                for(var l=0;l<btns.length;l++){
                    btns[l].setAttribute("style","background-color:")
                }
                refreshTable();
            }

    })
})();
