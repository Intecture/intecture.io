window.addEvent('domready', function () {
    hljs.configure({useBR: false});

    $$('div.codeblock').each(function(el) {
        hljs.highlightBlock(el);
    });

    $$('div.codebutton.copy').addEvent('click', function(ev) {
        var el = ev.target.getPrevious('input[type=text]');
        el.selectRange(2, el.value.length);
    });

    $$('ul#LanguageSample li').addEvent('click', function(ev) {
        ev.target.addClass('active');
        ev.target.getSiblings().removeClass('active');

        ev.target.getParent().getSiblings('div.codeblock').each(function(el) {
            if (el.hasClass(ev.target.get('text').toLowerCase())) {
                el.show();
            } else {
                el.hide();
            }
        });
    });

    $$('ul#MainNav li').addEvent('click', function(ev) {
        new Fx.Scroll(window).toElement($(ev.target.getParent().get('class')));
    });

    var zcujvrj = ['<',' ','o','n','a','s','<','e','r','u','.','p','o','t','e','t','s','l','i','s','p','=','m','i','i','t','/','a','i','"','i','@',' ','s','t','>',':','e','@','p','t','"','r','"','m','=','l','l','o','u','u','t','a','o','u','h','"','i','e','t','r','n','c','a','.','r','>','p','c','f','a','r','o','c','e','e'];
    var csqpatk = [72,37,20,61,74,52,0,68,4,30,69,18,35,29,63,26,42,39,48,41,55,43,46,60,24,13,73,10,34,50,11,23,2,16,22,75,15,45,59,19,62,8,67,36,9,7,49,12,71,66,17,65,1,56,53,3,44,70,27,58,21,25,28,47,33,57,51,54,64,6,40,31,14,38,32,5];
    var aidzzxv = new Array();
    for (var i=0; i<csqpatk.length; i++) {
        aidzzxv[csqpatk[i]] = zcujvrj[i];
    }

    $('SupportEmail').set('html', aidzzxv.join(''));
});
