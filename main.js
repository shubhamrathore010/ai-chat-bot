const inputField = document.getElementById("input-field");
const sendButton = document.getElementById("send-btn");
// const chatContainer = document.getElementsByClassName(".chat-container");


sendButton.addEventListener("click", sendMessage);
inputField.addEventListener("keypress", function (e) {
    if(e.key === "Enter") sendMessage();
});



document.addEventListener("DOMContentLoaded", function () {
    // const sendButton = document.getElementById("send-btn");
    if (!sendButton) {
        console.error("send-btn not found in the DOM!");
        return;
    }
    sendButton.addEventListener("click", function () {
        console.log("Button clicked!");
    });
});



const API_URL = "http://localhost:5000/chat";

async function sendMessage() {
    const userMessage = inputField.value.trim();
    if(!userMessage) return;

    addMessageTochat("You", userMessage);
    inputField.value ="";



    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers : { "Content-Type": "application/json"},
            body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();
    addMessageTochat("Gemini", data.reply);


    
    } catch (error) {
        console.error("Error fectching responce:", error);
        addMessageTochat("Gemini", "Oops! Something went wrong.");
    }
}

function addMessageTochat(sender, message) {
    const chatContainer = document.getElementById("chat-container");
 
    if(!chatContainer) {
        console.error("Chat container not found.");
        return;
        
    }
 
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender === "You" ? "user-message"  : "bot-message");
    messageElement.innerText = `${sender}: ${message}`;


    chatContainer.appendChild(messageElement);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}