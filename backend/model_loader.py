import pickle
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
import os

KERAS_MODEL_PATH = 'assets/story_qa_best_lstm_model.keras'
TOKENIZER_PATH = 'assets/story_qa_tokenizer.pickle'
MAX_STORY_LEN = 156
MAX_QUESTION_LEN = 6

loaded_model = None
loaded_tokenizer = None

def load_assets():
    global loaded_model, loaded_tokenizer
    
    with open(TOKENIZER_PATH, 'rb') as handle:
        loaded_tokenizer = pickle.load(handle)
    
    loaded_model = load_model(KERAS_MODEL_PATH)
    
    print("Model and Tokenizer loaded successfully for API use.")

def predict_answer(story: str, question: str) -> dict:
    if loaded_model is None or loaded_tokenizer is None:
        raise RuntimeError("Model assets have not been loaded. Call load_assets() first.")

    story_seq = loaded_tokenizer.texts_to_sequences([story])
    question_seq = loaded_tokenizer.texts_to_sequences([question])

    padded_story = pad_sequences(story_seq, maxlen=MAX_STORY_LEN, padding='post')
    padded_question = pad_sequences(question_seq, maxlen=MAX_QUESTION_LEN, padding='post')

    prediction = loaded_model.predict([padded_story, padded_question], verbose=0)
    probability = prediction[0][0]

    answer = "Yes" if probability > 0.5 else "No"
    
    return {
        "answer": answer,
        "confidence_yes": float(probability),
        "confidence_no": float(1.0 - probability)
    }