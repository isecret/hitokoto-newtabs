$(function() {
    var sid = 0;

    // 获取一言
    function hitokoto() {
        try {
            fetch("https://v1.hitokoto.cn/?encode=json&_=" + Math.random(), {
                    headers:{
                         'content-type':'application/json'
                    }
                }).then(function(response){
                    return response.json();
                }).then(function(data){
                    sid = data.id;
                    $(".title").animateCss("fadeIn");
                    $(".hitokoto").text(data.hitokoto);
                    $(".from").text("- 「" + data.from + '」');
                });
        } catch (e) {
            console.log(e);
        }
    }

    // 喜欢
    function like(ID) {
        fetch("https://hitokoto.cn/Like?ID=" + ID)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                swal(data.message, { button: "好的" });
            });
    }

    // Animate
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = (function (el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };

                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));

            this.addClass('animated ' + animationName).one(animationEnd, function () {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function') callback();
            });

            return this;
        },
    });

    // Like 动画
    function tadaHeart() {
        $('.like').animateCss('tada');
    }

    // 旋转刷新
    function rotateOutRefresh() {
        $('.refresh').animateCss('anim-rotate');
    }

    // 循环播放动画
    var tada = window.setInterval(tadaHeart, 600);

    $(".like").click(function () {
        like(sid);
    });

    $(".refresh").click(function () {
        rotateOutRefresh();
        hitokoto();
    });

    $(".about").click(function () {
        swal({text: "基于一言 Hitokoto.cn，插件由 Secret 开发维护~\nQQ 群：70029304，欢迎你的加入~⁄(⁄ ⁄•⁄ω⁄•⁄ ⁄)⁄", button: "好的", title: '关于一言' });
    });

    hitokoto();
});