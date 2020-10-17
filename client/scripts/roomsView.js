var RoomsView = {

  $button: $('#rooms form'),
  $select: $('#rooms select'),

  initialize: function() {
    //FormView.$form.on('submit', FormView.handleSubmit);
    RoomsView.$button.on('submit', RoomsView.handleSubmit);
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
    RoomsView.filterRooms();
  },

  filterRooms: function() {
    if (Rooms.currentRoom === 'lobby') {
      $('.chat').show();
    } else {
      $('.chat').hide();
      var roomClass = `room${Rooms.currentRoom}`;
      $(`.${roomClass}`).show();
    }
  },

  handleSubmit: function(event) {
    event.preventDefault();
    class Room {
      constructor (roomname) {
        this.roomname = roomname;
      }
    }

    var newRoom = $( "input" )[0]['value'];
    if (!Rooms.roomsAdded[newRoom]) {
      Rooms.roomsAdded[newRoom] = true;
      Rooms.storage[newRoom] = newRoom;
      var option = RoomsView.roomNode(new Room(newRoom));
      RoomsView.$select.append(option);
    }
  },
  // <option value="<%-roomname%>"><%-roomname%></option>
  // <select id="roomForm"></select>
  // <button id="addRoom">Add Room</button>
};
