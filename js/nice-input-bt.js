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

(function () {
    /**
     * Pega os erros do Laravel em formato JSON
     * procura os inputs responsaveis dentro do form tratado
     * e adiciona as mensagens de erro no nice-label.
     * Caso não exista ele adicionar o erro na varival(div) erro
     * ou passa como parametro de o erro for uma function
     * @param json
     * @param erro
     * @returns {jQuery.fn.NIJsonErros}
     * @constructor
     */
    jQuery.fn.NIJsonErros = function(json, erro) {

        var itens = this;

        for(var i=0; i < itens.length; i++){
            var element = $(this[i]); // It's your element
            for(key in json) {

                if(key.split(".").length > 1){
                    key = key.replace(".", "[")+"]";
                }

                var input = element.find("[name='"+key+"']");
                if(input.length) {
                    for(var i=0; i < input.length; i++){
                        input = $(input[i]);

                        var container = input.parents(".nice-container");

                        Cache.searchOrCreate(input);
                        if(input.parents(".bootstrap-select").length){
                            input = input.parents(".bootstrap-select");
                        }
                        input.addClass("nice-error");

                        var nice_label = input.parents(".nice-container").find(".nice-label");
                        if(nice_label.length) {
                            nice_label.html(json[key]);
                        }
                    }
                }else{
                    if(typeof erro === "function"){
                        erro(json[key], key);
                    }else if(erro.length) {
                        erro.html(erro.html() + json[key]).show();
                    }
                }

            }
        }

        return this;
    };
})();