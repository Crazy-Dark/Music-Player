// 信息+图片渲染到页面上  渲染内容：img  info  likebtn
(function($, root) {

    function renderImg(src) {
        let img = new Image();
        img.src = src;
        // console.log(img.src)
        img.onload = function() {
            $('.img-box img').attr('src', src);
            root.blurImg(img, $('body'));
        }
    }

    function renderInfo(info) {
        let str = `
        <div class="song-name">${info.song}</div>
        <div class="singer">${info.singer}</div>
        <div class="album-name">${info.album}</div>
        `;
        $('.song-info').html(str);
    }

    function renderIsLike(like) {
        if(like) {
            $('.like').addClass('liking')
        }else{
            $('.like').removeClass('liking')
        }
    }

    function renderTime(nowTime, allTime) {
        var nowTime = parseInt(nowTime / 60) + ":" + parseInt(nowTime % 60);
        var allTime = parseInt(allTime / 60) + ":" + parseInt(allTime % 60);
        $('.cur-time').html(nowTime);
        $('.all-time').html(allTime);
    }

    // 暴露出一个函数，用于渲染页面
    root.render = function(data) {
        renderImg(data.image);
        renderInfo(data);
        renderIsLike(data.isLike);
    }
    root.renderTime = renderTime;


})(window.Zepto,window.player || (window.player = {}))



