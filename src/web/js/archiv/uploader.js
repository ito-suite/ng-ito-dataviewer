var ArchiveUploader = {
    initUploader : function () {
    var chunk = 262144
        , document_id
        , collection_id
        , files
        , file
        , index = 0
        , indexNew = 0
        , objectURL
        , currentBlob
        , baseURL = app.getFullHost()
        , fileReader = new FileReader()
        , txtReader = new FileReader();

    window.URL = window.URL || window.webkitURL;

    // this works as well for at least the last file...
    var loadText = function (evnt, output) {
        // sorry about this global, no other way i can find to do this...
        window.currentTarget = output;
        txtReader.readAsText(evnt);
    }

    txtReader.onload = function (evnt) {
        var output2 = evnt.target.result;
        var finality = output2.replace(/\r\n/g, "<br>");
        try {
            $(window.currentTarget).html(finality);
            console.log(evnt)
        }
        catch (e) {
            console.log(e)
        }
    };


    var fileChosen = function (evnt) {
        $('.file_definer').addClass('hidden');
        $('.uploadActions').removeClass('hidden');
        $('.submit.btn').removeClass('disabled');
        $('.assetDetails.btn').removeClass('disabled');
        $('.uploadStep3').removeClass('hidden');


        // drop multiple files
        if (evnt.originalEvent.dataTransfer && evnt.originalEvent.dataTransfer.files) {
            files = evnt.originalEvent.dataTransfer.files;
        }
        //file interface
        else {
            files = evnt.target.files;
        }
        var nomime = "";

        for (var i = 0, file; file = files[i]; i++) {
            nomime = "";
            //create object url

            //var fileClass = file.type.split("/")[0]
            var count = $('.item').length - 1; // forget about the template

            // count = count + index -> wasn't working anyway

            switch (file.type) {
                case "image/jpeg":
                case "image/png":
                case "image/gif":
                case "image/svg+xml":
                    var objectURL = window.URL.createObjectURL(file);
                    fileClass = "image";

                    var element = $('<img />', {
                        id: 'media' + count,
                        src: objectURL
                    })[0];
                    var fullScreenIcon = ""
                        , playIcon = "hidden"
                        , timeIcon = "hidden";
                    break;
                case "video/mp4":
                case "video/webm":
                case "video/ogg":
                case "video/quicktime":
                    fileClass = "video";

                    objectURL = window.URL.createObjectURL(file);

                    //create new html5 video element with this url
                    var element = $('<video />', {
                        src: objectURL,
                        preload: 'auto',
                        id: 'media' + count,
                        controls: null
                    })[0];
                    exif = null;
                    window.exif = null;
                    window.currentTarget = null;
                    var fullScreenIcon = ""
                        , playIcon = ""
                        , timeIcon = "";
                    break;
                case "audio/wav":
                case "audio/x-wav":
                case "audio/mp3":
                case "audio/mpeg":
                case "audio/x-mpeg":
                case "audio/ogg":
                case "audio/m4a":
                    fileClass = "audio";

                    objectURL = window.URL.createObjectURL(file);

                    //create new html5 audio element with this url
                    var element = $('<audio />', {
                        src: objectURL,
                        preload: 'auto',
                        controls: null,
                        id: 'media' + count
                    })[0];
                    var fullScreenIcon = "hidden"
                        , playIcon = ""
                        , timeIcon = "";
                    break;
                case "text/plain":


                case "text/x-log":
                case "application/javascript":
                case "application/html":
                case "application/xml":
                case "application/x-shellscript":
                case "application/css":
                    fileClass = "code";
                    nomime = "fileIcon noPreview code";
                    var fullScreenIcon = "hidden"
                        , playIcon = "hidden"
                        , timeIcon = "hidden";
                    break;

                case 'application/acrobat':
                case 'application/x-pdf':
                case 'applications/vnd.pdf':
                case 'text/pdf':
                case 'text/x-pdf':
                case 'application/pdf':
                    fileClass = "pdf";
                    nomime = "fileIcon noPreview pdf";
                    var fullScreenIcon = "hidden"
                        , playIcon = "hidden"
                        , timeIcon = "hidden";
                    break;

                default:
                    element = null;
                    exif = null;
                    window.exif = null;
                    window.currentTarget = null;
                    var gotmime = "";
                    gotmime = file.type.split("/")[0];
                    if (file.type.split("/")[0] == "") gotmime = "unknown";
                    fileClass = "unknown";
                    nomime = "fileIcon noPreview " + gotmime;
                    var fullScreenIcon = "hidden"
                        , playIcon = "hidden"
                        , timeIcon = "hidden";
                    break;
            }
            console.log('created ' + file.type + ' element: %o', element);
            $('.item').last().clone(true, true).attr('id', 'item' + count).prependTo('#mainHolder');
            $('#item' + count + ' .fileName').html(file.name).attr('original_filename', file.name);
            $('#item' + count + ' .fileIcon').addClass(fileClass);
            $('#item' + count + ' .previewHolder span').addClass(nomime);
            $('#item' + count + ' .fileMime').html(file.type);
            $('#item' + count + ' .fileSize').html(file.size.formatBytes());
            $('#item' + count + ' .itemPreview').attr('id', 'preview' + count).prepend(element);
            $('#item' + count + ' .statusimo').attr('original_filename', file.name);
            $('#item' + count + ' .loading').attr('original_filename', file.name);
            $('#item' + count + ' .permalink').attr('original_filename', file.name);
            $('#item' + count + ' .fullscreen').attr('data-target', 'preview' + count).addClass(fullScreenIcon);
            // $('#item' + count + ' .loopplay').attr('data-target', 'media' + count).addClass(playIcon);
            // $('#item' + count + ' .timeCode').attr('data-target', 'media' + count).addClass(timeIcon);
            // $('#item' + count + ' button.abort').attr('onclick', 'ArchiveUploader.unloadPreview(' + count + ')')
            $('#media' + count).addClass('thumbPreview');
            $('#item' + count).hide().removeClass('hidden').fadeIn(200);
            $('.preview').attr('current-upload', count);
            $('#item' + count + ' .langFORM input').addClass('detail_form');
            $('#item' + count + ' .file_definer').remove();
            console.log('created object url: %o', objectURL);


        }
        // index=0
    }


// //////////////////////////////////////////////////////////////////////////

// https://developer.mozilla.org/en-US/docs/Using_files_from_web_applications#Accessing_selected_file(s)_on_a_change_event


    fileReader.onload = function (evnt) {
        // this gets called with every call of fileReader
        // first call makes the directories
        var formData = new FormData();
        //var normName = files[index].name.normalize('NFKC')
        formData.append('name', files[index].name);
        formData.append('document_id', document_id);
        formData.append('data', arrayBufferToBlob(evnt.target.result, { type: files[index].type }));
        //console.log('fr1'+normName+'\n'+window.posit)
        sendData(formData);
    };

    var startUpload = function (evnt) {

        document_id = null;
        var file = files[index];
        //currentBlob = new Blob([file], {"type": file.type});
        var collection_title_en = $('.collection_form_holder .title_en').val()
            , collection_tags_en = $('.collection_form_holder .tags_en').val()
            , collection_description_en = $('.collection_form_holder .description_en').val()
            , collection_title_de = $('.collection_form_holder .title_de').val()
            , collection_tags_de = $('.collection_form_holder .tags_de').val()
            , collection_description_de = $('.collection_form_holder .description_de').val()
            , item_title_en = $('#item' + index + ' .title_en').val()
            , item_tags_en = $('#item' + index + ' .tags_en').val()
            , item_description_en = $('#item' + index + ' .description_en').val()
            , item_title_de = $('#item' + index + ' .title_de').val()
            , item_tags_de = $('#item' + index + ' .tags_de').val()
            , item_description_de = $('#item' + index + ' .description_de').val()
            , license = $('#item' + index + ' #license').val()
            , rights_holder = $('.collection_form_holder #owner.userName').val()
            , access_rights = $('input[name=access_rights]:radio:checked').val();
        var formData = new FormData();
        formData.append('name', file.name);
        formData.append('size', file.size);
        formData.append('collection_title_en', collection_title_en);
        formData.append('collection_tags_en', collection_tags_en);
        formData.append('collection_description_en', collection_description_en);
        formData.append('collection_title_de', collection_title_de);
        formData.append('collection_tags_de', collection_tags_de);
        formData.append('collection_description_de', collection_description_de);
        formData.append('item_title_en', item_title_en);
        formData.append('item_tags_en', item_tags_en);
        formData.append('item_description_en', item_description_en);
        formData.append('item_title_de', item_title_de);
        formData.append('item_tags_de', item_tags_de);
        formData.append('item_description_de', item_description_de);
        formData.append('license_id', license);
        formData.append('rights_holder', rights_holder);
        formData.append('access_rights', access_rights);
        formData.append('batch_size', Meta.size(files));

        if (collection_id) {
            console.log('collection', collection_id);
            formData.append('collection_id', collection_id);
        }

        console.log(formData);
        sendData(formData);
    };

    var sendChunk = function (offset) {
        console.log('sending chunk ', offset, index);
        var file = files[index];
        var place = offset * chunk; //The Next Blocks Starting Position
        var nFile = file.slice(place, place + Math.min(chunk, (file.size - place)));
        fileReader.readAsArrayBuffer(nFile);
    };

    var sendData = function (formData) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/v1/documents.json', true);
        xhr.onload = function (e) {
            if (this.status == 200) {
                var resObj = JSON.parse(this.response);
                if (resObj.chunks_loaded < resObj.chunks_total) {
                    var part = resObj.chunks_loaded;
                    var total = resObj.chunks_total;
                    document_id = resObj._id;
                    collection_id = resObj.collection_id;
                    sendChunk(part);
                    progress(part / total, resObj.original_filename, document_id);
                } else {
                    index += 1;
                    document_id = resObj._id;
                    progress(1, resObj.original_filename, document_id);

                    if (index < files.length) {
                        setTimeout(function () {
                            startUpload();
                        }, 0);
                    }
                }

            }
        };
        xhr.send(formData);
    };

    var arrayBufferToBlob = function (buffer, opt_contentType) {
        var uInt8Array;
        uInt8Array = new Uint8Array(buffer);
        return new Blob([uInt8Array], (opt_contentType ? {
            type: opt_contentType
        } : {}));
    };

    // this is a good candidate for reuse

    var progress = function (p, original_filename, doc_id) {
        //alert(original_filename)
        $('.statusimo[original_filename="' + original_filename + '"]').addClass('status-uploading').removeClass('status-queue');
        p = p * 100;
        p = parseInt(p, 10);
        var target = $('.loading[original_filename="' + original_filename + '"]')
            , fill = $('.loading[original_filename="' + original_filename + '"] .fill')
            , percentage = $('.loading[original_filename="' + original_filename + '"] .percentage');

        fill.css('width', p + '%');
        //percentage.html(p + '%');
        //console.log(i)
        if (p == 100) {
            fill.css('width', 100 + '%').html('');
            $('.statusimo[original_filename="' + original_filename + '"]').addClass('status-processing').removeClass('status-uploading');
            $('.permalink[original_filename="' + original_filename + '"]').html('<a href="' + baseURL + '/#/item/' + doc_id + '" target="_self">' + baseURL + '/#/item/' + doc_id + '</a>');
            $('img[original_filename="' + original_filename + '"]').remove();
            //alert("finished:"+index)
        }
    };
    // THIS SHOULD SWITCH TO MODERNIZR, since it is available.

    if (window.File && window.FileReader) {
        // console.log("file api supported");
        $('.submit').unbind('click').bind('click', startUpload);
        $('#files').unbind('change').bind('change', fileChosen);

        $('.helpShower').unbind().bind('click', function () {
            $('.uploadInfo').toggleClass('hidden');
        })

        $('.collection_form_holder .requiredInput').on('keyup', function () {
            if ($('.collection_form_holder input.title_en').val() != "" && $('.collection_form_holder input.tags_en').val() != "" && $('.collection_form_holder textarea.description_en').val() != "") {
                $('.file_definer').removeClass('hidden');
                $('.uploadStep2').removeClass('hidden');
            }
            var name = $(this).attr("name");
            $('input[name="' + name + '"]').val($(this).val());
            $('textarea[name="' + name + '"]').val($(this).val());

        });


        //$.event.props.push('dataTransfer');

        $('.fileTrigger').unbind('drop dragenter dragleave').bind({
            dragover: function (evnt) {
                evnt.preventDefault();
                evnt.stopPropagation();
                $(this).css('opacity', '0.9');
                $('.filesLabel').addClass('green');
            },
            dragleave: function (evnt) {
                evnt.preventDefault();
                evnt.stopPropagation();
                $(this).css('opacity', '0.4');
                $('.filesLabel').removeClass('green');
            },
            drop: function (evnt) {
                evnt.preventDefault();
                evnt.stopPropagation();
                evnt.stopImmediatePropagation();
                $(this).css('opacity', '0.7');
                $('.filesLabel').removeClass('green');

                console.log(evnt);

                if (evnt.originalEvent.dataTransfer) {
                    console.log(evnt.originalEvent.dataTransfer.getData('URL'));
                    console.log(evnt.originalEvent.dataTransfer.types);

                    fileChosen(evnt);
                }

            },
            click: function (e) {
                $('#files').click();
                e.preventDefault();
                $(this).blur();
            }
        });

        $('.assetDetails').on('click', function () {
            $('.asset_form_holder').toggleClass('hidden');
        })
    }


}
};


// I guess this wasn't really used.
var Mediaplayer = {
init: function () {
////////////////// ARTBOX PREVIEWER CODE
    function goFullscreen(id) {
        var element = document.getElementById(id);
        $('#' + id + ' .thumbPreview').addClass('fullscreenPreview').removeClass('thumbPreview');

        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else {
            element.requestFullscreen();
        }
    }

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

    function loopPlay(target) {
        //$('.media').;
        var myVideo = $(target)

        myVideo.bind({'ended': function () {
            this.currentTime = 0;
            this.play();
        }
        })
    }



    $('.playbutton').addClass('hidden');
    $('.timecode').addClass('hidden');

    $('.loopplay').on('click', function () {
        var target = $(this).attr('data-target');
        loopPlay(target);
        $('loopplay').toggleClass('btn-info');
        $('#loopplay i').toggleClass('icon-white');
    });

    $('.media').bind({
        'timeupdate': function () {

            //     var refreshIntervalId =  window.setInterval(function(){
            s = $('.media')[0].currentTime;
            h = s / 3600 >> 0;
            s = s % 3600;
            m = s / 60 >> 0;
            s = s % 60 >> 0;

            if (h.toString().length < 2) {
                h = "0" + h;
            }
            if (s.toString().length < 2) {
                s = "0" + s;
            }
            if (m.toString().length < 2) {
                m = "0" + m;
            }

            $('#timecode').html(h + ":" + m + ":" + s);
            //       },1000/500);
        },
        'canplay': function () {
            this.play();
            $('#playbutton').removeClass('hidden');
            $('.media').removeClass('hidden');
            $('#timecode').removeClass('hidden');
            $('#loopplay').removeClass('hidden');
            $('#print').on('click', function () {
                $(".media")[0].pause();
            })
            $('video').each(function () {
                $('#fullscreen').removeClass('hidden');
            })
        },
        'paused': function () {
            $('#playbutton i').removeClass('icon-pause');
            $('#playbutton i').addClass('icon-play');
            $('#playbutton').unbind().bind('click', function () {
                playPreview();
            });
            //clearInterval(refreshIntervalId);

        },
        'playing': function () {
            $('#playbutton i').removeClass('icon-play');
            $('#playbutton i').addClass('icon-pause');
            $('#playbutton').unbind().bind('click', function () {
                pausePreview();
            });

        },

        'ended': function () {
            $('#playbutton i').removeClass('icon-pause');
            $('#playbutton i').addClass('icon-play');
            $('#playbutton').unbind().bind('click', function () {
                playPreview();
            });
            //clearInterval(refreshIntervalId);
        }

    });

    function playPreview() {
        var vid = $(".media")[0];
        var playButton = $('#playbutton');
        $(document).keydown(function (e) {
            if (e.keyCode === 32) { //spacebar
                pausePreview();
                e.preventDefault();
            }
        });
        $('#playbutton i').removeClass('icon-play');
        $('#playbutton i').addClass('icon-pause');
        playButton.unbind().bind('click', function () {
            pausePreview();
        });
        vid.play();
    }

    function pausePreview() {
        var vid = $(".media")[0];
        var playButton = $("#playbutton");
        $(document).keydown(function (e) {
            if (e.keyCode === 32) {
                playPreview(); //spacebar
                e.preventDefault();
            }
        });
        $('#playbutton i').removeClass('icon-pause');
        $('#playbutton i').addClass('icon-play');
        playButton.unbind().bind('click', function () {
            playPreview();
        });
        vid.pause();
    }


}
};