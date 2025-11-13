 🤖NeuroQA – Story Comprehension Bot (LSTM-based)

This project implements a **Deep Learning Chatbot** using **LSTM (Long Short-Term Memory)** networks that reads short stories and answers **yes/no questions** based on the story’s context.  
It combines **natural language understanding**, **sequence modeling**, and **contextual reasoning** to mimic reading comprehension.

---

## 📘 Project Overview

### 🎯 Objective
The main goal is to build an intelligent chatbot that:
- Understands short stories written in plain English.
- Answers context-based **yes/no** questions.
- Learns word relationships and reasoning through sequential LSTM modeling.

---

## 🧩 Data Preparation

### 1️⃣ Loading the Data
- The training and test datasets are stored in:
  - `train_qa.csv`
  - `test_qa.csv`
- Each file contains three columns:

### 2️⃣ Cleaning
- Originally, data was stored as Python list strings like `['Mary', 'went', 'to', 'the', 'garden']`.
- These were cleaned into proper sentences.
- Answers were normalized to lowercase (`yes` or `no`).

### 3️⃣ Vocabulary Creation
- Unique words from stories and questions are extracted.
- Special tokens **“yes”** and **“no”** are also added.
- Vocabulary size, max story length, and max question length are calculated.

### 4️⃣ Tokenization and Vectorization
- Using Keras’ `Tokenizer`, sentences are converted to integer sequences.
- Sequences are padded to consistent lengths (`pad_sequences`).
- Answers are encoded as binary:
- `yes → 1`
- `no  → 0`

---

## 🧠 Model Architecture

### 🔹 Overview
The chatbot uses **two LSTM encoders** — one for the story and one for the question — and merges their outputs for prediction.

### Layers

1. **Embedding Layers**
 - Convert word indices into dense 128-dimensional vectors.

2. **Dual LSTM Encoders**
 - Each input (story and question) passes through stacked LSTMs:
   - LSTM(128, return_sequences=True)
   - LSTM(64)
 - Captures semantic and contextual meaning.

3. **Concatenation Layer**
 - Combines encoded story and question representations.

4. **Dense + Dropout Layers**
 - Dense(32, activation='relu')
 - Dropout(0.3) — prevents overfitting.

5. **Output Layer**
 - Dense(1, activation='sigmoid') — outputs binary prediction:
   - `1` → yes
   - `0` → no

---

## ⚙️ Model Compilation and Training

- **Loss Function:** Binary Crossentropy  
- **Optimizer:** Adam  
- **Metrics:** Accuracy  
- **Epochs:** 50  
- **Batch Size:** 32  
- **Validation Split:** 20%  

Example training code:
```python
history = model.fit(
  [Xtrain_story, Xtrain_ques], Ytrain,
  validation_data=([Xval_story, Xval_ques], Yval),
  epochs=50,
  batch_size=32
)
