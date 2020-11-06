(function() {
    define('selectUtil', ['jquery','objectUtil'], function(jquery,objectUtil) {


        $.fn.extend({
            selectUtil: function (data) {
                var html = "";
                $.each(data,function (i,it) {
                    html = html + '<option value="'+it.id+'">'+it.text+'</option>';
                });
                $(this).html("");
                $(this).append(html);
                return $(this);
            }
        });


        return {


        }
    })
})();