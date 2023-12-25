// script.js

function startChat() {
    // Get selected checkboxes
    const marketingSelected = document.getElementById("marketingCheckbox").checked;
    const financeSelected = document.getElementById("financeCheckbox").checked;
    const basicSelected = document.getElementById("basicCheckbox").checked;
    const complexSelected = document.getElementById("complexCheckbox").checked;

    // Check if Marketing and Basic are selected
    if (marketingSelected && basicSelected) {
        // Make API call to ChatGPT-3.5 (you need to replace 'YOUR_API_KEY' and provide the actual endpoint)
        const apiKey = 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;
        const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

        // Build your prompt based on selected checkboxes
        const prompt = buildPrompt(marketingSelected, financeSelected, basicSelected, complexSelected);

        // Make API call
        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 100
            })
        })
        .then(response => response.json())
        .then(data => {
            // Display the response in the chat container
            const chatContainer = document.getElementById("chatContainer");
            const message = document.createElement("p");
            message.textContent = data.choices[0].text.trim();
            chatContainer.appendChild(message);
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Please select Marketing and Basic to start the chat.");
    }
}

function buildPrompt(marketing, finance, basic, complex) {
    // Customize the prompt based on selected checkboxes
    let prompt = "You are a student studying ";

    if (marketing) {
        prompt += "Marketing ";
    } else if (finance) {
        prompt += "Finance ";
    }

    if (basic) {
        prompt += "and you want to solve a basic expected value problem.";
    } else if (complex) {
        prompt += "and you want to solve a complex expected value problem.";
    }

    return prompt;
}
