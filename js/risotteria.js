function getParameterByName( name ) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Questa funzione viene usata per creare risotti a caso
function populateFillables()
{   
    // Itermiano su tutti gli elementi di classe "fillable" presenti nel documento
    $( '.fillable' ).each( function( index ) {
        // Mettiamo la ref "this" nella variabile "obj" per poterla usare anche al cambio della ref "this"
        var obj = this;
        if ( $( this ).attr( 'lang' ) == "it" ) {
            var basepath = '../';
        } else {
            var basepath = '../../';
        }
        // Prendiamo il file IDOGGETTO.json
        var json = $.getJSON( basepath + 'json/risotteria/' + $( this ).attr( 'id' ) + '.' + $( this ).attr( 'lang' ) + '.json' )
            // Appena il file è stato preso completamente
            .done( function( data ) {
                // Prendiamo il valore dall'url o creiamo un numero causale tra 0 e il numero di oggetti -1 presenti nel file
                var id = getParameterByName( $( obj ).attr( 'id' ) )
                if ( id === null ) {
                    id = Math.floor( Math.random() * data.length );
                }
                // Facciamo apparire il valore della chiave "preparazione" per l'oggetto che ha l'id uguale al numero random
                $( obj ).text( data[id].preparazione );
                $( obj ).after( '<img src="' + basepath + 'img/risotteria/' + data[id].immagine + '"/>');
                console.log(id);
                console.log(data[id].nome);
                $('#' + $( obj ).attr( 'id' ) + '-titolo').text( data[id].nome );
            })
            // Gestiamo il caso in cui il file non viene preso correttamente (es: errore nel nome file)
            .fail(function() {
                // Stampiamo un errore sulla console JS
                console.log( 'error' );
            })
    })
}

function menurisotto()
{
    $( '.fillable' ).each( function( index ) {
        var obj = this;
        if ( $( this ).attr( 'lang' ) == "it" ) {
            var basepath = '../';
        } else {
            var basepath = '../../';
        }
        var json = $.getJSON( basepath + 'json/risotteria/' + $( this ).attr( 'id' ) + '.' + $( this ).attr( 'lang' ) + '.json' )
            .done( function( data ) {
                jQuery.each( data, function( i ) {
                    $( obj ).append( '<input type="radio" name="' + $(obj).attr( 'id' ) + '" value="' + i + '"/>' + this.nome + "<br>" );
                });
            })
            .fail(function() {
                console.log( 'error' );
            })
    })
}

