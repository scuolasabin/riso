function setCookie( cname, cvalue ) {
    var d = new Date();
    d.setTime( d.getTime() + ( 24 * 60 * 60 * 1000 ) );
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie( cname ) {
    var name = cname + "=";
    var ca = document.cookie.split( ';' );
    for( var i = 0; i < ca.length; i++ ) {
        var c = ca[i];
        while ( c.charAt( 0 ) == ' ' ) c = c.substring( 1 );
        if ( c.indexOf( name ) == 0 ) return c.substring( name.length, c.length );
    }
    return "";
}

function getParameterByName( name ) {
    name = name.replace( /[\[]/, "\\[" ).replace( /[\]]/, "\\]" );
    var regex = new RegExp( "[\\?&]" + name + "=([^&#]*)" ),
    results = regex.exec( location.search );
    return results === null ? null : decodeURIComponent( results[1].replace(/\+/g, " " ) );
}

function creaDomanda() {
    var livello = getParameterByName( 'q' );
    if (getCookie('numero') == '') {
        setCookie('numero', 0);
        setCookie('punti', 0);
    }
    if (getCookie('numero' >= 3))
        window.location.href = "vittoria.html";
    $( 'div#mrrice' ).html('<img src="../img/gioco/mr_rice/' + livello + '.png" />');
    var json = $.getJSON( '../json/gioco/' + livello + '.json' )
        .done( function( data ) {
            var id = Math.floor( Math.random() * data.length );
            $( 'p#domanda' ).html( data[id].domanda );
            for (k in data[id].risposte) {
                $( '#risposte' ).append('<li class="risposta" onclick="controllaRisposta(' + k + ',' + data[id].risposte[k].corretta + ')">' + data[id].risposte[k].testo + '</li>');
            }
        })
        // Gestiamo il caso in cui il file non viene preso correttamente (es: errore nel nome file)
        .fail(function() {
            // Stampiamo un errore sulla console JS
            console.log( 'error' );
        })
    console.log('numero: ' + getCookie('numero'));
    console.log('punti: ' + getCookie('punti'));
}

function controllaRisposta( id, c ) {
    if (getCookie('numero') == '') {
        setCookie('numero', 0);
        setCookie('punti', 0);
    } else {
        var numero = parseInt(getCookie('numero'));
        setCookie('numero', numero + 1);
    }
    if (c == 1) {
        var punti = parseInt(getCookie('punti'));
        setCookie('punti', punti + 1);
        alert('Complimenti, risposta esatta :)');
    } else {
        alert('Risposta errata :(');
    }
    if (parseInt(getCookie('numero')) >= '3') {
        var punti = getCookie('punti').toString();
        setCookie('numero', '');
        setCookie('punti', '');
        window.location.href = "punteggio" + punti + ".html";
    } else {
        creaAmbiente();
    } 
    return 0;
}

function creaAmbiente() {
    var json = $.getJSON( '../json/gioco/livelli.json' )
        .done( function( data ) {
            id = Math.floor( Math.random() * data.length );
            window.location.href = data[id] + "/";
        })
        // Gestiamo il caso in cui il file non viene preso correttamente (es: errore nel nome file)
        .fail(function() {
            // Stampiamo un errore sulla console JS
            console.log( 'error' );
        })
}
