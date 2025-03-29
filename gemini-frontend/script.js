const userTextInput = document.getElementById('user-text');
const analyzeButton = document.getElementById('analyze-button');
const responseSection = document.getElementById('response-section');
const analysisResultDisplay = document.getElementById('analysis-result');

analyzeButton.addEventListener('click', async () => {
    const userText = userTextInput.value;

    if (!userText) {
        alert('Please enter your thoughts and feelings.');
        return;
    }

    analyzeButton.textContent = 'Analyzing...';
    analyzeButton.disabled = true;
    responseSection.style.display = 'none';
    analysisResultDisplay.textContent = '';

    try {
        const response = await fetch('http://localhost:3000/api/mental-health-analysis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userText }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Backend Error:', errorData);
            analysisResultDisplay.textContent = `Error: ${errorData.error || 'Something went wrong during analysis.'}`;
            responseSection.style.display = 'block';
            return;
        }

        const data = await response.json();
        analysisResultDisplay.textContent = data.analysis;
        responseSection.style.display = 'block';

    } catch (error) {
        console.error('Frontend Error:', error);
        analysisResultDisplay.textContent = 'Failed to connect to the backend for analysis.';
        responseSection.style.display = 'block';
    } finally {
        analyzeButton.textContent = 'Analyze My Feelings';
        analyzeButton.disabled = false;
    }
});