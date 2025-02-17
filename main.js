document.getElementById("send-btn").addEventListener("click", async () => {
    const inputField = document.getElementById("input-field");
    const userMessage = inputField.value.trim();
    // const chatContainer = document.getElementById("chat-container")

    if(!userMessage) return;

    const chatContainer = document.getElementById("chat-container");
    chatContainer.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;

    try {
        const response = await fetch("http://localhost:5000/chat", {
             method: "POST",
             headers : {
                  "Content-Type": "application/json",
             },
             body: JSON.stringify({ message: userMessage }),
     });
     
     const data = await response.json();
     console.log("Backend Response:",data);
 
 
     // addMessageTochat("Gemini", data.reply);
 
         chatContainer.innerHTML += `<p><strong>Gemini:</strong> ${data.reply}</p>`;
     } catch (error) {
         console.error("Error fcalling API:", error);
         chatContainer.innerHTML += `<p><strong>Gemini:</strong> Oops! Something went wrong. ${error}</p>`;
     }

     inputField.value ="";
 });
 