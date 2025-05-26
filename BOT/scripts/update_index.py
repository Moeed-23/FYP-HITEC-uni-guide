# # import os
# # import time
# # import pickle
# # import numpy as np
# # import faiss
# # from sentence_transformers import SentenceTransformer
# # from utils import list_json_files, load_json, flatten_department

# # DATA_DIR   = "data/"
# # INDEX_DIR  = "index/"
# # INDEX_PATH = os.path.join(INDEX_DIR, "faiss_index.bin")
# # META_PATH  = os.path.join(INDEX_DIR, "doc_meta.pkl")
# # EMBED_MODEL = "all-MiniLM-L6-v2"

# # def needs_rebuild(data_dir: str, meta_path: str, index_path: str) -> bool:
# #     """Check if any JSON is newer than the index or meta file."""
# #     files = list_json_files(data_dir)
# #     latest = max(os.path.getmtime(p) for p in files)
# #     if not os.path.exists(meta_path) or not os.path.exists(index_path):
# #         return True
# #     return latest > max(os.path.getmtime(meta_path), os.path.getmtime(index_path))

# # def rebuild():
# #     """Full rebuild if needed."""
# #     print("Changes detected; rebuilding entire index.")
# #     os.system("python scripts/build_index.py")

# # def main():
# #     if needs_rebuild(DATA_DIR, META_PATH, INDEX_PATH):
# #         rebuild()
# #     else:
# #         print("No updates to JSONs; index is fresh.")

# # if __name__ == "__main__":
# #     main()


# ####################################


# # import os, time
# # from utils import list_json_files

# # # Paths must match build_index.py
# # DATA_DIR   = "data/"
# # INDEX_DIR  = "index/"
# # INDEX_PATH = os.path.join(INDEX_DIR, "faiss_index.bin")
# # META_PATH  = os.path.join(INDEX_DIR, "doc_meta.pkl")

# # def needs_rebuild(data_dir: str, meta_path: str, index_path: str) -> bool:
# #     files = list_json_files(data_dir)
# #     latest = max(os.path.getmtime(p) for p in files)
# #     if not os.path.exists(meta_path) or not os.path.exists(index_path):
# #         return True
# #     return latest > max(os.path.getmtime(meta_path), os.path.getmtime(index_path))

# # def main():
# #     if needs_rebuild(DATA_DIR, META_PATH, INDEX_PATH):
# #         print("🔄 Changes detected; rebuilding index…")
# #         os.system("python build_index.py")
# #     else:
# #         print("✅ No updates to JSONs; index is fresh.")

# # if __name__ == "__main__":
# #     main()


# ##################################################

# # import os
# # import time
# # from utils import list_json_files
# # from subprocess import run

# # ROOT       = os.path.dirname(__file__)
# # DATA_DIR   = os.path.join(ROOT, "../data")
# # INDEX_DIR  = os.path.join(ROOT, "../index")
# # INDEX_PATH = os.path.join(INDEX_DIR, "faiss_index.bin")
# # META_PATH  = os.path.join(INDEX_DIR, "doc_meta.pkl")

# # def needs_rebuild():
# #     files = list_json_files(DATA_DIR)
# #     if not files:
# #         return False
# #     latest_data = max(os.path.getmtime(p) for p in files)
# #     if not os.path.exists(META_PATH) or not os.path.exists(INDEX_PATH):
# #         return True
# #     last_index = max(os.path.getmtime(META_PATH), os.path.getmtime(INDEX_PATH))
# #     return latest_data > last_index

# # def main():
# #     if needs_rebuild():
# #         print("🔄 Changes detected; rebuilding index…")
# #         run(["python", "build_index.py"], cwd=ROOT)
# #     else:
# #         print("✅ No updates; index is fresh.")

# # if __name__ == "__main__":
# #     main()








# #!/usr/bin/env python3
# import os
# import time
# import sys
# from utils import list_json_files

# ROOT       = os.path.dirname(__file__)
# DATA_DIR   = os.path.abspath(os.path.join(ROOT, "..", "data"))
# INDEX_DIR  = os.path.abspath(os.path.join(ROOT, "..", "index"))
# INDEX_PATH = os.path.join(INDEX_DIR, "index.faiss")
# META_PATH  = os.path.join(INDEX_DIR, "docs.pkl")

# def needs_rebuild() -> bool:
#     files = list_json_files(DATA_DIR)
#     if not files:
#         return False
#     latest_data = max(os.path.getmtime(p) for p in files)
#     if not os.path.exists(INDEX_PATH) or not os.path.exists(META_PATH):
#         return True
#     last_index = max(os.path.getmtime(INDEX_PATH),
#                      os.path.getmtime(META_PATH))
#     return latest_data > last_index

# def main():
#     if needs_rebuild():
#         print("🔄 Changes detected; rebuilding index…")
#         # Use same Python interpreter
#         ret = os.system(f"{sys.executable} {os.path.join(ROOT,'build_index.py')}")
#         sys.exit(ret)
#     else:
#         print("✅ No updates; index is fresh.")

# if __name__ == "__main__":
#     main()






###################




import os
import sys
from utils import list_json_files

ROOT       = os.path.dirname(__file__)
DATA_DIR   = os.path.abspath(os.path.join(ROOT, "..", "data"))
INDEX_DIR  = os.path.abspath(os.path.join(ROOT, "..", "index"))
INDEX_PATH = os.path.join(INDEX_DIR, "index.faiss")
META_PATH  = os.path.join(INDEX_DIR, "docs.pkl")

def needs_rebuild() -> bool:
    files = list_json_files(DATA_DIR)
    if not files:
        return False
    latest_data = max(os.path.getmtime(p) for p in files)
    if not os.path.exists(INDEX_PATH) or not os.path.exists(META_PATH):
        return True
    last_index = max(
        os.path.getmtime(INDEX_PATH),
        os.path.getmtime(META_PATH)
    )
    return latest_data > last_index

def main():
    if needs_rebuild():
        print("🔄 Changes detected; rebuilding index…")
        sys.exit(os.system(f"{sys.executable} {os.path.join(ROOT,'build_index.py')}"))
    else:
        print("✅ No updates; index is fresh.")

if __name__ == "__main__":
    main()
