# 🧠 NeuroQA – Story Comprehension Bot

## AI-Powered Contextual Question Answering (Full-Stack)

NeuroQA is a full-stack web application designed to demonstrate contextual question answering (CQA) using a Neural Network. The application allows a user to input a multi-sentence "story" (context) and a "Yes/No" question, and the backend model determines the logical answer based on the provided narrative.


## ✨ Features

* **Premium Frontend:** Features a high-contrast **Dark, Glassy, and Neon-Glow** UI built with React and Tailwind CSS.
* **Dual-Encoder LSTM Model:** Utilizes a Keras/TensorFlow model specifically designed for sequence-to-sequence inference on contextual data.
* **Full-Stack Architecture:** Separated Frontend (React/Vite) and Backend (FastAPI).

## 🏛️ Architecture Overview

The project is split into two main directories:

| Directory | Technology | Role |
| :--- | :--- | :--- |
| `frontend/` | React (Vite) & Tailwind CSS | Handles user input, displays the prediction result, and provides the premium Neon UI. |
| `backend/` | Python (FastAPI) & TensorFlow/Keras | Loads the trained ML model, preprocesses text, and serves predictions via a robust REST API. |



---

## ⚙️ Core ML Component Details

This section details the design and implementation of the machine learning model.

### 🧠 Model Architecture

The chatbot uses a **Dual LSTM Encoder** architecture: one encoder processes the story context, and the other processes the question. The outputs are then merged for a final prediction.

1.  **Embedding Layers:** Converts word indices into dense 128-dimensional vectors.
2.  **Dual LSTM Encoders:**
    * Each input (story and question) passes through stacked LSTMs: `LSTM(128, return_sequences=True)` followed by `LSTM(64)`.
    * This design captures both semantic meaning and the sequential, contextual relationships within the text.
3.  **Output Layer:** A final `Dense(1, activation='sigmoid')` layer outputs the binary prediction (1 for 'yes', 0 for 'no').

### 🛠️ Model Compilation and Training

* **Loss Function:** Binary Crossentropy
* **Optimizer:** Adam
* **Metrics:** Accuracy

---

## 🛠️ Setup and Installation

### Prerequisites

* **Python (3.8+)**
* **Node.js (16+) & npm**

### 1. Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```
3.  **Run the Backend API:**
    ```bash
    python app.py
    ```
    The API should now be running at `http://127.0.0.1:8000`.

### 2. Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```
2.  **Install Node dependencies:**
    ```bash
    npm install
    ```
3.  **Run the Frontend Development Server:**
    ```bash
    npm run dev
    ```
    The web application should open in your browser, typically at `http://localhost:5173`.

## 🚀 How to Use

1.  Ensure both the **Backend API** (port 8000) and the **Frontend App** (e.g., port 5173) are running.
2.  Input a multi-sentence **Story Context** and a **Yes/No Question**.
3.  Click **'Execute Query Protocol'**. The model's prediction and confidence score will update instantly.

---