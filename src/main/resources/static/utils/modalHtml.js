(function () {
    define("modalHtml", ["jquery", "objectUtil", "stringUtil", "alertUtil", "bootstrap"], function (jquery, objectUtil, stringUtil, alertUtil, bootstrap) {
        var modalHtml = new Object();
        modalHtml.defaultModalHtml = function defaultModalHtml(obj) {
            return '<div class="modal fade" id="' + obj.modalID + '" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">' + '            <div class="' + obj.modalClass + '">' + '                <div class="modal-content" style="width: 100%">' + '                    <div class="modal-header">' + '                        <h5 class="modal-title" id="staticBackdropLabel">' + obj.modalTitle + "</h5>" + '                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">' + '                            <span aria-hidden="true">&times;</span>' + "                        </button>" + "                    </div>" + '                    <div class="modal-body">' + obj.modalBody + "                    </div>" + '                    <div class="modal-footer">' + '                        <button type="button" id="' + obj.modalCancelID + '" style="'+obj.cancelButtonStyle+'" class="btn btn-secondary" data-dismiss="modal">' + obj.modalCancel + "</button>" + '                        <button type="button" id="' + obj.modalConfirmID + '" style="' + obj.confirmButtonStyle + '" class="' + obj.confirmButtonClass + '">' + obj.modalConfirm + "</button>" + "                    </div>" + "                </div>" + "            </div>" + "        </div>" + "    </div>"
        };
        modalHtml.myViewCulturalModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12 ">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span  id="culturalNameSpan"\n' +
            '                                class="lefttext"></span> </div><input type="text"\n' +
            '                            id="chineseCulturalName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row ">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">作者：</span> </div><input type="text"\n' +
            '                            id="chineseCulturalAuthor" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">来源：</span> </div><input type="text"\n' +
            '                            id="chineseCulturalSource" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span  id="culturalContentSpan"\n' +
            '                                class="lefttext">正文：</span> </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                id="chineseCulturalContent" class="form-control"> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2" > <span \n' +
            '                                class="lefttext">数据状态：</span> </div><input type="text"\n' +
            '                            id="chineseCulturalStatus" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">附件：</span> </div><span id="upFile" src="#"\n' +
            '                            style="margin-left: 9px;margin-top: 2px;" class="col-lg-9 col-md-9"></span>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row ">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建人：</span>\n' +
            '                        </div><input type="text" id="creater" class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-6"> <span class="lefttext" for="applicant">创建时间：</label>\n' +
            '                        </div><input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2" style="padding-right: 20px;"> <span  id="culturalImgSpan"\n' +
            '                                class="lefttext"></span> </div><img id="culturalImg" src="#" style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewFamPreModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">方名：</span> </div>\n' +
            '                        <input type="text" id="name" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">出处：</span> </div> <input type="text" id="source"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span id="culturalContentSpan"\n' +
            '                                class="lefttext">处方：</span> </div> <input type="text" id="prescription"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span id="culturalContentSpan"\n' +
            '                                class="lefttext">剂型：</span> </div> <input type="text" id="type"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">制法及用法：</span> </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div id="content"\n' +
            '                                style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control "> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext" for="applicant">数据状态：</span>\n' +
            '                        </div> <input type="text" id="status" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myviewChineseMedicineModal = ' <div class="row">\n' +
            '            \n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span id="lefttext"\n' +
            '                                class="lefttext">中药名称：</span> </div>\n' +
            '                        <input type="text" id="chineseMedicineName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">别名：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineAlias" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">功效分类：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineType" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">采制：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineHarvesting" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">性味：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineTaste" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">归经：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineMerTro" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">功效主治：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineEffect" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">用法用量：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineUsage" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">数据状态：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="chineseMedicineStatus" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4">\n' +
            '                            <span class="lefttext" for="applicant">创建人：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="creater" class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4">\n' +
            '                            <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div>\n' +
            '                        <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2" style="padding-right: 20px;"> <span id="mediCineImgSpan"\n' +
            '                                class="lefttext">药材图片：</span> </div> <img id="mediCineImg" src="#"  style="width: 100px;height: 100px;"/>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewCareFamModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span id="culturalNameSpan"\n' +
            '                                class="lefttext">国医话健康标题：</span> </div>\n' +
            '                        <input type="text" id="name" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">来源：</span>\n' +
            '                        </div> <input type="text" id="source" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">作者：</span>\n' +
            '                        </div> <input type="text" id="author" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span id="carefamContentSpan"\n' +
            '                                class="lefttext">国医话健康详情：</span> </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div id="content"\n' +
            '                                style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control"> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">数据状态：</span>\n' +
            '                        </div> <input type="text" id="status" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">附件：</span> </div> <a\n' +
            '                            src="#"></a>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建人：</span>\n' +
            '                        </div> <input type="text" id="creater" class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewSciKnowModal ='<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span  id="scienceKnowledgeNameSpan"\n' +
            '                                class="lefttext">科普知识名称：</span> </div>\n' +
            '                        <input type="text" id="scienceKnowledgeName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">科普知识来源：</span> </div> <input type="text"\n' +
            '                            id="scienceKnowledgeSource" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">作者：</span>\n' +
            '                        </div> <input type="text" id="scienceKnowledgeAuthor" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span id="carefamContentSpan"\n' +
            '                                class="lefttext">科普知识详情：</span> </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div id="content"\n' +
            '                                style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control "> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">数据状态：</span>\n' +
            '                        </div> <input type="text" id="scienceKnowledgeStatus" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewCooExcModal = '<div class="row">' + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button id="cooperationExchangeNameSpan" class="btn btn-primary btn-sm">合作交流名称</button>' + "                    </div>" + '                    <input type="text" id="cooperationExchangeName" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >预期合作机构</button>' + "                    </div>" + '                    <input type="text" id="cooperativeOrg" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >联系人</button>' + "                    </div>" + '                   <input type="text" id="contacts" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button  class="btn btn-primary btn-sm" >联系电话</button>' + "                    </div>" + '                    <input type="text" id="phone" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >项目简介</button>' + "                    </div>" + '                    <input type="text" id="projectIntroduce" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >数据状态</button>' + "                    </div>" + '                    <input type="text" id="status" class="form-control">' + "                </div>" + "            </div>" + "</div>";
        modalHtml.myViewHospModal = '<div class="row">\n' +
            '            \n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span  class="lefttext">医院名称：</span> </div> <input type="text"\n' +
            '                            id="hospitalName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">医院等级：</span> </div> <input type="text"\n' +
            '                            id="hospitalLevel" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">医院简介：</span> </div> <input type="text"\n' +
            '                            id="hospitalBriefIntroduce" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">重点专科：</span> </div> <input type="text"\n' +
            '                            id="hospitalKeySpecialty" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">联系电话：</span> </div> <input type="text"\n' +
            '                            id="hospitalTelephone" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">地址：</span> </div> <input type="text"\n' +
            '                            id="hospitalAddress" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">链接地址：</span> </div> <input type="text" id="hospitalLink"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">医院介绍：</span> </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div id="hospitalIntroduce"\n' +
            '                                style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control "> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">数据状态：</span> </div> <input type="text"\n' +
            '                            id="hospitalStatus" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2" style="padding-right: 20px;"> <span \n' +
            '                                class="lefttext">医院图片：</span> </div> <img id="hospitalImg" src="#" style="width: 100px;height: 100px;"/>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewSpecialtyModal = '<div class="row"><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">科室名称：</span></div><input type="text" id="specialtyName" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">科室简介：</span></div><input type="text" id="specialtyBriefIntroduce" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">科室级别：</span></div><input type="text" id="specialtyLevel" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">科室电话：</span></div><input type="text" id="specialtyPhone" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">地址：</span></div><input type="text" id="specialtyAddress" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">链接地址：</span></div><input type="text" id="specialtyLink" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">优势病种：</span></div><input type="text" id="specialtyDisease" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">科室介绍：</span></div><div class="col-lg-9 col-md-9" style="padding: 0;"><div id="specialtyIntroduce"                        style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"                        class="form-control "></div></div></div></div><div class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 "><span class="lefttext">数据状态：</span></div><input type="text" id="specialtyStatus" class="form-control col-lg-9 col-md-9"></div></div><div class="col-lg-6 col-md-6"><fieldset disabled><div class="input-group mb-3"><div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4 "><span class="lefttext"                        for="applicant">创建人：</span></div><input type="text" id="creater" class="form-control col-lg-6 col-md-6"></div></fieldset></div><div class="col-lg-6 col-md-6"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-4 col-md-4 "><span class="lefttext" for="applicant">创建时间：</span></div><input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6"></div></fieldset></div><div id="imgDiv" class="col-lg-12 col-md-12"><fieldset disabled><div class="input-group mb-3"><div class="input-group-prepend col-lg-2 col-md-2 " style="padding-right: 20px;"><span class="lefttext">科室图片：</span></div><img id="specialtyImg" src="#" style="width: 100px;height: 100px;" /></div></div></div>';
        modalHtml.myViewChineseMedicineModal = '<div class="row">\n' +
            '           \n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">中医名称：</span> </div> <input type="text"\n' +
            '                            id="chineseMedicineName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">专家类型：</span> </div> <input type="text"\n' +
            '                            id="chineseMedicineType" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">职&ensp;&ensp;&ensp;&ensp;称：</span> </div> <input type="text"\n' +
            '                            id="chineseMedicineTitle" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">所在医院：</span> </div> <input type="text" id="hospitalName"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">所在科室：</span> </div> <input type="text"\n' +
            '                            id="specialtyName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">出诊时间：</span> </div> <input type="text" id="visitTime"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">联系电话：</span> </div> <input type="text" id="phone"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">专家简介：</span> </div> <input type="text"\n' +
            '                            id="expertBriefIntroduce" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">主要就诊：</span> </div> <input type="text" id="mainVisit"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">专家介绍：</span> </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div id="expertIntroduce"\n' +
            '                                style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control "> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">重点医案：</span> </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div id="medicineRecords"\n' +
            '                                style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control "> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">数据状态：</span> </div> <input type="text"\n' +
            '                            id="chineseMedicineStatus" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2" style="padding-right: 20px;"> <span \n' +
            '                                class="lefttext">中医图片：</span> </div> <img id="chineseMedicineImg"\n' +
            '                            src="#" style="width: 100px;height: 100px;"/>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewAccountMessageModal = '<div class="row">\n' +
            '        <div class="col-lg-12 col-md-12">\n' +
            '            <fieldset disabled="">\n' +
            '                <div class="input-group mb-3 row">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"> <span  class="lefttext">用户账号：</span>\n' +
            '                    </div> <input type="text" id="username" class="form-control">\n' +
            '                </div>\n' +
            '            </fieldset>\n' +
            '        </div>\n' +
            '        <div class="col-lg-12 col-md-12">\n' +
            '            <fieldset disabled="">\n' +
            '                <div class="input-group mb-3 row">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"> <span  class="lefttext">账号名称：</span>\n' +
            '                    </div> <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </fieldset>\n' +
            '        </div>\n' +
            '        <div class="col-lg-12 col-md-12">\n' +
            '            <fieldset disabled="">\n' +
            '                <div class="input-group mb-3 row ">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"> <span  class="lefttext">用户角色：</span>\n' +
            '                    </div> <input type="text" id="roleName" class="form-control">\n' +
            '                </div>\n' +
            '            </fieldset>\n' +
            '        </div>\n' +
            '        <div class="col-lg-6 col-md-6" style="padding-right: 0;">\n' +
            '            <fieldset disabled="">\n' +
            '                <div class="input-group mb-3 row ">\n' +
            '                    <div class="input-group-prepend col-lg-4 col-md-4"> <span  class="lefttext">联系人：</span>\n' +
            '                    </div> <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </fieldset>\n' +
            '        </div>\n' +
            '        <div class="col-lg-6 col-md-6" style="padding-left: 0;">\n' +
            '            <fieldset disabled="">\n' +
            '                <div class="input-group mb-3 row ">\n' +
            '                    <div class="input-group-prepend col-lg-4 col-md-4"> <span  class="lefttext">联系电话：</span>\n' +
            '                    </div> <input type="text" id="mobilephone" class="form-control">\n' +
            '                </div>\n' +
            '            </fieldset>\n' +
            '        </div>\n' +
            '        <div class="col-lg-12 col-md-12">\n' +
            '            <fieldset disabled="">\n' +
            '                <div class="input-group mb-3 row ">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"> <span  class="lefttext">主管市区：</span>\n' +
            '                    </div> <input type="text" id="cityid" class="form-control">\n' +
            '                </div>\n' +
            '            </fieldset>\n' +
            '        </div>\n' +
            '    </div>';

        modalHtml.myAddAccountModal = ' <div class="row">\n' +
            '            <div class="col-lg-12 col-md-12 mb-3" style="margin-top: 0;padding-top: 0;">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName" style="margin-top: 0;padding-top: 0;">用户账号：</span> </div>\n' +
            '                    <input type="text" id="username" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2">\n' +
            '                        <sapn class="titleName">账号名称：</sapn>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">主管市区：</span> </div>\n' +
            '                    <select id="cityid" class="form-control col-lg-9 col-md-9"></select>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">用户角色：</span> </div>\n' +
            '                    <select id="roleName" class="form-control col-lg-9 col-md-9"></select>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">联系人：</span> </div>\n' +
            '                    <input type="text" id="contacts" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">联系电话：</span> </div>\n' +
            '                    <input type="text" id="mobilephone" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>';

        modalHtml.myChangePasswordModal = ' <div class="row">\n' +
            '            <div class="col-lg-12 col-md-12 mb-3" style="margin-top: 0;padding-top: 0;">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName" style="margin-top: 0;padding-top: 0;">电话号码：</span> </div>\n' +
            '                    <input type="text" id="phone" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2">\n' +
            '                        <sapn class="titleName">原密码：</sapn>\n' +
            '                    </div>\n' +
            '                    <input type="password" id="oldPwd" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">新密码：</span> </div>\n' +
            '                    <input type="password" id="newPwd" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12 mb-3">\n' +
            '                <div class="row">\n' +
            '                    <div class="col-lg-2 col-md-2"> <span class="titleName">确认密码：</span> </div>\n' +
            '                    <input type="password" id="checkPwd" class="form-control col-lg-9 col-md-9">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>';

        modalHtml.myViewDataModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span  id="dataTitleSpan" class="lefttext"></span>\n' +
            '                        </div><input type="text" id="dataTitle" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div id="author" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">作者：</span> </div><input type="text" id="dataAuthor"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">来源：</span> </div><input type="text" id="dataSource"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">正文：</span> </div>\n' +
            '                            <div id="dataContent"\n' +
            '                                style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control col-lg-9 col-md-9"> </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div id="zszt" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">展示状态：</span> </div><input type="text" id="dataStatus"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div id="fileType" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span  id="dataFileTypeSpan"\n' +
            '                                class="lefttext"></span> </div><input type="text" id="dataFileType"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">附件：</span> </div><span id="upFile" src="#"\n' +
            '                            style="margin-left: 9px;margin-top: 2px;"></span>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4" style="margin-left: 4px;"> <span class="lefttext" for="applicant">创建人：</span>\n' +
            '                        </div><input type="text" id="creater" class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div><input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span  id="newsImgSpan"\n' +
            '                                class="lefttext"></span> </div><img id="newsImg" src="#"  style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewDataRulesModa = '<div id="viewTopic" class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"><span class="lefttext">名称：</span></div><input\n' +
            '                        type="text" id="dataTitle" class="form-control col-lg-9 col-md-9" readonly="readonly">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"><span class="lefttext">来源：</span></div><input\n' +
            '                        type="text" id="dataSource" class="form-control col-lg-9 col-md-9" readonly="readonly">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"><span class="lefttext">正文：</span></div>\n' +
            '                        <div id="dataContent"\n' +
            '                            style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                            class="form-control col-lg-9 col-md-9"></div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend col-lg-2 col-md-2"><span class="lefttext">展示状态：</span>\n' +
            '                    </div><input type="text" id="dataStatus" class="form-control col-lg-9 col-md-9" readonly="readonly">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"><span class="lefttext">附件：</span></div><span\n' +
            '                            id="upFile" src="#" style="margin-left: 9px;margin-top: 2px;"></span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend col-lg-4 col-md-4" style="margin-left: 4px;"><span class="lefttext">创建人：</span></div><input\n' +
            '                        type="text" id="creater" class="form-control col-lg-6 col-md-6" readonly="readonly">\n' +
            '                </div>\n' +
            '            </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"><span class="lefttext">创建时间：</span>\n' +
            '                        </div><input type="text" id="itemCreateAt" class="form-control col-lg-6 col-md-6"\n' +
            '                            readonly="readonly">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewReasonHtml = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span id="reasonSpan"\n' +
            '                                class="lefttext">理由：</span> </div>\n' +
            '                            <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:scroll;word-break: break-all;"\n' +
            '                                id="reason" class="form-control col-lg-9 col-md-9"> </div>\n' +
            '                        \n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewLabModal = '<div class="row">    \n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span  class="lefttext">院所名称：</span> </div> <input type="text"\n' +
            '                            id="name" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">联系人：</span> </div> <input type="text" id="contacts"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">联系电话：</span> </div> <input type="text" id="phone"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">地址：</span> </div> <input type="text"\n' +
            '                            id="address" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">介绍：</span> </div>\n' +
            '                                <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                                    <div id="intruduce"\n' +
            '                                        style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                        class="form-control "> </div>\n' +
            '                                </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemcreateat" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">院所图片：</span> </div> <img id="myImg" src="#" style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewTecModal = ' <div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">企业名称：</span> </div> <input type="text" id="name"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">服务项目：</span> </div>\n' +
            '                        <input type="text" id="projectName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">联系人：</span> </div>\n' +
            '                        <input type="text" id="contacts" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">联系电话：</span> </div>\n' +
            '                        <input type="text" id="phone" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">地址：</span> </div>\n' +
            '                        <input type="text" id="address" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">企业简介：</span>\n' +
            '                        </div>\n' +
            '                        <div class="col-lg-9 col-md-9" style="padding: 0;">\n' +
            '                            <div id="intruduce"\n' +
            '                                style="height:300px;width:100%; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                                class="form-control "> </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span>\n' +
            '                        </div> <input type="text" id="creater" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建时间：</span>\n' +
            '                        </div> <input style="margin-left: 4px;" type="text" id="itemcreateat"\n' +
            '                            class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">企业图片：</span> </div>\n' +
            '                        <img style="width: 100px;height: 100px;" id="myImg" src="#" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewTourModal = '<div class="row">' + '            <div id="imgDiv" class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm">基地照片</button>' + "                    </div>" + '                    <img id="myImg" src="#"/>' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm">基地名称</button>' + "                    </div>" + '                    <input type="text" id="name" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm">占地面积</button>' + "                    </div>" + '                    <input type="text" id="areaCoverd" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm">特色服务</button>' + "                    </div>" + '                    <input type="text" id="specialService" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>' + "                    </div>" + '                   <input type="text" id="contacts" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>' + "                    </div>" + '                   <input type="text" id="phone" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>' + "                    </div>" + '                    <input type="text" id="address" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm" >基地简介</button>' + "                    </div>" + '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">' + "                       </div>" + "                </div>" + "            </div>" + "" + '            <div class="col-lg-6 col-md-6">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>' + "                    </div>" + '                    <input type="text"  id="creater" class="form-control">' + "                </div>" + "                </fieldset>" + "            </div>" + "" + '            <div class="col-lg-6 col-md-6">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <label class="input-group-text" for="applicant">创建时间</label>' + "                    </div>" + '                    <input type="text"  id="itemcreateat" class="form-control">' + "                </div>" + "                </fieldset>" + "            </div>" + "</div>";
        modalHtml.myViewPlantModal = ' <div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">种植园名称：</span> </div> <input\n' +
            '                            type="text" id="name" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span\n' +
            '                                class="lefttext">种植面积：</span> </div> <input type="text" id="areaCoverd"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span\n' +
            '                                class="lefttext">种植种类：</span> </div> <input type="text" id="plantType"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span\n' +
            '                                class="lefttext">联系人：</span> </div> <input type="text" id="contacts"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span\n' +
            '                                class="lefttext">联系电话：</span> </div> <input type="text" id="phone"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span\n' +
            '                                class="lefttext">地址：</span> </div> <input type="text"\n' +
            '                            id="address" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span\n' +
            '                                class="lefttext">种植园简介：</span> </div>\n' +
            '                        <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                            id="intruduce" class="form-control col-lg-9 col-md-9"> </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6"  >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemcreateat" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span\n' +
            '                                class="lefttext">种植园照片：</span> </div> <img id="myImg" src="#"  style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewProcessModal = ' <div class="row"> \n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2">\n' +
            '                            <span  class="lefttext">企业名称：</span> </div> <input type="text"\n' +
            '                            id="name" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">占地面积：</span> </div> <input type="text" id="areaCoverd"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">加工种类：</span> </div> <input type="text"\n' +
            '                            id="processingType" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">联系人：</span> </div> <input type="text" id="contacts"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">联系电话：</span> </div> <input type="text" id="phone"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">地址：</span> </div> <input type="text"\n' +
            '                            id="address" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">企业简介：</span> </div>\n' +
            '                        <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                            id="intruduce" class="form-control col-lg-9 col-md-9"> </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-4"> <span class="lefttext" for="applicant">创建时间：</span>\n' +
            '                        </div> <input type="text" id="itemcreateat" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">企业照片：</span> </div> <img id="myImg" src="#"  style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewSaleModal = ' <div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2">\n' +
            '                            <span  class="lefttext">企业名称：</span></div> <input type="text"\n' +
            '                            id="name" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">销售种类：</span></div> <input type="text" id="salesCategory"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">销售药品：</span></div> <input type="text" id="sellingDrugs"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">联系人：</span></div> <input type="text" id="contacts"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">联系电话：</span></div> <input type="text" id="phone"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">地址：</span></div> <input type="text"\n' +
            '                            id="address" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">企业简介：</span></div>\n' +
            '                        <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                            id="intruduce" class="form-control col-lg-9 col-md-9"></div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span></div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建时间：</span></div> <input type="text" id="itemcreateat"\n' +
            '                            class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2"> <span \n' +
            '                                class="lefttext">企业照片：</span></div> <img id="myImg" src="#" style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewProduceModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span class="lefttext">企业名称：</span> </div><input type="text" id="name"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">生产种类：</span> </div>\n' +
            '                        <input type="text" id="peoduceType" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">生产药品：</span> </div>\n' +
            '                        <input type="text" id="peoduceDrug" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">联系人：</span> </div>\n' +
            '                        <input type="text" id="contacts" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">联系电话：</span> </div>\n' +
            '                        <input type="text" id="phone" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">地址：</span> </div>\n' +
            '                        <input type="text" id="address" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">企业简介：</span> </div>\n' +
            '                        <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                            id="intruduce" class="form-control col-lg-9 col-md-9"> </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div><input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建时间：</span> </div><input type="text" id="itemcreateat"\n' +
            '                            class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">企业照片：</span> </div>\n' +
            '                        <img id="myImg" src="#" style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myViewSchoolModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2">\n' +
            '                            <span  class="lefttext">学校名称：</span> </div> <input type="text"\n' +
            '                            id="schoolName" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">学校简介：</span> </div> <input type="text" id="schoolIntroduce"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">二级学院名称：</span> </div> <input type="text" id="secondaryCollege"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">本科招生专业：</span> </div> <input type="text" id="enrollmentMajor"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">研究生招生专业：</span> </div> <input type="text" id="graduateEnrollmentMajor"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">联系电话：</span> </div> <input type="text" id="phone"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">在线地址：</span> </div> <input type="text" id="onlineAddress"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">地址：</span> </div> <input type="text" id="address"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">学校简介：</span> </div>\n' +
            '                        <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"\n' +
            '                            id="schoolText" class="form-control col-lg-9 col-md-9"> </div>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建人：</span> </div> <input type="text" id="creater"\n' +
            '                            class="form-control col-lg-6 col-md-6" >\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext"\n' +
            '                                for="applicant">创建时间：</span> </div> <input type="text" id="itemcreateat"\n' +
            '                            class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span \n' +
            '                                class="lefttext">学校图片：</span> </div> <img id="myImg" src="#" style="width: 100px;height: 100px;" />\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myInputReason = '<div class="row">' + "" + '            <div class="col-lg-12 col-md-12">' + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <label class="input-group-text" for="applicant">输入理由：</label>' + "                    </div>" + '                    <input type="text"  id="inputReason" class="form-control">' + "                </div>" + "            </div>" + "</div>";
        modalHtml.myViewExpertModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2 "><span type="button"\n' +
            '                                class="lefttext">专家账号：</span></div> <input type="text" id="username"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"><span type="button"\n' +
            '                                class="lefttext">专家姓名：</span></div> <input type="text" id="name"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"><span type="button"\n' +
            '                                class="lefttext">性别：</span></div> <input type="text" id="gender"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"><span type="button"\n' +
            '                                class="lefttext">电话号码：</span></div> <input type="text" id="mobilephone"\n' +
            '                            class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"><sapn type="button" class="lefttext">擅长领域：\n' +
            '                            </sapn></div> <input type="text" id="filed" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myaddExpertModal = " <form>\n" +
            "            <div class=\"form-group row\"> <span class=\"col-lg-2 col-md-2 lefttext\">用户账号：</span>\n" +
            "                <div class=\"col-lg-9 col-md-9\"> <input id=\"expertAccount\" type=\"text\" class=\"form-control\" placeholder=\"请输入\"></div>\n" +
            "            </div>\n" +
            "            <div class=\"form-group row\"> <span class=\"col-lg-2 col-md-2 lefttext\">专家姓名：</span>\n" +
            "                <div class=\"col-lg-9 col-md-9\"> <input id=\"expertName\" type=\"text\" class=\"form-control\" placeholder=\"请输入\"></div>\n" +
            "            </div>\n" +
            "            <div class=\"form-group row\"> <span class=\"col-lg-2 col-md-2 lefttext\">擅长领域：</span>\n" +
            "                <div class=\"col-lg-9 col-md-9\"> <input id=\"expertFiled\" type=\"text\" class=\"form-control\" placeholder=\"请输入\"></div>\n" +
            "            </div>\n" +
            "            <div class=\"form-group row\"> <span class=\"col-lg-2 col-md-2 lefttext\">性别：</span>\n" +
            "                <div class=\"col-lg-9 col-md-9\"> <select id=\"expertGender\" type=\"text\" class=\"form-control\" placeholder=\"请输入\">\n" +
            "                        <option value='男'>男\n" +
            "                        </option>\n" +
            "                        <option value='女'>女</option>\n" +
            "                    </select></div>\n" +
            "            </div>\n" +
            "            <div class=\"form-group row\"> <span class=\"col-lg-2 col-md-2 lefttext\">联系电话：</span>\n" +
            "                <div class=\"col-lg-9 col-md-9\"> <input id=\"expertPhone\" type=\"text\" class=\"form-control\" placeholder=\"请输入\"></div>\n" +
            "            </div>\n" +
            "        </form>";
        modalHtml.myTimeModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3" style="padding-left: 0.8rem;    padding-right: 0.2rem;display:none;">\n' +
            '                    <div class="input-group-prepend"> <label class="input-group-text" for="applicant">年份</label>\n' +
            '                    </div> <input type="text" id="year" class="form-control" placeholder="请输入年份">\n' +
            '                </div>\n' +
            '                \n' +
            '                <div class="col-lg-12 col-md-12" style="margin-bottom: 10px;">\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <span class=\'input-label  col-lg-2 col-md-2 lefttext\'>开启时间：</span>\n' +
            '                         <input type="text" id="startTime" class="col-lg-9 col-md-9" > <i\n' +
            '                            class="fa fa-calendar fa-lg" style="position: absolute;top: 0.5rem;right: 70px;"></i>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="col-lg-12 col-md-12" >\n' +
            '                    <div class="input-group mb-3 row">\n' +
            '                        <span class=\'input-label col-lg-2 col-md-2 lefttext\'>结束时间：</span>\n' +
            '                        <input type="text" id="endTime" class="col-lg-9 col-md-9"> <i class="fa fa-calendar fa-lg"\n' +
            '                            style="position: absolute;top: 0.5rem;right: 70px;"></i>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>';

        modalHtml.myReceiptModal = '<div class="row" style="font-size: 1.25rem;flex-direction:column;align-items: flex-start;margin-left: 15px;">\n' +
            '    <script>\n' +
            '        function f() {\n' +
            '            var a = document.getElementsByName(\'fuxuan\');\n' +
            '            for(var i=0;i<a.length;i++){\n' +
            '                a[i].checked = document.getElementById(\'all_select\').checked;\n' +
            '            }\n' +
            '            return false;\n' +
            '        }\n' +
            '    </script>\n' +
            '    <div>请选择需要转发的人员：</div>\n' +
            '    <div ><input id="all_select" type="checkbox" value="all" onclick="f()"><label for="all_select">全选</label></div>\n' +
            '    <div ><input id="zhongyichu" name="fuxuan" type="checkbox" value="zyc"><label for="zhongyichu">中医处分管局长</label></div>\n' +
            '    <div ><input id="zhongyaochu" name="fuxuan" type="checkbox" value="zyc"><label for="zhongyaochu">中药处分管局长</label>\n' +
            '    </div>\n' +
            '    <div><input id="zonghechu" name="fuxuan" type="checkbox" value="zyc"><label for="zonghechu">综合处分管局长</label></div>\n' +
            '    <div><input id="faguijandu" name="fuxuan" type="checkbox" value="zyc"><label for="faguijandu">法规监督处分管局长</label>\n' +
            '    </div>\n' +
            '</div>'
        modalHtml.addSendModal = '<div><div><table id="sendTable"></table><div>其他发送对象：<input id="otherSend" type="text" class="form-control"></div></div></div>';
        modalHtml.addExperModal = '<div><div><table id="expertsTable"></table></div></div>';
        modalHtml.reviseExperModal = '<div><div><button type="button" class="btn btn-primary btn-sm">该项目已经分配的专家</button><table id="expertsTable1"></table><button type="button" class="btn btn-primary btn-sm">该项目还没有分配的专家</button><table id="expertsTable2"></table></div></div>';
        modalHtml.myResonable = "<div>" + '        <textarea name="" id="reason" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myViewReceiptModal = '<div class="row">' + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button id="culturalNameSpan" class="btn btn-primary btn-sm">收&emsp;文&emsp;号</button>' + "                    </div>" + '                    <input type="text" id="receivingNum" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >收文时间</button>' + "                    </div>" + '                    <input type="text" id="receivingDateOfReceipt" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >来文标题</button>' + "                    </div>" + '                    <input type="text" id="receivingTitle" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >来文单位</button>' + "                    </div>" + '                    <input type="text" id="receivingUnitOfCommun" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >文件编号</button>' + "                    </div>" + '                    <input type="text" id="fileNo" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >份&emsp;&emsp;数</button>' + "                    </div>" + '                    <input type="text" id="number" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >密&emsp;&emsp;级</button>' + "                    </div>" + '                    <input type="text" id="secretLevel" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >紧急程度</button>' + "                    </div>" + '                    <input type="text" id="receivingDegreeOfUrgency" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >办结时限</button>' + "                    </div>" + '                    <input type="text" id="timeLimit" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div class="col-lg-12 col-md-12">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button class="btn btn-primary btn-sm" >数据状态</button>' + "                    </div>" + '                    <input type="text" id="receivingDataStatus" class="form-control">' + "                </div>" + "            </div>" + "" + '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <button type="button" class="btn btn-primary btn-sm" >附&emsp;&emsp;件</button>' + "                    </div>" + '                    <span id="upFile" src="#" style="margin-left: 9px;margin-top: 2px;"></span>' + "                </div>" + "            </div>" + "" + '           <div class="col-lg-6 col-md-6">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>' + "                    </div>" + '                    <input type="text"  id="creater" class="form-control">' + "                </div>" + "                </fieldset>" + "            </div>" + "" + '            <div class="col-lg-6 col-md-6">' + "                <fieldset disabled>" + '                <div class="input-group mb-3">' + '                    <div class="input-group-prepend">' + '                        <label class="input-group-text" for="applicant">创建时间</label>' + "                    </div>" + '                    <input type="text"  id="itemcreateat" class="form-control">' + "                </div>" + "                </fieldset>" + "            </div>" + "</div>";
        modalHtml.myViewSignModal = '<div class="row">\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">文件标题：</span> </div> <input type="text"\n' +
            '                            id="receivingTitle" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">公开方式：</span>\n' +
            '                        </div> <input type="text" id="govPunlic" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">文件编号：</span>\n' +
            '                        </div> <input type="text" id="fileNo" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">份数：</span> </div> <input\n' +
            '                            type="text" id="number" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">密级：</span> </div> <input\n' +
            '                            type="text" id="classification" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">不公开理由：</span>\n' +
            '                        </div> <input type="text" id="reason" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">数据状态：</span>\n' +
            '                        </div> <input type="text" id="status" class="form-control col-lg-9 col-md-9">\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-2 col-md-2"> <span class="lefttext">附件：</span> </div> <span\n' +
            '                            id="upFile" src="#" style="margin-left: 9px;margin-top: 2px;"></span>\n' +
            '                    </div>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div style="margin-left: 4px;" class="input-group-prepend col-lg-4 col-md-4" style="margin-left: 4px;"> <span class="lefttext" for="applicant">创建人：</span>\n' +
            '                        </div> <input type="text" id="creater" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>\n' +
            '                    <div class="input-group mb-3">\n' +
            '                        <div class="input-group-prepend col-lg-4 col-md-4"> <span class="lefttext" for="applicant">发文日期：</span> </div>\n' +
            '                        <input type="text" id="itemupdateat" class="form-control col-lg-6 col-md-6">\n' +
            '                    </div>\n' +
            '                </fieldset>\n' +
            '            </div>\n' +
            '        </div>';
        modalHtml.myPassReportModal = "<div>" + '        <textarea name="" id="reason" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myPassReportoneModal = "<div>" + '        <textarea name="" id="reasonone" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myPassReporttwoModal = "<div>" + '        <textarea name="" id="reasontwo" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myPassReportthModal = "<div>" + '        <textarea name="" id="reasonth" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myFailReportModal = "<div>" + '        <textarea name="" id="reason" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myFailReportoneModal = "<div>" + '        <textarea name="" id="reasonone" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myFailReportthModal = "<div>" + '        <textarea name="" id="reasonth" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myFailReporttwoModal = "<div>" + '        <textarea name="" id="reasontwo" cols="96" rows="10"></textarea>' + "    </div>";
        modalHtml.myTranspondReceiptModal = "<div>" + "        <div >" + "            <span>请选择需要转发的人员：</span>" + '                <div style="margin-top: 1em;">' + '                    <select id="experName" class="form-control" >' + '                        <option value ="volvo">中医处分管局长</option>' + '                        <option value ="volvo">中药处分管局长</option>' + '                        <option value ="volvo">综合处分管局长</option>' + '                        <option value ="volvo">法规监督处分管局长</option>' + "                    </select>" + "                </div>" + "        </div>" + "    </div>";
        modalHtml.myDeleteModalTravel = "是否删除景点信息?";
        modalHtml.myDeleteModalTraditionalCul = "是否删除中医医史信息?";
        modalHtml.myDeleteModalTraditionalDoc = "是否删除历代名家信息?";
        modalHtml.myDeleteModalTraditionalSch = "是否删除中医流派信息?";
        modalHtml.myDeleteModalCartoonAll = "是否删除漫画典故信息?";
        modalHtml.myDeleteModalComGam = "是否删除动漫游戏信息?";
        modalHtml.myDeleteModalCulRel = "是否删除文化古迹信息?";
        modalHtml.myDeleteModalCulVen = "是否删除文化场馆信息?";
        modalHtml.myDeleteModalInCuHe = "是否删除非物质文化遗产信息?";
        modalHtml.myDeleteModalMovTV = "是否删除电视电影信息?";
        modalHtml.myDeleteModalSaleDrug = "是否删除该药品";
        modalHtml.mySubmitModal = "确认提交吗？";
        modalHtml.mySendModal = "是否发送至指定部门？";
        modalHtml.myPassModal = "确认通过吗？";
        modalHtml.myFailModal = "确认不通过吗？";
        modalHtml.myUnderShelfModal = "确认下架吗？";
        modalHtml.myUnderShelfReportModal = "确认撤销吗（下架）？";
        modalHtml.myDeleteCStion = "是否删除中药销售企业信息";
        modalHtml.myDeleteCPtion = "是否删除中药制药企业信息";
        modalHtml.myShowModal = "确认展示吗？";
        modalHtml.myNoSubmitModal = "确认修改为初始状态吗？";
        modalHtml.myDeleteAchievement = "是否删除科研成果?";
        modalHtml.myDeleteRecruit = "是否删除招聘信息?";
        modalHtml.myDeleteCooperation = "是否删除合作交流信息?";
        modalHtml.myDeleteBaseStyle = "是否删除基地风采?";
        modalHtml.myDeleteModalfamPre = "是否删除历史名方";
        modalHtml.myDeleteModalMedicine = "是否删除中医药";
        modalHtml.myDeleteModalcareFam = "是否删除国医话健康";
        modalHtml.myDeleteModalSciknow = "是否删除科普知识";
        modalHtml.myDeleteNewsInf = "是否删除新闻信息?";
        modalHtml.myDeleteNewsRotations = "是否删除新闻轮播图?";
        modalHtml.myDeleteAnnouncement = "是否删除通知公告?";
        modalHtml.myDeleteRegulation = "是否删除政策法规?";
        modalHtml.myDeleteRules = "是否删除规章制度？";
        modalHtml.myDeleteProcess = "是否删除办事流程?";
        modalHtml.myDeleteHospital = "是否删除医院信息？";
        modalHtml.myDeleteSpecialty = "是否删除科室信息？";
        modalHtml.myDeleteChineseMedicine = "是否删除名老中医信息？";
        modalHtml.myDeleteAccount = "是否删除该账号？";
        modalHtml.myDeleteMedMat = "是否删除药材信息？";
        modalHtml.myShelveMedMat = "点击确认后药材信息发送到河北中医药网，确认上架？";
        modalHtml.myShelfSaleDrugModal = "点击确认上架将上传至河北中医药网";
        modalHtml.myDeleteExpert = "是否删除该专家信息？";
        modalHtml.myResetPassword = "是否重置密码？";
        modalHtml.myCencelDistribution = "是否取消分配专家？";
        modalHtml.myCencelDistributionConfirm = "勾选的项目中已经有专家评审，确认取消分配专家？";
        modalHtml.myConfirmReviseExpert = "确认修改专家？";
        modalHtml.myConfirmReviseExpertConfirm = "取消勾选的专家中已经有专家评审完毕，确认修改专家？";
        modalHtml.myDeletereceiptModal = "是否删除收文信息";
        modalHtml.myDeletereportModal = "是否删除请示报告信息";
        modalHtml.myDeleteTopicManagement = "是否删除该项目信息？";
        modalHtml.myDeletePost = "是否删除该发文信息？";
        modalHtml.myDeletesignModal = "是否删除内部会签？";
        modalHtml.myTopicSubmitTip = "操作成功";
        modalHtml.myResetPasswordTips = "重置密码成功，默认密码为：123456";
        modalHtml.myExmainSuccessTips = "评审成功";
        modalHtml.muPublishIndustrial = "确认上架展示吗？";
        modalHtml.myExmainScoreTips = "您确定提交此次评审吗？";
        modalHtml.myExmainSaveTips = "您本次的评审已保存，您可以在表格点击评审继续评审";
        modalHtml.myReExmainModal = "您确定要重新评审吗？";
        modalHtml.myReExmainModalSuccessTips = "已重新设置课题状态，您可以重新评审了";
        modalHtml.mySendFileModal='是否下达该文件';
        modalHtml.myDeleteLeader="是否删除此领导讲话？"
        modalHtml.mySendTips="确定发送吗？"
        return modalHtml
    })
})();
