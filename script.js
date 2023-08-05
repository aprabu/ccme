const apiKey = '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';

document.addEventListener('DOMContentLoaded', () => {
    const summarizeBtn = document.getElementById('summarizeBtn');
    summarizeBtn.addEventListener('click', crashCourse);
});


async function crashCourse() {
    const topicInput = document.getElementById('topic');
    const levelSelect = document.getElementById('level');
    const summaryContainer = document.getElementById('summaryContainer');
    const summaryElement = document.getElementById('summary');
    const ccHeading = document.getElementById('ccHeading');
    const topic = topicInput.value;
    const selectedLevel = levelSelect.value;
    summaryContainer.classList.remove('hidden');
    ccHeading.textContent=topic+" Crash Course:";
    summaryElement.textContent = "Making your CrashCourse on "+topic+", this may take a minute...";
    const words = 300

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
    };

    const apiUrl = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

    const data = {
        prompt: `Give me a brief (${words} words long) crash course on the topic of ${topic}, assuming that I already have a ${selectedLevel} level understanding of ${topic}`,
        max_tokens: words,
        temperature: 0.3
    };

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })

    const result = response.json();
    console.log(result);
    
    if (!response.ok) {
        throw new Error('Network response was not ok.');
    }

    console.log("result.choices: "+result.choices);
    console.log("result.choices.length: "+result.choices.length);
    if (result.choices && result.choices.length > 0) {
        const cc = result.choices[0].text;
        summaryElement.textContent = cc;
    } else {
        error = new Error('Invalid response format.');
        summaryElement.textContent = 'An error occurred while generating your CrashCourse. Please try again later.\nError: ' + error;
        throw error;
    }
}