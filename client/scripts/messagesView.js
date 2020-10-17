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
      message = MessageView.render(messages[i]);
      MessagesView.$chats.append(message);
    }
    //create a message using a template (Message?) //need a method for creating messages
    //add it to the chats node (append)

    //set timeout and render
    setInterval(function () {
      Parse.readAll((data) => {
        // examine the response from the server request:
        console.log('every 5 seconds!');
        MessagesView.render(data);
      });
    }, 5000);
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
      if (canContinue) {
        message = MessageView.render(messages[i]);
        MessagesView.$chats.prepend(message);
      }
      if (messages[i].objectId === MessagesView.prevID) {
        canContinue = true;
      }
    }
    if (!canContinue) {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (i === 0) { MessagesView.prevID = messages[0].objectId; }
        if (!messages[i].username || !messages[i].text) { continue; }
        message = MessageView.render(messages[i]);
        //pre-pend to DOM
        MessagesView.$chats.prepend(message);
      }
    }
  },

  //something we call to actually a single message
  renderMessage: function() {
    var text = $( "input" ).first().val();
    var username = App.username;
    var roomname = undefined; //figure out later

    var message = new Messages(username, text, roomname);
    Parse.create(message);

    Parse.readAll((data) => {
      MessagesView.render(data);
    });
  }

};
