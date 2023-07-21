
const socket = io();

$('#chat-box').hide();

$('#send-btn').on('click' ,()=>{
    // console.log('clicked')
    const msgText = $('#inp').val();

    socket.emit('send-msg' , {
        msg:msgText
    })

    $('#inp').val("")
});


socket.on('received-msg' , (data)=>{
    // console.log(data)
    $('#chat').append(`<li class="border p-2 ms-0 mb-2 rounded-pill"><span class="fw-bold"> ${data.username} </span>-> ${data.msg} <span></span> </li>`)
    // automatically scroll to the top
    $('#chat').scrollTop($('#chat').outerHeight());
})



$('#login-btn').on('click' ,()=>{
    const username = $('#username').val();
    // console.log(username);

    socket.emit('login',{
        username : username
    })

    $('#login').hide();
    $('#chat-box').show();

    $('#username').val("");
})


