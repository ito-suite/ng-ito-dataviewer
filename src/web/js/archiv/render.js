var Render = {
    asset : function (docId) {
        $('.pages .pager').remove();

        $.ajax('/api/v1/documents/'+docId+'.json', {
            method: 'GET',
            success: function (data) {
                Preview.init(data);

                if (data.rights_holder==='undefined' || !data.rights_holder) {
                    Meta.getUserName(data.contributor_id,function(result){
                        $('.owner').val(result).html(result);
                    });
                } else {
                    $('.owner').val(data.rights_holder).html(data.rights_holder);
                }

                for (var i=0; i < Meta.size(data.tags_en); i++) {
                    $('.tags').append('<a href="/#/tag/'+data.tags_en[i]+'" class="tag label label-default">'+data.tags_en[i]+'</a>');
                }

                for (var i=0; i < Meta.size(data.tags_de); i++) {
                    $('.tags').append('<a href="/#/tag/'+data.tags_de[i]+'" class="tag label label-default">'+data.tags_de[i]+'</a>');
                }

                if (!data.title_en) {this.title=data.filename} else {this.title=data.title_en}
                if (!data.description_en) {this.description="No Description Yet"} else {this.description=data.description_en}

                $('.title_en').val(this.title).html(this.title);
                //$('.title_de').val(data.title_de).html(data.title_de);
                $('.description_en').val(this.description).html(this.description);
                //$('.description_de').val(data.description_de).html(data.description_de);
                $('.access_rights').val(data.access_rights).html(data.access_rights);
                $('.creator').val(data.creator);
                $('.publisher').val(data.publisher);
                $('.type').val(data.type);
                $('.fileIcon').addClass(Mime.check(data.mime_type));
                LicenseChooser.initLicenseChooser(data.license_id);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location='/#/';
            }
        })
    },
    pages : function (num,active) {
        // this renders the pages
        $('.pages .pager').remove();
        window.pages = $('.pages');

        for (var i=0; i < num; i++) {
            if (i == active) {var disabled = 'disabled'; }
            window.pages.append('<div class="btn btn-default btn-sm pager '+disabled+'" data-page="'+i+'"> '+parseInt(i + 1)+' </div>');
            disabled="";
        }

    },
    rows : function (data, page, filters) {

        $('.itemsThumbs a').remove();
        $('.itemsRows div').remove();
        //  for (var i = 0, item; item = data[i]; i++) {
        var length= 50
            ,   start = page * length;
        // we're using a different counter because maybe a file is broken...
        var count = 0;
        $.each( data, function( i, item ) {

            if ( i < start -1 ) return true;
            if ( i > start + length -2 ) {
                Meta.showGif();
                return false; // break out of this loop
            }


            var imageApi  =  '/api/v1/files/'
                ,   id
                ,   filename  =  '/'+item['filename']
                ,   href      =  app.getFullHost()
                ,   fileurl   =  href+imageApi+id+filename
                ,   fileStub  =  filename.split('.')[0]
                ,   mimeClass =  Mime.check(item['mime_type'])
                ,   title = item['title_en'] || item['title_de'] || item['filename'] || "oops";
            if (!item['_id']) {id=item['id'] } else {id=item['_id'] }

            $.ajax({ // check one last time if it exists, otherwise don't render it.
                url:href+imageApi+id+fileStub+'-thumb.jpg',
                type:'HEAD',
                error: function()
                {
                    count = count - 1;
                    //console.log(fileStub + ' not found');
                    return;
                },
                success: function()
                {
                    count=count+1;
                    $('.itemsRows').append('<div id="row'+count+'" class="row mainRow" style="padding:10px"><a class="licenseBadge assign" href="http://en.wikipedia.org/wiki/Provenance"><img src="/images/licenses/unknown.png" ></a><a class="itemPreview hidden" id="'+id+'" href="#/item/'+id+'"><div class="col-xs-2" style="margin:0 50px 0 -15px"><img class="row_thumb" style="height:72px" src="" ></div><div class="col-xs-6 col-xs-offset-1 thumb fileIcon largeIcon '+mimeClass+'"></div><div class="tags col-xs-3">TAG</div></a></div><div class="row"><div class="col-xs-12"><hr></div> ');
                    $('#'+id+' img').attr('src',href+imageApi+id+fileStub+'-thumb.jpg');
                    $('#'+id+' div.thumb').html('<p class="black" style="margin-left:-20px;font-weight:500">'+title+'</p><p>&nbsp;&nbsp;'+item['mime_type']+' &nbsp;&nbsp;&nbsp;</p> '  );
                    $('#'+id+' div.tags').html('<a href="/#/tag/'+item['tags_en']+'" class="tag label label-default">'+item['tags_en']+'</a>');
                    LicenseChooser.initLicenseChooser(item['license_id'], '#row'+count);
                    //console.log(item['license_id']);
                    $('#'+id).removeClass('hidden');

                    if ( mimeClass == 'video' || mimeClass == 'pdf' ||   mimeClass == 'office' ||  mimeClass == 'zip')
                    {
                        $('#row'+count + ' img.row_thumb').addClass('hasGif').attr('baseUrl',href+imageApi+id+fileStub+'-thumb');
                    }
                }
            });
        });
        return
    },
    thumbs : function( data, page, filters) {

        $('.itemsThumbs a').remove();
        $('.itemsRows div').remove();

        //  for (var i = 0, item; item = data[i]; i++) {
        var length= 50
            ,   start = page * length;

        console.log('start '+start);

        // we're using a different counter because maybe a file is broken...
        var count = 0;
        $.each( data, function( i, item ) {
            //console.log('i '+i)

            if ( i < start -1 ) return true;
            if ( i > start + length -2 ) {
                Meta.showGif();
                return false; // break out of this loop
            }


            var imageApi  =  '/api/v1/files/'
                ,   id
                ,   filename  =  '/'+item['filename']
                ,   href      =  app.getFullHost()
                ,   fileurl   =  href+imageApi+id+filename
                ,   fileStub  =  filename.split('.')[0]
                ,   mimeClass = Mime.check(item['mime_type']);

            if (!item['_id']) {id=item['id'] } else {id=item['_id'] }

            $.ajax({ // check one last time if it exists, otherwise don't render it.
                url:href+imageApi+id+fileStub+'-thumb.jpg',
                type:'HEAD',
                error: function()
                {
                    count = count - 1;
                    console.log(fileStub + ' not found');
                    return;
                },
                success: function()
                {
                    count=count+1;

                    $('.itemsThumbs').append('<a class="hidden thumb fileIcon '+mimeClass+'" id="'+id+'" href="#/item/'+id+'"><img /></a>');
                    $('#'+id+' img').attr('src',href+imageApi+id+fileStub+'-thumb.jpg');
                    $('#'+id).removeClass('hidden');
                    if ( mimeClass == 'video' || mimeClass == 'pdf' ||   mimeClass == 'office' ||  mimeClass == 'zip')
                    {
                        $('#'+id + ' img').addClass('hasGif').attr('baseUrl',href+imageApi+id+fileStub+'-thumb');
                    }
                }
            });
        });
        return
    }
}