var apiUrl = location.protocol + '//' + location.host + "/api/";

//check user input and call server
$('.sign-in-member').click(function() {
  updateMember();
});

function updateMember() {

  //get user input data
  var formProxy = $('.proxy input').val();
  var formContractAddress = $('.contractAddress input').val();

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"contractaddress" : "' + formContractAddress + '"}';
  console.log(inputData)

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'memberData',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
    },
    success: function(data) {

      console.log("member data");
      console.log(data)

      //remove loader
      document.getElementById('loader').style.display = "none";


      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        console.log(data);

        //update heading
        $('.heading').html(function() {
          var str = '<h2><b>' + data.memberData[1] + ' ' + data.memberData[2] + '</b></h2>';
          str = str + '<h2><b>' + data.memberData[0] + '</b></h2>';
          str = str + '<h2><b>' + data.memberData[4] + '</b></h2>';

          return str;
        });

        //update partners dropdown for earn points transaction
        $('.earn-partner select').html(function() {
          var str = '<option value="" disabled="" selected="">select</option>';
          var partnersData = data.partnersData;
          for (var i = 0; i < partnersData.length; i++) {
            str = str + '<option partner-id=' + partnersData[i][0] + '> ' + partnersData[i][1] + '</option>';
          }
          return str;
        });

        //update partners dropdown for use points transaction
        $('.use-partner select').html(function() {
          var str = '<option value="" disabled="" selected="">select</option>';
          var partnersData = data.partnersData;
          for (var i = 0; i < partnersData.length; i++) {
            str = str + '<option partner-id=' + partnersData[i][0] + '> ' + partnersData[i][1] + '</option>';
          }
          return str;
        });

        //update earn points transaction
        $('.points-allocated-transactions').html(function() {
          var str = '';
          var transactionData = data.transactionsData;

          for (var i = 0; i < transactionData.length; i++) {

            if(transactionData[i][1] == 0) {
              str = str + '<p><b>partnerID</b>: ' + transactionData[i][3] + '<br /><b>memberID</b>: ' + transactionData[i][2] + '<br /><b>points</b>: ' + transactionData[i][0] + '</p><br>';
            }
          }
          return str;
        });

        //update use points transaction
        $('.points-redeemed-transactions').html(function() {
          var str = '';

          var transactionData = data.transactionsData;

          for (var i = 0; i < transactionData.length; i++) {

            if(transactionData[i][1] == 1) {
              str = str + '<p><b>partnerID</b>: ' + transactionData[i][3] + '<br /><b>memberID</b>: ' + transactionData[i][2] + '<br /><b>points</b>: ' + transactionData[i][0] + '</p><br>';
            }
          }
          return str;
        });

        //remove login section and display member page
        document.getElementById('loginSection').style.display = "none";
        document.getElementById('transactionSection').style.display = "block";

      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      //reload on error
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {

    }
  });
}


$('.earn-points-30').click(function() {
  earnPoints(30);
});

$('.earn-points-80').click(function() {
  earnPoints(80);
});

$('.earn-points-200').click(function() {
  earnPoints(200);
});


//check user input and call server
$('.earn-points-transaction').click(function() {

  var formPoints = $('.earnPoints input').val();
  earnPoints(formPoints);
});


function earnPoints(formPoints) {

  //get user input data
  var formProxy = $('.proxy input').val();
  var formContractAddress = $('.contractAddress input').val();
  var formPartnerId = $('.earn-partner select').find(":selected").attr('partner-id');

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"points" : "' + formPoints + '", ' + '"partnerid" : "' + formPartnerId + '", ' + '"contractaddress" : "' + formContractAddress +'"}';
  console.log(inputData)

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'earnPoints',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
      document.getElementById('infoSection').style.display = "none";
    },
    success: function(data) {
      console.log(data);
      document.getElementById('loader').style.display = "none";
      document.getElementById('infoSection').style.display = "block";

      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        //update member page and notify successful transaction
        updateMember();
        alert('Transaction successful');
      }


    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    }
  });

}

$('.use-points-50').click(function() {
  usePoints(50);
});

$('.use-points-150').click(function() {
  usePoints(100);
});

$('.use-points-200').click(function() {
  usePoints(150);
});


//check user input and call server
$('.use-points-transaction').click(function() {
  var formPoints = $('.usePoints input').val();
  usePoints(formPoints);
});


function usePoints(formPoints) {

  //get user input data
  var formProxy = $('.proxy input').val();
  var formContractAddress = $('.contractAddress input').val();
  var formPartnerId = $('.use-partner select').find(":selected").attr('partner-id');

  //create json data
  var inputData = '{' + '"proxy" : "' + formProxy + '", ' + '"points" : "' + formPoints + '", ' + '"partnerid" : "' + formPartnerId + '", ' + '"contractaddress" : "' + formContractAddress + '"}';

  //make ajax call
  $.ajax({
    type: 'POST',
    url: apiUrl + 'usePoints',
    data: inputData,
    dataType: 'json',
    contentType: 'application/json',
    beforeSend: function() {
      //display loading
      document.getElementById('loader').style.display = "block";
      document.getElementById('infoSection').style.display = "none";
    },
    success: function(data) {
      console.log(data);
      document.getElementById('loader').style.display = "none";
      document.getElementById('infoSection').style.display = "block";

      //check data for error
      if (data.error) {
        alert(data.error);
        return;
      } else {
        //update member page and notify successful transaction
        updateMember();
        alert('Transaction successful');
      }

    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Error: Try again")
      console.log(errorThrown);
      console.log(textStatus);
      console.log(jqXHR);
    },
    complete: function() {}
  });

}
