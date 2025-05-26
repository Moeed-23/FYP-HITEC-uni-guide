# import os
# import json
# import pickle

# import numpy as np
# import faiss
# from fastapi import FastAPI
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

# # Resolve paths relative to this file
# basedir = os.path.dirname(__file__)

# # 1. Load config from JSON
# with open(os.path.join(basedir, "config.json"), "r", encoding="utf-8") as f:
#     cfg = json.load(f)

# # 2. Load FAISS index & metadata
# index_path = os.path.join(basedir, cfg["faiss_index"])
# meta_path  = os.path.join(basedir, cfg["doc_meta"])

# index = faiss.read_index(index_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # 3. Initialize embedder & LLM pipeline
# embedder = SentenceTransformer(cfg["embedder"])

# tokenizer = AutoTokenizer.from_pretrained(cfg["generator_model"])
# model     = AutoModelForCausalLM.from_pretrained(
#     cfg["generator_model"],
#     pad_token_id=tokenizer.eos_token_id
# )
# generator = pipeline(
#     "text-generation",
#     model=model,
#     tokenizer=tokenizer,
#     max_length=512,
#     do_sample=False
# )

# # 4. Create FastAPI app
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# async def ask(q: Query):
#     # Embed the incoming question
#     q_embedding = embedder.encode([q.question])
    
#     # Retrieve top-K most similar document chunks
#     D, I = index.search(np.array(q_embedding, dtype="float32"), cfg["top_k"])
#     contexts = [docs[i]["text"] for i in I[0]]

#     # Build the prompt with retrieved contexts
#     prompt = "You are a helpful university assistant. Use these contexts to answer:\n"
#     for idx, ctx in enumerate(contexts, start=1):
#         prompt += f"[{idx}] {ctx}\n"
#     prompt += f"Question: {q.question}\nAnswer:"

#     # Generate the answer
#     generated = generator(prompt)[0]["generated_text"]
#     answer = generated.split("Answer:")[-1].strip()

#     return {"answer": answer}

# # 5. Optional: run with `python app.py`
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host=cfg.get("host", "0.0.0.0"), port=cfg.get("port", 8000))


#######################


# import os
# import json
# import pickle

# import numpy as np
# import torch
# from fastapi import FastAPI
# from pydantic import BaseModel
# from transformers import AutoTokenizer, AutoModel, AutoModelForCausalLM

# # Resolve paths
# basedir = os.path.dirname(__file__)
# cfg_path = os.path.join(basedir, "config.json")

# # 1) Load config
# with open(cfg_path, "r", encoding="utf-8") as f:
#     cfg = json.load(f)

# # 2) Load embeddings & metadata
# emb_path  = os.path.join(basedir, cfg["embeddings"])
# meta_path = os.path.join(basedir, cfg["doc_meta"])
# embeddings = np.load(emb_path)  # shape (N, D)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)         # list length N

# # 3) Setup device
# device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# # 4) Load embedding model (MiniLM)
# embed_tokenizer = AutoTokenizer.from_pretrained(cfg["embedder"])
# embed_model     = AutoModel.from_pretrained(cfg["embedder"]).to(device)
# embed_model.eval()

# def embed_texts(texts: list[str]) -> np.ndarray:
#     """Compute mean‑pooled embeddings for a list of strings."""
#     all_embeds = []
#     with torch.no_grad():
#         for txt in texts:
#             enc = embed_tokenizer(
#                 txt,
#                 truncation=True, padding="longest",
#                 return_tensors="pt"
#             ).to(device)
#             out = embed_model(**enc).last_hidden_state   # (1, L, D)
#             mask = enc.attention_mask.unsqueeze(-1)      # (1, L, 1)
#             summed = (out * mask).sum(1)                 # (1, D)
#             count = mask.sum(1)                          # (1, 1)
#             emb = (summed / count).cpu().numpy()         # (1, D)
#             all_embeds.append(emb)
#     return np.vstack(all_embeds).astype("float32")       # (len(texts), D)

# # 5) Load generation model
# gen_tokenizer = AutoTokenizer.from_pretrained(cfg["generator_model"])
# gen_model     = AutoModelForCausalLM.from_pretrained(
#     cfg["generator_model"],
#     pad_token_id=gen_tokenizer.eos_token_id
# ).to(device)
# gen_model.eval()

# def generate_answer(prompt: str, max_new_tokens: int=150) -> str:
#     """Generate continuation after the prompt."""
#     enc = gen_tokenizer(prompt, return_tensors="pt").to(device)
#     out = gen_model.generate(
#         **enc,
#         max_new_tokens=max_new_tokens,
#         do_sample=False,
#         pad_token_id=gen_tokenizer.eos_token_id
#     )
#     text = gen_tokenizer.decode(out[0], skip_special_tokens=True)
#     # strip off the prompt
#     return text[len(prompt):].strip()

# # 6) FastAPI app
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# async def ask(q: Query):
#     # a) Retrieve via brute‑force L2
#     q_emb = embed_texts([q.question])         # (1, D)
#     dists = np.linalg.norm(embeddings - q_emb, axis=1)
#     topk = np.argsort(dists)[: cfg["top_k"]]
#     contexts = [docs[i]["text"] for i in topk]

#     # b) Build RAG prompt
#     prompt = "You are a helpful university assistant. Use these contexts:\n"
#     for idx, ctx in enumerate(contexts, start=1):
#         prompt += f"[{idx}] {ctx}\n"
#     prompt += f"Question: {q.question}\nAnswer:"

#     # c) Generate
#     answer = generate_answer(prompt)
#     return {"answer": answer}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host=cfg["host"], port=cfg["port"])


###########################################################################################################

# import os, json, pickle
# import numpy as np, faiss
# from fastapi import FastAPI
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from gpt4all import GPT4All

# # — Load config
# basedir = os.path.dirname(__file__)
# with open(os.path.join(basedir, "config.json"), "r", encoding="utf-8") as f:
#     cfg = json.load(f)

# # — Load FAISS index & metadata
# index = faiss.read_index(cfg["faiss_index"])
# with open(cfg["doc_meta"], "rb") as f:
#     docs = pickle.load(f)

# # — Embedder
# embedder = SentenceTransformer(cfg["embedder"])

# # — GPT4All‑J
# gptj = GPT4All(model_name="gpt4all-j", model_path=cfg["gpt4all_model"])

# # — FastAPI setup
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     # 1) Embed & retrieve
#     q_emb = embedder.encode([q.question], convert_to_numpy=True)
#     faiss.normalize_L2(q_emb)
#     _, I = index.search(q_emb, cfg["top_k"])
#     contexts = [docs[i]["text"] for i in I[0]]

#     # 2) Build prompt
#     prompt = "You are a helpful university assistant. Use these contexts:\n"
#     for i, ctx in enumerate(contexts, 1):
#         prompt += f"[{i}] {ctx}\n"
#     prompt += f"Question: {q.question}\nAnswer:"

#     # 3) Generate
#     resp = gptj.generate(prompt, max_tokens=200)
#     return {"answer": resp}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host=cfg["host"], port=cfg["port"])



############################
### 

# import os
# import json
# import pickle

# from fastapi import FastAPI
# from pydantic import BaseModel
# import faiss
# from sentence_transformers import SentenceTransformer
# from gpt4all import GPT4All

# # — Load config
# basedir = os.path.dirname(__file__)
# with open(os.path.join(basedir, "config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # — Load FAISS index & metadata
# index_path = os.path.abspath(os.path.join(basedir, cfg["faiss_index"]))
# meta_path  = os.path.abspath(os.path.join(basedir, cfg["doc_meta"]))
# index = faiss.read_index(index_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # — Embedder
# embedder = SentenceTransformer(cfg["embedder"])

# # — GPT4All
# model_path = os.path.abspath(os.path.join(basedir, cfg["gpt4all_model"]))
# gptj = GPT4All(
#     model_name="gpt4all-j",
#     model_path=model_path,
#     allow_download=False
# )

# # — FastAPI setup
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     # 1) Embed & retrieve
#     q_emb = embedder.encode([q.question], convert_to_numpy=True)
#     faiss.normalize_L2(q_emb)
#     _, I = index.search(q_emb, cfg["top_k"])
#     contexts = [docs[i]["text"] for i in I[0]]

#     # 2) Build prompt
#     prompt = "You are a helpful university assistant. Use these contexts:\n"
#     for i, ctx in enumerate(contexts, 1):
#         prompt += f"[{i}] {ctx}\n"
#     prompt += f"Question: {q.question}\nAnswer:"

#     # 3) Generate
#     resp = gptj.generate(prompt, max_tokens=cfg.get("max_tokens", 200))
#     return {"answer": resp}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "main:app",
#         host=cfg["host"],
#         port=cfg["port"],
#         reload=True
#     )



########################################


# import os
# from llama_cpp import Llama
# import json
# import pickle
# from fastapi import FastAPI
# from pydantic import BaseModel
# import faiss
# from sentence_transformers import SentenceTransformer


# # — Load config
# basedir = os.path.dirname(__file__)
# with open(os.path.join(basedir, "config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # — Load FAISS index & metadata
# index_path = os.path.abspath(os.path.join(basedir, cfg["faiss_index"]))
# meta_path  = os.path.abspath(os.path.join(basedir, cfg["doc_meta"]))
# index = faiss.read_index(index_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # — Embedder
# model_path = os.path.abspath(os.path.join(basedir, cfg["gpt4all_model"]))

# # instantiate the llama‑cpp‑python Llama wrapper
# llm = Llama(
#     model_path=model_path,
#     n_ctx=512,      # or whatever context size you need
#     n_threads=4     # tune to your CPU
# )

# # — FastAPI setup
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     # 1) Embed & retrieve
#     q_emb = embedder.encode([q.question], convert_to_numpy=True)
#     faiss.normalize_L2(q_emb)
#     _, I = index.search(q_emb, cfg["top_k"])
#     contexts = [docs[i]["text"] for i in I[0]]

#     # 2) Build prompt
#     prompt = "You are a helpful university assistant. Use these contexts:\n"
#     for i, ctx in enumerate(contexts, 1):
#         prompt += f"[{i}] {ctx}\n"
#     prompt += f"Question: {q.question}\nAnswer:"

#     # 3) Generate
#     resp = llm(
#     prompt=prompt,
#     max_tokens=cfg.get("max_tokens", 200)
#     ).choices[0].text
#     return {"answer": resp}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         app,
#         host=cfg["host"],
#         port=cfg["port"],
#         reload=True
#     )



####################

# import os
# import json
# import pickle

# from fastapi import FastAPI
# from pydantic import BaseModel
# import faiss
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama

# # 1) Load config
# basedir = os.path.dirname(__file__)
# with open(os.path.join(basedir, "config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # 2) Load FAISS index & metadata
# index = faiss.read_index(os.path.join(basedir, cfg["faiss_index"]))
# with open(os.path.join(basedir, cfg["doc_meta"]), "rb") as f:
#     docs = pickle.load(f)

# # 3) Embedder
# embedder = SentenceTransformer(cfg["embedder"])

# # 4) Download (or fetch from cache) the GGUF model from Hugging Face
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(basedir, "models"),
#     resume_download=True
# )

# # 5) Instantiate llama.cpp model
# llm = Llama(
#     model_path=model_path,
#     n_ctx=512,      # tune as needed
#     n_threads=4     # tune to your machine
# )

# # 6) FastAPI setup
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     # 1) Embed & retrieve
#     q_emb = embedder.encode([q.question], convert_to_numpy=True)
#     faiss.normalize_L2(q_emb)
#     _, I = index.search(q_emb, cfg["top_k"])
#     contexts = [docs[i]["text"] for i in I[0]]

#     # 2) Build prompt
#     prompt = "You are a helpful university assistant. Use these contexts:\n"
#     for i, ctx in enumerate(contexts, 1):
#         prompt += f"[{i}] {ctx}\n"
#     prompt += f"Question: {q.question}\nAnswer:"

#     # 3) Generate with llama.cpp
#     generation = llm(
#         prompt=prompt,
#         max_tokens=cfg["max_tokens"],
#         stop=["\n"]
#     )
#     answer = generation.choices[0].text.strip()
#     return {"answer": answer}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host=cfg["host"], port=cfg["port"], reload=True)



##################################################################################
######################### version without MONGODB ################################
##################################################################################


# import os
# import json
# import pickle
# from fastapi import FastAPI
# from pydantic import BaseModel
# import faiss
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama


# # Load config
# basedir = os.path.dirname(__file__)
# with open(os.path.join(basedir, "../../BOT/app/config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # Load FAISS index & document metadata
# index = faiss.read_index(os.path.join(basedir, "../" + cfg["faiss_index"]))
# with open(os.path.join(basedir, "../" + cfg["doc_meta"]), "rb") as f:
#     docs = pickle.load(f)

# # Sentence Transformer Embedder
# embedder = SentenceTransformer(cfg["embedder"])

# # Download GGUF model if not already cached
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(basedir, "../models"),
# )

# # Load the GGUF model
# llm = Llama(model_path=model_path, n_ctx=512, n_threads=4)

# # FastAPI app
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     q_emb = embedder.encode([q.question], convert_to_numpy=True)
#     faiss.normalize_L2(q_emb)
#     _, I = index.search(q_emb, cfg["top_k"])
#     contexts = [docs[i]["text"] for i in I[0]]

#     prompt = "You are a helpful university assistant. Use these contexts:\n"
#     for i, ctx in enumerate(contexts, 1):
#         prompt += f"[{i}] {ctx}\n"
#     prompt += f"Question: {q.question}\nAnswer:"

#     result = llm(prompt=prompt, max_tokens=cfg["max_tokens"])
#     return {"answer": result["choices"][0]["text"].strip()}


##################################################################################
######################### version without MONGODB ################################
##################################################################################

# import os
# import json
# import pickle

# from fastapi import FastAPI
# from pydantic import BaseModel
# import faiss
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama

# # ─── Load config ───────────────────────────────────────────────────────────────
# basedir = os.path.dirname(__file__)
# with open(os.path.join(basedir, "../../BOT/app/config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # ─── Initialize FAISS index & docs metadata ────────────────────────────────────
# index = faiss.read_index(os.path.join(basedir, "../" + cfg["faiss_index"]))
# with open(os.path.join(basedir, "../" + cfg["doc_meta"]), "rb") as f:
#     docs = pickle.load(f)

# # ─── Sentence‑Transformer embedder ─────────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# # ─── Download & load GGUF model ────────────────────────────────────────────────
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(basedir, "../models"),
# )
# llm = Llama(model_path=model_path, n_ctx=512, n_threads=4)

# # ─── FastAPI setup ─────────────────────────────────────────────────────────────
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# class Answer(BaseModel):
#     answer: str

# @app.post("/ask", response_model=Answer)
# def ask(q: Query):
#     # 1) Embed & retrieve top‑k contexts
#     q_emb = embedder.encode([q.question], convert_to_numpy=True)
#     faiss.normalize_L2(q_emb)
#     _, I = index.search(q_emb, cfg["top_k"])
#     contexts = [docs[i]["text"] for i in I[0]]

#     # 2) Build a no‑nonsense JSON‑only prompt
#     prompt = (
#         "You are a university assistant. When you answer, you MUST return exactly\n"
#         "one JSON object with a single key, \"answer\", and no additional text or fields.\n"
#         "Do not include any other questions or headings—only this JSON.\n\n"
#         "Use these contexts:\n"
#     )
#     for i, ctx in enumerate(contexts, 1):
#         prompt += f"[{i}] {ctx}\n"
#     prompt += f"\nQuestion: {q.question}\nAnswer:"

#     # 3) Call LLM deterministically, stopping after the closing brace
#     result = llm(
#         prompt=prompt,
#         max_tokens=cfg["max_tokens"],
#         temperature=0.0,
#         stop=["}"]
#     )
#     raw = result["choices"][0]["text"].strip()

#     # 4) Ensure we have a closing '}', then parse or fallback
#     if raw and not raw.endswith("}"):
#         raw += "}"
#     try:
#         data = json.loads(raw)
#         # Only return the 'answer' field
#         return {"answer": data.get("answer", raw)}
#     except json.JSONDecodeError:
#         # If JSON parsing fails, wrap the raw text
#         return {"answer": raw}




##################################################################################
######################### version with MONGODB ################################
##################################################################################


# import os
# import json
# import pickle
# from fastapi import FastAPI
# from pydantic import BaseModel
# import faiss
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime

# # Load config
# basedir = os.path.dirname(__file__)
# with open(os.path.join(basedir, "../../BOT/app/config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # Load FAISS index & document metadata
# index = faiss.read_index(os.path.join(basedir, "../" + cfg["faiss_index"]))
# with open(os.path.join(basedir, "../" + cfg["doc_meta"]), "rb") as f:
#     docs = pickle.load(f)

# # Sentence Transformer Embedder
# embedder = SentenceTransformer(cfg["embedder"])

# # Download GGUF model if not already cached
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(basedir, "../models"),
# )

# # Load the GGUF model
# llm = Llama(model_path=model_path, n_ctx=512, n_threads=4)

# # Connect to MongoDB (adjust URI as needed)
# client = MongoClient("mongodb://localhost:27017/")
# db = client["chatbot_db"]
# chat_collection = db["chat_history"]

# # FastAPI app
# app = FastAPI()

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     # 1. Embed and search
#     q_emb = embedder.encode([q.question], convert_to_numpy=True)
#     faiss.normalize_L2(q_emb)
#     _, I = index.search(q_emb, cfg["top_k"])

#     # 2. Collect and format context
#     prompt = "You are a helpful university assistant. Use these contexts:\n"
#     for i, idx in enumerate(I[0], 1):
#         ctx = docs[idx]["text"]
#         try:
#             ctx_json = json.loads(ctx)
#             if "code" in ctx_json and "title" in ctx_json:
#                 formatted = f'{ctx_json["code"]} - {ctx_json["title"]}'
#             else:
#                 formatted = ctx
#         except Exception:
#             formatted = ctx
#         prompt += f"[{i}] {formatted}\n"

#     prompt += f"Question: {q.question}\nAnswer:"

#     # 3. LLM response
#     result = llm(prompt=prompt, max_tokens=cfg["max_tokens"])
#     answer = result["choices"][0]["text"].strip()

#     # 4. Save to MongoDB
#     chat_collection.insert_one({
#         "question": q.question,
#         "answer": answer,
#         "timestamp": datetime.utcnow()
#     })

#     return {"answer": answer}
    
    # MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
    # client = MongoClient(MONGO_URI)
    # db = client["chatbot_db"]
    # chat_collection = db["chat_history"]



###################################################################################


# #!/usr/bin/env python3
# import os
# import json
# import pickle
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import faiss
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime

# # ── Load config ────────────────────────────────────────────────
# basedir = os.path.dirname(__file__)
# cfg_path = os.path.normpath(os.path.join(basedir, "../../BOT/app/config.json"))
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Load FAISS index & metadata ─────────────────────────────────
# index_path = os.path.normpath(os.path.join(basedir, "..", cfg["faiss_index"]))
# meta_path  = os.path.normpath(os.path.join(basedir, "..", cfg["doc_meta"]))

# if not os.path.exists(index_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError("Index or metadata not found; run build_index.py first")

# index = faiss.read_index(index_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Sentence‑Transformer embedder ───────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# # ── Download & load GGUF model ──────────────────────────────────
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.normpath(os.path.join(basedir, "../models")),
# )
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 512),
#     n_threads=4
# )

# # ── MongoDB setup ───────────────────────────────────────────────
# client = MongoClient("mongodb://localhost:27017/")
# db = client["chatbot_db"]
# chat_collection = db["chat_history"]

# # ── FastAPI app ────────────────────────────────────────────────
# app = FastAPI(title="University‑QA Service")

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     # 1) Embed & search
#     q_emb = embedder.encode(
#         [q.question],
#         convert_to_numpy=True,
#         normalize_embeddings=True
#     )  # shape (1, dim)
#     D, I = index.search(q_emb, k=cfg["top_k"])
#     if I.shape[1] == 0:
#         raise HTTPException(404, f"No documents found for: {q.question}")

#     # 2) Build a single‑turn prompt
#     instruction = (
#         "You are a helpful university assistant. "
#         "Answer *only* the following question using the provided contexts. "
#         "Do not generate any extra questions or examples.\n\n"
#     )
#     context = ""
#     for i, idx in enumerate(I[0], 1):
#         raw = docs[idx]["text"]
#         # optional: if chunk is JSON, format code/title
#         try:
#             js = json.loads(raw)
#             if isinstance(js, dict) and "code" in js and "title" in js:
#                 chunk = f'{js["code"]} ‑ {js["title"]}'
#             else:
#                 chunk = raw
#         except Exception:
#             chunk = raw
#         context += f"[{i}] {chunk}\n"

#     prompt = (
#         instruction
#         + "Contexts:\n"
#         + context
#         + f"\nQuestion: {q.question}\nAnswer:"
#     )

#     # 3) Generate with stop sequences
#     resp = llm(
#         prompt=prompt,
#         max_tokens=cfg["max_tokens"],
#         stop=["\nQuestion:", "\nQ:"]
#     )
#     answer = resp["choices"][0]["text"].strip()

#     # 4) Persist chat
#     chat_collection.insert_one({
#         "question": q.question,
#         "answer":   answer,
#         "timestamp": datetime.utcnow()
#     })

#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}





#################################


# #!/usr/bin/env python3
# import os
# import json
# import pickle
# import faiss
# import re
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime

# # ── Load config ────────────────────────────────────────────────
# here     = os.path.dirname(__file__)
# cfg_path = os.path.normpath(os.path.join(here, "../../BOT/app/config.json"))
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Load FAISS index & metadata ─────────────────────────────────
# idx_path = os.path.normpath(os.path.join(here, "..", cfg["faiss_index"]))
# meta_path= os.path.normpath(os.path.join(here, "..", cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError("Index or metadata not found; run build_index.py first")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & Llama ───────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.normpath(os.path.join(here, "../models"))
# )
# llm = Llama(model_path=model_path, n_ctx=cfg.get("n_ctx",512), n_threads=4)

# # ── MongoDB chat history ────────────────────────────────────────
# client  = MongoClient("mongodb://localhost:27017/")
# history = client["chatbot_db"]["chat_history"]

# # ── FastAPI app ─────────────────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     question = q.question.strip()
#     q_low    = question.lower()

#     #
#     # 1) Program + Semester direct match (via keyword patterns)
#     #
#     prog_patterns = {
#         "bsbe":   ["biomedical"],
#         "bscs":   ["computer science"],
#         "bsit":   ["internet of things", "iot"],
#         "bsse":   ["software engineering", "software"],
#         "bsra":   ["robotics"],
#         "bsis":   ["islamic studies"],
#         "bsmath": ["mathematics"],
#         "bba":    ["bba"]
#     }
#     found_acr = next((ac for ac in prog_patterns if ac in q_low), None)
#     sem_m     = re.search(r"(\d+)(?:st|nd|rd|th)\s+semester", q_low)
#     sem_key   = f"semester_{sem_m.group(1)}" if sem_m else None

#     if found_acr and sem_key:
#         patterns = prog_patterns[found_acr]
#         matches = []
#         for d in docs:
#             src = d.get("meta", {}).get("source", "").lower()
#             if sem_key in src and any(pat in src for pat in patterns):
#                 matches.append(d["text"])

#         if matches:
#             # parse first match into a list of courses
#             body    = matches[0].split(":", 1)[-1]
#             courses = [c.strip() for c in body.split(";") if c.strip()]
#             formatted = "\n".join(f"- {c}" for c in courses)
#             answer = (
#                 f"The courses in {found_acr.upper()} {sem_m.group(1)}"
#                 f"{sem_m.group(0)[len(sem_m.group(1)):]} semester are:\n"
#                 + formatted
#             )
#             history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#             return {"answer": answer}

#     #
#     # 2) Section direct match
#     #
#     section_map = {
#         "transport":             "facilities/transport",
#         "financial matters":     "financial_matters",
#         "library":               "hitec_libaray_and__information_tech/library",
#         "information technology":"hitec_libaray_and__information_tech/informationtechnologyservices",
#         "academic regulations":  "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/academicregulations",
#         "admissions":            "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/admissions",
#         "facilities":            "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/facilities",
#         "office of the manager": "office_of_the_manager_administration/officeofmanageradministration",
#         "student affairs":       "student_affairs/studentaffairs",
#     }
#     for kw, path in section_map.items():
#         if kw in q_low:
#             chunks = []
#             for d in docs:
#                 src = d.get("meta", {}).get("source", "").lower()
#                 if path in src:
#                     chunks.append(d["text"])
#             if chunks:
#                 answer = "\n\n".join(chunks)
#                 history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                 return {"answer": answer}

#     #
#     # 3) Fallback: FAISS + Llama
#     #
#     q_emb = embedder.encode(
#         [question], convert_to_numpy=True, normalize_embeddings=True
#     )
#     D, I = index.search(q_emb, k=cfg["top_k"])
#     if I.shape[1] == 0:
#         raise HTTPException(404, "No documents found")

#     context = "\n\n".join(docs[i]["text"] for i in I[0])
#     prompt  = (
#         "You are a helpful university assistant. Answer *only* the question below "
#         "using the context. Do not add extra examples.\n\n"
#         f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"
#     )

#     resp = llm(prompt=prompt, max_tokens=cfg["max_tokens"], stop=["\n\n"])
#     answer = resp["choices"][0]["text"].strip()

#     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}



####################################################################################################
########################tuesday 22/4/2025######################################



# import os
# import json
# import pickle
# import faiss
# import re
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime

# # ── Load config ────────────────────────────────────────────────
# here     = os.path.dirname(__file__)
# cfg_path = os.path.normpath(os.path.join(here, "../../BOT/app/config.json"))
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Load FAISS index & metadata ─────────────────────────────────
# idx_path  = os.path.normpath(os.path.join(here, "..", cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(here, "..", cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError("Index or metadata not found; run build_index.py first")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & Llama ───────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.normpath(os.path.join(here, "../models"))
# )
# llm = Llama(model_path=model_path, n_ctx=cfg.get("n_ctx",2048), n_threads=4)

# # ── MongoDB chat history ────────────────────────────────────────
# client  = MongoClient("mongodb://localhost:27017/")
# history = client["chatbot_db"]["chat_history"]

# # ── FastAPI app ─────────────────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     question = q.question.strip()
#     q_low    = question.lower()

#     # ── 0) Direct “how to apply” match ────────────────────────────
#     if "how to apply" in q_low or q_low.strip() == "apply":
#         apply_link = None
#         contact    = None
#         for d in docs:
#             src  = d.get("meta", {}).get("source", "").lower()
#             text = d.get("text", "")
#             if src.endswith("admission_ad/apply_online"):
#                 apply_link = text.replace("Apply online at ", "").strip()
#             if src.endswith("admission_ad/contact_details"):
#                 contact = text.replace("Contact: ", "").strip()

#         steps = []
#         if apply_link:
#             steps.append(f"1. Go to the online application portal:\n   {apply_link}")
#         if contact:
#             steps.append(f"2. For any questions, contact:\n   {contact}")

#         answer = "To apply for admission, follow these steps:\n\n" + "\n\n".join(steps)
#         history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#         return {"answer": answer}

#     # ── 1) Admissions‑specific info ────────────────────────────────
#     admission_map = {
#         "eligibility":                            "eligibility_criteria",
#         "requirements":                           "eligibility_criteria",
#         "programs":                               "admission_ad/programs",
#         "scholarship":                            "admission_ad/financial_assistance_and_scholarships",
#         "scholarships":                           "admission_ad/financial_assistance_and_scholarships",
#         "financial assistance":                   "admission_ad/financial_assistance_and_scholarships",
#         "online admission test":                  "admission_ad/online_test_note",
#         "accreditation":                          "admission_ad/accreditation_and_recognition",
#         "apply online":                           "admission_ad/apply_online",
#         "contact":                                "admission_ad/contact_details",
#         "admissions policy":                      "registrar_office/admissions_policy",
#         "registrar office":                       "registrar_office/description",
#     }
#     for kw, path in admission_map.items():
#         if kw in q_low:
#             chunks = [
#                 d["text"] for d in docs
#                 if path in d.get("meta", {}).get("source", "").lower()
#             ]
#             if chunks:
#                 answer = "\n\n".join(chunks)
#                 history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                 return {"answer": answer}

#     # ── 2) Program + Semester direct match (list courses) ────────
#     prog_patterns = {
#         "bsbe":   ["biomedical"],
#         "bscs":   ["computer science"],
#         "bsit":   ["internet of things", "iot"],
#         "bsse":   ["software engineering", "software"],
#         "bsra":   ["robotics"],
#         "bsis":   ["islamic studies"],
#         "bsmath": ["mathematics"],
#         "bba":    ["bba"]
#     }
#     found_acr = next((ac for ac in prog_patterns if ac in q_low), None)
#     sem_m     = re.search(r"(\d+)(?:st|nd|rd|th)\s+semester", q_low)
#     sem_key   = f"semester_{sem_m.group(1)}" if sem_m else None

#     if found_acr and sem_key:
#         patterns = prog_patterns[found_acr]
#         matches = []
#         for d in docs:
#             src = d.get("meta", {}).get("source", "").lower()
#             if sem_key in src and any(pat in src for pat in patterns):
#                 matches.append(d["text"])

#         if matches:
#             body    = matches[0].split(":", 1)[-1]
#             courses = [c.strip() for c in body.split(";") if c.strip()]
#             formatted = "\n".join(f"- {c}" for c in courses)
#             answer = (
#                 f"The courses in {found_acr.upper()} {sem_m.group(1)}"
#                 f"{sem_m.group(0)[len(sem_m.group(1)):]} semester are:\n"
#                 + formatted
#             )
#             history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#             return {"answer": answer}

#     # ── 3) Section direct match (facilities, transport, library, IT, regs, etc.) ────
#     section_map = {
#         "transport":             "facilities/transport",
#         "financial matters":     "financial_matters",
#         "library":               "hitec_libaray_and__information_tech/library",
#         "information technology":"hitec_libaray_and__information_tech/informationtechnologyservices",
#         "academic regulations":  "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/academicregulations",
#         "admissions":            "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/admissions",
#         "facilities":            "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/facilities",
#         "office of the manager": "office_of_the_manager_administration/officeofmanageradministration",
#         "student affairs":       "student_affairs/studentaffairs",
#     }
#     for kw, path in section_map.items():
#         if kw in q_low:
#             chunks = [
#                 d["text"] for d in docs
#                 if path in d.get("meta", {}).get("source", "").lower()
#             ]
#             if chunks:
#                 answer = "\n\n".join(chunks)
#                 history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                 return {"answer": answer}

#     # ── 4) Fallback: FAISS + Llama ────────────────────────────────
#     q_emb = embedder.encode(
#         [question], convert_to_numpy=True, normalize_embeddings=True
#     )
#     D, I = index.search(q_emb, k=cfg["top_k"])
#     if I.shape[1] == 0:
#         raise HTTPException(404, "No documents found")

#     context = "\n\n".join(docs[i]["text"] for i in I[0])
#     prompt  = (
#         "You are a helpful university assistant. Answer *only* the question below "
#         "using the context. Do not add extra examples.\n\n"
#         f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"
#     )

#     resp = llm(prompt=prompt, max_tokens=cfg["max_tokens"], stop=["\n\n"])
#     answer = resp["choices"][0]["text"].strip()

#     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#     return {"answer": answer}


# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}




####################################################################################################
################################# 23/4/2025 ########################################################




# import os
# import json
# import pickle
# import faiss
# import re
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime

# # ── Load config ────────────────────────────────────────────────
# here     = os.path.dirname(__file__)
# cfg_path = os.path.normpath(os.path.join(here, "../../BOT/app/config.json"))
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Load FAISS index & metadata ─────────────────────────────────
# idx_path  = os.path.normpath(os.path.join(here, "..", cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(here, "..", cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError("Index or metadata not found; run build_index.py first")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Load raw JSON for structured lookups ────────────────────────
# data_dir = os.path.normpath(os.path.join(here, "../data"))
# program_json = {}
# for fname in os.listdir(data_dir):
#     if fname.lower().endswith(".json"):
#         key = fname[:-5].lower()  # strip “.json”
#         with open(os.path.join(data_dir, fname), encoding="utf-8") as jf:
#             program_json[key] = json.load(jf)

# # ── Embedder & Llama ───────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])
# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.normpath(os.path.join(here, "../models"))
# )
# llm = Llama(model_path=model_path, n_ctx=cfg.get("n_ctx",2048), n_threads=4)

# # ── MongoDB chat history ────────────────────────────────────────
# client  = MongoClient("mongodb://localhost:27017/")
# history = client["chatbot_db"]["chat_history"]

# # ── FastAPI app ─────────────────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     question = q.question.strip()
#     q_low    = question.lower()

#     # ── 0) Direct “how to apply” match ────────────────────────────
#     if "how to apply" in q_low or q_low.strip() == "apply":
#         apply_link = contact = None
#         for d in docs:
#             src  = d.get("meta", {}).get("source", "").lower()
#             text = d.get("text", "")
#             if "admission_ad/apply_online" in src:
#                 apply_link = text.replace("Apply online at ", "").strip()
#             if "admission_ad/contact_details" in src:
#                 contact = text.replace("Contact: ", "").strip()
#         steps = []
#         if apply_link:
#             steps.append(f"1. Go to the online application portal:\n   {apply_link}")
#         if contact:
#             steps.append(f"2. For any questions, contact:\n   {contact}")
#         answer = "To apply for admission, follow these steps:\n\n" + "\n\n".join(steps)
#         history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#         return {"answer": answer}

#     # ── 1) Admissions‑specific info ────────────────────────────────
#     admission_map = {
#         "eligibility": "eligibility_criteria",
#         "requirements": "eligibility_criteria",
#         "programs": "admission_ad/programs",
#         "scholarship": "admission_ad/financial_assistance_and_scholarships",
#         "scholarships": "admission_ad/financial_assistance_and_scholarships",
#         "online admission test": "admission_ad/online_test_note",
#         "accreditation": "admission_ad/accreditation_and_recognition",
#         "apply online": "admission_ad/apply_online",
#         "contact": "admission_ad/contact_details",
#         "admissions policy": "registrar_office/admissions_policy",
#         "registrar office": "registrar_office/description",
#     }
#     for kw, path in admission_map.items():
#         if kw in q_low:
#             chunks = [
#                 d["text"] for d in docs
#                 if path in d.get("meta", {}).get("source", "").lower()
#             ]
#             if chunks:
#                 answer = "\n\n".join(chunks)
#                 history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                 return {"answer": answer}

#     # ── 2) Structured program/semester/elective queries ────────────
#     prog_key = None
#     for key in program_json:
#         # match things like "bs_software engineering" → "bs_software engineering.json"
#         if key.replace("_", "") in q_low.replace(" ", ""):
#             prog_key = key
#             break

#     sem_m = re.search(r"(\d+)(?:st|nd|rd|th)\s+semester", q_low)
#     sem_num = int(sem_m.group(1)) if sem_m else None

#     if prog_key:
#         data = program_json[prog_key]

#         # 2.1) Program overview/description
#         if "overview" in q_low or "description" in q_low:
#             overview = data.get("department", {}).get("overview") \
#                        or data.get("programs", {}).get(data.get("department",""),{}).get("description")
#             if overview:
#                 history.insert_one({"q": question, "a": overview, "ts": datetime.utcnow()})
#                 return {"answer": overview}

#         # 2.2) Faculty list
#         if "faculty" in q_low:
#             fac = data.get("faculty", [])
#             lines = [f"- **{f['name']}** ({f['designation']}): {f.get('qualification','')}" for f in fac]
#             answer = f"**Faculty for {prog_key.upper()}:**\n" + "\n".join(lines)
#             history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#             return {"answer": answer}

#         # 2.3) Total credit hours for a semester
#         if sem_num and "credit hour" in q_low:
#             for d in docs:
#                 src = d["meta"]["source"].lower()
#                 if f"programs/{prog_key}/sem{sem_num}/totalcredithours" in src:
#                     answer = d["text"]
#                     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                     return {"answer": answer}

#         # 2.4) Semester course listing
#         if sem_num and "course" in q_low and "elective" not in q_low and "supporting" not in q_low:
#             for d in docs:
#                 src = d["meta"]["source"].lower()
#                 if f"programs/{prog_key}/sem{sem_num}/courses" in src:
#                     raw = d["text"].split(":", 1)[-1].strip()
#                     answer = f"Courses in semester {sem_num}: {raw}"
#                     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                     return {"answer": answer}

#         # 2.5) Electives or supporting courses
#         if "elective" in q_low or "supporting" in q_low:
#             keyword = "electivecourses" if "elective" in q_low else "supportingcourses"
#             for d in docs:
#                 src = d["meta"]["source"].lower()
#                 if f"programs/{keyword}" in src:
#                     answer = d["text"]
#                     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                     return {"answer": answer}

#     # ── 3) Section direct match (facilities, transport, library, etc.) ─
#     section_map = {
#         "transport":             "facilities/transport",
#         "financial matters":     "financial_matters",
#         "library":               "hitec_libaray_and__information_tech/library",
#         "information technology":"hitec_libaray_and__information_tech/informationtechnologyservices",
#         "academic regulations":  "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/academicregulations",
#         "admissions":            "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/admissions",
#         "facilities":            "hitec_university_combined_data_admissions,_facilities_and_acedimic_regulations/facilities",
#         "office of the manager": "office_of_the_manager_administration/officeofmanageradministration",
#         "student affairs":       "student_affairs/studentaffairs",
#     }
#     for kw, path in section_map.items():
#         if kw in q_low:
#             chunks = [
#                 d["text"] for d in docs
#                 if path in d.get("meta", {}).get("source", "").lower()
#             ]
#             if chunks:
#                 answer = "\n\n".join(chunks)
#                 history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#                 return {"answer": answer}

#     # ── 4) Fallback: FAISS + Llama ────────────────────────────────
#     q_emb = embedder.encode(
#         [question], convert_to_numpy=True, normalize_embeddings=True
#     )
#     D, I = index.search(q_emb, k=cfg["top_k"])
#     if I.shape[1] == 0:
#         raise HTTPException(404, "No documents found")

#     context = "\n\n".join(docs[i]["text"] for i in I[0])
#     prompt  = (
#         "You are a helpful university assistant. Answer *only* the question below "
#         "using the context. Do not add extra examples.\n\n"
#         f"Context:\n{context}\n\nQuestion: {question}\nAnswer:"
#     )

#     resp = llm(prompt=prompt, max_tokens=cfg["max_tokens"], stop=["\n\n"])
#     answer = resp["choices"][0]["text"].strip()

#     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#     return {"answer": answer}


# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}


##################################################################################
########################## last ###########################

# import os
# import json
# import pickle
# import faiss
# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime

# # ── Paths & Config ─────────────────────────────────────────────
# here      = os.path.dirname(__file__)              # BOT/app
# root      = os.path.dirname(here)                  # BOT
# cfg_path  = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Locate FAISS index & metadata ──────────────────────────────
# idx_path  = os.path.normpath(os.path.join(root, cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(root, cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(
#         f"Could not find FAISS files:\n  {idx_path}\n  {meta_path}\n"
#         "Run your build_index.py to regenerate them."
#     )

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM setup ───────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(root, cfg.get("model_cache_dir", "models"))
# )
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── MongoDB for logging ────────────────────────────────────────
# mongo_url = cfg.get("mongo_url", "mongodb://localhost:27017/")
# client    = MongoClient(mongo_url)
# history   = client["chatbot_db"]["chat_history"]

# # ── FastAPI app ────────────────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# def ask(q: Query):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(400, "Question cannot be empty")

#     # 1) Embed
#     q_emb = embedder.encode(
#         [question],
#         convert_to_numpy=True,
#         normalize_embeddings=True
#     )

#     # 2) Retrieve top_k
#     top_k = cfg.get("top_k", 5)
#     D, I = index.search(q_emb, k=top_k)
#     if I.shape[1] == 0:
#         raise HTTPException(404, "No relevant information found.")

#     # 3) Build context
#     context = "\n\n".join(docs[i]["text"] for i in I[0])

#     # 4) Generate answer
#     prompt = (
#         "You are a factual HITEC University assistant. Answer the question below "
#         "*using only* the provided context related to HITEC University Taxila\n\n"
#         f"Context:\n{context}\n\n"
#         f"Question: {question}\n\nAnswer:"
#     )
#     resp = llm(
#         prompt=prompt,
#         max_tokens=cfg.get("max_tokens", 512),
#         stop=["\n\n"]
#     )
#     answer = resp["choices"][0]["text"].strip()

#     # 5) Log & return
#     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# # ── Self‑host via Uvicorn when run directly ────────────────────
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         app,
#         host=cfg.get("host", "127.0.0.1"),
#         port=cfg.get("port", 8000),
#         reload=True
#     )


#####################################
#############
#####


# import os
# import json
# import pickle
# import faiss
# import logging

# from fastapi import FastAPI, HTTPException, Request
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool

# # ── Paths & Config ─────────────────────────────────────────────
# here      = os.path.dirname(__file__)              # BOT/app
# root      = os.path.dirname(here)                  # BOT
# cfg_path  = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Locate FAISS index & metadata ──────────────────────────────
# idx_path  = os.path.normpath(os.path.join(root, cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(root, cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(
#         f"Could not find FAISS files:\n  {idx_path}\n  {meta_path}\n"
#         "Run your build_index.py to regenerate them."
#     )

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM setup ───────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(root, cfg.get("model_cache_dir", "models"))
# )
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── MongoDB for logging ────────────────────────────────────────
# mongo_url = cfg.get("mongo_url", "mongodb://localhost:27017/")
# client    = MongoClient(mongo_url)
# history   = client["chatbot_db"]["chat_history"]

# # ── FastAPI app & logger ───────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")
# logger = logging.getLogger("uvicorn.error")

# class Query(BaseModel):
#     question: str

# # ── Helper: wrap Mistral-Instruct prompt ────────────────────────
# def build_prompt(context: str, question: str) -> str:
#     return (
#         "<s>[INST] <<SYS>>\n"
#         "You are a factual HITEC University assistant.\n"
#         "Answer directly and without any introductory phrase.\n"
#         "<</SYS>>\n\n"
#         f"{context}\n\n"
#         f"{question} [/INST]"
#     )

# @app.post("/ask")
# async def ask(q: Query, request: Request):
#     try:
#         question = q.question.strip()
#         if not question:
#             raise HTTPException(400, "Question cannot be empty")

#         # 1) Embed off-loaded to threadpool
#         q_emb = await run_in_threadpool(
#             lambda: embedder.encode(
#                 [question],
#                 convert_to_numpy=True,
#                 normalize_embeddings=True
#             )
#         )

#         # 2) Retrieve top_k
#         top_k = cfg.get("top_k", 5)
#         D, I = index.search(q_emb, k=top_k)
#         if I.shape[1] == 0:
#             raise HTTPException(404, "No relevant information found.")

#         # 3) Build context
#         context = "\n\n".join(docs[i]["text"] for i in I[0])
#         logger.debug(f"Context for '{question}':\n{context}")

#         # 4) Generate answer off-loaded to threadpool
#         prompt = build_prompt(context, question)
#         resp = await run_in_threadpool(
#             lambda: llm(
#                 prompt=prompt,
#                 max_tokens=cfg.get("max_tokens", 512),
#                 # no stop-sequence so we don’t accidentally cut off the first token
#             )
#         )
#         answer = resp["choices"][0]["text"].strip()

#         # 5) Log chat history off-loaded as well
#         insert_res = await run_in_threadpool(
#             lambda: history.insert_one({
#                 "q": question,
#                 "a": answer,
#                 "ts": datetime.utcnow()
#             })
#         )
#         if not insert_res.acknowledged:
#             logger.error("MongoDB insert was not acknowledged")

#         return {"answer": answer}

#     except HTTPException:
#         # Let FastAPI handle HTTPExceptions
#         raise
#     except Exception:
#         logger.exception("Error in /ask")
#         raise HTTPException(500, "Internal server error")

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# # ── Self-host via Uvicorn when run directly ────────────────────
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         app,
#         host=cfg.get("host", "127.0.0.1"),
#         port=cfg.get("port", 8000),
#         reload=True
#     )







################################# 5/18/2025 ###################################
##################  mistral-7b ######################################

# import os
# import json
# import pickle
# import faiss
# import logging

# from fastapi import FastAPI, HTTPException, Request
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool
# import asyncio

# # ── Paths & Config ─────────────────────────────────────────────
# here      = os.path.dirname(__file__)              # BOT/app
# root      = os.path.dirname(here)                  # BOT
# cfg_path  = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Locate FAISS index & metadata ──────────────────────────────
# idx_path  = os.path.normpath(os.path.join(root, cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(root, cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(
#         f"Could not find FAISS files:\n  {idx_path}\n  {meta_path}\n"
#         "Run your build_index.py to regenerate them."
#     )

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM setup ───────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(root, cfg.get("model_cache_dir", "models"))
# )
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── MongoDB for logging ────────────────────────────────────────
# mongo_url = cfg.get("mongo_url", "mongodb://localhost:27017/")
# client    = MongoClient(mongo_url)
# history   = client["chatbot_db"]["chat_history"]

# # ── FastAPI app & logger ───────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")
# logger = logging.getLogger("uvicorn.error")

# class Query(BaseModel):
#     question: str

# # ── Helper: wrap Mistral-Instruct prompt ────────────────────────
# def build_prompt(context: str, question: str) -> str:
#     return (
#         "<s>[INST] <<SYS>>\n"
#         "You are a factual HITEC University assistant.\n"
#         "Answer directly and without any introductory phrase.\n"
#         "<</SYS>>\n\n"
#         f"{context}\n\n"
#         f"{question} [/INST]"
#     )

# @app.post("/ask")
# async def ask(q: Query, request: Request):
#     try:
#         question = q.question.strip()
#         logger.info(f"Received question: '{question}' from {request.client.host}")

#         if not question:
#             logger.warning("Question was empty")
#             raise HTTPException(400, "Question cannot be empty")

#         # 1) Embed (diagnostic log)
#         logger.info("Starting embedding...")
#         try:
#             q_emb = await asyncio.wait_for(
#                 run_in_threadpool(
#                     lambda: embedder.encode(
#                         [question],
#                         convert_to_numpy=True,
#                         normalize_embeddings=True
#                     )
#                 ),
#                 timeout=20000  # seconds
#             )
#             logger.info("Embedding complete")
#         except asyncio.TimeoutError:
#             logger.error("Embedding step timed out")
#             raise HTTPException(504, "Embedding took too long")
#         except Exception as e:
#             logger.exception("Embedding error")
#             raise HTTPException(500, "Embedding failed")

#         # 2) Retrieve top_k
#         logger.info("Retrieving context from FAISS...")
#         try:
#             top_k = cfg.get("top_k", 5)
#             D, I = index.search(q_emb, k=top_k)
#             if I.shape[1] == 0:
#                 logger.warning("No relevant info found in FAISS")
#                 raise HTTPException(404, "No relevant information found.")
#         except Exception as e:
#             logger.exception("FAISS search error")
#             raise HTTPException(500, "Document retrieval failed")
        
#         context = "\n\n".join(docs[i]["text"] for i in I[0])
#         logger.info(f"Context for '{question}': {context[:300]}...")

#         # 3) LLM generation (diagnostic log)
#         prompt = build_prompt(context, question)
#         logger.info("Generating answer using Llama...")
#         try:
#             resp = await asyncio.wait_for(
#                 run_in_threadpool(
#                     lambda: llm(
#                         prompt=prompt,
#                         max_tokens=cfg.get("max_tokens", 256)
#                     )
#                 ),
#                 timeout=60  # seconds
#             )
#             logger.info("LLM answer generated")
#             answer = resp["choices"][0]["text"].strip()
#         except asyncio.TimeoutError:
#             logger.error("LLM inference step timed out")
#             raise HTTPException(504, "Model inference took too long")
#         except Exception as e:
#             logger.exception("LLM inference error")
#             raise HTTPException(500, "Answer generation failed")

#         # 4) Log chat history
#         logger.info("Logging chat history to MongoDB...")
#         try:
#             insert_res = await asyncio.wait_for(
#                 run_in_threadpool(
#                     lambda: history.insert_one({
#                         "q": question,
#                         "a": answer,
#                         "ts": datetime.utcnow()
#                     })
#                 ),
#                 timeout=5
#             )
#             if not insert_res.acknowledged:
#                 logger.error("MongoDB insert was not acknowledged")
#         except asyncio.TimeoutError:
#             logger.error("MongoDB insert timed out")
#         except Exception as e:
#             logger.exception("MongoDB insert error")

#         return {"answer": answer}

#     except HTTPException:
#         raise
#     except Exception as e:
#         logger.exception("Error in /ask")
#         raise HTTPException(500, "Internal server error")

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# # ── Self-host via Uvicorn when run directly ────────────────────
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         app,
#         host=cfg.get("host", "127.0.0.1"),
#         port=cfg.get("port", 8000),
#         reload=True
#     )


# import os
# import json
# import pickle
# import faiss
# import logging
# import asyncio

# from fastapi import FastAPI, HTTPException, Request
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool

# # ── Paths & Config ─────────────────────────────────────────────
# here     = os.path.dirname(__file__)      # BOT/app
# root     = os.path.dirname(here)          # BOT
# cfg_path = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Locate FAISS index & metadata ──────────────────────────────
# idx_path  = os.path.normpath(os.path.join(root, cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(root, cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(f"Missing FAISS files:\n • {idx_path}\n • {meta_path}")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder setup ─────────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"]) #all-MiniLM-L6-v2

# # ── Model loading: prefer local model_path, else HF download ───
# if cfg.get("model_path"):
#     # Load from local GGUF or safetensors path
#     model_path = os.path.normpath(os.path.join(root, cfg["model_path"]))
#     if not os.path.isfile(model_path):
#         raise FileNotFoundError(f"LLM file not found at {model_path!r}")
# else:
#     # Fall back to repo + filename download
#     repo_id = cfg.get("model_repo")
#     filename = cfg.get("model_filename")
#     if not repo_id or not filename:
#         raise KeyError("config.json must include either 'model_path' or both 'model_repo' and 'model_filename'")
#     cache_dir = os.path.join(root, cfg.get("model_cache_dir", "models"))
#     os.makedirs(cache_dir, exist_ok=True)
#     model_dir = os.path.join(cache_dir, repo_id)
#     os.makedirs(model_dir, exist_ok=True)
#     model_path = os.path.join(model_dir, filename)
#     if not os.path.isfile(model_path):
#         dl = hf_hub_download(repo_id=repo_id, filename=filename, cache_dir=cache_dir)
#         os.replace(dl, model_path)

# # Instantiate Llama
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── MongoDB for logging ─────────────────────────────────────────
# mongo_url = cfg.get("mongo_url", "mongodb://localhost:27017/")
# client    = MongoClient(mongo_url)
# history   = client["chatbot_db"]["chat_history"]

# # ── FastAPI setup ──────────────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")
# logger = logging.getLogger("uvicorn.error")

# class Query(BaseModel):
#     question: str

# def build_prompt(context: str, question: str) -> str:
#     return (
#          "[INST] <<SYS>>\n"
#         "You are a factual HITEC University assistant.\n"
#         "Answer directly and without any introductory phrase.\n"
#         "<</SYS>>\n\n"
#         f"{context}\n\n"
#         f"{question} [/INST]"

#     )

# @app.post("/ask")
# async def ask(q: Query, request: Request):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(400, "Question cannot be empty")

#     # 1) Embed
#     try:
#         q_emb = await asyncio.wait_for(
#             run_in_threadpool(
#                 lambda: embedder.encode(
#                     [question],
#                     convert_to_numpy=True,
#                     normalize_embeddings=True
#                 )
#             ),
#             timeout=30
#         )
#     except asyncio.TimeoutError:
#         raise HTTPException(504, "Embedding timed out")
#     q_emb = q_emb.astype("float32")

#     # 2) Retrieve
#     D, I = index.search(q_emb, k=cfg.get("top_k", 5))
#     if I.size == 0:
#         raise HTTPException(404, "No relevant information found")
#     context = "\n\n".join(docs[i]["text"] for i in I[0])

#     # 3) Generate
#     prompt = build_prompt(context, question)
#     try:
#         resp = llm(prompt=prompt, max_tokens=cfg.get("max_tokens", 256),
#         temperature=cfg.get("temperature", 0.7),
#         top_p=cfg.get("top_p", 0.9),
#         top_k=cfg.get("sampling_top_k", 40),
#         repeat_penalty=cfg.get("repeat_penalty", 1.2),
#         stop=["[/INST]"])
#     except Exception:
#         logger.exception("LLM inference error")
#         raise HTTPException(500, "Answer generation failed")

#     answer = resp["choices"][0]["text"].strip()

#     # 4) Log to Mongo (fire-and-forget)
#     asyncio.create_task(
#         run_in_threadpool(
#             lambda: history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#         )
#     )

#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("app:app", host=cfg.get("host","127.0.0.1"), port=cfg.get("port",8000), reload=True)
    





# import os
# import json
# import pickle
# import faiss
# import logging
# import asyncio

# from fastapi import FastAPI, HTTPException, Request
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool

# # ── Paths & Config ─────────────────────────────────────────────
# here     = os.path.dirname(__file__)
# root     = os.path.dirname(here)
# with open(os.path.join(here, "config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Load FAISS index & metadata ────────────────────────────────
# idx_path  = os.path.normpath(os.path.join(root, cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(root, cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(f"Missing FAISS files:\n • {idx_path}\n • {meta_path}")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder setup ─────────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# # ── LLM loading ─────────────────────────────────────────────────
# model_path = cfg.get("model_path")
# if not model_path:
#     raise KeyError("Please specify 'model_path' in config.json")
# model_path = os.path.normpath(os.path.join(root, model_path))
# if not os.path.isfile(model_path):
#     raise FileNotFoundError(f"LLM file not found at {model_path!r}")

# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── MongoDB for logging ─────────────────────────────────────────
# client  = MongoClient(cfg.get("mongo_url", "mongodb://localhost:27017/"))
# history = client["chatbot_db"]["chat_history"]

# # ── FastAPI setup ──────────────────────────────────────────────
# app    = FastAPI(title="HITEC University QA Service")
# logger = logging.getLogger("uvicorn.error")

# class Query(BaseModel):
#     question: str
#     debug_context: bool = False  # per-request override

# def build_prompt(context: str, question: str) -> str:
#     return (
#         "[INST] <<SYS>>\n"
#         "You are HITEC University’s factual assistant.\n"
#         "Use **only** the provided context below.\n"
#         "If the answer is not in the context, reply “I don’t know.”\n"
#         "<</SYS>>\n\n"
#         f"Context:\n{context}\n\n"
#         f"Question: {question} [/INST]"
#     )

# @app.post("/ask")
# async def ask(q: Query, request: Request):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(400, "Question cannot be empty")

#     debug = q.debug_context or cfg.get("debug_context", False)

#     # 1) Embed the question
#     try:
#         q_emb = await asyncio.wait_for(
#             run_in_threadpool(
#                 lambda: embedder.encode(
#                     [question],
#                     convert_to_numpy=True,
#                     normalize_embeddings=True
#                 )
#             ),
#             timeout=30
#         )
#     except asyncio.TimeoutError:
#         raise HTTPException(504, "Embedding timed out")
#     q_emb = q_emb.astype("float32")

#     # 2) Retrieve top_k chunks
#     D, I = index.search(q_emb, k=cfg.get("top_k", 5))
#     if D.size == 0:
#         raise HTTPException(404, "No relevant information found")

#     # 3) Initial context filtering & dedupe
#     raw_ctxs = [docs[i] for i in I[0]]

#     # 3.a) If it's a transport question, only keep transport chunks
#     if "transport" in question.lower():
#         filtered = [
#             c for c in raw_ctxs
#             if "transport" in c["meta"]["source"].lower()
#         ]
#     else:
#         filtered = raw_ctxs[:]

#     # 3.b) Drop any Combined_Data duplicates
#     filtered = [
#         c for c in filtered
#         if "combined_data" not in c["meta"]["source"].lower()
#     ]

#     # 3.c) Deduplicate by exact text
#     seen = set()
#     contexts = []
#     for c in filtered:
#         if c["text"] not in seen:
#             contexts.append(c)
#             seen.add(c["text"])

#     # 4) Route-augmentation: force in all stops for the mentioned route
#     #    (so Rawalpindi stops never get omitted)
#     route_key = None
#     ql = question.lower()
#     if "rawalpindi" in ql:
#         route_key = "rawalpindi"
#     elif "islamabad" in ql:
#         route_key = "islamabad"
#     elif "wahcantt" in ql or "wah cantt" in ql:
#         route_key = "wahcantt"

#     if route_key:
#         for d in docs:
#             src = d["meta"]["source"].lower()
#             if f"/transport/routes/{route_key}/" in src:
#                 if d["text"] not in seen:
#                     contexts.append(d)
#                     seen.add(d["text"])

#     # 5) Fallback: if filtering wiped out everything, go back to raw_ctxs
#     if not contexts:
#         seen.clear()
#         contexts = []
#         for c in raw_ctxs:
#             if c["text"] not in seen:
#                 contexts.append(c)
#                 seen.add(c["text"])

#     # 6) Build prompt
#     context_str = "\n\n".join(c["text"] for c in contexts)
#     sources     = [c["meta"]["source"] for c in contexts]
#     prompt      = build_prompt(context_str, question)

#     # 7) Generate the answer
#     try:
#         resp = llm(
#             prompt=prompt,
#             max_tokens=cfg.get("max_tokens", 512),
#             temperature=cfg.get("temperature", 0.7),
#             top_p=cfg.get("top_p", 0.9),
#             top_k=cfg.get("sampling_top_k", 40),
#             repeat_penalty=cfg.get("repeat_penalty", 1.2),
#             stop=["[/INST]"]
#         )
#     except Exception:
#         logger.exception("LLM inference error")
#         raise HTTPException(500, "Answer generation failed")

#     answer = resp["choices"][0]["text"].strip()

#     # 8) Log to Mongo (fire-and-forget)
#     asyncio.create_task(
#         run_in_threadpool(
#             lambda: history.insert_one({
#                 "q": question,
#                 "a": answer,
#                 "sources": sources,
#                 "ts": datetime.utcnow()
#             })
#         )
#     )

#     # 9) Return
#     return {"answer": answer}


# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "app:app",
#         host=cfg.get("host", "127.0.0.1"),
#         port=cfg.get("port", 8000),
#         reload=True
#     )



# import os
# import json
# import pickle
# import faiss
# import logging
# import asyncio

# from fastapi import FastAPI, HTTPException, Request
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool

# # ── Paths & Config ─────────────────────────────────────────────
# here     = os.path.dirname(__file__)
# root     = os.path.dirname(here)
# with open(os.path.join(here, "config.json"), encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Load FAISS & metadata ───────────────────────────────────────
# idx_path  = os.path.join(root, cfg["faiss_index"])
# meta_path = os.path.join(root, cfg["doc_meta"])
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(f"Missing FAISS files:\n • {idx_path}\n • {meta_path}")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM ─────────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])
# model_path = os.path.join(root, cfg["model_path"])
# if not os.path.isfile(model_path):
#     raise FileNotFoundError(f"LLM file not found at {model_path!r}")
# llm = Llama(model_path=model_path,
#            n_ctx=cfg.get("n_ctx",2048),
#            n_threads=cfg.get("n_threads",4))

# # ── MongoDB for logging ─────────────────────────────────────────
# client  = MongoClient(cfg.get("mongo_url","mongodb://localhost:27017/"))
# history = client["chatbot_db"]["chat_history"]

# # ── FastAPI setup ──────────────────────────────────────────────
# app    = FastAPI(title="HITEC University QA Service")
# logger = logging.getLogger("uvicorn.error")

# class Query(BaseModel):
#     question: str
#     debug_context: bool = False

# def build_prompt(context: str, question: str) -> str:
#     return (
#         "[INST] <<SYS>>\n"
#         "You are HITEC University’s factual assistant.\n"
#         "Use **only** the provided context below to answer.\n"
#         "If it’s not in the context, reply “I don’t know.”\n"
#         "<</SYS>>\n\n"
#         f"Context:\n{context}\n\n"
#         f"Question: {question} [/INST]"
#     )

# @app.post("/ask")
# async def ask(q: Query, request: Request):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(400, "Question cannot be empty")

#     debug = q.debug_context or cfg.get("debug_context", False)

#     # 1) Embed
#     try:
#         q_emb = await asyncio.wait_for(
#             run_in_threadpool(lambda:
#                 embedder.encode([question],
#                                 convert_to_numpy=True,
#                                 normalize_embeddings=True)
#             ),
#             timeout=30
#         )
#     except asyncio.TimeoutError:
#         raise HTTPException(504, "Embedding timed out")
#     q_emb = q_emb.astype("float32")

#     # 2) Retrieve
#     D, I = index.search(q_emb, k=cfg.get("top_k",5))
#     if D.size == 0:
#         raise HTTPException(404, "No relevant information found")

#     raw_ctxs = [docs[i] for i in I[0]]

#     # 3) Filter & dedupe
#     if "transport" in question.lower():
#         filtered = [c for c in raw_ctxs
#                     if "transport" in c["meta"]["source"].lower()]
#     else:
#         filtered = raw_ctxs[:]
#     filtered = [c for c in filtered
#                 if "combined_data" not in c["meta"]["source"].lower()]

#     seen = set(); contexts = []
#     for c in filtered:
#         if c["text"] not in seen:
#             contexts.append(c); seen.add(c["text"])

#     # 4) Route‐augmentation
#     ql = question.lower(); route_key = None
#     for key in ("rawalpindi","islamabad","wahcantt","wah cantt"):
#         if key in ql:
#             route_key = key.replace(" ","")
#     if route_key:
#         for d in docs:
#             if f"/transport/routes/{route_key}/" in d["meta"]["source"].lower() \
#                and d["text"] not in seen:
#                 contexts.append(d); seen.add(d["text"])

#     # 5) Fallback to raw_ctxs if empty
#     if not contexts:
#         seen.clear(); contexts = []
#         for c in raw_ctxs:
#             if c["text"] not in seen:
#                 contexts.append(c); seen.add(c["text"])

#     # 6) Build prompt
#     context_str = "\n\n".join(c["text"] for c in contexts)
#     sources     = [c["meta"]["source"] for c in contexts]
#     prompt      = build_prompt(context_str, question)

#     # 7) LLM answer
#     try:
#         resp = llm(prompt=prompt,
#                    max_tokens=cfg.get("max_tokens",512),
#                    temperature=cfg.get("temperature",0.7),
#                    top_p=cfg.get("top_p",0.9),
#                    top_k=cfg.get("sampling_top_k",40),
#                    repeat_penalty=cfg.get("repeat_penalty",1.2),
#                    stop=["[/INST]"])
#     except Exception:
#         logger.exception("LLM inference error")
#         raise HTTPException(500, "Answer generation failed")

#     answer = resp["choices"][0]["text"].strip()

#     # 8) Log
#     asyncio.create_task(run_in_threadpool(lambda:
#         history.insert_one({
#             "q": question, "a": answer,
#             "sources": sources, "ts": datetime.utcnow()
#         })
#     ))

#     # 9) Return (with debug)
#     if debug:
#         return {
#             "answer": answer
#         }


# @app.get("/health")
# def health():
#     return {"status":"ok", "indexed_chunks": index.ntotal}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("app:app",
#                 host=cfg.get("host","127.0.0.1"),
#                 port=cfg.get("port",8000),
#                 reload=True)





import os
import json
import pickle
import faiss
import logging
import asyncio

from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
from sentence_transformers import SentenceTransformer
from llama_cpp import Llama
from pymongo import MongoClient
from datetime import datetime
from starlette.concurrency import run_in_threadpool

# ── Config ──────────────────────────────────────────────────────
here     = os.path.dirname(__file__)
root     = os.path.dirname(here)
cfg      = json.load(open(os.path.join(here, "config.json"), encoding="utf-8"))

# ── Load index & docs ───────────────────────────────────────────
index  = faiss.read_index(os.path.join(root, cfg["faiss_index"]))
docs   = pickle.load(open(os.path.join(root, cfg["doc_meta"]), "rb"))

# ── Models ──────────────────────────────────────────────────────
embedder = SentenceTransformer(cfg["embedder"])
llm       = Llama(model_path=os.path.join(root, cfg["model_path"]),
                  n_ctx=cfg.get("n_ctx",2048),
                  n_threads=cfg.get("n_threads",4))

# ── Logging DB ──────────────────────────────────────────────────
history = MongoClient(cfg.get("mongo_url"))["chatbot_db"]["chat_history"]

app = FastAPI(title="HITEC University QA Service")
logger = logging.getLogger("uvicorn.error")

class Query(BaseModel):
    question: str
    debug_context: bool = False

def build_prompt(ctx: str, q: str) -> str:
    return (
        "<s>[INST] <<SYS>>\n"
        "You are a factual HITEC University assistant.\n"
        "Answer directly and without any introductory phrase.\n"
        "<</SYS>>\n\n"
        f"{ctx}\n\n"
        f"Question: {q} [/INST]"
    )
@app.post("/ask")
async def ask(q: Query, req: Request):
    question = q.question.strip()
    if not question:
        raise HTTPException(400, "Question cannot be empty")

    debug = q.debug_context or cfg.get("debug_context", False)

    # 1) embed
    try:
        emb = await asyncio.wait_for(
            run_in_threadpool(lambda:
                embedder.encode([question],
                                convert_to_numpy=True,
                                normalize_embeddings=True)
            ),
            timeout=20
        )
    except asyncio.TimeoutError:
        raise HTTPException(504, "Embedding timed out")
    emb = emb.astype("float32")

    # 2) retrieve
    D, I = index.search(emb, k=cfg.get("top_k",10))
    if D.size == 0:
        raise HTTPException(404, "No relevant info found")

    raw = [docs[i] for i in I[0]]

    # 3) filter & dedupe
    if "transport" in question.lower():
        sel = [c for c in raw if "transport" in c["meta"]["source"].lower()]
    else:
        sel = raw[:]
    sel = [c for c in sel if "combined_data" not in c["meta"]["source"].lower()]

    seen = set(); ctxs = []
    for c in sel:
        if c["text"] not in seen:
            seen.add(c["text"])
            ctxs.append(c)

    # 4) route‐augmentation
    for route in ("rawalpindi","islamabad","wahcantt","wah cantt"):
        if route in question.lower():
            key = route.replace(" ","")
            for d in docs:
                if f"/transport/routes/{key}/" in d["meta"]["source"].lower() and d["text"] not in seen:
                    seen.add(d["text"])
                    ctxs.append(d)

    # 5) fallback
    if not ctxs:
        for c in raw:
            if c["text"] not in seen:
                seen.add(c["text"])
                ctxs.append(c)

    # 6) prompt
    context_str = "\n\n".join(c["text"] for c in ctxs)
    sources     = [c["meta"]["source"] for c in ctxs]
    prompt      = build_prompt(context_str, question)

    # 7) generate
    try:
        resp = llm(prompt=prompt,
                   max_tokens=cfg.get("max_tokens",512),
                   temperature=cfg.get("temperature",0.7),
                   top_p=cfg.get("top_p",0.9),
                   top_k=cfg.get("sampling_top_k",40),
                   repeat_penalty=cfg.get("repeat_penalty",1.2),
                   stop=["[/INST]"])
    except Exception:
        logger.exception("LLM error")
        raise HTTPException(500, "Answer generation failed")

    answer = resp["choices"][0]["text"].strip()

    # 8) log
    asyncio.create_task(run_in_threadpool(lambda:
        history.insert_one({
            "q": question, "a": answer, "sources": sources,
            "ts": datetime.utcnow()
        })
    ))

    # # 9) return
    # if debug:
    #     return {"question":question, "answer":answer, "sources":sources}
    return {"answer":answer}

@app.get("/health")
def health():
    return {"status":"ok", "indexed_chunks": index.ntotal}


###################################################################
#####################################################
###########################  minstral-3b ##########################


# import os
# import json
# import pickle
# import faiss
# import logging
# import asyncio

# from fastapi import FastAPI, HTTPException, Request
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool

# # ── Load config ───────────────────────────────────────────────
# here     = os.path.dirname(__file__)
# root     = os.path.dirname(here)
# cfg_path = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── FAISS index & metadata ────────────────────────────────────
# idx_path  = os.path.join(root, cfg["faiss_index"])
# meta_path = os.path.join(root, cfg["doc_meta"])
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(f"Missing FAISS files:\n • {idx_path}\n • {meta_path}")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM ───────────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])
# raw = cfg["model_path"]
# model_path = os.path.normpath(os.path.join(root, raw))
# if not os.path.isfile(model_path):
#     raise FileNotFoundError(f"LLM file not found at {model_path!r}")
# print(f"🦙 Loading Llama model from {model_path}")
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── (Optional) MongoDB history ────────────────────────────────
# mongo_url = cfg.get("mongo_url")
# if mongo_url:
#     client  = MongoClient(mongo_url)
#     history = client["chatbot_db"]["chat_history"]
# else:
#     history = None

# # ── FastAPI setup ────────────────────────────────────────────
# app    = FastAPI(title="HITEC University QA Service")
# logger = logging.getLogger("uvicorn.error")

# class Query(BaseModel):
#     question: str

# def build_prompt(context: str, question: str) -> str:
#     return (
#         "<s>[INST] <<SYS>>\n"
#         "You are a factual HITEC University assistant.\n"
#         "Answer directly and without any introductory phrase.\n"
#         "<</SYS>>\n\n"
#         f"{context}\n\n"
#         f"{question} [/INST]"
#     )

# @app.post("/ask")
# async def ask(q: Query, request: Request):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(status_code=400, detail="Question cannot be empty")

#     # 1) embed
#     try:
#         q_emb = await asyncio.wait_for(
#             run_in_threadpool(
#                 lambda: embedder.encode(
#                     [question],
#                     convert_to_numpy=True,
#                     normalize_embeddings=True
#                 )
#             ),
#             timeout=60
#         )
#     except asyncio.TimeoutError:
#         raise HTTPException(status_code=504, detail="Embedding timed out")

#     # FAISS needs float32
#     q_emb = q_emb.astype("float32")

#     # 2) nearest-neighbor search
#     D, I = index.search(q_emb, k=cfg.get("top_k", 5))
#     if I.size == 0 or I.shape[1] == 0:
#         raise HTTPException(status_code=404, detail="No relevant information found")
#     context = "\n\n".join(docs[i]["text"] for i in I[0])

#     # 3) LLM inference
#     prompt = build_prompt(context, question)
#     try:
#         resp = await asyncio.wait_for(
#             run_in_threadpool(
#                 lambda: llm(
#                     prompt=prompt,
#                     max_tokens=cfg.get("max_tokens", 256)
#                 )
#             ),
#             timeout=60
#         )
#     except asyncio.TimeoutError:
#         raise HTTPException(status_code=504, detail="Model inference timed out")

#     answer = resp["choices"][0]["text"].strip()

#     # 4) log to Mongo (fire‐and‐forget)
#     if history:
#         async def log_to_mongo():
#             try:
#                 await run_in_threadpool(
#                     lambda: history.insert_one({
#                         "q": question,
#                         "a": answer,
#                         "ts": datetime.utcnow()
#                     })
#                 )
#             except Exception:
#                 logger.exception("MongoDB insert failed")
#         asyncio.create_task(log_to_mongo())

#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "app:app",
#         host=cfg["host"],
#         port=cfg["port"],
#         reload=True
#     )


# import os
# import json
# import pickle
# import faiss
# import logging
# import asyncio

# from fastapi import FastAPI, HTTPException, Request
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool

# # ── Configuration ────────────────────────────────────────────
# here        = os.path.dirname(__file__)
# root        = os.path.dirname(here)
# cfg_path    = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # Toggle to True to return raw context (for debugging indexing)
# DEBUG_CONTEXT = cfg.get("debug_context", False)

# # ── FAISS index & document metadata ──────────────────────────
# idx_path  = os.path.join(root, cfg["faiss_index"])
# meta_path = os.path.join(root, cfg["doc_meta"])
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(f"Missing FAISS files:\n • {idx_path}\n • {meta_path}")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM instantiation ────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# model_path = os.path.normpath(os.path.join(root, cfg["model_path"]))
# if not os.path.isfile(model_path):
#     raise FileNotFoundError(f"LLM file not found at {model_path!r}")

# print(f"🦙 Loading Llama model from {model_path}")
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── Optional MongoDB for chat history ────────────────────────
# mongo_url = cfg.get("mongo_url")
# if mongo_url:
#     client       = MongoClient(mongo_url)
#     history_coll = client["chatbot_db"]["chat_history"]
# else:
#     history_coll = None

# # ── FastAPI setup ────────────────────────────────────────────
# app    = FastAPI(title="HITEC University QA Service")
# logger = logging.getLogger("uvicorn.error")

# class Query(BaseModel):
#     question: str

# def build_prompt(context: str, question: str) -> str:
#     return (
#         "<s>[INST] <<SYS>>\n"
#         "You are a factual HITEC University assistant.\n"
#         "Answer directly and without any introductory phrase.\n"
#         "<</SYS>>\n\n"
#         f"{context}\n\n"
#         f"{question} [/INST]"
#     )

# @app.post("/ask")
# async def ask(q: Query, request: Request):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(400, "Question cannot be empty")

#     # 1) Embedding
#     try:
#         q_emb = await asyncio.wait_for(
#             run_in_threadpool(
#                 lambda: embedder.encode(
#                     [question],
#                     convert_to_numpy=True,
#                     normalize_embeddings=True
#                 )
#             ),
#             timeout=60
#         )
#     except asyncio.TimeoutError:
#         raise HTTPException(504, "Embedding timed out")

#     q_emb = q_emb.astype("float32")

#     # 2) Retrieval
#     D, I = index.search(q_emb, k=cfg.get("top_k", 4))
#     if I.size == 0:
#         raise HTTPException(404, "No relevant information found")

#     context = "\n\n".join(docs[i]["text"] for i in I[0])
#     logger.debug("Context fed to LLM:\n%s", context)

#     # DEBUG: if enabled, just return the raw context
#     if DEBUG_CONTEXT:
#         return {"context": context}

#     # 3) Inference with sampling & repeat_penalty
#     prompt = build_prompt(context, question)
#     resp = await run_in_threadpool(
#         lambda: llm(
#             prompt=prompt,
#             max_tokens=cfg.get("max_tokens", 128),
#             temperature=cfg.get("temperature", 0.7),
#             top_p=cfg.get("top_p", 0.9),
#             top_k=cfg.get("sampling_top_k", 40),
#             repeat_penalty=cfg.get("repeat_penalty", 1.2),
#         )
#     )
#     answer = resp["choices"][0]["text"].strip()

#     # 4) Fire-and-forget logging
#     if history_coll is not None:
#         async def log_to_mongo():
#             try:
#                 res = await asyncio.wait_for(
#                     run_in_threadpool(
#                         lambda: history_coll.insert_one({
#                             "q": question,
#                             "a": answer,
#                             "ts": datetime.utcnow()
#                         })
#                     ),
#                     timeout=5
#                 )
#                 if not res.acknowledged:
#                     logger.error("MongoDB insert not acknowledged")
#             except asyncio.TimeoutError:
#                 logger.error("MongoDB insert timed out")
#             except Exception:
#                 logger.exception("Error inserting chat history")

#         asyncio.create_task(log_to_mongo())

#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         "app:app",
#         host=cfg.get("host", "127.0.0.1"),
#         port=cfg.get("port", 8000),
#         reload=True
#     )



# latest   #########################


# import os
# import sys
# import json
# import pickle
# import faiss
# import logging
# import asyncio

# # Force import of our local_utils, not any installed utils package
# HERE = os.path.dirname(__file__)
# sys.path.insert(0, HERE)

# from fastapi import FastAPI, HTTPException, Request
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from starlette.concurrency import run_in_threadpool
# from local_utils import load_json  # now your own module

# # ── Configuration ────────────────────────────────────────────
# here        = os.path.dirname(__file__)
# root        = os.path.dirname(here)
# cfg_path    = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)
    
# # ── FAISS index & document metadata ──────────────────────────
# idx_path  = os.path.join(root, cfg["faiss_index"])
# meta_path = os.path.join(root, cfg["doc_meta"])
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(f"Missing FAISS files:\n • {idx_path}\n • {meta_path}")

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM instantiation ────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# model_path = os.path.normpath(os.path.join(root, cfg["model_path"]))
# if not os.path.isfile(model_path):
#     raise FileNotFoundError(f"LLM file not found at {model_path!r}")

# print(f"🦙 Loading Llama model from {model_path}")
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # Instantiate the Llama wrapper
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", os.cpu_count()),
#     temperature=cfg.get("temperature", 0.7),
#     top_p=cfg.get("top_p", 0.9),
#     top_k=cfg.get("sampling_top_k", 40),
#     repeat_penalty=cfg.get("repeat_penalty", 1.2),
# )


# # ── FastAPI ─────────────────────────────────────────────────
# app    = FastAPI(title="HITEC University QA")
# logger = logging.getLogger("uvicorn.error")
# DEBUG  = cfg.get("debug_context", False)

# class Query(BaseModel):
#     question: str

# def build_prompt(context: str, question: str) -> str:
#     return (
#         "You are an HITEC University chat assistant that ONLY answers from the context below.\n\n"
#         f"Context:\n{context}\n\n"
#         f"Question:\n{question}\n\nAnswer:"
#     )

# @app.post("/ask")
# async def ask(q: Query, req: Request):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(400, "Empty question")

#     # 1) Embed
#     try:
#         q_emb = await asyncio.wait_for(
#             run_in_threadpool(lambda: embedder.encode(
#                 [question],
#                 convert_to_numpy=True,
#                 normalize_embeddings=True
#             )),
#             timeout=30
#         )
#     except asyncio.TimeoutError:
#         raise HTTPException(504, "Embedding timed out")
#     q_emb = q_emb.astype("float32")

#     # 2) Retrieve
#     D, I = index.search(q_emb, k=cfg.get("top_k", 5))
#     if I.size == 0:
#         raise HTTPException(404, "No relevant information found")
#     raw = [docs[i] for i in I[0]]

#     # 2b) Metadata filter example
#     low_q = question.lower()
#     if "faculty" in low_q:
#         filtered = [c for c in raw if "/faculty/" in c["meta"]["source"].lower()]
#         chunks = filtered or raw
#     else:
#         chunks = raw

#     context = "\n\n".join(c["text"] for c in chunks)
#     logger.debug("Context for '%s':\n%s", question, context)
#     if DEBUG:
#         return {"context": context}

#     # 3) Generate
#     prompt = build_prompt(context, question)
#     try:
#         resp = llm(prompt=prompt, max_tokens=cfg.get("max_tokens", 128))
#     except Exception:
#         logger.exception("LLM generation error")
#         raise HTTPException(500, "Failed to generate answer")

#     answer = resp["choices"][0]["text"].strip()
#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# if __name__=="__main__":
#     import uvicorn
#     uvicorn.run("app:app",
#                 host=cfg.get("host", "127.0.0.1"),
#                 port=cfg.get("port", 8000),
#                 reload=True)




# import os
# import json
# import pickle
# import faiss
# from fastapi import FastAPI, HTTPException, Request
# from pydantic import BaseModel
# from sentence_transformers import SentenceTransformer
# from huggingface_hub import hf_hub_download
# from llama_cpp import Llama
# from pymongo import MongoClient
# from datetime import datetime
# from starlette.concurrency import run_in_threadpool

# # ── Paths & Config ─────────────────────────────────────────────
# here      = os.path.dirname(__file__)              # BOT/app
# root      = os.path.dirname(here)                  # BOT
# cfg_path  = os.path.join(here, "config.json")
# with open(cfg_path, encoding="utf-8") as f:
#     cfg = json.load(f)

# # ── Locate FAISS index & metadata ──────────────────────────────
# idx_path  = os.path.normpath(os.path.join(root, cfg["faiss_index"]))
# meta_path = os.path.normpath(os.path.join(root, cfg["doc_meta"]))
# if not os.path.exists(idx_path) or not os.path.exists(meta_path):
#     raise FileNotFoundError(
#         f"Could not find FAISS files:\n  {idx_path}\n  {meta_path}\n"
#         "Run your build_index.py to regenerate them."
#     )

# index = faiss.read_index(idx_path)
# with open(meta_path, "rb") as f:
#     docs = pickle.load(f)

# # ── Embedder & LLM setup ───────────────────────────────────────
# embedder = SentenceTransformer(cfg["embedder"])

# model_path = hf_hub_download(
#     repo_id=cfg["model_repo"],
#     filename=cfg["model_filename"],
#     cache_dir=os.path.join(root, cfg.get("model_cache_dir", "models"))
# )
# llm = Llama(
#     model_path=model_path,
#     n_ctx=cfg.get("n_ctx", 2048),
#     n_threads=cfg.get("n_threads", 4)
# )

# # ── MongoDB for logging ────────────────────────────────────────
# mongo_url = cfg.get("mongo_url", "mongodb://localhost:27017/")
# client    = MongoClient(mongo_url)
# history   = client["chatbot_db"]["chat_history"]

# # ── FastAPI app ────────────────────────────────────────────────
# app = FastAPI(title="HITEC University QA Service")

# class Query(BaseModel):
#     question: str

# @app.post("/ask")
# async def ask(q: Query):
#     question = q.question.strip()
#     if not question:
#         raise HTTPException(400, "Question cannot be empty")

#     # 1) Embed in a thread
#     q_emb = await run_in_threadpool(
#         lambda: embedder.encode(
#             [question],
#             convert_to_numpy=True,
#             normalize_embeddings=True
#         )
#     )

#     # 2) Retrieve top_k
#     top_k = cfg.get("top_k", 5)
#     D, I = index.search(q_emb, k=top_k)
#     if I.shape[1] == 0:
#         raise HTTPException(404, "No relevant information found.")

#     # 3) Build context
#     context = "\n\n".join(docs[i]["text"] for i in I[0])

#     # 4) Generate answer in a thread
#     prompt = (
#         "You are a factual HITEC University assistant. Answer the question below "
#         "*using only* the provided context related to HITEC University Taxila\n\n"
#         f"Context:\n{context}\n\n"
#         f"Question: {question}\n\nAnswer:"
#     )
#     resp = await run_in_threadpool(
#         lambda: llm(
#             prompt=prompt,
#             max_tokens=cfg.get("max_tokens", 512),
#             stop=["\n\n"]
#         )
#     )
#     answer = resp["choices"][0]["text"].strip()

#     # 5) Log & return
#     history.insert_one({"q": question, "a": answer, "ts": datetime.utcnow()})
#     return {"answer": answer}

# @app.get("/health")
# def health():
#     return {"status": "ok", "indexed_chunks": index.ntotal}

# # ── Self-host via Uvicorn when run directly ────────────────────
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(
#         app,
#         host=cfg.get("host", "127.0.0.1"),
#         port=cfg.get("port", 8000),
#         reload=True
#     )
