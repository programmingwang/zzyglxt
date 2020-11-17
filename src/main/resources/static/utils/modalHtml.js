
(function() {
    define('modalHtml', ['jquery','objectUtil', 'stringUtil', 'alertUtil', 'bootstrap'], function(jquery, objectUtil,stringUtil,alertUtil,bootstrap) {

        var modalHtml = new Object();

        modalHtml.defaultModalHtml = function defaultModalHtml(obj) {
            return '<div class="modal fade" id="'+obj.modalID+'" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">\n' +
                '            <div class="'+obj.modalClass+'">\n' +
                '                <div class="modal-content">\n' +
                '                    <div class="modal-header">\n' +
                '                        <h5 class="modal-title" id="staticBackdropLabel">'+ obj.modalTitle +'</h5>\n' +
                '                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                            <span aria-hidden="true">&times;</span>\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '                    <div class="modal-body">\n' + obj.modalBody +
                '                    </div>\n' +
                '                    <div class="modal-footer">\n' +
                '                        <button type="button" id="'+obj.modalCancelID+'" class="btn btn-secondary" data-dismiss="modal">'+obj.modalCancel+'</button>\n' +
                '                        <button type="button" id="'+obj.modalConfirmID+'" style="'+obj.confirmButtonStyle+'" class="'+ obj.confirmButtonClass +'">'+obj.modalConfirm+'</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>';

        };
        modalHtml.myViewCulturalModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="culturalImgSpan" class="btn btn-primary btn-sm"></button>\n' +
            '                    </div>\n' +
            '                    <img id="culturalImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="culturalNameSpan" class="btn btn-primary btn-sm"></button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseCulturalName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >作&emsp;&emsp;者</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseCulturalAuthor" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >来&emsp;&emsp;源</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="chineseCulturalSource" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="culturalContentSpan" class="btn btn-primary btn-sm" >正&emsp;&emsp;文</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseCulturalContent" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseCulturalStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >附&emsp;&emsp;件</button>\n' +
            '                    </div>\n' +
            '                    <span id="upFile" src="#" style="margin-left: 9px;margin-top: 2px;"></span>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="creater" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="itemCreateAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewFamPreModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >方名</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >出处</span>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="source" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="culturalContentSpan" class="input-group-text" >处方</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="prescription" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >制法及用法</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="content" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">数据状态</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="status" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';
        modalHtml.myviewChineseMedicineModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="mediCineImgSpan" class="input-group-text">药材图片</span>\n' +
            '                    </div>\n' +
            '                    <img id="mediCineImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="culturalNameSpan" class="input-group-text">中药名称</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >别名</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineAlias" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >功效分类</span>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="chineseMedicineType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '           <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >采制</span>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="chineseMedicineHarvesting" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >性味</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineTaste" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >归经</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineMerTro" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >功效主治</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineEffect" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >用法用量</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineUsage" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '  \n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >数据状态</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '</div>';




        modalHtml.myViewCareFamModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="culturalNameSpan" class="input-group-text">国医话健康标题</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >来源</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="source" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >作者</span>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="author" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="carefamContentSpan" class="input-group-text" >国医话健康详情</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="content" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >数据状态</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="status" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text">附件</span>\n' +
            '                    </div>\n' +
            '                    <a src="#"></a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '</div>';

        modalHtml.myViewSciKnowModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="scienceKnowledgeNameSpan" class="input-group-text">科普知识名称</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="scienceKnowledgeName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >科普知识来源</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="scienceKnowledgeSource" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >作者</span>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="scienceKnowledgeAuthor" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="carefamContentSpan" class="input-group-text" >科普知识详情</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="content" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >数据状态</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="scienceKnowledgeStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '</div>';

        modalHtml.myViewCooExcModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span id="cooperationExchangeNameSpan" class="input-group-text">合作交流名称</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="cooperationExchangeName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >预期合作机构</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="cooperativeOrg" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >联系人</span>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span  class="input-group-text" >联系电话</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >项目简介</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="projectIntroduce" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >数据状态</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="status" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '</div>';




        modalHtml.myViewHospModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">医院图片</button>\n' +
            '                    </div>\n' +
            '                    <img id="hospitalImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">医院名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="hospitalName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >医院等级</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="hospitalLevel" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="hospitalTelephone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="hospitalAddress" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >链接地址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="hospitalLink" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >医院介绍</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="hospitalIntroduce" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="hospitalStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="creater" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="itemCreateAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';
        modalHtml.myViewSpecialtyModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">科室图片</button>\n' +
            '                    </div>\n' +
            '                    <img id="specialtyImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">科室名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >科室电话</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyPhone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyAddress" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >链接地址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyLink" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >科室介绍</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyDescribe" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="creater" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="itemCreateAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';
        modalHtml.myViewChineseMedicineModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">中医图片</button>\n' +
            '                    </div>\n' +
            '                    <img id="chineseMedicineImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">中医名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >专家类型</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >职位职称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineTitle" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >所在医院</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="hospitalName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >所在科室</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >出诊时间</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="visitTime" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >主要就诊</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="mainVisit" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >专家介绍</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="expertIntroduce" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >重点医案</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="medicineRecords" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="creater" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="itemCreateAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewAccountMessageModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">头像</button>\n' +
            '                    </div>\n' +
            '                    <img id="portrait" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">用户账号</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="username" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >账号名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >性别</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="gender" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >身份证类型</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="IDCardType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >身份证号</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="IDCardNo" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >邮箱</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="email" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="mobilephone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >主管市区</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="cityid" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="creater" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="itemCreateAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewDataModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="newsImgSpan" class="btn btn-primary btn-sm"></button>\n' +
            '                    </div>\n' +
            '                    <img id="newsImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="dataTitleSpan" class="btn btn-primary btn-sm"></button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="dataTitle" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div id="author" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >作&emsp;&emsp;者</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="dataAuthor" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >来&emsp;&emsp;源</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="dataSource" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >正&emsp;&emsp;文</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="dataContent" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >展示状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="dataStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div id="fileType" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="dataFileTypeSpan" class="btn btn-primary btn-sm"></button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="dataFileType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >附&emsp;&emsp;件</button>\n' +
            '                    </div>\n' +
            '                    <span id="upFile" src="#" style="margin-left: 9px;margin-top: 2px;"></span>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创&ensp;建&ensp;人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="creater" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="itemCreateAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+

            '</div>';


        modalHtml.myDeleteModalTravel = '是否删除景点信息?';
        modalHtml.myDeleteModalTraditionalCul = '是否删除中医医史信息?';
        modalHtml.myDeleteModalTraditionalDoc = '是否删除历代名家信息?';
        modalHtml.myDeleteModalTraditionalSch = '是否删除中医流派信息?';
        modalHtml.myDeleteModalCartoonAll = '是否删除漫画典故信息?';
        modalHtml.myDeleteModalComGam = '是否删除动漫游戏信息?';
        modalHtml.myDeleteModalCulRel = '是否删除文化古迹信息?';
        modalHtml.myDeleteModalCulVen = '是否删除文化场馆信息?';
        modalHtml.myDeleteModalInCuHe = '是否删除非物质文化遗产信息?';
        modalHtml.myDeleteModalMovTV = '是否删除电视电影信息?';
        modalHtml.mySubmitModal = '确认提交吗？';
        modalHtml.myPassModal = '确认通过吗？';
        modalHtml.myFailModal = '确认不通过吗？';
        modalHtml.myUnderShelfModal = '确认下架吗？';
        modalHtml.myNoSubmitModal = '确认修改为初始状态吗？';

        modalHtml.myDeleteAchievement = '是否删除科研成果?';

        modalHtml.myDeleteRecruit = '是否删除招聘信息?';
        modalHtml.myDeleteCooperation = '是否删除合作交流信息?';
        modalHtml.myDeleteModalfamPre='是否删除历史名方';
        modalHtml.myDeleteModalMedicine='是否删除中医药';
        modalHtml.myDeleteModalcareFam='是否删除国医话健康';
        modalHtml.myDeleteModalSciknow='是否删除科普知识';

        modalHtml.myDeleteNewsInf = '是否删除新闻信息?';
        modalHtml.myDeleteNewsRotations = '是否删除新闻轮播图?';
        modalHtml.myDeleteAnnouncement = '是否删除通知公告?';
        modalHtml.myDeleteRegulation = '是否删除政策法规?';
        modalHtml.myDeleteProcess = '是否删除办事流程?';


        modalHtml.myDeleteHospital = "是否删除医院信息？";
        modalHtml.myDeleteSpecialty = "是否删除科室信息？";
        modalHtml.myDeleteChineseMedicine = "是否删除名老中医信息？";
        modalHtml.myDeleteAccount = "是否该账号？";

        return modalHtml;

    });
})();
