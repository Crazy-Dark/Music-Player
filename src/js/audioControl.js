// 音频播放功能   获得音频  播放  暂停
(function($, root){
    function AudioManager(){
        // 创建一个音频对象
        this.audio = new Audio();
        // audio的默认状态
        this.status = 'pause';
    }
    AudioManager.prototype = {
        play: function() {
            this.audio.play();
            this.status = 'play';
        },
        pause: function() {
            this.audio.pause();
            this.status = 'pause';
        },
        getAudio: function(src) {
            this.audio.src = src;
            this.audio.load();
        }
    }

    // 将对象暴露出去
    root.audioManager = new AudioManager()

}(window.Zepto, window.player || (window.player = {})))