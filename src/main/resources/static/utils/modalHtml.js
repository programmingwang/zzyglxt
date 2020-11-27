
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
            '                  <div>\n' +
            '                       <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;"id="chineseCulturalContent" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
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
            '                        <button class="btn btn-primary btn-sm" >方名</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >出处</span>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="source" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button id="culturalContentSpan" class="btn btn-primary btn-sm" >处方</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="prescription" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >制法及用法</button>\n' +
            '                    </div>\n' +
            '                  <div>\n' +
            '                       <div id="content" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
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
            '\n' +
            '           <div class="col-lg-6 col-md-6">\n' +
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

        modalHtml.myviewChineseMedicineModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button id="mediCineImgSpan" class="btn btn-primary btn-sm">药材图片</button>\n' +
            '                    </div>\n' +
            '                    <img id="mediCineImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button id="btn btn-primary btn-sm" class="btn btn-primary btn-sm"">中药名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >别名</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineAlias" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >功效分类</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="chineseMedicineType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '           <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >采制</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="chineseMedicineHarvesting" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >性味</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineTaste" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >归经</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineMerTro" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >功效主治</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineEffect" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >用法用量</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineUsage" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '  \n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chineseMedicineStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '           <div class="col-lg-6 col-md-6">\n' +
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




        modalHtml.myViewCareFamModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button id="culturalNameSpan" class="btn btn-primary btn-sm">国医话健康标题</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >来源</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="source" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >作者</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="author" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button id="carefamContentSpan" class="btn btn-primary btn-sm" >国医话健康详情</button>\n' +
            '                    </div>\n' +
            '                  <div>\n' +
            '                       <div id="content" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="status" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div id="fileDiv" class="col-lg-12 col-md-12" style="display: none">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm">附件</button>\n' +
            '                    </div>\n' +
            '                    <a src="#"></a>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '           <div class="col-lg-6 col-md-6">\n' +
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

        modalHtml.myViewSciKnowModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="scienceKnowledgeNameSpan" class="btn btn-primary btn-sm">科普知识名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="scienceKnowledgeName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >科普知识来源</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="scienceKnowledgeSource" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >作者</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="scienceKnowledgeAuthor" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button id="carefamContentSpan" class="btn btn-primary btn-sm" >科普知识详情</button>\n' +
            '                    </div>\n' +
            '                  <div>\n' +
            '                       <div id="content" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >数据状态</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="scienceKnowledgeStatus" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '           <div class="col-lg-6 col-md-6">\n' +
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

        modalHtml.myViewCooExcModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button id="cooperationExchangeNameSpan" class="btn btn-primary btn-sm">合作交流名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="cooperationExchangeName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >预期合作机构</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="cooperativeOrg" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button  class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >项目简介</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="projectIntroduce" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button class="btn btn-primary btn-sm" >数据状态</button>\n' +
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
            '                        <button type="button" class="btn btn-primary btn-sm" >医院简介</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="hospitalBriefIntroduce" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >重点专科</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="hospitalKeySpecialty" class="form-control">\n' +
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
            '                  <div>\n' +
            '                       <div id="hospitalIntroduce" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
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
            '                        <button type="button" class="btn btn-primary btn-sm">科室介绍</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialtyBriefIntroduce" class="form-control">\n' +
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
            '                  <div>\n' +
            '                       <div id="specialtyDescribe" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
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
            '                        <button type="button" class="btn btn-primary btn-sm">专家简介</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="expertBriefIntroduce" class="form-control">\n' +
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
            '                  <div>\n' +
            '                       <div id="expertIntroduce" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >重点医案</button>\n' +
            '                    </div>\n' +
            '                  <div>\n' +
            '                       <div id="medicineRecords" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
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
            '            <div class="upload-content" data-limit="1">\n' +
            '                <div class="content-img">\n' +
            '                    <ul class="content-img-list"></ul>\n' +
            '                    <div class="file">\n' +
            '                        <input type="file" name="file" accept="image/*" id="upload" multiple>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">\n' +
            '                    <div class="modal-dialog modal-lg" role="document">\n' +
            '                        <div class="modal-content">\n' +
            '                        </div>\n' +
            '                    </div>\n' +
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
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >用户角色</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="roleName" class="form-control">\n' +
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

        modalHtml.myAddAccountModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">用户账号</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="username" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >账号名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >主管市区</button>\n' +
            '                    </div>\n' +
            '                    <select id="cityid" class="form-control"></select>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >用户角色</button>\n' +
            '                    </div>\n' +
            '                    <select id="roleName" class="form-control"></select>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="mobilephone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
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
            '                  <div>\n' +
            '                       <div id="dataContent" style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >展示状态</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="dataStatus" class="form-control">\n' +
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

        //查看理由
        modalHtml.myViewReasonHtml =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" id="reasonSpan" class="btn btn-primary btn-sm" >理&emsp;&emsp;由</button>\n' +
            '                    </div>\n' +
            '                  <div>\n' +
            '                       <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:scroll;word-break: break-all;" id="reason" class="form-control">\n' +
            '                       </div>\n' +
            '                  </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '</div>';

        modalHtml.myViewLabModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">院所图片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">院所名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >介绍</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewTecModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业图片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">服务项目</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="projectName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >企业简介</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewTourModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">基地照片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">基地名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">占地面积</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="areaCoverd" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">特色服务</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="specialService" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >基地简介</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewPlantModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">种植园照片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">种植园名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">种植面积</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="areaCoverd" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">种植种类</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="plantType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >种植园简介</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewProcessModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业照片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">占地面积</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="areaCoverd" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">加工种类</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="processingType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >企业简介</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewSaleModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业照片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">销售种类</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="salesCategory" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">销售药品</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="sellingDrugs" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >企业简介</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewProduceModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业照片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">企业名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="name" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">生产种类</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="peoduceType" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">生产药品</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="peoduceDrug" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系人</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="contacts" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >企业简介</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="intruduce" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myViewSchoolModal =
            '<div class="row">'+
            '            <div id="imgDiv" class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">学校图片</button>\n' +
            '                    </div>\n' +
            '                    <img id="myImg" src="#"/>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">学校名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="schoolName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">学校简介</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="schoolIntroduce" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">二级学院名称</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="secondaryCollege" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">本科招生专业</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="enrollmentMajor" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm">研究生招生专业</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="graduateEnrollmentMajor" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >联系电话</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="phone" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >在线地址</button>\n' +
            '                    </div>\n' +
            '                   <input type="text" id="onlineAddress" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >地&emsp;&emsp;址</button>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="address" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <button type="button" class="btn btn-primary btn-sm" >学校简介</button>\n' +
            '                    </div>\n' +
            '                    <div style="height:300px;width:750px; margin-top:-1px;clear:both;overflow:hidden;overflow:scroll;" id="schoolText" class="form-control">\n' +
            '                       </div>\n' +
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
            '                    <input type="text"  id="itemcreateat" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+
            '</div>';

        modalHtml.myInputReason =
            '<div class="row">'+
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">输入理由：</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="inputReason" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n'+
            '</div>';

            modalHtml.myViewExpertModal =
                '<div class="row">'+
                '            <div class="col-lg-12 col-md-12">\n' +
                '                <fieldset disabled>'+
                '                <div class="input-group mb-3">\n' +
                '                    <div class="input-group-prepend">\n' +
                '                        <button type="button" class="btn btn-primary btn-sm">专家账号</button>\n' +
                '                    </div>\n' +
                '                    <input type="text" id="username" class="form-control">\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            <div class="col-lg-12 col-md-12">\n' +
                '                <fieldset disabled>'+
                '                <div class="input-group mb-3">\n' +
                '                    <div class="input-group-prepend">\n' +
                '                        <button type="button" class="btn btn-primary btn-sm">专家姓名</button>\n' +
                '                    </div>\n' +
                '                    <input type="text" id="name" class="form-control">\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            <div class="col-lg-12 col-md-12">\n' +
                '                <fieldset disabled>'+
                '                <div class="input-group mb-3">\n' +
                '                    <div class="input-group-prepend">\n' +
                '                        <button type="button" class="btn btn-primary btn-sm">性别</button>\n' +
                '                    </div>\n' +
                '                    <input type="text" id="gender" class="form-control">\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            <div class="col-lg-12 col-md-12">\n' +
                '                <fieldset disabled>'+
                '                <div class="input-group mb-3">\n' +
                '                    <div class="input-group-prepend">\n' +
                '                        <button type="button" class="btn btn-primary btn-sm">电话号码</button>\n' +
                '                    </div>\n' +
                '                    <input type="text" id="mobilephone" class="form-control">\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            <div class="col-lg-12 col-md-12">\n' +
                '                <fieldset disabled>'+
                '                <div class="input-group mb-3">\n' +
                '                    <div class="input-group-prepend">\n' +
                '                        <button type="button" class="btn btn-primary btn-sm">擅长领域  </button>\n' +
                '                    </div>\n' +
                '                    <input type="text" id="filed" class="form-control">\n' +
                '                </div>\n' +
                '            </div>\n' +
            '</div>';

        modalHtml.myaddExpertModal =
            '<form>\n'+
                '<div class="form-group">'+
                '   <label class="col-form-label">用户账号：</label>\n'+
                '   <div>\n'+
                '    <input id="expertAccount" type="text" class="form-control" placeholder="请输入">\n'+
                '    </div>\n'+
                ' </div>\n' +
                '\n' +
                '<div class="form-group">'+
                '   <label class="col-form-label">专家姓名：</label>\n'+
                '   <div>\n'+
                '    <input id="expertName" type="text" class="form-control" placeholder="请输入">\n'+
                '    </div>\n'+
                ' </div>\n' +
                '\n' +
                '<div class="form-group">'+
                '   <label class="col-form-label">擅长领域：</label>\n'+
                '   <div>\n'+
                '    <input id="expertFiled" type="text" class="form-control" placeholder="请输入">\n'+
                '    </div>\n'+
                ' </div>\n' +
                '\n' +
                '<div class="form-group">'+
                '   <label class="col-form-label">性别：</label>\n'+
                '   <div >\n'+
                '    <input id="expertGender" type="text" class="form-control" placeholder="请输入">\n'+
                '    </div>\n'+
                ' </div>\n' +
                '\n' +
                '<div class="form-group">'+
                '   <label class="col-form-label">联系电话：</label>\n'+
                '   <div>\n'+
                '    <input id="expertPhone" type="text" class="form-control" placeholder="请输入">\n'+
                '    </div>\n'+
                ' </div>\n' +
            '</form>';



        modalHtml.myTimeModal =
            '<div class="row" >'+
            '            <div class="col-lg-12 col-md-12" >\n' +
            '                <div class="input-group mb-3" style="padding-left: 1rem;\n' +
            '    padding-right: 0.5rem;">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">年份</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="year" class="form-control" placeholder="请输入年份">\n' +
            '                </div>\n' +

            '\n' +
            '           <label class=\'input-label col-lg-12 col-md-12 \'>开启时间</label>\n' +
            '            <div class="col-lg-12 col-md-12" style="margin-bottom: 10px;">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                       <div  >\n' +
            '                           <input type="text" id=\'startTime\' style="background-image:">  <i class="fa fa-calendar fa-lg" style="position: absolute;top: 0.5rem;right: 0;"></i>\n' +
            '                       </div>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '           <label class=\'input-label col-lg-12 col-md-12 \'>结束时间</label>\n' +
            '            <div class="col-lg-12 col-md-12" style="margin-bottom: 10px;">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                       <div >\n' +
            '                           <input type="text" id=\'endTime\' >  <i class="fa fa-calendar fa-lg" style="position: absolute;top: 0.5rem;right: 0;"></i>\n' +
            '                       </div>\n' +'                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '</div>';

        modalHtml.addExperModal='<div>\n' +
            '        <div >\n' +
            '            <span>请选择专家</span>\n' +
            '                <div style="margin-top: 1em;">\n' +
            '                    <select id="experName" class="form-control" >\n' +
            '                        <option value ="volvo">请选择专家姓名</option>\n' +
            '                    </select>\n' +
            '                </div>\n' +
            '        </div>\n' +
            '    </div>\n';

        modalHtml.myResonable="<div>\n" +
            "        <textarea name=\"\" id=\"reason\" cols=\"96\" rows=\"10\"></textarea>\n" +
            "    </div>";


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
        modalHtml.myDeleteModalSaleDrug='是否删除该药品';
        modalHtml.mySubmitModal = '确认提交吗？';
        modalHtml.myPassModal = '确认通过吗？';
        modalHtml.myFailModal = '确认不通过吗？';
        modalHtml.myUnderShelfModal = '确认下架吗？';

        modalHtml.myDeleteCStion='是否删除中药销售企业信息';
        modalHtml.myDeleteCPtion='是否删除中药制药企业信息';

        modalHtml.myShowModal = '确认展示吗？';

        modalHtml.myNoSubmitModal = '确认修改为初始状态吗？';

        modalHtml.myDeleteAchievement = '是否删除科研成果?';

        modalHtml.myDeleteRecruit = '是否删除招聘信息?';
        modalHtml.myDeleteCooperation = '是否删除合作交流信息?';
        modalHtml.myDeleteBaseStyle = '是否删除基地风采?';
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
        modalHtml.myDeleteAccount = "是否删除该账号？";

        modalHtml.myDeleteMedMat = "是否删除药材信息？"
        modalHtml.myShelveMedMat = "点击上架将药材信息发送到河北中医药网，确认上架？"

        modalHtml.myDeleteExpert="是否删除该专家信息？"
        modalHtml.myResetPassword="是否重置密码？"

        modalHtml.myCencelDistribution = "是否取消分配专家？"


        return modalHtml;

    });
})();
