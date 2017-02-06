$(".nice-select").each(function (input) {
    // Add Active to each Select with a Valid Value
    if($(this).val() != "" && $(this).val() != null) {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
        }
    }
});

$(document).on("focusout", ".nice-select", function (button) {
    if($(this).val() != ""  && $(this).val() != null) {
        if(!$(this).hasClass("active")) {
            $(this).addClass("active");
        }
    }
});