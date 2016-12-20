var main = function() {

  $('form').submit(function(event) {
    $('#results').html('')
    var $user_input = $(event.target).find('input');
    var comment = $user_input.val();
    $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=" + comment + "&prop=info&inprop=url&callback=?", function(json) {
      if (json.query.searchinfo.totalhits === 0) {
        $('#results').append("<div class='effect'>No results matched your entry.</div>")
      } else {
        for (var i = 0; i < 5; i++) {
          var snippet = json.query.search[i].title;
          var url = snippet.replace(/ /g, "_");
          $('#results').append("<div class='effect'><a href='https://en.wikipedia.org/wiki/" + url + "' target='_blank'>" + snippet + "</a>" + "<br>" + json.query.search[i].snippet + "</div>" + "<br>")
        }
      }
    });
  return false;
  });
}

$(document).ready(main);