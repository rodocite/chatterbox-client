var app;
$(function() {
  app = {
    init: function() {
      app.fetch();
    },

    createMessage: function(text, username){
      var message = {
        // username: username,
        text: text
        // roomname: '4chan'
      };

      app.send(message);
      app.fetch();
    },

    send: function(messageObject) {
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'POST',
        data: JSON.stringify(messageObject),
        contentType: 'application/json',

        success: function (data) {
          console.log('chatterbox: Message sent');
          app.displayMessage(data);
        },

        error: function (data) {
          //if chat is empty, error out
          //if text is unsanitizable
          //just for fun -- add a swear filter
          console.error('chatterbox: Failed to send message');
        }

      });
    },

    fetch: function() {
      $.ajax({
        url: 'https://api.parse.com/1/classes/chatterbox',
        type: 'GET',
        contentType: 'application/json',
        order: '-createdAt',

        success: function (data) {
          app.displayMessage(data);
          console.log('chatterbox: Messages received.');
        },
        error: function (data) {
          console.error('chatterbox: Failed to receive message.');
        }
      });
    },

    displayMessage: function(newMessages) {
      //message is an array??
      _.each(newMessages.results, function(message) {
          $('.messageContainer').append('<span>' + _.escape(message.text) + '<span>' + '<br>');
        });

    }
    // addOrCreateRoom: function() {

    // }
  }
    app.init.bind(app);
    app.init();
    var context = this;

    setInterval(function(){
      app.fetch.call(context);
    }, 8000 );

    $('#submitButton').on('click', function(){
      var message = $('#inputBox').val();
      app.createMessage(message);
    });

    $('#inputBox').keypress(function(key){
      if(key.which === 13) {
        var message = $('#inputBox').val();
        app.createMessage(message);
      }
    })
}());

