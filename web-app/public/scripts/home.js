var apiUrl = location.protocol + '//' + location.host + "/api/";


$(document).ready(function() {

  //chech if already registered as member
  $.get(apiUrl + 'memberData', function(data) {

    //chech if already registered as partner
    if (data.error) {

      $.get(apiUrl + 'partnerData', function(data) {

        if (data.error) {
          document.getElementById('register').style.display = "flex";
          $('.info').html(function() {
            var str = '<center><h4 align="center">Register as <b>Member</b> or <b>Partner</b> of the loyalty program </h4></br></center>';
            return str;
          });
          return;

        } else {
          $('.info').html(function() {
            var str = '<h4>You are registered as <b>Partner</b> on the network </h4></br>';
            str = str + '<a class="btn btn-secondary" href="/partner" role="button">Access Portal &raquo;</a>'
            return str;
          });
        }
      });

      return;
    } else {
      $('.info').html(function() {
        var str = '<h4>You are registered as <b>Member</b> on the network </h4></br>';
        str = str + '<a class="btn btn-secondary" href="/member" role="button">Access Portal &raquo;</a>'
        return str;
      });

    }
  });


});
