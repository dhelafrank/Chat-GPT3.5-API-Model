var goButton = document.querySelector(".prompt-send-request")

goButton.addEventListener("click", () => {
    go()
})

function go() {
    let promptResponseContainer = document.querySelector(".prompt-output")
    let promptSent = document.querySelector(".prompt-input")

    if (promptSent.value.length < 2) {
        console.log(promptSent.length);
        alert("not a prompt")
        return;
    } else {
        promptResponseContainer.innerHTML = "Processing..."
        sendPrompt(promptSent)
    }
}
async function sendPrompt(promptSent) {
    let promptResponseContainer = document.querySelector(".prompt-output")
    console.log(promptSent.value);

    let myKey = await fetch('/apikey.txt')
    let keyGotten = await myKey.text()

    
    const apiKey = keyGotten;

    const requestData = {
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: `${promptSent.value}`,
            },
        ],
    };

    fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestData),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            // Process the response data
            responseGotten = data.choices[0].message.content
            // console.log(data.choices[0].message.content);
            // var reply = (json.choices[0].text.trim());
             promptResponseContainer.innerHTML = responseGotten
             
        })
        .catch((error) => {
            // Handle any errors that occurred during the request
            console.error("Error:", error);
        });

}
