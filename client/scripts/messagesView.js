var MessagesView = {
  //this is the DOM node for messages
  $chats: $('#chats'),

  prevID: 0,

  initialize: function(data) {
    var messages = data.results;
    // console.log(MessageView.render(messages[0]));
    // MessagesView.$chats.append(MessageView.render(messages[0]));
    // //move through the entire array of messages
    var message;
    for (let i = 0; i < messages.length; i++) {
      if (i === 0) { MessagesView.prevID = messages[0].objectId; }
      if (!messages[i].username || !messages[i].text) { continue; }
      if (!messages[i].roomname) { messages[i].roomname = 'lobby'; }
      message = MessageView.render(messages[i]);
      MessagesView.$chats.append(message);

      //add roomname to Room storage
      if (!Rooms.storage[messages[i].roomname]) {
        Rooms.storage[messages[i].roomname] = messages[i].roomname;
      }
    }
    //create a message using a template (Message?) //need a method for creating messages
    //add it to the chats node (append)

    //set interval and render
    setInterval(function () {
      Parse.readAll((data) => {
        // examine the response from the server request:
        MessagesView.render(data);
      });
    }, 10000);
  },

  //this is for adding all new messages
  render: function(data) {
    //pull new messages from server
    var messages = data.results;
    //iterate backwards
    var message;
    var canContinue = false;
    for (let i = messages.length - 1; i >= 0; i--) {
      if (i === 0) { MessagesView.prevID = messages[0].objectId; }
      if (!messages[i].username || !messages[i].text) { continue; }
      if (!messages[i].roomname) { messages[i].roomname = 'lobby'; }
      if (canContinue) {
        message = MessageView.render(messages[i]);
        MessagesView.$chats.prepend(message);
      }
      if (messages[i].objectId === MessagesView.prevID) {
        canContinue = true;
      }

      //add roomname to Room storage
      if (!Rooms.storage[messages[i].roomname]) {
        Rooms.storage[messages[i].roomname] = messages[i].roomname;
      }
    }
    if (!canContinue) {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (i === 0) { MessagesView.prevID = messages[0].objectId; }
        if (!messages[i].username || !messages[i].text) { continue; }
        if (!messages[i].roomname) { messages[i].roomname = 'lobby'; }
        message = MessageView.render(messages[i]);
        //pre-pend to DOM
        MessagesView.$chats.prepend(message);

        //add roomname to Room storage
        if (!Rooms.storage[messages[i].roomname]) {
          Rooms.storage[messages[i].roomname] = messages[i].roomname;
        }
      }
    }
  },

  //something we call to actually a single message
  renderMessage: function() {
    var text = $( "input" ).first().val();
    var username = App.username;
    var roomname = undefined || 'lobby';

    var message = new Messages(username, text, roomname);
    Parse.create(message);

    Parse.readAll((data) => {
      MessagesView.render(data);
    });
  }

};
