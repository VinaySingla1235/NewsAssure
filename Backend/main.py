from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import DistilBertTokenizer, TFDistilBertForSequenceClassification
import tensorflow as tf
import pickle
from fastapi.middleware.cors import CORSMiddleware
# import numpy as np

title_dir='Final_ML_Models/Title/clf'
titleModel = TFDistilBertForSequenceClassification.from_pretrained(title_dir)
title_info_path="Final_ML_Models/Title/clf/info.pkl"
with open(title_info_path, 'rb') as f:
    TITLE_MODEL_NAME, TITLE_MAX_LEN = pickle.load(f)

full_text_dir='Final_ML_Models/Full_Text'
full_text_Model=TFDistilBertForSequenceClassification.from_pretrained(full_text_dir)
full_text_info_path='Final_ML_Models/Full_Text/info.pkl'
with open(full_text_info_path, 'rb') as f:
    TEXT_MODEL_NAME, TEXT_MAX_LEN = pickle.load(f)

def construct_encodings(x, tokenizer, max_len, trucation=True, padding=True):
    return tokenizer(x, max_length=max_len, truncation=trucation, padding=padding)

def construct_tfdataset(encodings, y=None):
    if y:
        return tf.data.Dataset.from_tensor_slices((dict(encodings),y))
    else:
        # this case is used when making predictions on unseen samples after training
        return tf.data.Dataset.from_tensor_slices(dict(encodings))
def create_predictor(model, model_name, max_len):
    tkzr = DistilBertTokenizer.from_pretrained(model_name)
    def predict_proba(text):
        x = [text]
        encodings = construct_encodings(x, tkzr, max_len=max_len)
        tfdataset = construct_tfdataset(encodings)
        tfdataset = tfdataset.batch(1)
        preds = model.predict(tfdataset).logits
        preds = tf.nn.softmax(preds, axis=-1).numpy()
        return preds[0][0]
    return predict_proba

titlePredictor = create_predictor(titleModel, TITLE_MODEL_NAME, TITLE_MAX_LEN)
fullTextPredictor=create_predictor(full_text_Model,TEXT_MODEL_NAME,TEXT_MAX_LEN)
class News(BaseModel):
    title: str
    description: Union[str, None] = None
    
app = FastAPI()
origins = ["http://localhost:5173"]

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predictNews/")
async def create_item(news:News):
    title_prediction=titlePredictor(news.title)
    final_score=title_prediction
    # if news.description is not None:
    #     text_prediction=fullTextPredictor(news.title+news.description)
    #     final_score=0.9*title_prediction+0.1*text_prediction
    final_score=int(final_score*100)
    return {"score":final_score}
