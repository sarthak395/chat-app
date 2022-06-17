const socket = io("http://localhost:8000");

var audio = new Audio('media/WhatsApp Ptt 2022-06-12 at 2.33.53 AM (online-audio-converter.com).mp3')
const form = document.getElementById('send-container')
const messageInput = document.getElementById('messageinp')
const messagecontainer = document.querySelector('.container')


const append = (message, position, flag) => {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `${message} <img class="deleteim" src="media/dustbin.png" onclick="remove(this)">`;
    messageElement.classList.add('message');
    messageElement.classList.add(position); //left or right message
    messagecontainer.append(messageElement);
    if (flag) {
        audio.play()
    }
}

const remove = (el) => {
    el.parentNode.remove()
}


const name__ = prompt("enter your name")
socket.emit('new-user-joined', name__)


form.addEventListener('submit', (e) => {
    e.preventDefault(); //page doesnt reload
    const message = messageInput.value;
    append(`You:${message}`, 'right', 0)
    socket.emit('send', message)
    messageInput.value = ''
})

socket.on('user-joined', data => {
    append(`${data} joined the chat`, `right`, 1)
})

socket.on('receive', data => {
    append(`${data.name}:${data.message}`, `left`, 1)
})

socket.on('left', data => {
    append(`${data} left the chat`, 'left', 1)
})


var i=1;
function changebg() {
    const doc = document.getElementById("container")
    doc.style.backgroundImage = `url(media/bgimg${i}.jpg)`;
    i=(i+1)%3+1;
}
