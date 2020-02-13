$(document).ready(function(){

  readList();





});

function readList(data){
  $.ajax(
    {
      url: "http://157.230.17.132:3023/todos",
      method: "GET",
      success: function (data, stato)
      {
        var source = $("#entry-template").html();
        var template = Handlebars.compile(source);
        for (var i = 0; i < data.length; i++) {
          var todos = data[i];
          var context = {
            text: todos.text,
          };
          var html = template(context);
          $('.list').append(html);
        }

      },
      error: function (richiesta, stato, errore) {
        alert("E' avvenuto un errore. " + errore);
      }
    });

}

function deleteElementList(){



}
