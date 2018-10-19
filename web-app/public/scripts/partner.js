var apiUrl = location.protocol + '//' + location.host + "/api/";

//check user input and call server
$('.sign-in-partner').click(function() {

  //get user input data
  var formProxy = $('.proxy input').val();

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '"}';
  console.log(inputData)

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'partnerData',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {
      console.log(data);
      //remove loader
      document.getElementById('loader').style.display = "none";

      //check data for error
      if (data.error) {
        alert(data.error);
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

        //remove login section
        document.getElementById('loginSection').style.display = "none";
        //display transaction section
        document.getElementById('transactionSection').style.display = "block";
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      document.getElementById('loader').style.display = "none";
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);

      location.reload();
    }
  });

});
