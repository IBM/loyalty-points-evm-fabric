var apiUrl = location.protocol + '//' + location.host + "/api/";

$(document).ready(function() {

  $.get(apiUrl + 'partnerData', function(data) {

    //check data for error
    if (data.error) {
      //alert(data.error);
      document.getElementById('errorSection').style.display = "block";
      $('.error').html(function() {
        var str = '<h2><b>Error: ' + data.error + '</b></h2>';
        return str;
      });
      return;
    } else {
      //update heading
      $('.heading').html(function() {
        var str = '<h2><b> ' + data.partnerData[1] + ' </b></h2>';
        str = str + '<h2><b> ' + data.partnerData[0] + ' </b></h2>';

        return str;
      });

      //update dashboard
      $('.dashboards').html(function() {
        var str = '';
        var transactionData = data.transactionsData;
        var pointsGiven = 0;
        var pointsCollected = 0;

        for (var i = 0; i < transactionData.length; i++) {

          if(transactionData[i][1] == 0 && transactionData[i][3] == data.partnerData[0]) {
            pointsGiven += Number(transactionData[i][0]);
          }

          if(transactionData[i][1] == 1 && transactionData[i][3] == data.partnerData[0]) {
            pointsCollected += Number(transactionData[i][0]);
          }
        }


        str = str + '<h5>Total points allocated to customers: ' + pointsGiven + ' </h5>';
        str = str + '<h5>Total points redeemed by customers: ' + pointsCollected + ' </h5>';
        return str;
      });

      //update all transactions
      $('.points-transactions').html(function() {
        var str = '';
        var transactionData = data.transactionsData;
        var transactionType = '';

        for (var i = 0; i < transactionData.length; i++) {

          if(transactionData[i][1] == 0) {
            transactionType = 'Points Earned';
          } else if (transactionData[i][1] == 1) {
            transactionType = 'Points Redeemed';
          }
          str = str + '<p><b>Partner Address</b>: ' + transactionData[i][3] + '<br /><b>Member Address</b>: ' + transactionData[i][2] + '<br /><b>Transaction Type</b>: ' + transactionType + '<br /><b>Points</b>: ' + transactionData[i][0] + '</p><br>';
        }
        return str;
      });

      //display transaction section
      document.getElementById('transactionSection').style.display = "block";
    }
  });

});
