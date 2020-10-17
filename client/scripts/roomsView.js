var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  render: function() {
  },

  room: _.template(`
    <div class="chat room<%-roomname%>">
      <div class="username"><%-username%></div>
      <div><%-text%></div>
    </div>
  `)

};
