var Player = {
    loadItems : function(tags) {
        var count=0
            ,   list=[]
            ,   times=[]
            ,   newCount=0;

        // list & times can be switched out with Title & Owner & License...
        list = ["Pio & Pony","Bye Bye Jupibar"];
        times = [tags,tags];

        var getAvailableItems = function(tags) {
            $.ajax('/api/v1/documents.json?tags='+tags, {
                method: 'GET',
                success: function (data) {
                    // if any clones exist, remove them
                    $('.cloned').remove();
                    //console.log(data);

                    // choose the image size to display based on windowheight
                    // this is also useful elsewhere, for example on the #/item/:id page.
                    // TODO: It should also check if the width is smaller than the height.
                    if (window.innerHeight <= 480) imageHeight="-480p";
                    else if (window.innerHeight <= 720) imageHeight="-720p";
                    else if (window.innerHeight >= 721) imageHeight="-1080p";
                    else imageHeight="-480p";
                    // get all the items and turn them into real items
                    $('p.count').append(data.length);
                    // this will crash your browser if we pull EVERYTHING!
                    // currently limited
                    for (var i = 0, item; item = data[i]; i++) {
                        var fileEnd = item['filename'].split('.')[1];
                        if (fileEnd == 'png') {
                            fileEnd = 'png';
                        } else {
                            fileEnd = 'png';
                        };
                        if (i==data.length) {
                            var visible='visible';
                        } else {
                            var visible='';
                        };
                        // console.log(item)
                        var count=$('.itemPlayback').length - 1; // forget about the template
                        if( item['filename'] ) {
                            $('.itemPlayback').last().clone(true, true).attr('id','item'+count).prependTo('#mainHolder');
                            // TODO: switch for item type.
                            $('#item'+count+' img').attr('src','/uploads/'+item['_id']+'/'+item['filename'].split('.')[0]+imageHeight+'.'+fileEnd).addClass('slide '+visible);
                            $('#item'+count+' a').attr('href','#/item/'+item['_id']);
                            $('#item'+count).hide().removeClass('hidden').addClass('cloned');
                        };
                    };

                    // maybe we can't find a picture. Sad, but a logo is better than a broken box.
                    $("img").error(function () {
                        $(this).one("error").attr("src", "/images/logo.png");
                    });

                    var current = 0
                        ,   element = $('#mainHolder')
                        ,   slides = $('.slide')
                        ,   size = slides.length;

                    $('.itemPlayback:eq(0)').fadeIn(350).fadeOut(4000);

                    var jslide = function () {
                        if ( current < size ) {
                            var last = current - 1;
                            if (last < 0 ) last = 0;
                            $('.itemPlayback').last().fadeOut(1000);
                            $('#item'+last).fadeOut(1000);
                            $('#item'+current).fadeIn(1000);
                            ++current;
                        } else {
                            current = 0;
                            for ( var i = 0; i < size; ++i ) {
                                $('#item'+i).fadeOut(350);
                            }
                            $('#item'+current).fadeIn(350);
                            ++current;
                            // current = 0;
                            clearInterval(start);
                            getAvailableItems(tags);
                        }
                    };
                    var start = setInterval(function(){jslide();}, 3000);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    var response = JSON.parse(jqXHR.responseText);
                    ArchiveUI.displayMessages(response['messages']);
                }
            }); // end AJAX
        }; // end getAvailableItems

        //////////////////////////////////////////////////////////////////////
        // 72 hr dj marathon

        var getName = function (count) {
            $('.name span').text(list[count]);
        };
        var getNext = function (count) {
            newCount=count+++1
            $('.nextUp span').text(times[newCount]+" | "+list[newCount]);
        };
        var highlightLast50 = function (periods) {
            if ($.countdown.periodsToSeconds(periods) <= 60) {
                $('.time span').addClass('pulsation');
            };
        };

        var defaultCountdown=$('#defaultCountdown')
            ,   timeToGo=600;

        getName(count);
        getNext(count);

        var now = new Date();
        console.log(now);

        $('body').keyup(function(e){
            var code = e.keyCode || e.which;
            if(code == 13) { //Enter keycode
                shortly = new Date();
                shortly.setSeconds(shortly.getSeconds() + timeToGo);
                defaultCountdown.countdown({
                    until: shortly,
                    format: 'MS',
                    compact: true,
                    onTick: highlightLast50,
                    onExpiry: function() {
                        count++;
                        getName(count);
                        getNext(count);
                        shortly = new Date();
                        shortly.setSeconds(shortly.getSeconds() + timeToGo);
                        defaultCountdown.countdown('option', 'until', shortly);
                        $('.name').addClass('alerty');
                        $('.name .fa').hide();
                        setTimeout(function(){
                            $('.name').removeClass('alerty');
                            $('.name .fa').show();
                        },10000);
                    }
                });
            }
            // TODO: also move to next item
            if(code == 37) { //previous / left-arrow
                count--;
                getName(count);
                getNext(count);
            }
            if(code == 39) { //next / right-arrow
                count++;
                getName(count);
                getNext(count);
            }
        })
        getAvailableItems(tags);
    }
}