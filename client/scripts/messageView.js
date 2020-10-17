var MessageView = {

  render: _.template(`
      <div class="chat room<%-roomname%>">
        <div class="username"><%-username%></div>
        <div><%-text%></div>
      </div>
    `)

};