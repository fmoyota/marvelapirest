
var PRIV_KEY = "6c3cc0af4cfe6df57180dee7a44f2c4743a5e428";
var PUBLIC_KEY = "1daf8a72ecc26639def4709b4fb16f56";


//Obtener descripción de personaje
function getMarvelPersonaje(id) {
      $('#detalle-personaje').html('<img src="css/ajax-loader.gif" alt="cargando">');
console.log('detalle personaje');
  // crear un nuevo hash                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  var url = 'https://gateway.marvel.com:443/v1/public/characters/'+id;
    var html='';
    var comics='';
  //console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash,
    characters: id
    })
    .done(function(data) {
      var personaje=data.data.results[0];
      
      console.log(data.data.results[0]);
      
      var comics='';
          html=html+'<div class="col-sm-12 personajes" data-nombre="'+personaje.name+'" ><div class="personaje"><img src="'+personaje.thumbnail.path+'.'+personaje.thumbnail.extension+'" class="picpersonaje rounded rounded-circle img-fluid" alt="char"><h4>'+personaje.name+'</h4><div class="descripcion">'+personaje.description.substr(0,120)+'</div>';
          if(personaje.comics.available>0){
              
               comics=comics+'<h6>Comics Relacionados</h6> <div class="owl-carousel owl-theme">';
          $.each(personaje.comics.items,function(index,comic){
            comics=comics+'<div class="item item-comic"><a href="#" class="comic-rel" data-dismiss="modal" data-toggle="modal" data-target="#comicModal" onClick="getComics(\''+comic.resourceURI.replace('http:','https:')+'\')">'+comic.name+'</a></div>';
          })
               comics=comics+'</div>';
          }
          
          html=html+comics+'</div></div>';
      $('#detalle-personaje').html(html);
       $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                }
            }
        });
      
      console.log(data);
    })
    .fail(function(err){
      
      console.log(err);
    });
    
    
    
    return false;
    
};

//obtener personajes desde API MArvel
function getCharacters(){
  // you need a new ts every request                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
  // the api deals a lot in ids rather than just the strings you want to use
  //var characterId = '1009718'; // wolverine                                                                             


  var url = 'https://gateway.marvel.com:443/v1/public/characters?apikey='+PUBLIC_KEY;

  console.log(url);
  $.getJSON(url, {
    ts: ts,
    hash: hash
    })
    .done(function(data) {
      // sort of a long dump you will need to sort through
      var html='';
      //console.log(data.data.results);
      var personajes=data.data.results;
      var pagina=1;
      $.each(personajes, function( index, personaje ) {
          //console.log(personaje);
          var comics='';
          html=html+'<div class="col-sm-6 personajes" data-nombre="'+personaje.name+'" ><div class="personaje"><img src="'+personaje.thumbnail.path+'.'+personaje.thumbnail.extension+'" class="picpersonaje rounded rounded-circle img-fluid" alt="char"><h4>'+personaje.name+'</h4><div class="descripcion">'+personaje.description.substr(0,120)+'<br/><a href="#" class="btn btn-red" data-personaje="'+personaje.id+'" onClick="getMarvelPersonaje(\''+personaje.id+'\')" data-dismiss="modal" data-toggle="modal" data-target="#personajeModal">Ver más</a></div>';
          if(personaje.comics.available>0){
              
               comics=comics+'<h6>Comics Relacionados</h6> <div class="owl-carousel owl-theme">';
          $.each(personaje.comics.items,function(index,comic){
            comics=comics+'<div class="item item-comic"><a href="#" class="comic-rel" data-dismiss="modal" data-toggle="modal" data-target="#comicModal" onClick="getComics(\''+comic.resourceURI.replace('http:','https:')+'\')">'+comic.name+'</a></div>';
          })
               comics=comics+'</div>';
          }
          
          html=html+comics+'</div></div>';
          pagina++;
      });
     // paginacion(pagina);
      $("#lista-personajes").append(html);
      $('footer').html(data.attributionText);
      $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:2
            },
            1000:{
                items:2
            }
        }
    });
     // console.log(data);
    })
    .fail(function(err){
      // the error codes are listed on the dev site
      console.log(err);
    });
    
    
    

}

//Obtener para ventana modal por URL
function getComics(url){
 $('#detalle-comic').html('<img src="css/ajax-loader.gif" alt="cargando">');
console.log('detalle comic');
  // crear un nuevo hash                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  
    var html='';
    var comics='';
  //console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash
    })
    .done(function(data) {
      var personaje=data.data.results[0];
      
      console.log(data.data.results[0]);
      
      var comics='';
          html=html+'<div class="col-sm-12" data-nombre="'+personaje.title+'" ><div class="row comic"><div class="col-sm-4" ><img src="'+personaje.thumbnail.path+'.'+personaje.thumbnail.extension+'" class="picpersonaje img-fluid" alt="char"/></div><div class="col-sm-8" ><h4>'+personaje.title+'</h4><div class="descripcion">'+personaje.description+'</div><br/><a href="'+personaje.urls[0].url+'" target="_blank" class="btn btn-red" data-personaje="'+personaje.id+'">Ver más</a><br/>';
          if(personaje.characters.available>0){
              
               comics=comics+'<h6>Personajes en esta entrga</h6> <div class="owl-carousel owl-theme">';
          $.each(personaje.characters.items,function(index,comic){
            comics=comics+'<div class="item item-comic">'+comic.name+'</div>';
          })
               comics=comics+'</div>';
          }
      
        //$('#favorito').attr('onClick','agrFavoritos('+personaje.id+')');
      
          $('#comic-price').html(personaje.prices[0].price);
          html=html+comics+'</div></div></div>';
      $('#detalle-comic').html(html);
      
      var favoritos=localStorage.getItem('favoritos');
      if(favoritos && favoritos.indexOf(personaje.id) >= 0){
          $('#favorito').addClass('sifavorito');
          $('#favorito img').attr('src','icons/btn-favourites-primary.png');
          $('#txtfavorito').html('Eliminar Favorito');
        $('#favorito').attr('onClick','remFavoritos('+personaje.id+')');
      }else{
          $('#favorito').removeClass('sifavorito');
          $('#favorito img').attr('src','icons/btn-favourites-default.png');
          $('#txtfavorito').html('Agregar Favorito');
        $('#favorito').attr('onClick','agrFavoritos('+personaje.id+')');
      }
      
       $('.owl-carousel').owlCarousel({
            loop:true,
            margin:10,
            nav:true,
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:2
                },
                1000:{
                    items:2
                }
            }
        });
      
      console.log(data);
    })
    .fail(function(err){
      
      console.log(err);
    });
    
    
    
    return false;
    
    

}

//obtener Comic por ID
function getComic(id){
    if(id && id>0){
    
// $('#lista-favoritos').html('<img src="css/ajax-loader.gif" alt="cargando">');
console.log('detalle comic');
  // crear un nuevo hash                                                                                    
  var ts = new Date().getTime();
  var hash = CryptoJS.MD5(ts + PRIV_KEY + PUBLIC_KEY).toString();
  var url='https://gateway.marvel.com:443/v1/public/comics/'+id;
    var html='';
    var comics='';
  //console.log(url);
  $.getJSON(url, {
    ts: ts,
    apikey: PUBLIC_KEY,
    hash: hash
    })
    .done(function(data) {
      var personaje=data.data.results[0];
      
      console.log(data.data.results[0]);
      
      html=html+'<div class="col-sm-12"><img src="icons/btn-delete.png" class="elimfav" alt="Cerrar" onClick="remFavoritos('+personaje.id+')"><img src="'+personaje.thumbnail.path+'.'+personaje.thumbnail.extension+'" class="img-fluid" alt="char"/></div><br/>&nbsp;';

      
      $('#lista-favoritos').append(html);
      // console.log(html);
      
      //console.log(data);
    })
    .fail(function(err){
      
      console.log(err);
    });
    
}
    
    return false;
    
    

}


function paginacion(total){
    $('#paginacion').twbsPagination({
        totalPages: total,
        visiblePages: 3,
        next: 'Ant.',
        prev: 'Sig',
        onPageClick: function (event, page) {
            //fetch content and render here
            $('#paginas').hide();
            $('#pagina'+page).show();
        }
    });
}

//Busca texto en el campo nombre de personaje
function buscarPersonaje(){
    var filtro=$('#buscarpersonaje').val();
    
    var li = $('.personajes');
    var personaje,pagina;
    $.each(li,function(){
        var personaje =$(this).data('nombre');
        //console.log($(this).data('nombre'));
        filtro=filtro.toLowerCase();
        personaje=personaje.toLowerCase();
        
        if (personaje.indexOf(filtro) > -1) {
            pagina++;
          $(this).show()
        } else {
          $(this).hide();
        }
        
    });
    
   
   // paginacion(pagina); 
}

//Agrega a favoritos
function agrFavoritos(item){
var items= localStorage.getItem('favoritos');
    
var ind= localStorage.getItem('ind');
    if(!items || items.length<=0){
        ind=0;
        items=item;
        
    } else{
    items=[items,item]; 
    }
    
    //console.log(items+'  '+ind+'--'+items[ind]);
    localStorage.setItem('favoritos',items);
        ind++;
    localStorage.setItem('ind',ind);
    obtFavoritos();
}

//Elimina de Favoritos
function remFavoritos(item){
//    localStorage.favoritos.push(item);
var items=localStorage.getItem('favoritos');
    items=items.replace(item,'');
    items=items.replace(',,',',');
    console.log('remover'+item);

    localStorage.setItem('favoritos',items);
    obtFavoritos();
}

//Obtiene lista de favoritos 
function obtFavoritos(){
    
$('#lista-favoritos').html('<img src="css/ajax-loader.gif" alt="cargando">');
      
        var items=localStorage.getItem('favoritos');
    if(items){
        items=items.split(",");
        $.each(items,function(index, value){
            console.log('Favorito '+value);
            $('#lista-favoritos').html('');
            getComic(value);
        });
    }else{
            $('#lista-favoritos').html('');
    }
}

//Inicializa objetos
$(document).ready(function(){
    
    getCharacters();
    obtFavoritos();
    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:10,
        nav:true,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });
    
    $('.buscar').submit(function(e){
        e.preventDefault();
    });
    
    
    
});