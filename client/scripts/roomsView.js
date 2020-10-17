var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    //FormView.$form.on('submit', FormView.handleSubmit);
    RoomsView.$button.on('click', RoomsView.handleClick);
    RoomsView.$select.on('change', RoomsView.handleChange);
  },

  //initial render in MessagesView.initialize
  //re-render in MessagesView.render
  render: function() {
    //
    class Room {
      constructor (roomname) {
        this.roomname = roomname;
      }
    }

    var option;
    for (let key in Rooms.storage) {
      if (!Rooms.roomsAdded[key]) {
        Rooms.roomsAdded[key] = true;
        option = RoomsView.roomNode(new Room(key));
        RoomsView.$select.append(option);
      }
    }
  },

  roomNode: _.template(`
    <option value="<%-roomname%>"><%-roomname%></option>
  `),

  handleChange: function(event) {
    event.preventDefault();
    Rooms.currentRoom = event.currentTarget.value;
    if (Rooms.currentRoom === 'lobby') {
      $('.chat').show();
    } else {
      $('.chat').hide();
      var roomClass = `room${Rooms.currentRoom}`;
      console.log(roomClass);
      $(`.${roomClass}`).show();
    }
  }

  // <option value="<%-roomname%>"><%-roomname%></option>
  // <select id="roomForm"></select>
  // <button id="addRoom">Add Room</button>
};
