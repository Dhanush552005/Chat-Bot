import React, { useState } from 'react';

const API_URL = 'http://127.0.0.1:8000/predict';

function Chatbot() {
    const [story, setStory] = useState('');
    const [question, setQuestion] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        if (!story.trim() || !question.trim()) {
            setError("Please enter both a Story Context and a Question.");
            setLoading(false);
            return;
        }

        const payload = { story, question };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'API request failed.');
            }

            const data = await response.json();
            setResult(data);

        } catch (err) {
            console.error('Fetch error:', err);
            setError(`Prediction failed. Is the backend server running on port 8000? Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const formatConfidence = (confidence) => (confidence * 100).toFixed(2);
    
    let answerText = "Awaiting Answer...";
    let confidenceText = "";
    let confidenceColor = "text-gray-400";
    let answerBoxClass = "border-gray-700 bg-gray-800";

    if (loading) {
        answerText = "Thinking...";
        confidenceColor = "text-cyan-400 animate-pulse";
        answerBoxClass = "border-cyan-600 bg-gray-800";
    } else if (error) {
        answerText = "Error!";
        confidenceColor = "text-red-500";
        answerBoxClass = "border-red-600 bg-gray-800";
    } else if (result) {
        answerText = result.answer;
        const conf = result.answer === 'Yes' ? result.confidence_yes : result.confidence_no;
        confidenceText = `Confidence: ${formatConfidence(conf)}%`;
        confidenceColor = result.answer === 'Yes' ? "text-green-400" : "text-red-400";
        answerBoxClass = result.answer === 'Yes' ? "border-green-600 bg-gray-800" : "border-red-600 bg-gray-800";
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
            <div className="w-full max-w-2xl p-6 sm:p-8 rounded-xl bg-gray-800 border-2 border-cyan-500 shadow-2xl shadow-cyan-900/50 transition duration-300">
                <header className="mb-8 text-center border-b border-gray-700 pb-4">
                    <h1 className="text-3xl font-extrabold text-white flex items-center justify-center space-x-3">
                        <span className="text-pink-400 text-4xl">
                            🤖
                        </span>
                        <span>NeuroQA – Story Answering Bot</span>
                    </h1>
                    <p className="text-gray-400 mt-2 text-md">
                        Enter a short context and a Yes/No question to get a reliable answer.
                    </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="story" className="block text-sm font-semibold text-gray-300 mb-2">
                            Story Context:
                        </label>
                        <textarea
                            id="story"
                            rows="4"
                            value={story}
                            onChange={(e) => setStory(e.target.value)}
                            placeholder="E.g., John is in the kitchen. Mary went to the garden. John picked up the milk."
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 ease-in-out resize-none"
                        />
                    </div>

                    <div>
                        <label htmlFor="question" className="block text-sm font-semibold text-gray-300 mb-2">
                            Question:
                        </label>
                        <input
                            type="text"
                            id="question"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            placeholder="E.g., Is John in the garden?"
                            className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition duration-200 ease-in-out"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 px-4 rounded-lg text-lg font-bold text-black bg-cyan-400 shadow-lg shadow-cyan-800/50 hover:bg-cyan-300 focus:outline-none focus:ring-4 focus:ring-cyan-500 disabled:opacity-50 transition duration-300 ease-in-out"
                    >
                        {loading ? 'Processing...' : 'Get Answer'}
                    </button>
                </form>
                
                {error && (
                    <div className="mt-6 p-3 bg-red-900 border border-red-700 text-red-300 rounded-lg text-center font-medium">
                        {error}
                    </div>
                )}

                <div className={`mt-8 pt-4 border-t-2 ${answerBoxClass} text-center transition-colors duration-500`}>
                    <h2 className="text-xl font-semibold text-gray-200 mb-2">Answer:</h2>
                    <p className={`text-5xl font-extrabold ${confidenceColor} transition-colors duration-200`}>
                        {answerText}
                    </p>
                    <p className="text-base text-gray-500 mt-2">
                        {confidenceText}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Chatbot;