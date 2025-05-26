
# import os
# import json
# from typing import Any, Dict, List, Union
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     with open(path, 'r', encoding='utf-8') as f:
#         txt = f.read()
#     try:
#         return json.loads(txt)
#     except JSONDecodeError:
#         wrapped = "[" + txt.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(wrapped)
#         except JSONDecodeError:
#             print(f"⚠️ Failed to parse JSON: {path}")
#             return {}

# def _flatten(obj: Any, src: str, path: str = "") -> List[Dict[str,Union[str,Dict[str,str]]]]:
#     docs: List[Dict[str,Union[str,Dict[str,str]]]] = []
#     def meta(p): return f"{src}/{p}" if p else src

#     if isinstance(obj, dict):
#         for k, v in obj.items():
#             newp = f"{path}/{k}" if path else k
#             docs += _flatten(v, src, newp)

#     elif isinstance(obj, list):
#         if all(isinstance(i, str) for i in obj):
#             cleaned = [i.strip() for i in obj if i.strip()]
#             if cleaned:
#                 docs.append({"text":"; ".join(cleaned), "meta":{"source":meta(path)}})
#         else:
#             for idx, item in enumerate(obj):
#                 newp = f"{path}[{idx}]"
#                 docs += _flatten(item, src, newp)

#     elif isinstance(obj, str):
#         t = obj.strip()
#         if t:
#             docs.append({"text":t, "meta":{"source":meta(path)}})

#     elif obj is None:
#         pass

#     else:
#         docs.append({"text":str(obj), "meta":{"source":meta(path)}})

#     return docs

# def flatten_department(data: Any, src: str) -> List[Dict[str,Any]]:
#     if isinstance(data, list):
#         out: List[Dict[str,Any]] = []
#         for i, item in enumerate(data):
#             out += _flatten(item, src, f"[{i}]")
#         return out
#     if isinstance(data, dict):
#         return _flatten(data, src)
#     return []