// 이미지 lazy 설정 정의

const defaultCustomLoader = {
    beforeLoad: function(element) {
    },
    
    // called after an element was successfully handled
    afterLoad: function(element) {
    },
    
    // called whenever an element could not be handled
    onError: function(element) {
    },
    
    // called once all elements was handled
    onFinishedAll: function() {
    }
}



function init(selector = '.lazy', findElement = undefined, chainable = true) {
    var $selector = $(selector)
    if(findElement) {
        $selector = $selector.find(findElement);
    }
    jqLazy.$selector = $selector;
    setting = {
        chainable,
        autoDestroy: false
    }
    jqLazy.setting = setting;
    return jqLazy;
}

function fadeIn(millisecond = 1000, threshold = 0) {

    jqLazy.setting.effect = "fadeIn"
    jqLazy.setting.effectTime = millisecond
    jqLazy.setting.threshold = threshold

    return jqLazy
}

function update() {
    if(jqLazy.instance.length != 0) {
        jqLazy.instance.update();
    }
}

function force(selector) {
    jqLazy.instance.force(selector)
}

function addItems(selector = ".lazy", findElement) {
    var $selector = $(selector);
    if(findElement) {
        $selector = $(selector).find(findElement)
    }

    
    jqLazy.instance.addItems($selector)
    return jqLazy;
}



function build() {
    jqLazy.instance = jqLazy.$selector.lazy(jqLazy.setting);
    return jqLazy
}

const jqLazy = {
    init,
    fadeIn,
    build,
    addItems,
    update,
    force
}


const LazyController = (function() {
    
    function LazyController() {
    }
    LazyController.prototype.init = function(selector = '.lazy', findElement = undefined, chainable = true) {
        let $selector = $(selector)
        if(findElement) {
            $selector = $selector.find(findElement);
        }
        this.m_selector = $selector;
        setting = {
            chainable,
            autoDestroy: false
        }
        this.m_setting = setting;
        return this;
    }

    LazyController.prototype.update = function () {
        if(this.lazyCore.length != 0) {
            this.lazyCore.update();
        }
    }

    LazyController.prototype.force = function (selector) {
        this.lazyCore.force(selector);
    }

    LazyController.prototype.addItems = function (selector = ".lazy", findElement) {
        var $selector = $(selector);
        if(findElement) {
            $selector = $(selector).find(findElement)
        }

        
        this.lazyCore.addItems($selector)
        return this;
    }



    LazyController.prototype.build = function() {
        this.lazyCore = this.m_selector.lazy(this.m_setting);
        return this
    }

    return LazyController;
})();