var FormView = {

  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    //grab the user
    event.preventDefault();
    var text = $( "input" ).first().val();
    var username = App.username;
    var roomname = undefined; //figure out later

    var message = new Messages(username, text, roomname);
    Parse.create(message);
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};