var MessagesView = {
  //this is the DOM node for messages
  $chats: $('#chats'),

  prevID: 0,

  initialize: function(data) {
    var messages = data.results;
    console.log(messages);
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
  },

  //this is for adding all new messages
  render: function() {
    //pull new messages from server
    //set new prev ID
    if (i === 0) { MessagesView.prevID = messages[0].objectId; }
    //pre-pend to DOM
  },

  //something we call to actually a single message
  renderMessage: function(){
    var text = $( "input" ).first().val();
    var username = App.username;
    var roomname = undefined; //figure out later

    var message = new Messages(username, text, roomname);
    Parse.create(message);

    MessagesView.render();
  }

};
