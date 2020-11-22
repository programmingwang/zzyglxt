var imgFile = []; //文件流
var imgSrc = []; //图片路径
var imgName = []; //图片名字
var limit = 5;//限制数量，默认为 5
var updated = false;
var base64Code = "";
(function () {
    define('uploadImg', ['jquery'], function ($) {


        var init = function () {
            console.log("init");
            localStorage.setItem('limit', $(".upload-content").attr('data-limit'));
            imgSrc = [];
            imgFile = [];
            updated = false;
            limit = $(".upload-content").attr('data-limit');
            // 鼠标经过显示删除按钮
            $('.content-img-list').on('mouseover', '.content-img-list-item', function () {
                $(this).children('div').removeClass('hide');
            });
            // 鼠标离开隐藏删除按钮
            $('.content-img-list').on('mouseleave', '.content-img-list-item', function () {
                $(this).children('div').addClass('hide');
            });
            // 单个图片删除
            $(".content-img-list").on("click", '.content-img-list-item a .gcllajitong', function () {
                var index = $(this).parent().parent().parent().index();
                imgSrc.splice(index, 1);
                imgFile.splice(index, 1);
                imgName.splice(index, 1);
                var boxId = ".content-img-list";
                addNewContent(boxId);
                if (imgSrc.length < limit) { //显示上传按钮
                    $('.content-img .file').show();
                }
            });


            $(".content-img-list").on("click", '.content-img-list-item a .gclfangda', function () {
                var index = $(this).parent().parent().parent().index();
                $(".modal-content").html("");

                var bigimg = $(".modal-content").html();
                $(".modal-content").html(bigimg + '<div class="show"><img src="' + imgSrc[index] + '" alt=""><div>');
                // $(".modal-content").append(
                //     '<div class="show"><img src="' + imgSrc[a] + '" alt=""><div>'
                // );


            });


            //图片上传
            $('#upload').unbind().on('change', function (e) {
                var limit = localStorage.getItem('limit');
                updated = true;
                var imgSize = this.files[0].size;
                if (imgSize > 1024 * 1024 * 1) { //1M
                    return alert("上传图片不能超过1M");
                }
                ;
                if (this.files[0].type != 'image/png' && this.files[0].type != 'image/jpeg' && this.files[0].type != 'image/gif') {
                    return alert("图片上传格式不正确");
                }
                ;
                if (imgSrc.length + 1 > limit) {
                    return alert("不能超过" + limit + "张");
                }
                if (imgSrc.length + 2 > limit) {
                    $(".file").hide();
                }

                var imgBox = '.content-img-list';
                var fileList = this.files;
                for (var i = 0; i < fileList.length; i++) {
                    var imgSrcI = getObjectURL(fileList[i]);
                    imgName.push(fileList[i].name);
                    imgSrc.push(imgSrcI);
                    imgFile.push(fileList[i]);
                }
                genBase64();

                addNewContent(imgBox);
                this.value = null; //上传相同图片
            });
            if (imgSrc.length != 0) {
                var boxId = ".content-img-list";
                addNewContent(boxId);
            }
            init = function () {

            }
        };


//删除
        function removeImg(obj, index) {
            imgSrc.splice(index, 1);
            imgFile.splice(index, 1);
            imgName.splice(index, 1);

            var boxId = ".content-img-list";
            addNewContent(boxId);
        }

//图片展示
        function addNewContent(obj) {
            var limit = localStorage.getItem('limit');
            $(obj).html("");
            for (var a = 0; a < imgSrc.length; a++) {
                if (imgSrc.length + 1 > limit) {
                    $(".file").hide();
                }
                var oldBox = $(obj).html();
                $(obj).html(oldBox + '<li class="content-img-list-item"><img src="' + imgSrc[a] + '" alt="">' +
                    '<div class="hide"><a index="' + a + '" class="delete-btn"><i class="gcl gcllajitong"></i></a>' +
                    '<a index="' + a + '" class="big-btn" type="button" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="gcl gclfangda"></i></a></div></li>');
            }
        }

//建立可存取到file的url
        function getObjectURL(file) {
            var url = null;
            if (window.createObjectURL != undefined) { // basic
                url = window.createObjectURL(file);
            } else if (window.URL != undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file);
            } else if (window.webkitURL != undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file);
            }
            return url;
        }

        function getFiles() {
            return imgFile;
        }

        function disable() {
            $('.content-img-list').off('mouseover','.content-img-list-item');
            $('.content-img-list').off('mouseleave','.content-img-list-item');
            $(".content-img-list").off("click", '.content-img-list-item a .gcllajitong');
        }
        function genBase64() {
            r = new FileReader();
            r.onload = function(){
                base64Code = r.result
            };
            r.readAsDataURL(imgFile[0]);
        }

        function getBase64() {
            return base64Code;
        }

        function isUpdate() {
            return updated;
        }

        function setImgSrc(src) {
            console.log("setSrc")
            for (var i = 0; i < imgSrc.length; i++) {
                if (imgSrc[i] === src) {
                    return
                }
            }
            imgSrc.push(src);
            var boxId = ".content-img-list";
            addNewContent(boxId);
        }

        function setImgSrcs(srcs) {
            imgSrc = srcs;
            var boxId = ".content-img-list";
            addNewContent(boxId);
        }

        return {
            getFiles: getFiles,
            isUpdate: isUpdate,
            setImgSrc: setImgSrc,
            setImgSrcs: setImgSrcs,
            init: init,
            getBase64: getBase64,
            disable: disable
        }

    })

})();
