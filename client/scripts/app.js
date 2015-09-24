var app;
$(function() {
  app = {
    server: 'https://api.parse.com/1/classes/chatterbox',

    init: function() {
      app.fetch();
    },

    clearMessages: function() {
      $('#chats').empty();
    },

    addMessage: function(text){
      var username = window.location.search.match(/username=([^&]+)/)[1];
      var message = {
      username: username,
      text: text,
      roomname: roomname
      };

      app.send(message);
      app.fetch();
    },

    send: function(messageObject) {
      $.ajax({
        url: app.server,
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
        url: app.server,
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
      app.clearMessages();
      _.each(newMessages.results, function(message) {
          $('#chats').append('<span>' + _.escape(message.username) + ': ' + _.escape(message.text) + '<span>' + '<br>');
        });
    },

    addRoom: function() {
      var roomName = $('#roomInput').val();
      $('#Chatrooms').append('<option class="rooms">' + roomName + '</option>' );
    }
  }

}());

