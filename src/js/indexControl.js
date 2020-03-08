(function($, root){
    function Control(len) {
        this.index = 0;
        this.len = len;
    }
    Control.prototype =  {
        prev: function() {
            // if(this.index == 0) {
            //     this.index = len
            // }
            // this.index --;
            // return this.index;
            return this.getIndex(-1);
        },
        next: function() {
            // this.index ++;
            // if(this.index == len) {
            //     this.index = 0
            // }
            // return this.index;
            return this.getIndex(1);
        },
        // 计算改变后的索引
        getIndex: function(val) {
            let index = this.index;
            let len = this.len;
            let curIndex = (len + val + index) % len;
            this.index = curIndex;
            return curIndex
        }
    }

    // 暴露构造函数
    root.controlIndex = Control

})(window.Zepto, window.player || (window.player = {}))