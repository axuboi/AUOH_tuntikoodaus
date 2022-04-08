let socket = io();

socket.on("server-to-client", (message) => {
    const messages = document.getElementById("messages");
    messages.innerHTML += message + "<br>";
});