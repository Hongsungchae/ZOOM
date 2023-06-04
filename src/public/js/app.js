const  messageList = document.querySelector("ul");
const messageFrom = document.querySelector("#message");
const nickForm = document.querySelector("#nick");
const socket  = new WebSocket(`ws://${window.location.host}`);

function MakeMessage(type, payload){
    const msg = {type, payload};
    return JSON.stringify(msg);
}

socket.addEventListener("open",()=>{
    console.log("Conneted to Server");
});

socket.addEventListener("message",(message)=>{
    console.log("New message : ", message.data)
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
});

socket.addEventListener("close", ()=>{
    console.log("Disconneted to Server");
});

function handleSubmit(event){
    event.preventDefault();
    const input = messageFrom.querySelector("input");
    socket.send(MakeMessage("new_message", input.value));
    // const li = document.createElement("li");
    // li.innerText = `You : ${input.value}`;
    // messageList.append(li);
    input.value = "";
}

function handleNickSubmit(evnet){
    evnet.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(MakeMessage("nickname",input.value));
    input.value = "";
}

messageFrom.addEventListener("submit",handleSubmit);
nickForm.addEventListener("submit",handleNickSubmit);