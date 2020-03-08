// 获取数据
let root = window.player;
let audio = root.audioManager;
let dataList;
let len;
let control;
let timer;


function getData(url) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            dataList = data;
            len = data.length;
            control = new root.controlIndex(len);
            root.render(data[0]);
            audio.getAudio(data[0].audio);    
            bindEvent()
        },
        error: function () {
            console.log("error")
        }
    })
}

// 点击事件
function bindEvent() {
    console.log(dataList);
    setInterval(function() {
        let total = audio.audio.duration; // 总时间
        let nowTime = audio.audio.currentTime; // 当前时间
        let width = nowTime / total * parseFloat($('.pro-wrap').css('width'))
        // console.log(root);
        // console.log(nowTime, total);
        root.renderTime(nowTime, total);
        $('.pro-top').css("width", `${width}px`);
        $('.slider').css("left", `${width}px`);
        if(nowTime == total) {
            $('.next').trigger('click');
        }
    }, 1000)
    
    // 自定义事件--------
    $('body').on('play:change', function(e, index) {
        audio.getAudio(dataList[index].audio);
        root.render(dataList[index]);
        $('.img-box').css({
            'transform': 'rotateZ(' + 0 + 'deg)',
            'transtion': 'none'
        })
        if (audio.status == 'play') {
            audio.play();
            rotated(0);
        }
    })

    // --上一首
    $('.prev').on('click', function () {
        let i = control.prev();
        $('body').trigger('play:change', i)
    })

    // --下一首
    $('.next').on('click', function () {
        let i = control.next();
        $('body').trigger('play:change', i)
    })

    // -- 播放与暂停
    $('.play').on('click', function () {
        if (audio.status == 'pause') {
            audio.play();
            let deg = $('.img-box').attr('data-deg');
            rotated(deg);
        } else {
            audio.pause()
            clearInterval(timer);
        }
        $('.play').toggleClass('playing');
    })
    
    // -- 是否收藏
    $('.like').on('click', function() {
        if(!dataList[0].isLike) {
            $('.like').addClass('liking');
        }else{
            $('.like').removeClass('liking');    
        }
        dataList[0].isLike = !dataList[0].isLike
    })

    // 歌曲菜单
    $('.list').on('click', function() {
        $('.song-list').css({display: "block"})
        dataList.forEach(function(ele,index){
            let str = `
            <li data-index='${index}'>
            <h3>${ele.song}</h3>
            <div class="singer">
                <span>${ele.album}</span>
                <span class="singer">${ele.singer}</span>
            </div>
            </li>
            `
            $('.song-list .list-wrap').append($(str));
        })

        // 点击菜单后
        // 点击播放歌曲
        $('.list-wrap li').on('click', function(e) {
            let i = +$(this).attr('data-index');
            control.index = i;
            console.log(i)
            $('body').trigger('play:change', i);
            $('.play-close').trigger('click');
        })

        // 关闭
        $('.play-close').on('click', function() {
            $('.song-list').css({display: "none"})
            $('.song-list .list-wrap').html(``)
        })
    })

    // 进度条
    $('.pro-wrap').on('click', function(e) {
        let location = e.layerX;   // 点击的位置
        const width = parseFloat($('.pro-wrap').css('width'));   // 用css带有单位
        const targetTime = location / width * audio.audio.duration;
        $('.pro-top').css("width", `${targetTime}px`);
        $('.slider').css("left", `${targetTime}px`);
        audio.audio.currentTime = targetTime;
    })
}

// 图片旋转
function rotated(deg) {
    clearInterval(timer);
    deg = +deg;
    timer = setInterval(function() {
        deg +=2;
        $('.img-box').attr('data-deg',deg);
        $('.img-box').css({
            'transform': 'rotateZ(' + deg + 'deg)',
            'transtion': 'all 1s ease-in'
        })
    }, 200)
}

getData("../mock/data.json");