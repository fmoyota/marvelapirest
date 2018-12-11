var PRIV_KEY = "6c3cc0af4cfe6df57180dee7a44f2c4743a5e428";
var PUBLIC_KEY = "1daf8a72ecc26639def4709b4fb16f56";

function getMarvelPersonaje(id) {
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
          html=html+'<div class="col-sm-6 personajes" data-nombre="'+personaje.name+'" ><div class="personaje"><img src="'+personaje.thumbnail.path+'.'+personaje.thumbnail.extension+'" class="picpersonaje rounded rounded-circle img-fluid" alt="char"><h4>'+personaje.name+'</h4><div class="descripcion">'+personaje.description.substr(0,120)+'</div><a href="#" class="btn btn-red" data-personaje="'+personaje.id+'">Ver más</a></div>';
          if(personaje.comics.available>0){
              
               comics=comics+'<h6>Comics Relacionados</h6> <div class="owl-carousel owl-theme">';
          $.each(personaje.comics.items,function(index,comic){
            comics=comics+'<div class="item item-comic">'+comic.name+'</div>';
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
          html=html+'<div class="col-sm-6 personajes" data-nombre="'+personaje.name+'" ><div class="personaje"><img src="'+personaje.thumbnail.path+'.'+personaje.thumbnail.extension+'" class="picpersonaje rounded rounded-circle img-fluid" alt="char"><h4>'+personaje.name+'</h4><div class="descripcion">'+personaje.description.substr(0,120)+'</div><a href="#" class="btn btn-red" data-personaje="'+personaje.id+'" onClick="getMarvelPersonaje(\''+personaje.id+'\')" data-toggle="modal" data-target="#personajeModal">Ver más</a></div>';
          if(personaje.comics.available>0){
              
               comics=comics+'<h6>Comics Relacionados</h6> <div class="owl-carousel owl-theme">';
          $.each(personaje.comics.items,function(index,comic){
            comics=comics+'<div class="item item-comic"><a href="#" class="comic-rel" data-toggle="modal" data-target="#personajeModal" onClick="getComics(\''+comic.resourceURI+'\')">'+comic.name+'</a></div>';
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

function getComics(url){

console.log('detalle personaje');
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
          html=html+'<div class="col-sm-6 personajes" data-nombre="'+personaje.name+'" ><div class="personaje"><img src="'+personaje.thumbnail.path+'.'+personaje.thumbnail.extension+'" class="picpersonaje rounded rounded-circle img-fluid" alt="char"><h4>'+personaje.name+'</h4><div class="descripcion">'+personaje.description.substr(0,120)+'</div><a href="#" class="btn btn-red" data-personaje="'+personaje.id+'">Ver más</a></div>';
          if(personaje.comics.available>0){
              
               comics=comics+'<h6>Comics Relacionados</h6> <div class="owl-carousel owl-theme">';
          $.each(personaje.comics.items,function(index,comic){
            comics=comics+'<div class="item item-comic">'+comic.name+'</div>';
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

function agrFavoritos(item){
    localStorage.favoritos.push(item);
    obtFavoritos();
}


function obtFavoritos(){
    if(localStorage.favoritos.length>0){
        var items=localStorage.favoritos;
        $.each(items,function(){
            
        });
    }
}

$(document).ready(function(){
    
    getCharacters();
    
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