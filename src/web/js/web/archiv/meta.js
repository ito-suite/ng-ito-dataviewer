
var Meta = {

    // this is helpful (use to get the length of an array)
    size : function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    },
    showGif : function() {
        $(document)
            .on('mouseover', '.hasGif' ,function(){
                $(this).attr('src',$(this).attr("baseurl")+'.gif')
            })
            .on('mouseout', '.hasGif' , function(){
                $(this).attr('src',$(this).attr("baseurl")+'.jpg')
            })
    },
    getUserName : function (_id,callback) {
        $.ajax('/api/v1/users/'+_id+'/profile.json', {
            method: 'GET',
            success: function (data) {
                callback(data.firstname+' '+data.lastname);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                var response = jqXHR.responseText;
                callback('Anonymous');
            }
        });
    },
    cancelEvent : function (e){
        e = e ? e : window.event;
        if(e.stopPropagation)
            e.stopPropagation();
        if(e.preventDefault)
            e.preventDefault();
        e.cancelBubble = true;
        e.cancel = true;
        e.returnValue = false;
        return false;
    },
    getFilters : function () {

    }
};