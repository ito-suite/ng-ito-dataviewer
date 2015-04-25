var LicenseChooser = {

    initLicenseChooser : function (val,div) {

        if (val == 0 || val == 'undefined' || !val) val = 'unknown';


        if(val) {
            var target = $('.licenseChoice[value="'+val+'"]')
                , link =    target.attr('data-resourceLink')
                , src =     target.attr('data-src')
                , parent =  target.parent('li');
            $('input#license').val(val);

            parent.addClass('preferenceInactive preferenceActive selected');
            LicenseChooser.check(val,div);
        }

        $('li a').tooltip({container: 'body'});

        $('#licenseInput ul li.license a').click(function(e){
            var $this =         $(this)
                ,   license =       $this.attr('data-ref')
                ,   parent =        $this.parent('li')
                ,   link =          $this.attr('data-resourceLink')
                ,   src =           $this.attr('data-src')
                ,   licenseBadge =  $('.licenseBadge.assign')
                ,   parentGroup =   $('#licenseInput ul li')
                ,   inputHolder =   $('input#license');
            //  console.log(licensePassthru);
            // in case we want to disable something
            if (parent.hasClass('disabled') || parent.hasClass('selected')) return;

            parentGroup.removeClass('selected preferenceActive');

            if (parent.hasClass('preferenceInactive'))
            {
                parent.addClass('preferenceActive');
            } else {
                parent.addClass('selected');
            }

            //licenseBadge.hide()
            licenseBadge.html('<a href="'+link+'" target="_blank"><img src="/images/licenses/'+src+'"></a>');
            inputHolder.val($this.attr('value'));
            // this prevents the href from triggering the hash change
            // because some older browsers will break otherwise
            e.preventDefault();
        });

        $('.licenseBadge').click(function(e){
            e.stopPropagation();
        })
    },
    check : function(val,div) {
        // load the mime types.
        if (div === undefined) div="";
        LicenseChooser.types();
        for(i=0;i<Meta.size(LicenseChooser.licenses);i++) {
            if (LicenseChooser.licenses[i]['short']==val) {
                $(div + ' .licenseBadge.assign').html('<a href="'+LicenseChooser.licenses[i]['resourceLink']['en']+'" target="_blank"><img src="/images/licenses/'+LicenseChooser.licenses[i]['src']+'"></a>');
                $('.licenseInfo').html(LicenseChooser.licenses[i]['description']['en'])
                return;
            }

        }
        //;
    },
    createList : function() {
        LicenseChooser.types();
    },
    types : function() {
        LicenseChooser.licenses =
            [
                {
                    "short" : "unknown",
                    "name": {
                        "en": "Unknown Provenance",
                        "de": "Unbekannter Provenienz"
                    },
                    "class": "copyright",
                    "weight":100,
                    "description": {
                        "en": "If you do not know where the resource comes from you may submit it with the unknown license. It will not be publically available until the license status is clarified, but it will be visible to you and instititutional members.",
                        "de": "Wenn du es nicht weisst wo es herkommt, dann ..."
                    },
                    "resourceLink": {
                        "en": "http://en.wikipedia.org/wiki/Provenance",
                        "de": "http://de.wikipedia.org/wiki/Provenienzprinzip"
                    },
                    "src": "unknown.png"
                },
                {
                    "short" : "copyright",
                    "name": {
                        "en": "Copyright",
                        "de": "Copyright"
                    },
                    "class": "copyright",
                    "weight":90,
                    "description": {
                        "en": "This work is protected by copyright. Without the permission of the owner, you are not allowed to use the material in any commercial way.",
                        "de": "Copyright ist..."
                    },
                    "resourceLink": {
                        "en": "http://en.wikipedia.org/wiki/Provenance",
                        "de": "http://de.wikipedia.org/wiki/Provenienzprinzip"
                    },
                    "src": "copyright.png"
                },
                {
                    "short" : "gaengeviertel",
                    "name": {
                        "en": "Copyright Gängeviertel e.V.",
                        "de": "Copyright Gängeviertel e.V."
                    },
                    "class": "copyright",
                    "weight":80,
                    "description": {
                        "en": "By gifting your work to the Gängeviertel, you endow the Gängeviertel e.V. with unlimited rights to the work.",
                        "de": "Wenn du deine Arbeit dem Gängeviertel schenkst..."
                    },
                    "resourceLink": {
                        "en": "http://das-gaengeviertel.info",
                        "de": "http://das-gaengeviertel.info"
                    },
                    "src": "gaengeviertel.png"
                },

                {
                    "short" : "mark/1.0",
                    "name": {
                        "en": "Existed in Public Domain",
                        "de": "Bereits im Public Domain"
                    },
                    "class": "publicdomain",
                    "weight":70,
                    "description": {
                        "en": "This item has been placed in the public domain and you can do anything you want with it..",
                        "de": "Wenn du es nicht weisst wo es herkommt, dann ..."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/publicdomain/mark/1.0/",
                        "de": "https://creativecommons.org/publicdomain/mark/1.0/deed.de"
                    },
                    "src": "copyrightfree.png"
                },
                {
                    "short" : "zero/1.0",
                    "name": {
                        "en": "Added to Public Domain",
                        "de": "Der Public Domain hinzufügen"
                    },
                    "class": "publicdomain",
                    "weight":60,
                    "description": {
                        "en": "This item has been placed in the public domain and you can do anything you want with it.",
                        "de": "Wenn de es weisst wo es herkommt, dann ..."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/publicdomain/zero/1.0/",
                        "de": "https://creativecommons.org/publicdomain/zero/1.0/deed.de"
                    },
                    "src": "publicdomain.png"
                },

                {
                    "short" : "wtfpl",
                    "name": {
                        "en":"WTFPL 2.0",
                        "de": "WTFPL 2.0"
                    },
                    "class": "publicdomain",
                    "weight":50,
                    "description":{
                        "en": "The WTFPL is a very permissive license for software and other scientific or artistic works that offers a great degree of freedom. It allows everything and has no additional restrictions.",
                        "de": "The WTFPL is a very permissive license for software and other scientific or artistic works that offers a great degree of freedom. It allows everything and has no additional restrictions."
                    },
                    "resourceLink":{
                        "en": "http://www.wtfpl.net/about/",
                        "de": "http://www.wtfpl.net/about/"
                    },
                    "src": "wtfpl.png"
                },
                {
                    "short" : "by/4.0",
                    "name": {
                        "en": "Intl Attribution",
                        "de": "Intl Attribution"
                    },
                    "class": "creativecommons",
                    "weight":40,
                    "description": {
                        "en": "This license lets others distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials.",
                        "de": "This license lets others distribute, remix, tweak, and build upon your work, even commercially, as long as they credit you for the original creation. This is the most accommodating of licenses offered. Recommended for maximum dissemination and use of licensed materials."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/licenses/by/4.0/",
                        "de": "https://creativecommons.org/licenses/by/4.0/deed.de"
                    },
                    "src": "cc-by.png"
                },

                {
                    "short" : "by-sa/4.0",
                    "name": {
                        "en": "Intl Attribution-ShareAlike",
                        "de": "Intl Namensnennung-Weitergabe"
                    },
                    "class": "creativecommons",
                    "weight":30,
                    "description": {
                        "en":"This license lets others remix, tweak, and build upon your work even for commercial purposes, as long as they credit you and license their new creations under the identical terms. This license is often compared to \"copyleft\" free and open source software licenses. All new works based on yours will carry the same license, so any derivatives will also allow commercial use.",
                        "de": "This license lets others remix, tweak, and build upon your work even for commercial purposes, as long as they credit you and license their new creations under the identical terms. This license is often compared to \"copyleft\" free and open source software licenses. All new works based on yours will carry the same license, so any derivatives will also allow commercial use."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/licenses/by-sa/4.0/",
                        "de": "https://creativecommons.org/licenses/by-sa/4.0/deed.de"
                    },
                    "src": "cc-by-sa.png"
                },

                {
                    "short" : "by-nd/4.0",
                    "name": {
                        "en": "Intl Attribution-NoDerivs",
                        "de": "Intl Namensnennung-KeineBearbeitung"
                    },
                    "class": "creativecommons",
                    "weight":20,
                    "description": {
                        "en":"This license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to you.",
                        "de": "This license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to you."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/licenses/by-nd/4.0/",
                        "de": "https://creativecommons.org/licenses/by-nd/4.0/deed.de"
                    },
                    "src": "cc-by-nd.png"
                },

                {
                    "short" : "by-nc/4.0",
                    "name": {
                        "en":"Intl Attribution-NonCommercial",
                        "de": "Intl Namensnennung-NichtKommerziell"
                    },
                    "class": "creativecommons",
                    "weight":10,
                    "description": {
                        "en":"This license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to you.",
                        "de": "This license allows for redistribution, commercial and non-commercial, as long as it is passed along unchanged and in whole, with credit to you."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/licenses/by-nc/4.0/",
                        "de": "https://creativecommons.org/licenses/by-nc/4.0/deed.de"
                    },
                    "src": "cc-by-nc.png"
                },


                {
                    "short" : "by-nc-sa/4.0",
                    "name": {
                        "en":"Intl Attribution-NonCommercial-ShareAlike",
                        "de": "Intl Namensnennung-NichtKommerziell-Weitergabe"
                    },
                    "class": "creativecommons",
                    "weight":0,
                    "description": {
                        "en":"This license lets others remix, tweak, and build upon your work non-commercially, as long as they credit you and license their new creations under the identical terms.",
                        "de": "This license lets others remix, tweak, and build upon your work non-commercially, as long as they credit you and license their new creations under the identical terms."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
                        "de": "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.de"
                    },
                    "src":"cc-by-nc-sa.png"
                },

                {
                    "short" : "by-nc-nd/4.0",
                    "name": {
                        "en":"Intl Attribution-NonCommercial-NoDerivs",
                        "de": "Intl Namensnennung-NichtKommerziell-KeineBearbeitung"
                    },
                    "class": "creativecommons",
                    "weight":-10,
                    "description": {
                        "en":"This license is the most restrictive of the six main licenses Creative Commons licenses, only allowing others to download your works and share them with others as long as they credit you, but they can’t change them in any way or use them commercially.",
                        "de": "This license is the most restrictive of the six main licenses Creative Commons licenses, only allowing others to download your works and share them with others as long as they credit you, but they can’t change them in any way or use them commercially."
                    },
                    "resourceLink": {
                        "en": "https://creativecommons.org/licenses/by-nc-sd/4.0/",
                        "de": "https://creativecommons.org/licenses/by-nc-nd/4.0/deed.de"
                    },
                    "src": "cc-by-nc-nd.png"
                }
            ]

    }
}