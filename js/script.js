$(document).ready(function(){

  readList();
  $(document).on('click', '.button', function(){
    var buttonDelete = $(this);
    var idTodo = buttonDelete.parent().attr('data-id');
    console.log(idTodo);
    deleteElementList(idTodo)
  });

  $('.buttonAdd').click(function(){
    var value = $('input').val();
    createElement(value);

  });






});
// FUNZIONE CHE LEGGE TUTTA LA LISTA
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
            id: todos.id
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
// FUNZIONE CHE ELIMINA UNO AD UNO GLI ELEMENTI CLICCATI
function deleteElementList(id){
  $.ajax(
    {
      url: "http://157.230.17.132:3023/todos/" + id,
      method: "DELETE",
      success: function (data, stato)
      {
        console.log('delete');
        $('.list').html('');
        readList();
      },
      error: function (richiesta, stato, errore) {
        alert("E' avvenuto un errore. " + errore);
      }
    });
}
// FUNZIONE CHE CREA
function createElement(todoValue) {
  $.ajax(
    {
      url: "http://157.230.17.132:3023/todos",
      method: "POST",
      data:{
        text: todoValue
      },
      success: function (data, stato)
      {
        console.log('invio');
        $('ul').html('');
        readList();
      },
      error: function (richiesta, stato, errore) {
        alert("E' avvenuto un errore. " + errore);
      }
    });

}
