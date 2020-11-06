
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
                '                        <button type="button" id="'+obj.modalConfirmID+'" class="'+ obj.confirmButtonClass +'">'+obj.modalConfirm+'</button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    </div>';

        };



        modalHtml.myUpdateStatusModal = '是否更新状态为完成?';


        modalHtml.myDeleteModal = '是否删除任务?';

        modalHtml.myDeleteModalProject = '是否删除项目?确保删除项目前已全部删除对应的任务！';

        modalHtml.myAddUpdateModal =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >任务名称</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="taskName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >所属项目</span>\n' +
            '                    </div>\n' +
            '                    <select class="custom-select" id="projectName"></select>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >所属模块</span>\n' +
            '                    </div>\n' +
            '                    <select class="custom-select" id="moduleName"></select>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >负责人</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="chargePerson" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text">重要程度</label>\n' +
            '                    </div>\n' +
            '                    <select class="custom-select" id="applicantStatus">\n' +
            '                        <option value="1" >非常紧急</option>\n' +
            '                        <option value="2" >紧急</option>\n' +
            '                        <option value="3" >一般</option>\n' +
            '                        <option value="4" >计划</option>\n' +
            '                        <option value="5" >长期</option>\n' +
            '                    </select>\n' +
            '                </div>\n' +
            '            </div>\n'+
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="createBy" class="form-control">\n' +
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
            '                    <input type="text"  id="createAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+

        '</div>';

        modalHtml.myAddUpdateModalProject =
            '<div class="row">'+
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >公司项目号</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="projectNo" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-12 col-md-12">\n' +
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <span class="input-group-text" >&nbsp &nbsp项目名称</span>\n' +
            '                    </div>\n' +
            '                    <input type="text" id="projectName" class="form-control">\n' +
            '                </div>\n' +
            '            </div>\n' +
            '\n' +
            '            <div class="col-lg-6 col-md-6">\n' +
            '                <fieldset disabled>'+
            '                <div class="input-group mb-3">\n' +
            '                    <div class="input-group-prepend">\n' +
            '                        <label class="input-group-text" for="applicant">创建人</label>\n' +
            '                    </div>\n' +
            '                    <input type="text"  id="createBy" class="form-control">\n' +
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
            '                    <input type="text"  id="createAt" class="form-control">\n' +
            '                </div>\n' +
            '                </fieldset>'+
            '            </div>\n'+

            '</div>';

        // modalHtml.myAddModuleModal =
        //     '<div class="row">'+
        //     '            <div class="col-lg-12 col-md-12">\n' +
        //     '                <div class="input-group mb-3">\n' +
        //     '                    <div class="input-group-prepend">\n' +
        //     '                        <span class="input-group-text" >模块名称</span>\n' +
        //     '                    </div>\n' +
        //     '                    <input type="text" id="moduleName" class="form-control">\n' +
        //     '                </div>\n' +
        //     '            </div>\n' +
        //     '\n' +
        //     '            <div class="col-lg-12 col-md-12">\n' +
        //     '                <div class="input-group mb-3">\n' +
        //     '                    <div class="input-group-prepend">\n' +
        //     '                        <span class="input-group-text" >所属项目</span>\n' +
        //     '                    </div>\n' +
        //     '                    <select class="custom-select" id="projectID"></select>\n' +
        //     '                </div>\n' +
        //     '            </div>\n' +
        //     '\n' +
        //     '            <div class="col-lg-6 col-md-6">\n' +
        //     '                <fieldset disabled>'+
        //     '                <div class="input-group mb-3">\n' +
        //     '                    <div class="input-group-prepend">\n' +
        //     '                        <label class="input-group-text" for="applicant">创建人</label>\n' +
        //     '                    </div>\n' +
        //     '                    <input type="text"  id="createBy" class="form-control">\n' +
        //     '                </div>\n' +
        //     '                </fieldset>'+
        //     '            </div>\n'+
        //     '\n' +
        //     '            <div class="col-lg-6 col-md-6">\n' +
        //     '                <fieldset disabled>'+
        //     '                <div class="input-group mb-3">\n' +
        //     '                    <div class="input-group-prepend">\n' +
        //     '                        <label class="input-group-text" for="applicant">创建时间</label>\n' +
        //     '                    </div>\n' +
        //     '                    <input type="text"  id="createAt" class="form-control">\n' +
        //     '                </div>\n' +
        //     '                </fieldset>'+
        //     '            </div>\n'+
        //
        //     '</div>';

        return modalHtml;

    });
})();