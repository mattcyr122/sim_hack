from fastapi import FastAPI, Request
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import pandas as pd

app = FastAPI()

BASE = 'C:\\Users\\zaaoa\\OneDrive\\Documents\\datasets\\'
file_path = BASE + 'Amazon-Products\\Amazon-Products_Embedded.csv'
df = pd.read_csv(file_path, sep=',')
# Rename the first column to "ID"
df.rename(columns={df.columns[0]: "ID"}, inplace=True)
# Convert space-separated embedding strings with brackets to NumPy arrays
df['embedding'] = df['embedding'].apply(
    lambda x: np.array(x.strip().replace('[', '').replace(']', '').split(), dtype=np.float32)
)

# Load model & data ONCE
model = SentenceTransformer('all-MiniLM-L6-v2')

embedding_matrix = np.vstack(df['embedding'].values)

# Pydantic model
class QueryRequest(BaseModel):
    text: str
    top_k: int = 10

@app.post("/search")
def search(query: QueryRequest):
    # Embed input
    input_embedding = model.encode([query.text])

    # Similarity
    similarities = cosine_similarity(input_embedding, embedding_matrix)[0]
    top_indices = np.argsort(similarities)[-query.top_k:][::-1]

    # Select top rows and add similarity
    top_rows = df.iloc[top_indices].copy()
    top_rows["similarity"] = similarities[top_indices]
    top_rows = top_rows.drop(columns=['embedding'])  # Remove the 'embedding' column
    top_rows_json = top_rows.to_json(orient='records')  # Convert to JSON
    print(top_rows_json)
    # Convert top_rows to a list of dictionaries
    #result = top_rows.to_dict(orient="records")

    # Return the result
    return top_rows_json
