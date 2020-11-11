(function () {
    require(['jquery', 'ajaxUtil','bootstrapTableUtil','objectUtil','alertUtil','modalUtil','selectUtil','stringUtil','dictUtil'],
        function (jquery,ajaxUtil,bootstrapTableUtil,objectUtil,alertUtil,modalUtil,selectUtil,stringUtil,dictUtil) {


        var url = "/cul/pro/movTv/getAll";
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
                orange.redirect("/chineseCultural/production/insertMovieTV");
            },
            'click .delete': function (e, value, row, index) {
                var myDeleteModalData ={
                    modalBodyID : "myDeleteModalMovTV",
                    modalTitle : "删除电视电影信息",
                    modalClass : "modal-lg",
                    confirmButtonClass : "btn-danger",
                    modalConfirmFun:function () {
                        var isSuccess = false;
                        ajaxUtil.myAjax(null,"/cul/pro/movTv/delMovTv/"+row.itemid+"/"+row.itemcode,null,function (data) {
                            if(ajaxUtil.success(data)){
                                ajaxUtil.myAjax(null,"/file/delete?dataCode="+row.itemcode,null,function (data) {
                                    if(!ajaxUtil.success(data)){
                                        return alertUtil.error("文件删除失败");
                                    }
                                },false,"","get");
                                alertUtil.info("删除电视电影信息成功");
                                isSuccess = true;
                                refreshTable();
                            }
                        },false,true,"delete");
                        return isSuccess;
                    }

                };
                var myDeleteModal = modalUtil.init(myDeleteModalData);
                myDeleteModal.show();
            }
        };


            $("#btn_addTask").unbind().on('click',function () {
                var url = "/chineseCultural/production/insertMovieTV";
                localStorage.removeItem("rowData");
                orange.redirect(url);
            });

            var pl = dictUtil.getDictByCode(dictUtil.DICT_LIST.showStatus);
            $("#chargePersonSearch").selectUtil(pl);

        var aCol = [
            {field: 'chineseCulturalName', title: '电视电影名称'},
            {field: 'filePath', title: '图片', formatter:function (value, row, index) {
                    if(value == "已经损坏了"){
                        return '<p>'+value+'</p>';
                    }else{
                        return '<img  src='+value+' width="100" height="100" class="img-rounded" >';
                    }
                }},
            {field: 'chineseCulturalSource', title: '来源'},
            {field: 'chineseCulturalAuthor', title: '作者'},
            {field: 'itemcreateat', title: '创建时间'},
            {field: 'action',  title: '操作',formatter: operation,events:orgEvents}
        ];

        var myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, aParam, aCol);

        function refreshTable() {
            var param = {};
            myTable.free();
            myTable = bootstrapTableUtil.myBootStrapTableInit("table", url, param, aCol);
        }

        //
            var oTab=document.getElementById("table");
            var oBt=document.getElementById("taskNameSearch");
            var btnSearch=document.getElementById("btnSearch")
            btnSearch.onclick=function(){
                console.log(oTab.tHead.rows[0].childNodes[5].innerText);
                for(var i=0;i<oTab.tBodies[0].rows.length;i++)
                {
                    var str1=oTab.tBodies[0].rows[i].innerText.toLowerCase();
                    var str2=oBt.value.toLowerCase();
                    console.log(str2);
                    if (str2==""||str2=="请输入"){
                        refreshTable();
                    }
                    /***********************************JS实现表格的模糊搜索*************************************/
                    //表格的模糊搜索的就是通过JS中的一个search()方法，使用格式，string1.search(string2);如果
                    //用户输入的字符串是其一个子串，就会返回该子串在主串的位置，不匹配则会返回-1，故操作如下
                    if(str1.search(str2)!=-1){oTab.tBodies[0].rows[i].hidden= false;}
                    else{oTab.tBodies[0].rows[i].hidden= true;}
                    /***********************************JS实现表格的多关键字搜索********************************/
                        //表格的多关键字搜索，加入用户所输入的多个关键字之间用空格隔开，就用split方法把一个长字符串以空格为标准，分成一个字符串数组，
                        //然后以一个循环将切成的数组的子字符串与信息表中的字符串比较
                    var arr=str2.split(' ');
                    for(var j=0;j<arr.length;j++)
                    {
                        if(str1.search(arr[j])!=-1){oTab.tBodies[0].rows[i].hidden= false;}
                    }

                }

            }

            document.getElementById('closeAndOpen').onclick = function(){
                var aria=this.ariaExpanded;
                this.innerText="";
                if (aria=="true"){
                    this.innerText="展开";
                } else {
                    this.innerText="收起";
                }
            }


    })
})();
