$(".nice-select").each(function () {
    // Add Active to each Select with a Valid Value
    if($(this).val() != "" && $(this).val() != null) {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
        }
    }
});

/**
 *  Detect When user click out the nice-select to remove focus
 */
(function () {
    $(document).on("focusout", ".nice-select", function () {
        if($(this).val() != ""  && $(this).val() != null) {
            if(!$(this).hasClass("active")) {
                $(this).addClass("active");
            }
        }
    });
    $(document).on("click", ".nice-select", function () {
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
        if(!$(event.target).hasClass("nice-select") && !$(event.target).is("option")) {
            $(".nice-select").each(function () {
                if($(this).data("focus") == true){
                    $(this).blur().data("focus", false);
                }
            });
        }
    });
})();