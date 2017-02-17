/**
 *  Detect When user click out the nice-select to remove focus
 */
(function () {
    $(document).on("focusout", ".bootstrap-select button", function () {
        var select = $(this).parents(".nice-container").find("select.nice-select");
        var container = $(this).parents(".bootstrap-select");
        if(select.val() != ""  && select.val() != null) {
            if(!container.hasClass("active")) {
                container.addClass("active");
            }
        }
    });
    $(document).on("click", ".bootstrap-select button", function () {
        if($(this).data("focus") == undefined){
            $(this).data("focus", true);
        } else {
            $(this).data("focus", !$(this).data("focus"));
        }
        if($(this).data("focus") != true) {
            $(this).blur();
        }
    });
    $(document).on("mouseup", function (event) {
        if(!$(event.target).parent().hasClass("bootstrap-select")) {
            $(".bootstrap-select button").each(function () {
                if($(this).data("focus") == true){
                    $(this).blur().data("focus", false);
                    setTimeout(function () {
                        $(":focus").blur();
                    }, 10);
                }
            });
        }
    });
})();