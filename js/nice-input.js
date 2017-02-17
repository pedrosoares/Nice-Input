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

(function () {

    var NiceInput = function (container) {

        if(!container.hasClass("nice-container")){
            console.log(container);
            throw "Is not a Nice Input Container!";
        }

        this.container = container;

        this.label = container.find("label.nice-label");
        this.label_name = this.label.html();

        this.input = null;

        if(container.find(".nice-input").length){
            this.input = container.find(".nice-input");
        }

        if(container.find(".nice-select").length){
            this.input = container.find(".nice-select");
        }

    };

    window.Cache = new function () {

        this.objs = [];

        this.searchOrCreate = function (input) {
            for(var i = 0; i < this.objs.length; i++){
                if(this.objs[i].input[0] == input[0]){
                    return this.objs[i];
                }
            }
            try {
                var obj = new NiceInput($(input).parents(".nice-container"));
                this.objs.push(obj);
                return obj;
            }catch(ex) {
                console.log(ex);
                return null;
            }
        };

    };

    /**
     * Limpa todos os erros dos campos do Nice-buttons
     * @returns {jQuery.fn.NIClean}
     * @constructor
     */
    jQuery.fn.NIClean = function() {

        var itens = this;

        for(var i=0; i < itens.length; i++){
            var element = $(this[i]); // It's your element

            if(element.hasClass("nice-input") || element.hasClass("nice-select")){
                var ni = Cache.searchOrCreate(element);
                if(ni != null){
                    ni.input.removeClass("nice-error");
                    ni.label.html(ni.label_name);
                }
            }
        }

        return this;
    };

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
                    Cache.searchOrCreate(input.parents(".nice-container"));
                    input.addClass("nice-error");

                    var nice_label = input.parents(".nice-container").find(".nice-label");
                    if(nice_label.length) {
                        nice_label.html(json[key]);
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