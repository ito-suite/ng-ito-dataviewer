var Preview = {

    // we should probably fix video to have this width too
    // lesspipe???

    init : function (data) {

        var mime      =  data.mime_type
            ,   imageApi  =  '/api/v1/files'
            ,   id        =  '/'+data._id
            ,   filename  =  '/'+data.filename
            ,   href      =  app.getFullHost()
            ,   fileurl  =   href+imageApi+id+filename
            ,   filestub  =  filename.split('.')[0]
            ,   type = "";

        $('a.editThis').attr('href',href+'/admin#/documents/'+data._id+'/edit ');

        $('a.asset.original.link').attr('href', fileurl);
        $('img.qr').attr('src', href+imageApi+id+filestub+'-qr.png');
        $('.asset.qr').click(function() {
            $('img.qr').toggleClass('hidden');
        })

        var mimeClass = Mime.check(mime);

        switch(mimeClass){
            case 'image':

                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').removeClass('hidden');
                break;

            case 'video':

                var media   = $('.media')
                    ,   video   = media.add('<video>').appendTo( '.media' );
                video.append('<source> </source><source> </source><source> </source>');
                $('.cursor,.overlayBar,.mask').css('height','2px');
                $('.overlayBar').css({background:'rgba(0,80,90,0.7)'});
                $('.overlay').css('top','-2px');


                $('video').attr({
                    preload: 'auto',
                    autobuffer: 'true',
                    loop: 'true',
                    poster: href+imageApi+id+filestub+'-preview'+'.jpg',
                    id: 'video',
                    width:512
                });
                $('video source:nth-of-type(1)').attr({
                    src: href+imageApi+id+filestub+'-360p.mp4',
                    type: 'video/mp4'
                });
                $('video source:nth-of-type(2)').attr({
                    src: href+imageApi+id+filestub+'-360p.webm',
                    type: 'video/webm'
                });
                $('video source:nth-of-type(3)').attr({
                    src: href+imageApi+id+filestub+'-360p.ogg',
                    type: 'video/ogg'
                });

                $('.media,.overlay').hover(function(){
                    $('.cursor,.overlayBar,.mask').css({
                        'height':'20px',
                        'margin-top':'-20px'
                    });
                }).mouseleave(function(){
                    $('.cursor,.overlayBar,.mask').css({
                        'height':'2px',
                        'margin-top':''
                    });
                });

                Preview.player('video');

                break;
            case 'audio':
                // prefer mp3
                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').css({
                    height:'120px',
                    width:'100%'
                }).hide().removeClass('hidden').fadeIn(500);
                //$('.overlay').css('margin-left','15px');

                console.log("Modernizr ogg: " + Modernizr.audio.ogg);
                console.log("Modernizr mp3: " + Modernizr.audio.mp3);
                console.log("Modernizr m4a: " + Modernizr.audio.m4a);

                var media   = $('.media')
                    ,   audio   = media.add('<audio>').appendTo( '.media' );
                audio.append('<source> </source><source> </source>');
                $('audio').attr({
                    preload: 'auto',
                    autobuffer: 'true',
                    loop: 'true',
                    id: 'audio',
                    controls: null
                });
                $('audio source:nth-of-type(1)').attr({
                    src: href+imageApi+id+filestub+'-transcoded.mp3',
                    type: 'audio/mp3'
                });
                $('audio source:nth-of-type(2)').attr({
                    src: href+imageApi+id+filestub+'-transcoded.ogg',
                    type: 'audio/ogg'
                });

                Preview.player('audio');
                break;
            case 'pdf':
                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').removeClass('hidden');
                break;
            case 'office':
                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').removeClass('hidden');
                break;
            case 'zip':
                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').removeClass('hidden');
                break;
            case 'binary':
                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').removeClass('hidden');
                break;
            case 'model':
                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').removeClass('hidden');
                break;
            case 'url':
                $('img.preview').attr('src',href+imageApi+id+filestub+'-preview'+'.jpg').removeClass('hidden');
                break;
        }


    },
    player : function(type) {
        $('.mediaControl').hide().removeClass('hidden').fadeIn(150);

        // BEGIN VOLUME CONTROL
        var mousePos = 0;
        var mouseDown = false;
        var width = 0;

        $("#volSlider").mousedown(function(e) {
            mouseDown = true;
            mousePos = e.pageX;
            var pos= $("#volSlider").offset();
            var volume=(e.pageX - Math.round(pos.left));
            $("#volCaret").width(volume);
            $('#volumeLevel').html(Math.round(volume)+'%');
            document.getElementById(type).volume = (volume / 100);
            width = $("#volCaret").width();
            e.preventDefault();
        });
        /* turned off because performance
         $("#volSlider").mouseup(function() {
         mouseDown = false;
         mousePos = 0;
         });
         $("#controlVolume").mousemove(function(e)
         {
         if (mouseDown == true)
         {
         var areaWidth = $("#volSlider").width();
         var caretWidth = Math.min(width - (mousePos - e.pageX), areaWidth);
         console.log(caretWidth)
         $("#volCaret").width(caretWidth);

         var volume = caretWidth / areaWidth * 100;
         if (volume<=0) {volume=0;}
         if (volume>=100) {volume=100;}
         $('#volumeLevel').html(Math.round(volume)+'%');
         document.getElementById(type).volume = (volume / 100);
         e.preventDefault();
         }
         });
         */
        $('button.mute').click(function(){
            if ($(this).hasClass('fa-volume-up')){
                this.muteval=0;
                $(this).addClass('fa-volume-off').removeClass('fa-volume-up');
            } else {
                this.muteval=0.5
                $(this).addClass('fa-volume-up').removeClass('fa-volume-off');
            }
            document.getElementById(type).volume = this.muteval;
            $('#volumeLevel').html(this.muteval * 100+'%');
            $("#volCaret").width(this.muteval * 100);
        })
        // END VOLUME CONTROL


        var timecode = $('.timecode')
            ,   media = $('.media #' + type)[0];
        // myVideo.play();
        var element = document.getElementById("video");
        if (!element) {
            $('.fullscreen').addClass('hidden');
        }
        $('button.fullscreen').on('click', function () {

            $('video').addClass('fullscreenPreview').removeClass('thumbPreview');

            if (element) {
                if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.webkitRequestFullscreen) {
                    element.webkitRequestFullscreen();
                } else {
                    element.requestFullscreen();
                }
            }

        });
        function fullScreen() {
            if (
                document.fullscreenElement ||
                document.webkitFullscreenElement ||
                document.mozFullScreenElement ||
                document.msFullscreenElement
            ) {
                $('video').attr('controls', 'true');
            } else {
                $('.itemPreview video,.itemPreview img,.itemPreview img').addClass('thumbPreview').removeClass('fullscreenPreview')
                $('video').attr('controls', null);
            }
        }
        $(document).on("fullscreenchange", fullScreen);
        $(document).on("webkitfullscreenchange", fullScreen);
        $(document).on("mozfullscreenchange", fullScreen);
        $(document).on("MSFullscreenChange", fullScreen);
        $('.overlay').click(function(e){
            var offset = $(this).offset();
            var x = e.pageX - offset.left;
            // var y = e.pageY - offset.top;

            var newtime = (x/window.widthResize*media.duration).toFixed(2); // in seconds total
            media.pause;
            media.currentTime=newtime;
            media.play;
            // console.log(x/window.widthResize*media.duration);
        }).mousemove(function(e){
            var $this = $(this);
            var offset = $this.offset();
            var x = e.pageX - offset.left;
            // var y = e.pageY - offset.top;
            $('.cursor').css({
                left:x+'px',
                opacity:1
            });
            $('.overlay').addClass('scrubber')
        }).mouseleave(function(){
            $('.cursor').css({
                opacity:0
            });
            $('.overlay').removeClass('scrubber')
        });
        $('.back').on('click',function(){media.currentTime=0;});

        $('.media ' + type).unbind().bind({
            'timeupdate':function () {
                var s = this.currentTime;
                var now = Time.secondsToTimeCode(s);
                var duration = Time.secondsToTimeCode(this.duration);
                timecode.html(now +' | '+ duration);
                // here we add our playing transparency overlay for audio
                var percentTime = 100-(this.currentTime / this.duration * 100).toFixed(2);
                $('.overlayBar').css('width',  percentTime + "%");
            },
            'loadedmetadata' : function(){
                //this.currentTime = 0;
                //playPreview();
                // fade in controls...
                document.getElementById(type).volume = 0.5;
                var s = this.currentTime;
                var now = Time.secondsToTimeCode(s);
                var duration = Time.secondsToTimeCode(this.duration)
                timecode.html(now +' | '+ duration)
                $('button.play').unbind().bind('click', function () {
                    playPreview();
                });
                $(document).unbind('keydown').bind('keydown',function (e) {
                    if (e.keyCode == 32) {
                        playPreview(); //spacebar
                        e.preventDefault();
                        return false;
                    }
                });
            },
            'progress' : function() {
// from http://www.sitepoint.com/essential-audio-and-video-events-for-html5/
// modified for jquery

//get the buffered ranges data
                var progress = $('.progress');

                var ranges = [];
                for(var i = 0; i < this.buffered.length; i ++)
                {
                    ranges.push([
                        this.buffered.start(i),
                        this.buffered.end(i)
                    ]);
                }

                if (type=='audio') {
                    var r = this.buffered;
                    //var start = r.start(0);
                    if (r.end(0)) {
                        var end = r.end(0);
                        var buf = (1-(end/this.duration))*100;
                        //console.log(buf)
                        $('.mask').css('width',buf+'%');

                    }
                }
            },
            'canplay':function(){
                $('button.play').removeClass('hidden');
                $('.media').removeClass('hidden');
                $('#timecode').removeClass('hidden');
                $('#loopplay').removeClass('hidden');
            },
            'paused': function() {
                $('.play').removeClass('fa-pause');
                $('.play').addClass('fa-play');
                $('.play').unbind().bind('click', function () {
                    playPreview();
                });
            },
            'playing': function() {
                $('.play').removeClass('fa-play');
                $('.play').addClass('fa-pause');
                $('.play').unbind().bind('click', function () {
                    pausePreview();
                });
            },
            'ended':function () {
                $('.play').removeClass('fa-pause');
                $('.play').addClass('fa-play');
                $('.play').unbind().bind('click', function () {
                    //    playPreview();
                });
            }
        });

        function playPreview() {
            var vid = $(".media " + type)[0];
            var playButton = $('button.play');
            $(document).unbind('keydown').bind('keydown',function (e) {
                if (e.keyCode == 32) { //spacebar
                    pausePreview();
                    Meta.cancelEvent(e);
                    return false;
                }
            });
            playButton.removeClass('fa-play');
            playButton.addClass('fa-pause');
            playButton.unbind().bind('click', function () {
                pausePreview();
            });
            vid.play();
        }
        function pausePreview() {
            var vid = $(".media " + type)[0];
            var playButton = $('button.play');
            $(document).unbind('keydown').bind('keydown',function (e) {
                if (e.keyCode == 32) {
                    playPreview(); //spacebar
                    Meta.cancelEvent(e);
                    return false;
                }
            });
            playButton.removeClass('fa-pause');
            playButton.addClass('fa-play');
            playButton.unbind().bind('click', function () {
                playPreview();
            });
            vid.pause();
        }
    }
};
var Time = {
    // pad that shit with a leading zero
    pad : function (v) {return ('0'+v).substr(-2); },

    secondsToTimeCode : function(s) {
        // Whatever happened to that? Hmm...
        h = s / 3600 >> 0;
        s = s % 3600;
        m = s / 60 >> 0;
        s = s % 60 >> 0;

        return Time.pad(h) + ":" + Time.pad(m) + ":" + Time.pad(s);
    }
}