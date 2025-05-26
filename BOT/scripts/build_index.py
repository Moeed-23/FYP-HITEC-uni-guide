# # # scripts/build_index.py
# # import os, pickle
# # import numpy as np
# # import faiss
# # from sentence_transformers import SentenceTransformer

# # from utils import list_json_files, load_json, flatten_department

# # DATA_DIR    = "data/"
# # INDEX_DIR   = "index/"
# # INDEX_PATH  = os.path.join(INDEX_DIR, "faiss_index.bin")
# # META_PATH   = os.path.join(INDEX_DIR, "doc_meta.pkl")
# # EMBED_MODEL = "all-MiniLM-L6-v2"

# # def main():
# #     os.makedirs(INDEX_DIR, exist_ok=True)

# #     all_docs = []
# #     for path in list_json_files(DATA_DIR):
# #         src = os.path.splitext(os.path.basename(path))[0]
# #         # load_json uses json.load under the hood
# #         data = load_json(path)
# #         # flatten_department now safely skips missing or malformed parts
# #         chunks = flatten_department(data, src)
# #         all_docs.extend(chunks)

# #     if not all_docs:
# #         print("⚠️  No document chunks found. Check your JSON files under data/")
# #         return

# #     texts = [d["text"] for d in all_docs]
# #     print(f"Embedding {len(texts)} chunks with {EMBED_MODEL}…")

# #     embedder = SentenceTransformer(EMBED_MODEL)
# #     embeddings = embedder.encode(texts, show_progress_bar=True)

# #     dim = embeddings.shape[1]
# #     index = faiss.IndexFlatL2(dim)
# #     index.add(np.array(embeddings, dtype="float32"))

# #     faiss.write_index(index, INDEX_PATH)
# #     with open(META_PATH, "wb") as f:
# #         pickle.dump(all_docs, f)

# #     print(f"✅ Indexed {len(all_docs)} chunks → {INDEX_PATH}")

# # if __name__ == "__main__":
# #     main()


# ####################################

# # scripts/build_index.py

# import os
# import pickle
# import numpy as np
# import torch
# from transformers import AutoTokenizer, AutoModel

# from utils import list_json_files, load_json, flatten_department

# # Config
# DATA_DIR   = "data/"
# INDEX_DIR  = "index/"
# EMBED_MODEL= "sentence-transformers/all-MiniLM-L6-v2"
# EMBED_PATH = os.path.join(INDEX_DIR, "embeddings.npy")
# META_PATH  = os.path.join(INDEX_DIR, "doc_meta.pkl")
# BATCH_SIZE = 32     # tweak to your GPU/CPU memory

# def embed_texts(texts, tokenizer, model, device):
#     """Mean‑pool the token embeddings from Hugging Face model."""
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             encoded = tokenizer(
#                 batch,
#                 padding=True,
#                 truncation=True,
#                 return_tensors="pt"
#             ).to(device)
#             outputs = model(**encoded)
#             token_embeds = outputs.last_hidden_state     # (B, L, D)
#             mask = encoded["attention_mask"].unsqueeze(-1)  # (B, L, 1)
#             summed = (token_embeds * mask).sum(1)        # (B, D)
#             counts = mask.sum(1)                         # (B, 1)
#             mean_pooled = summed / counts               # (B, D)
#             all_embeds.append(mean_pooled.cpu().numpy())
#     return np.vstack(all_embeds)

# def main():
#     os.makedirs(INDEX_DIR, exist_ok=True)

#     # 1) Load & flatten
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         docs.extend(flatten_department(data, src))

#     if not docs:
#         print("⚠️  No documents found in data/ – check your JSONs.")
#         return

#     texts = [d["text"] for d in docs]
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#     # 2) Load HF model & tokenizer
#     print(f"Loading embedding model {EMBED_MODEL} on {device}…")
#     tokenizer = AutoTokenizer.from_pretrained(EMBED_MODEL)
#     model     = AutoModel.from_pretrained(EMBED_MODEL).to(device)

#     # 3) Embed
#     print(f"Embedding {len(texts)} texts in batches of {BATCH_SIZE}…")
#     embeddings = embed_texts(texts, tokenizer, model, device).astype("float32")

#     # 4) Persist
#     np.save(EMBED_PATH, embeddings)
#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)

#     print(f"✅ Saved embeddings → {EMBED_PATH}")
#     print(f"✅ Saved metadata    → {META_PATH}")

# if __name__ == "__main__":
#     main()


################################


# import os, pickle, numpy as np, faiss, torch
# from transformers import AutoTokenizer, AutoModel
# from utils import list_json_files, load_json, flatten_department

# # —— Config —— 
# DATA_DIR    = "data/"
# INDEX_DIR   = "index/"
# INDEX_PATH  = os.path.join(INDEX_DIR, "faiss_index.bin")
# META_PATH   = os.path.join(INDEX_DIR, "doc_meta.pkl")
# EMBED_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE  = 32

# def embed_texts(texts, tokenizer, model, device):
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             enc = tokenizer(batch, padding=True, truncation=True, return_tensors="pt").to(device)
#             out = model(**enc).last_hidden_state    # (B, L, D)
#             mask = enc.attention_mask.unsqueeze(-1) # (B, L, 1)
#             summed = (out * mask).sum(1)            # (B, D)
#             counts = mask.sum(1)                    # (B, 1)
#             mean_pooled = (summed / counts).cpu().numpy()
#             all_embeds.append(mean_pooled)
#     return np.vstack(all_embeds).astype("float32")

# def main():
#     os.makedirs(INDEX_DIR, exist_ok=True)

#     # 1) Load & flatten all JSON docs
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         docs.extend(flatten_department(data, src))
#     if not docs:
#         print("⚠️  No document chunks found in data/ – check your JSON files.")
#         return

#     texts = [d["text"] for d in docs]
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#     # 2) Embed
#     print(f"Loading {EMBED_MODEL} on {device}…")
#     tokenizer = AutoTokenizer.from_pretrained(EMBED_MODEL)
#     model     = AutoModel.from_pretrained(EMBED_MODEL).to(device)
#     print(f"Embedding {len(texts)} texts in batches of {BATCH_SIZE}…")
#     embeddings = embed_texts(texts, tokenizer, model, device)

#     # 3) Build & save FAISS index
#     dim = embeddings.shape[1]
#     index = faiss.IndexFlatIP(dim)
#     faiss.normalize_L2(embeddings)
#     index.add(embeddings)
#     faiss.write_index(index, INDEX_PATH)
#     print(f"✅ Saved FAISS index → {INDEX_PATH}")

#     # 4) Save metadata
#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Saved metadata → {META_PATH}")

# if __name__ == "__main__":
#     main()


#####################################


# import os
# import pickle
# import numpy as np
# import faiss
# import torch
# from transformers import AutoTokenizer, AutoModel
# from utils import list_json_files, load_json, flatten_department

# ROOT = os.path.dirname(__file__)
# DATA_DIR  = os.path.join(ROOT, "../data")
# INDEX_DIR = os.path.join(ROOT, "../index")
# os.makedirs(INDEX_DIR, exist_ok=True)

# INDEX_PATH = os.path.join(INDEX_DIR, "faiss_index.bin")
# META_PATH  = os.path.join(INDEX_DIR, "doc_meta.pkl")
# EMB_MODEL  = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE = 32

# def embed_texts(texts, tokenizer, model, device):
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             enc = tokenizer(batch, padding=True, truncation=True, return_tensors="pt").to(device)
#             out = model(**enc).last_hidden_state
#             mask = enc.attention_mask.unsqueeze(-1)
#             summed = (out * mask).sum(1)
#             counts = mask.sum(1)
#             mean_pooled = (summed / counts).cpu().numpy()
#             all_embeds.append(mean_pooled)
#     return np.vstack(all_embeds).astype("float32")

# def main():
#     # 1) Load & flatten
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         docs.extend(flatten_department(data, src))
#     if not docs:
#         print("⚠️  No document chunks found in data/.")
#         return

#     texts = [d["text"] for d in docs]
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#     # 2) Embed
#     print(f"Loading embedder on {device}…")
#     tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
#     model     = AutoModel.from_pretrained(EMB_MODEL).to(device)
#     print(f"Embedding {len(texts)} texts…")
#     embeddings = embed_texts(texts, tokenizer, model, device)

#     # 3) Build FAISS
#     dim = embeddings.shape[1]
#     index = faiss.IndexFlatIP(dim)
#     faiss.normalize_L2(embeddings)
#     index.add(embeddings)
#     faiss.write_index(index, INDEX_PATH)
#     print(f"✅ FAISS index saved → {INDEX_PATH}")

#     # 4) Metadata
#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Metadata saved → {META_PATH}")

# if __name__ == "__main__":
#     main()








# #!/usr/bin/env python3
# import os
# import pickle
# import numpy as np
# import faiss
# import torch
# from transformers import AutoTokenizer, AutoModel
# from utils import list_json_files, load_json, flatten_department

# # ─── Configuration ──────────────────────────────────────────────
# ROOT       = os.path.dirname(__file__)
# DATA_DIR   = os.path.abspath(os.path.join(ROOT, "..", "data"))
# INDEX_DIR  = os.path.abspath(os.path.join(ROOT, "..", "index"))
# os.makedirs(INDEX_DIR, exist_ok=True)

# INDEX_PATH = os.path.join(INDEX_DIR, "index.faiss")
# META_PATH  = os.path.join(INDEX_DIR, "docs.pkl")

# EMB_MODEL  = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE = 32
# # ─────────────────────────────────────────────────────────────────

# def embed_texts(texts, tokenizer, model, device):
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             enc = tokenizer(batch,
#                             padding=True,
#                             truncation=True,
#                             return_tensors="pt").to(device)
#             out  = model(**enc).last_hidden_state
#             mask = enc.attention_mask.unsqueeze(-1)
#             summed      = (out * mask).sum(1)
#             counts      = mask.sum(1)
#             mean_pooled = (summed / counts).cpu().numpy()
#             all_embeds.append(mean_pooled)
#     return np.vstack(all_embeds).astype("float32")

# def main():
#     # 1) Load & flatten all JSONs under data/
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src  = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         docs.extend(flatten_department(data, src))

#     if not docs:
#         print("⚠️  No document chunks found in", DATA_DIR)
#         return

#     texts = [d["text"] for d in docs]
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#     # 2) Embed
#     print(f"Loading embedder ({EMB_MODEL}) on {device}…")
#     tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
#     model     = AutoModel.from_pretrained(EMB_MODEL).to(device)

#     print(f"Embedding {len(texts)} chunks…")
#     embeddings = embed_texts(texts, tokenizer, model, device)

#     # 3) Build & save FAISS index
#     dim = embeddings.shape[1]
#     faiss.normalize_L2(embeddings)
#     index = faiss.IndexFlatIP(dim)
#     index.add(embeddings)
#     faiss.write_index(index, INDEX_PATH)
#     print(f"✅ FAISS index saved → {INDEX_PATH}")

#     # 4) Save metadata
#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Document metadata saved → {META_PATH}")

# if __name__ == "__main__":
#     main()


############################
##########
######
######
#########################




# #!/usr/bin/env python3
# import os
# import pickle
# import numpy as np
# import faiss
# import torch
# from transformers import AutoTokenizer, AutoModel
# from utils import list_json_files, load_json, flatten_department

# ROOT       = os.path.dirname(__file__)
# DATA_DIR   = os.path.abspath(os.path.join(ROOT, "..", "data"))
# INDEX_DIR  = os.path.abspath(os.path.join(ROOT, "..", "index"))
# os.makedirs(INDEX_DIR, exist_ok=True)

# INDEX_PATH = os.path.join(INDEX_DIR, "index.faiss")
# META_PATH  = os.path.join(INDEX_DIR, "docs.pkl")

# EMB_MODEL  = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE = 32

# def embed_texts(texts, tokenizer, model, device):
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             enc = tokenizer(batch,
#                             padding=True,
#                             truncation=True,
#                             return_tensors="pt").to(device)
#             out  = model(**enc).last_hidden_state
#             mask = enc.attention_mask.unsqueeze(-1)
#             summed      = (out * mask).sum(1)
#             counts      = mask.sum(1)
#             mean_pooled = (summed / counts).cpu().numpy()
#             all_embeds.append(mean_pooled)
#     return np.vstack(all_embeds).astype("float32")

# def main():
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src  = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         # if load_json returned a list, flatten each element
#         if isinstance(data, list):
#             for item in data:
#                 docs.extend(flatten_department(item, src))
#         # if a single dict
#         elif isinstance(data, dict):
#             docs.extend(flatten_department(data, src))
#         else:
#             print(f"⚠️  Skipping {path}: not a dict or list")
#     if not docs:
#         print(f"⚠️  No document chunks found under {DATA_DIR}")
#         return

#     texts = [d["text"] for d in docs]
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#     print(f"Loading embedder ({EMB_MODEL}) on {device}…")
#     tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
#     model     = AutoModel.from_pretrained(EMB_MODEL).to(device)

#     print(f"Embedding {len(texts)} chunks…")
#     embeddings = embed_texts(texts, tokenizer, model, device)

#     dim = embeddings.shape[1]
#     faiss.normalize_L2(embeddings)
#     index = faiss.IndexFlatIP(dim)
#     index.add(embeddings)
#     faiss.write_index(index, INDEX_PATH)
#     print(f"✅ FAISS index saved → {INDEX_PATH}")

#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Document metadata saved → {META_PATH}")

# if __name__ == "__main__":
#     main()




#######################################################################




# #!/usr/bin/env python3
# import os
# import pickle
# import numpy as np
# import faiss
# import torch
# from transformers import AutoTokenizer, AutoModel
# from utils import list_json_files, load_json, flatten_department

# ROOT       = os.path.dirname(__file__)
# DATA_DIR   = os.path.abspath(os.path.join(ROOT, "..", "data"))
# INDEX_DIR  = os.path.abspath(os.path.join(ROOT, "..", "index"))
# os.makedirs(INDEX_DIR, exist_ok=True)

# INDEX_PATH = os.path.join(INDEX_DIR, "index.faiss")
# META_PATH  = os.path.join(INDEX_DIR, "docs.pkl")
# EMB_MODEL  = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE = 32

# def embed_texts(texts, tokenizer, model, device):
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             enc = tokenizer(batch,
#                             padding=True,
#                             truncation=True,
#                             return_tensors="pt").to(device)
#             out  = model(**enc).last_hidden_state
#             mask = enc.attention_mask.unsqueeze(-1)
#             summed      = (out * mask).sum(1)
#             counts      = mask.sum(1)
#             mean_pooled = (summed / counts).cpu().numpy()
#             all_embeds.append(mean_pooled)
#     return np.vstack(all_embeds).astype("float32")

# def main():
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src  = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         if isinstance(data, list):
#             for item in data:
#                 docs.extend(flatten_department(item, src))
#         elif isinstance(data, dict):
#             docs.extend(flatten_department(data, src))
#         else:
#             print(f"⚠️  Skipping {path}: not dict or list")

#     if not docs:
#         print(f"⚠️  No document chunks under {DATA_DIR}")
#         return

#     texts = [d["text"] for d in docs]
#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

#     print(f"Loading embedder ({EMB_MODEL}) on {device}…")
#     tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
#     model     = AutoModel.from_pretrained(EMB_MODEL).to(device)

#     print(f"Embedding {len(texts)} chunks…")
#     embeddings = embed_texts(texts, tokenizer, model, device)

#     dim   = embeddings.shape[1]
#     faiss.normalize_L2(embeddings)
#     index = faiss.IndexFlatIP(dim)
#     index.add(embeddings)
#     faiss.write_index(index, INDEX_PATH)
#     print(f"✅ FAISS index saved → {INDEX_PATH}")

#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Document metadata saved → {META_PATH}")

# if __name__ == "__main__":
#     main()


#############################################################################################
##################################3 5/18/2025

# import os
# import pickle
# import numpy as np
# import faiss
# import torch
# from transformers import AutoTokenizer, AutoModel
# from utils import list_json_files, load_json, flatten_department

# # ── Config ─────────────────────────────────────────────────────
# ROOT        = os.path.dirname(__file__)
# DATA_DIR    = os.path.abspath(os.path.join(ROOT, "..", "data"))
# INDEX_DIR   = os.path.abspath(os.path.join(ROOT, "..", "index"))
# os.makedirs(INDEX_DIR, exist_ok=True)

# INDEX_PATH  = os.path.join(INDEX_DIR, "index.faiss")
# META_PATH   = os.path.join(INDEX_DIR, "docs.pkl")
# EMB_MODEL   = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE  = 32

# # ── Chunk settings ────────────────────────────────────────────
# CHUNK_SIZE    = 1000
# CHUNK_OVERLAP = 160


# def embed_texts(texts, tokenizer, model, device):
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             enc   = tokenizer(batch, padding=True, truncation=True, return_tensors="pt").to(device)
#             out   = model(**enc).last_hidden_state
#             mask  = enc.attention_mask.unsqueeze(-1)
#             summed = (out * mask).sum(1)
#             counts = mask.sum(1)
#             all_embeds.append((summed / counts).cpu().numpy())
#     return np.vstack(all_embeds).astype("float32")

# def chunk_documents(docs):
#     chunked = []
#     for d in docs:
#         text = d["text"]
#         if len(text) <= CHUNK_SIZE:
#             chunked.append(d)
#         else:
#             step = CHUNK_SIZE - CHUNK_OVERLAP
#             # character‑level sliding window
#             for start in range(0, len(text), step):
#                 part = text[start : start + CHUNK_SIZE]
#                 chunked.append({"text": part, "meta": d["meta"]})
#     return chunked

# def main():
#     # 1) flatten JSON → docs
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src  = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         if isinstance(data, list):
#             for item in data:
#                 docs.extend(flatten_department(item, src))
#         elif isinstance(data, dict):
#             docs.extend(flatten_department(data, src))
#         else:
#             print(f"⚠️ Skipping {path}: not dict or list")

#     print(f"➡️  Original chunks: {len(docs)}")

#     # 2) apply chunking
#     docs = chunk_documents(docs)
#     print(f"➡️  After chunking ({CHUNK_SIZE=} / {CHUNK_OVERLAP=}): {len(docs)}")

#     texts = [d["text"] for d in docs]

#     # 3) embed & build FAISS
#     device    = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
#     model     = AutoModel.from_pretrained(EMB_MODEL).to(device)

#     print(f"⏳ Embedding {len(texts)} chunks on {device}…")
#     embeddings = embed_texts(texts, tokenizer, model, device)

#     faiss.normalize_L2(embeddings)
#     index = faiss.IndexFlatIP(embeddings.shape[1])
#     index.add(embeddings)
#     faiss.write_index(index, INDEX_PATH)
#     print(f"✅ FAISS index saved to {INDEX_PATH}")

#     # 4) persist chunk metadata
#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Metadata saved to {META_PATH}")

# if __name__ == "__main__":
#     main()


# import os
# import pickle
# import numpy as np
# import faiss
# import torch
# from transformers import AutoTokenizer, AutoModel
# from utils import list_json_files, load_json, flatten_department

# # ── Config ─────────────────────────────────────────────────────
# ROOT        = os.path.dirname(__file__)
# DATA_DIR    = os.path.abspath(os.path.join(ROOT, "..", "data"))
# INDEX_DIR   = os.path.abspath(os.path.join(ROOT, "..", "index"))
# os.makedirs(INDEX_DIR, exist_ok=True)

# INDEX_PATH  = os.path.join(INDEX_DIR, "index.faiss")
# META_PATH   = os.path.join(INDEX_DIR, "docs.pkl")
# EMB_MODEL   = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE  = 32

# # ── Chunk settings (tighter windows!) ─────────────────────────
# CHUNK_SIZE    = 500
# CHUNK_OVERLAP = 50

# def embed_texts(texts, tokenizer, model, device):
#     all_embeds = []
#     model.eval()
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i : i + BATCH_SIZE]
#             enc   = tokenizer(batch, padding=True, truncation=True, return_tensors="pt").to(device)
#             out   = model(**enc).last_hidden_state
#             mask  = enc.attention_mask.unsqueeze(-1)
#             summed = (out * mask).sum(1)
#             counts = mask.sum(1)
#             all_embeds.append((summed / counts).cpu().numpy())
#     return np.vstack(all_embeds).astype("float32")

# def chunk_documents(docs):
#     chunked = []
#     for d in docs:
#         text = d["text"]
#         if len(text) <= CHUNK_SIZE:
#             chunked.append(d)
#         else:
#             step = CHUNK_SIZE - CHUNK_OVERLAP
#             for start in range(0, len(text), step):
#                 part = text[start : start + CHUNK_SIZE]
#                 chunked.append({"text": part, "meta": d["meta"]})
#     return chunked

# def main():
#     # 1) flatten JSON → docs
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         src  = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         if isinstance(data, list):
#             for item in data:
#                 docs.extend(flatten_department(item, src))
#         elif isinstance(data, dict):
#             docs.extend(flatten_department(data, src))
#         else:
#             print(f"⚠️ Skipping {path}: not dict or list")

#     print(f"➡️  Original chunks: {len(docs)}")

#     # 2) apply chunking
#     docs = chunk_documents(docs)
#     print(f"➡️  After chunking ({CHUNK_SIZE=} / {CHUNK_OVERLAP=}): {len(docs)}")

#     texts = [d["text"] for d in docs]

#     # 3) embed & build FAISS
#     device    = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
#     model     = AutoModel.from_pretrained(EMB_MODEL).to(device)

#     print(f"⏳ Embedding {len(texts)} chunks on {device}…")
#     embeddings = embed_texts(texts, tokenizer, model, device)

#     faiss.normalize_L2(embeddings)
#     index = faiss.IndexFlatIP(embeddings.shape[1])
#     index.add(embeddings)
#     faiss.write_index(index, INDEX_PATH)
#     print(f"✅ FAISS index saved to {INDEX_PATH}")

#     # 4) persist chunk metadata
#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Metadata saved to {META_PATH}")

# if __name__ == "__main__":
#     main()





import os
import pickle
import numpy as np
import faiss
import torch

from transformers import AutoTokenizer, AutoModel
from utils import list_json_files, load_json, flatten_department

# ── Paths ────────────────────────────────────────────────────────
ROOT      = os.path.dirname(__file__)
DATA_DIR  = os.path.abspath(os.path.join(ROOT, "..", "data"))
INDEX_DIR = os.path.abspath(os.path.join(ROOT, "..", "index"))
os.makedirs(INDEX_DIR, exist_ok=True)

INDEX_PATH = os.path.join(INDEX_DIR, "index.faiss")
META_PATH  = os.path.join(INDEX_DIR, "docs.pkl")

# ── Embedding model & params ────────────────────────────────────
EMB_MODEL   = "sentence-transformers/all-MiniLM-L6-v2"
BATCH_SIZE  = 32
CHUNK_SIZE    = 300
CHUNK_OVERLAP = 50

def embed_texts(texts, tokenizer, model, device):
    all_embeds = []
    model.eval()
    with torch.no_grad():
        for i in range(0, len(texts), BATCH_SIZE):
            batch = texts[i : i + BATCH_SIZE]
            enc   = tokenizer(batch, padding=True, truncation=True,
                              return_tensors="pt").to(device)
            out   = model(**enc).last_hidden_state
            mask  = enc.attention_mask.unsqueeze(-1)
            summed = (out * mask).sum(1)
            counts = mask.sum(1)
            all_embeds.append((summed / counts).cpu().numpy())
    return np.vstack(all_embeds).astype("float32")

def chunk_documents(docs):
    out = []
    for d in docs:
        t = d["text"]
        if len(t) <= CHUNK_SIZE:
            out.append(d)
        else:
            step = CHUNK_SIZE - CHUNK_OVERLAP
            for s in range(0, len(t), step):
                out.append({"text": t[s:s+CHUNK_SIZE], "meta": d["meta"]})
    return out

def main():
    # 1) load & flatten
    all_docs = []
    for path in list_json_files(DATA_DIR):
        src  = os.path.splitext(os.path.basename(path))[0]
        data = load_json(path)
        if isinstance(data, list):
            for item in data:
                all_docs.extend(flatten_department(item, src))
        elif isinstance(data, dict):
            all_docs.extend(flatten_department(data, src))

    print(f"➡️  Original chunks: {len(all_docs)}")
    all_docs = chunk_documents(all_docs)
    print(f"➡️  After chunking: {len(all_docs)}")

    texts = [d["text"] for d in all_docs]

    # 2) embed & FAISS
    device    = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
    model     = AutoModel.from_pretrained(EMB_MODEL).to(device)

    print(f"⏳ Embedding {len(texts)} chunks on {device}…")
    embs = embed_texts(texts, tokenizer, model, device)
    faiss.normalize_L2(embs)

    idx = faiss.IndexFlatIP(embs.shape[1])
    idx.add(embs)
    faiss.write_index(idx, INDEX_PATH)
    print(f"✅ FAISS index saved to {INDEX_PATH}")

    with open(META_PATH, "wb") as f:
        pickle.dump(all_docs, f)
    print(f"✅ Metadata saved to {META_PATH}")

if __name__ == "__main__":
    main()







#########3 latest           




# import os
# import pickle
# import numpy as np
# import faiss
# import torch
# from transformers import AutoTokenizer, AutoModel
# from scripts.utils import list_json_files, load_json, flatten_department

# ROOT        = os.path.dirname(__file__)
# DATA_DIR    = os.path.abspath(os.path.join(ROOT, "..", "data"))
# INDEX_DIR   = os.path.abspath(os.path.join(ROOT, "..", "index"))
# os.makedirs(INDEX_DIR, exist_ok=True)

# INDEX_PATH  = os.path.join(INDEX_DIR, "index.faiss")
# META_PATH   = os.path.join(INDEX_DIR, "docs.pkl")

# EMB_MODEL    = "sentence-transformers/all-MiniLM-L6-v2"
# BATCH_SIZE   = 32
# CHUNK_SIZE   = 1000
# CHUNK_OVERLAP= 160

# def chunk_docs(docs):
#     out = []
#     for d in docs:
#         txt = d["text"]
#         if len(txt) <= CHUNK_SIZE:
#             out.append(d)
#         else:
#             step = CHUNK_SIZE - CHUNK_OVERLAP
#             for i in range(0, len(txt), step):
#                 part = txt[i:i+CHUNK_SIZE]
#                 out.append({"text": part, "meta": d["meta"]})
#     return out

# def embed_texts(texts, tokenizer, model, device):
#     model.eval()
#     embs = []
#     with torch.no_grad():
#         for i in range(0, len(texts), BATCH_SIZE):
#             batch = texts[i:i+BATCH_SIZE]
#             enc = tokenizer(batch, padding=True, truncation=True, return_tensors="pt").to(device)
#             out = model(**enc).last_hidden_state
#             mask = enc.attention_mask.unsqueeze(-1)
#             summed = (out * mask).sum(1)
#             cnts = mask.sum(1)
#             embs.append((summed / cnts).cpu().numpy())
#     return np.vstack(embs).astype("float32")

# def main():
#     docs = []
#     for path in list_json_files(DATA_DIR):
#         key  = os.path.splitext(os.path.basename(path))[0]
#         data = load_json(path)
#         if isinstance(data, list):
#             for item in data:
#                 docs += flatten_department(item, key)
#         else:
#             docs += flatten_department(data, key)

#     docs = chunk_docs(docs)
#     texts = [d["text"] for d in docs]

#     device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
#     tokenizer = AutoTokenizer.from_pretrained(EMB_MODEL)
#     model     = AutoModel.from_pretrained(EMB_MODEL).to(device)

#     print(f"Embedding {len(texts)} chunks on {device}…")
#     embs = embed_texts(texts, tokenizer, model, device)
#     faiss.normalize_L2(embs)

#     idx = faiss.IndexFlatIP(embs.shape[1])
#     idx.add(embs)
#     faiss.write_index(idx, INDEX_PATH)
#     print(f"✅ FAISS index saved: {INDEX_PATH}")

#     with open(META_PATH, "wb") as f:
#         pickle.dump(docs, f)
#     print(f"✅ Metadata saved: {META_PATH}")

# if __name__=="__main__":
#     main()



#################################


# import os
# import sys
# import json
# import pickle
# import faiss
# from sentence_transformers import SentenceTransformer

# # ── Ensure we import our local utils, not some pip package named "utils" ──
# script_dir = os.path.dirname(__file__)
# sys.path.insert(0, script_dir)
# from utils import list_json_files, load_json, flatten_department

# def main():
#     # ── Locate your actual config.json ──
#     # adjust the relative path below to point to wherever your config.json truly lives.
#     # e.g. if it's in BOT/app/config.json:
#     cfg_path = os.path.normpath(
#         os.path.join(script_dir, "..", "app", "config.json")
#     )
#     with open(cfg_path, encoding="utf-8") as f:
#         cfg = json.load(f)

#     # ── Gather all JSON files ──
#     data_dir   = os.path.normpath(os.path.join(script_dir, cfg["data_dir"]))
#     json_files = list_json_files(data_dir)

#     # ── 1) Flatten all the JSON into text/meta chunks ──
#     docs = []
#     for path in json_files:
#         data = load_json(path)
#         src  = os.path.splitext(os.path.basename(path))[0].lower()
#         docs.extend(flatten_department(data, src))

#     # ── 2) Embed all texts ──
#     texts    = [d["text"] for d in docs]
#     embedder = SentenceTransformer(cfg["embedder"])
#     embs     = embedder.encode(
#         texts,
#         convert_to_numpy=True,
#         normalize_embeddings=True
#     )

#     # ── 3) Build FAISS index ──
#     dim   = embs.shape[1]
#     index = faiss.IndexFlatIP(dim)
#     index.add(embs)

#     # ── 4) Persist index & metadata ──
#     faiss.write_index(index, cfg["faiss_index"])
#     with open(cfg["doc_meta"], "wb") as f:
#         pickle.dump(docs, f)

#     print(f"Indexed {len(docs)} chunks into {cfg['faiss_index']}")

# if __name__ == "__main__":
#     main()
