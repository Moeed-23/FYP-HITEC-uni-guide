# import os
# import json
# import faiss
# import pickle
# from sentence_transformers import SentenceTransformer

# DATA_DIR = "data"
# INDEX_PATH = "index.faiss"
# DOC_META_PATH = "docs.pkl"
# EMBEDDER_MODEL = "all-MiniLM-L6-v2"
# CHUNK_SIZE = 400

# def load_json_docs():
#     chunks = []
#     for fname in os.listdir(DATA_DIR):
#         if fname.endswith(".json"):
#             with open(os.path.join(DATA_DIR, fname), encoding="utf-8") as f:
#                 data = json.load(f)
#                 text = json.dumps(data, indent=2)
#                 # Chunking long documents
#                 for i in range(0, len(text), CHUNK_SIZE):
#                     chunk = text[i:i+CHUNK_SIZE]
#                     chunks.append({"source": fname, "text": chunk})
#     return chunks

# def build_index(chunks):
#     embedder = SentenceTransformer(EMBEDDER_MODEL)
#     texts = [c["text"] for c in chunks]
#     embeddings = embedder.encode(texts, convert_to_numpy=True, show_progress_bar=True)
#     faiss.normalize_L2(embeddings)

#     index = faiss.IndexFlatIP(embeddings.shape[1])
#     index.add(embeddings)

#     faiss.write_index(index, INDEX_PATH)
#     with open(DOC_META_PATH, "wb") as f:
#         pickle.dump(chunks, f)
#     print("✅ Index and metadata saved.")

# if __name__ == "__main__":
#     docs = load_json_docs()
#     build_index(docs)





######################################


# #!/usr/bin/env python3
# import os
# import sys
# from subprocess import run

# ROOT = os.path.dirname(__file__)
# BUILD_SCRIPT = os.path.join(ROOT, "/scripts/build_index.py")

# def main():
#     ret = run([sys.executable, BUILD_SCRIPT], check=False)
#     sys.exit(ret.returncode)

# if __name__ == "__main__":
#     main()
