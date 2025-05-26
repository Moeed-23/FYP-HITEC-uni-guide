# # scripts/utils.py
# import os, json
# from typing import List, Dict, Any

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Dict[str, Any]:
#     with open(path, 'r', encoding='utf-8') as f:
#         return json.load(f)

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one department JSON (as a dict) and its source name,
#     return a list of {'text': ..., 'meta': {'source': ...}}.
#     Skips any sections that aren’t the expected type.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # — Department description
#     desc = data.get("description", "")
#     if isinstance(desc, str) and desc.strip():
#         docs.append({"text": desc.strip(),
#                      "meta": {"source": f"{src}/description"}})

#     # — Faculty
#     faculty = data.get("faculty", [])
#     if isinstance(faculty, list):
#         for f in faculty:
#             name = f.get("name")
#             desig = f.get("designation", "")
#             interests = f.get("areasOfInterest", [])
#             if name and isinstance(interests, list):
#                 txt = f"{name} ({desig}). Interests: {', '.join(interests)}."
#                 docs.append({"text": txt,
#                              "meta": {"source": f"{src}/faculty/{name}"}})

#     # — Programs
#     programs = data.get("programs", {})
#     if isinstance(programs, dict):
#         for prog, details in programs.items():
#             # skip if details isn’t a dict
#             if not isinstance(details, dict):
#                 continue

#             # Program overview
#             overview = details.get("description", "")
#             if isinstance(overview, str) and overview.strip():
#                 docs.append({"text": f"{prog} – {overview.strip()}",
#                              "meta": {"source": f"{src}/programs/{prog}"}})

#             # Scheme of Study
#             scheme = details.get("schemeOfStudy", [])
#             if isinstance(scheme, list):
#                 for sem in scheme:
#                     sem_num = sem.get("semester")
#                     courses = sem.get("courses", [])
#                     if sem_num is not None and isinstance(courses, list):
#                         clist = "; ".join(
#                             f"{c.get('code','')} {c.get('courseTitle','')} ({c.get('creditHours','')})"
#                             for c in courses
#                         )
#                         docs.append({"text": f"{prog} Sem {sem_num} courses: {clist}",
#                                      "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}"}})

#             # Electives
#             electives = details.get("electives", {})
#             if isinstance(electives, dict):
#                 for cat, elist in electives.items():
#                     if isinstance(elist, list):
#                         clist = "; ".join(
#                             f"{c.get('code','')} {c.get('courseTitle','')}" for c in elist
#                         )
#                         docs.append({"text": f"{prog} electives in {cat}: {clist}",
#                                      "meta": {"source": f"{src}/programs/{prog}/electives/{cat}"}})
#     return docs



####################################################


# import os, json
# from typing import List, Dict, Any

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Dict[str, Any]:
#     with open(path, 'r', encoding='utf-8') as f:
#         return json.load(f)

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # — Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # — Admissions file?
#     if ro := data.get("registrar_office"):
#         for field in ("description","admissions_policy"):
#             if val := ro.get(field, "").strip():
#                 docs.append({"text": val,
#                              "meta": {"source": f"{src}/registrar_office/{field}"}})

#     if ad := data.get("admission_ad"):
#         # programs
#         for cat, lst in ad.get("programs", {}).items():
#             if isinstance(lst, list):
#                 docs.append({"text": f"{cat}: {', '.join(lst)}",
#                              "meta": {"source": f"{src}/admission_ad/programs/{cat}"}})
#         # scholarships, facilities, key_points
#         for field in ("financial_assistance_and_scholarships",
#                       "facilities", "key_points"):
#             if items := ad.get(field):
#                 docs.append({"text": f"{field.replace('_',' ')}: {'; '.join(items)}",
#                              "meta": {"source": f"{src}/admission_ad/{field}"}})
#         # online test note
#         if note := ad.get("online_admission_test", {}).get("note", "").strip():
#             docs.append({"text": note,
#                          "meta": {"source": f"{src}/admission_ad/online_test_note"}})
#         # contact & apply link
#         if link := ad.get("apply_online", "").strip():
#             docs.append({"text": f"Apply online at {link}",
#                          "meta": {"source": f"{src}/admission_ad/apply_online"}})
#         if ct := ad.get("contact_details", {}):
#             contact = "; ".join(f"{k}: {v}" for k, v in ct.items())
#             docs.append({"text": f"Contact: {contact}",
#                          "meta": {"source": f"{src}/admission_ad/contact_details"}})

#     # — Eligibility criteria
#     if ec := data.get("eligibility_criteria"):
#         for prog, details in ec.items():
#             if reqs := details.get("requirements"):
#                 docs.append({"text": f"{prog} requirements: {'; '.join(reqs)}",
#                              "meta": {"source": f"{src}/eligibility_criteria/{prog}"}})

#     # — Admission test
#     if at := data.get("admission_test"):
#         if general := at.get("general", "").strip():
#             docs.append({"text": general,
#                          "meta": {"source": f"{src}/admission_test/general"}})
#         if mer := at.get("merit_determination"):
#             parts = "; ".join(f"{k}: {v}" for k, v in mer.items())
#             docs.append({"text": f"Merit formula: {parts}",
#                          "meta": {"source": f"{src}/admission_test/merit"}})

#     # — Faculty (common)
#     if faculty := data.get("faculty", []):
#         for f in faculty:
#             if name := f.get("name"):
#                 desig = f.get("designation", "")
#                 ints = ", ".join(f.get("areasOfInterest", []))
#                 txt = f"{name} ({desig}). Interests: {ints}."
#                 docs.append({"text": txt,
#                              "meta": {"source": f"{src}/faculty/{name}"}})

#     # — Programs (common)
#     if progs := data.get("programs", {}):
#         for prog, details in progs.items():
#             if overview := details.get("description", "").strip():
#                 docs.append({"text": f"{prog}: {overview}",
#                              "meta": {"source": f"{src}/programs/{prog}/description"}})
#             if scheme := details.get("schemeOfStudy", []):
#                 for sem in scheme:
#                     sem_num = sem.get("semester")
#                     courses = sem.get("courses", [])
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or c.get('title','')} ({c.get('creditHours','')})"
#                         for c in courses
#                     )
#                     docs.append({"text": f"{prog} Sem {sem_num}: {clist}",
#                                  "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}"}})
#             # electives
#             if elects := details.get("electives", {}):
#                 for cat, lst in elects.items():
#                     clist = "; ".join(c.get("code","") + " " + c.get("courseTitle","") for c in lst)
#                     docs.append({"text": f"{prog} electives in {cat}: {clist}",
#                                  "meta": {"source": f"{src}/programs/{prog}/electives/{cat}"}})

#     return docs


##############################################

# import os
# import json
# from typing import List, Dict, Any

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Dict[str, Any]:
#     with open(path, 'r', encoding='utf-8') as f:
#         return json.load(f)

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     # … (same as your original flatten function) …
#     # copy exactly from your existing script
#     from typing import List, Dict, Any
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs
    
#     # Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # — Admissions file?
#     if ro := data.get("registrar_office"):
#         for field in ("description","admissions_policy"):
#             if val := ro.get(field, "").strip():
#                 docs.append({"text": val,
#                              "meta": {"source": f"{src}/registrar_office/{field}"}})

#     if ad := data.get("admission_ad"):
#         # programs
#         for cat, lst in ad.get("programs", {}).items():
#             if isinstance(lst, list):
#                 docs.append({"text": f"{cat}: {', '.join(lst)}",
#                              "meta": {"source": f"{src}/admission_ad/programs/{cat}"}})
#         # scholarships, facilities, key_points
#         for field in ("financial_assistance_and_scholarships",
#                       "facilities", "key_points"):
#             if items := ad.get(field):
#                 docs.append({"text": f"{field.replace('_',' ')}: {'; '.join(items)}",
#                              "meta": {"source": f"{src}/admission_ad/{field}"}})
#         # online test note
#         if note := ad.get("online_admission_test", {}).get("note", "").strip():
#             docs.append({"text": note,
#                          "meta": {"source": f"{src}/admission_ad/online_test_note"}})
#         # contact & apply link
#         if link := ad.get("apply_online", "").strip():
#             docs.append({"text": f"Apply online at {link}",
#                          "meta": {"source": f"{src}/admission_ad/apply_online"}})
#         if ct := ad.get("contact_details", {}):
#             contact = "; ".join(f"{k}: {v}" for k, v in ct.items())
#             docs.append({"text": f"Contact: {contact}",
#                          "meta": {"source": f"{src}/admission_ad/contact_details"}})

#     # — Eligibility criteria
#     if ec := data.get("eligibility_criteria"):
#         for prog, details in ec.items():
#             if reqs := details.get("requirements"):
#                 docs.append({"text": f"{prog} requirements: {'; '.join(reqs)}",
#                              "meta": {"source": f"{src}/eligibility_criteria/{prog}"}})

#     # — Admission test
#     if at := data.get("admission_test"):
#         if general := at.get("general", "").strip():
#             docs.append({"text": general,
#                          "meta": {"source": f"{src}/admission_test/general"}})
#         if mer := at.get("merit_determination"):
#             parts = "; ".join(f"{k}: {v}" for k, v in mer.items())
#             docs.append({"text": f"Merit formula: {parts}",
#                          "meta": {"source": f"{src}/admission_test/merit"}})

#     # — Faculty (common)
#     if faculty := data.get("faculty", []):
#         for f in faculty:
#             if name := f.get("name"):
#                 desig = f.get("designation", "")
#                 ints = ", ".join(f.get("areasOfInterest", []))
#                 txt = f"{name} ({desig}). Interests: {ints}."
#                 docs.append({"text": txt,
#                              "meta": {"source": f"{src}/faculty/{name}"}})

#     # — Programs (common)
#     if progs := data.get("programs", {}):
#         for prog, details in progs.items():
#             if overview := details.get("description", "").strip():
#                 docs.append({"text": f"{prog}: {overview}",
#                              "meta": {"source": f"{src}/programs/{prog}/description"}})
#             if scheme := details.get("schemeOfStudy", []):
#                 for sem in scheme:
#                     sem_num = sem.get("semester")
#                     courses = sem.get("courses", [])
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or c.get('title','')} ({c.get('creditHours','')})"
#                         for c in courses
#                     )
#                     docs.append({"text": f"{prog} Sem {sem_num}: {clist}",
#                                  "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}"}})
#             # electives
#             if elects := details.get("electives", {}):
#                 for cat, lst in elects.items():
#                     clist = "; ".join(c.get("code","") + " " + c.get("courseTitle","") for c in lst)
#                     docs.append({"text": f"{prog} electives in {cat}: {clist}",
#                                  "meta": {"source": f"{src}/programs/{prog}/electives/{cat}"}})

#     return docs





# import os
# import json
# from typing import List, Dict, Any

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Dict[str, Any]:
#     with open(path, 'r', encoding='utf-8') as f:
#         return json.load(f)

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded `data` dict and a source prefix `src`, 
#     return a list of {'text': ..., 'meta': {...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text,
#                      "meta": {"source": f"{src}/description"}})

#     # Registrar office
#     if ro := data.get("registrar_office"):
#         for field in ("description","admissions_policy"):
#             if val := ro.get(field, "").strip():
#                 docs.append({
#                     "text": val,
#                     "meta": {"source": f"{src}/registrar_office/{field}"}
#                 })

#     # Admission ad
#     if ad := data.get("admission_ad"):
#         # programs
#         for cat, lst in ad.get("programs", {}).items():
#             if isinstance(lst, list):
#                 docs.append({
#                     "text": f"{cat}: {', '.join(lst)}",
#                     "meta": {"source": f"{src}/admission_ad/programs/{cat}"}
#                 })
#         # other fields
#         for field in (
#             "financial_assistance_and_scholarships",
#             "facilities", "key_points"
#         ):
#             if items := ad.get(field):
#                 docs.append({
#                     "text": f"{field.replace('_',' ')}: {'; '.join(items)}",
#                     "meta": {"source": f"{src}/admission_ad/{field}"}
#                 })
#         # online test note
#         if note := ad.get("online_admission_test", {}).get("note", "").strip():
#             docs.append({
#                 "text": note,
#                 "meta": {"source": f"{src}/admission_ad/online_test_note"}
#             })
#         # apply link & contact
#         if link := ad.get("apply_online", "").strip():
#             docs.append({
#                 "text": f"Apply online at {link}",
#                 "meta": {"source": f"{src}/admission_ad/apply_online"}
#             })
#         if ct := ad.get("contact_details", {}):
#             contact = "; ".join(f"{k}: {v}" for k, v in ct.items())
#             docs.append({
#                 "text": f"Contact: {contact}",
#                 "meta": {"source": f"{src}/admission_ad/contact_details"}
#             })

#     # Eligibility criteria
#     if ec := data.get("eligibility_criteria"):
#         for prog, details in ec.items():
#             if reqs := details.get("requirements"):
#                 docs.append({
#                     "text": f"{prog} requirements: {'; '.join(reqs)}",
#                     "meta": {"source": f"{src}/eligibility_criteria/{prog}"}
#                 })

#     # Admission test
#     if at := data.get("admission_test"):
#         if general := at.get("general", "").strip():
#             docs.append({
#                 "text": general,
#                 "meta": {"source": f"{src}/admission_test/general"}
#             })
#         if mer := at.get("merit_determination"):
#             parts = "; ".join(f"{k}: {v}" for k, v in mer.items())
#             docs.append({
#                 "text": f"Merit formula: {parts}",
#                 "meta": {"source": f"{src}/admission_test/merit"}
#             })

#     # Faculty
#     if faculty := data.get("faculty", []):
#         for f in faculty:
#             if name := f.get("name"):
#                 desig = f.get("designation", "")
#                 ints  = ", ".join(f.get("areasOfInterest", []))
#                 txt   = f"{name} ({desig}). Interests: {ints}."
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/faculty/{name}"}
#                 })

#         # — Programs (common) — support dict or list
#     if progs := data.get("programs"):
#         # normalize to sequence of (prog_name, details) pairs
#         if isinstance(progs, dict):
#             items = progs.items()
#         elif isinstance(progs, list):
#             items = [
#                 (p.get("name", f"program_{i}"), p)
#                 for i, p in enumerate(progs)
#                 if isinstance(p, dict)
#             ]
#         else:
#             items = []

#         for prog, details in items:
#             # description
#             if overview := details.get("description", "").strip():
#                 docs.append({
#                     "text": f"{prog}: {overview}",
#                     "meta": {"source": f"{src}/programs/{prog}/description"}
#                 })

#             # schemeOfStudy
#             if scheme := details.get("schemeOfStudy", []):
#                 for sem in scheme:
#                     sem_num = sem.get("semester")
#                     courses = sem.get("courses", [])
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or c.get('title','')} ({c.get('creditHours','')})"
#                         for c in courses
#                     )
#                     docs.append({
#                         "text": f"{prog} Sem {sem_num}: {clist}",
#                         "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}"}
#                     })

#             # electives
#             if elects := details.get("electives", {}):
#                 for cat, lst in elects.items():
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or ''}"
#                         for c in lst
#                     )
#                     docs.append({
#                         "text": f"{prog} electives in {cat}: {clist}",
#                         "meta": {"source": f"{src}/programs/{prog}/electives/{cat}"}
#                     })


#     return docs




#######################




# #!/usr/bin/env python3
# import os
# import json
# from typing import List, Dict, Any
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Try to load a JSON file. If it fails with Extra data,
#     attempt to wrap consecutive objects into a list.
#     Returns either:
#       - dict
#       - list of dict
#       - {} on unrecoverable parse error
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         # common pattern: multiple objects back‑to‑back => insert commas
#         fixed = '[' + text.replace('}\n{', '},\n{') + ']'
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded object (dict) and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # Registrar office
#     if ro := data.get("registrar_office"):
#         for field in ("description", "admissions_policy"):
#             if val := ro.get(field, "").strip():
#                 docs.append({
#                     "text": val,
#                     "meta": {"source": f"{src}/registrar_office/{field}"}
#                 })

#     # Admission ad
#     if ad := data.get("admission_ad"):
#         # programs
#         for cat, lst in ad.get("programs", {}).items():
#             if isinstance(lst, list):
#                 docs.append({
#                     "text": f"{cat}: {', '.join(lst)}",
#                     "meta": {"source": f"{src}/admission_ad/programs/{cat}"}
#                 })
#         # scholarships, facilities, key_points
#         for field in (
#             "financial_assistance_and_scholarships",
#             "facilities", "key_points"
#         ):
#             if items := ad.get(field):
#                 docs.append({
#                     "text": f"{field.replace('_',' ')}: {'; '.join(items)}",
#                     "meta": {"source": f"{src}/admission_ad/{field}"}
#                 })
#         # online test note
#         if note := ad.get("online_admission_test", {}).get("note", "").strip():
#             docs.append({
#                 "text": note,
#                 "meta": {"source": f"{src}/admission_ad/online_test_note"}
#             })
#         # apply link & contact
#         if link := ad.get("apply_online", "").strip():
#             docs.append({
#                 "text": f"Apply online at {link}",
#                 "meta": {"source": f"{src}/admission_ad/apply_online"}
#             })
#         if ct := ad.get("contact_details", {}):
#             contact = "; ".join(f"{k}: {v}" for k, v in ct.items())
#             docs.append({
#                 "text": f"Contact: {contact}",
#                 "meta": {"source": f"{src}/admission_ad/contact_details"}
#             })

#     # Eligibility criteria
#     if ec := data.get("eligibility_criteria"):
#         for prog, details in ec.items():
#             if reqs := details.get("requirements"):
#                 docs.append({
#                     "text": f"{prog} requirements: {'; '.join(reqs)}",
#                     "meta": {"source": f"{src}/eligibility_criteria/{prog}"}
#                 })

#     # Admission test
#     if at := data.get("admission_test"):
#         if general := at.get("general", "").strip():
#             docs.append({
#                 "text": general,
#                 "meta": {"source": f"{src}/admission_test/general"}
#             })
#         if mer := at.get("merit_determination"):
#             parts = "; ".join(f"{k}: {v}" for k, v in mer.items())
#             docs.append({
#                 "text": f"Merit formula: {parts}",
#                 "meta": {"source": f"{src}/admission_test/merit"}
#             })

#     # Faculty
#     if faculty := data.get("faculty", []):
#         for f in faculty:
#             if name := f.get("name"):
#                 desig = f.get("designation", "")
#                 ints  = ", ".join(f.get("areasOfInterest", []))
#                 txt   = f"{name} ({desig}). Interests: {ints}."
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/faculty/{name}"}
#                 })

#     # — Programs (common) — support dict or list
#     if progs := data.get("programs"):
#         if isinstance(progs, dict):
#             items = progs.items()
#         elif isinstance(progs, list):
#             items = [
#                 (p.get("name", f"program_{i}"), p)
#                 for i, p in enumerate(progs)
#                 if isinstance(p, dict)
#             ]
#         else:
#             items = []

#         for prog, details in items:
#             # description
#             if overview := details.get("description", "").strip():
#                 docs.append({
#                     "text": f"{prog}: {overview}",
#                     "meta": {"source": f"{src}/programs/{prog}/description"}
#                 })

#             # schemeOfStudy
#             if scheme := details.get("schemeOfStudy", []):
#                 for sem in scheme:
#                     if not isinstance(sem, dict):
#                         continue
#                     sem_num = sem.get("semester")
#                     courses = sem.get("courses", [])
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or c.get('title','')} ({c.get('creditHours','')})"
#                         for c in courses if isinstance(c, dict)
#                     )
#                     docs.append({
#                         "text": f"{prog} Sem {sem_num}: {clist}",
#                         "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}"}
#                     })

#             # electives
#             if elects := details.get("electives", {}):
#                 for cat, lst in elects.items():
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or ''}"
#                         for c in lst if isinstance(c, dict)
#                     )
#                     docs.append({
#                         "text": f"{prog} electives in {cat}: {clist}",
#                         "meta": {"source": f"{src}/programs/{prog}/electives/{cat}"}
#                     })

#     return docs




#########################################################################




# #!/usr/bin/env python3
# import os
# import json
# import pickle
# from typing import List, Dict, Any
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Try to load a JSON file. If it fails with "Extra data",
#     wrap consecutive objects into a list. Returns dict, list, or {}.
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {'source': ...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # 1) Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # 2) Registrar office
#     if ro := data.get("registrar_office"):
#         for field in ("description", "admissions_policy"):
#             if val := ro.get(field, "").strip():
#                 docs.append({
#                     "text": val,
#                     "meta": {"source": f"{src}/registrar_office/{field}"}
#                 })

#     # 3) Admission ad
#     if ad := data.get("admission_ad"):
#         for cat, lst in ad.get("programs", {}).items():
#             if isinstance(lst, list):
#                 docs.append({
#                     "text": f"{cat}: {', '.join(lst)}",
#                     "meta": {"source": f"{src}/admission_ad/programs/{cat}"}
#                 })
#         for field in ("financial_assistance_and_scholarships", "facilities", "key_points"):
#             if items := ad.get(field):
#                 docs.append({
#                     "text": f"{field.replace('_',' ')}: {'; '.join(items)}",
#                     "meta": {"source": f"{src}/admission_ad/{field}"}
#                 })
#         if note := ad.get("online_admission_test", {}).get("note", "").strip():
#             docs.append({
#                 "text": note,
#                 "meta": {"source": f"{src}/admission_ad/online_test_note"}
#             })
#         if link := ad.get("apply_online", "").strip():
#             docs.append({
#                 "text": f"Apply online at {link}",
#                 "meta": {"source": f"{src}/admission_ad/apply_online"}
#             })
#         if ct := ad.get("contact_details", {}):
#             contact = "; ".join(f"{k}: {v}" for k, v in ct.items())
#             docs.append({
#                 "text": f"Contact: {contact}",
#                 "meta": {"source": f"{src}/admission_ad/contact_details"}
#             })

#     # 4) Eligibility criteria
#     if ec := data.get("eligibility_criteria"):
#         for prog, details in ec.items():
#             if reqs := details.get("requirements"):
#                 docs.append({
#                     "text": f"{prog} requirements: {'; '.join(reqs)}",
#                     "meta": {"source": f"{src}/eligibility_criteria/{prog}"}
#                 })

#     # 5) Admission test
#     if at := data.get("admission_test"):
#         if general := at.get("general", "").strip():
#             docs.append({
#                 "text": general,
#                 "meta": {"source": f"{src}/admission_test/general"}
#             })
#         if mer := at.get("merit_determination"):
#             parts = "; ".join(f"{k}: {v}" for k, v in mer.items())
#             docs.append({
#                 "text": f"Merit formula: {parts}",
#                 "meta": {"source": f"{src}/admission_test/merit"}
#             })

#     # 6) Faculty
#     if faculty := data.get("faculty", []):
#         for f in faculty:
#             if name := f.get("name"):
#                 desig = f.get("designation", "")
#                 ints  = ", ".join(f.get("areasOfInterest", []) or f.get("areas_of_interest", []))
#                 txt   = f"{name} ({desig}). Interests: {ints}."
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/faculty/{name}"}
#                 })

#     # 7) Programs (common)
#     if progs := data.get("programs"):
#         if isinstance(progs, dict):
#             items = progs.items()
#         elif isinstance(progs, list):
#             items = [
#                 (p.get("name", f"program_{i}"), p)
#                 for i, p in enumerate(progs) if isinstance(p, dict)
#             ]
#         else:
#             items = []

#         for prog, details in items:
#             if overview := details.get("description", "").strip():
#                 docs.append({
#                     "text": f"{prog}: {overview}",
#                     "meta": {"source": f"{src}/programs/{prog}/description"}
#                 })
#             if scheme := details.get("schemeOfStudy", []):
#                 for sem in scheme:
#                     if isinstance(sem, dict):
#                         sem_num = sem.get("semester")
#                         courses = sem.get("courses", [])
#                         clist = "; ".join(
#                             f"{c.get('code','')} {c.get('courseTitle','') or c.get('title','')} ({c.get('creditHours','')})"
#                             for c in courses if isinstance(c, dict)
#                         )
#                         docs.append({
#                             "text": f"{prog} Sem {sem_num}: {clist}",
#                             "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}"}
#                         })
#             if elects := details.get("electives", {}):
#                 for cat, lst in elects.items():
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or ''}"
#                         for c in lst if isinstance(c, dict)
#                     )
#                     docs.append({
#                         "text": f"{prog} electives in {cat}: {clist}",
#                         "meta": {"source": f"{src}/programs/{prog}/electives/{cat}"}
#                     })

#     # 8) Fallback: any other top-level key → JSON dump
#     known = {
#         "description","registrar_office","admission_ad",
#         "eligibility_criteria","admission_test","faculty","programs"
#     }
#     for key, val in data.items():
#         if key in known:
#             continue
#         snippet = json.dumps(val, indent=2)
#         docs.append({
#             "text": snippet,
#             "meta": {"source": f"{src}/{key}"}
#         })

#     return docs




###################################################################################




# import os
# import json
# from typing import List, Dict, Any
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Try to load a JSON file. If it fails with "Extra data",
#     wrap consecutive objects into a list. Returns dict, list, or {}.
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {'source': ...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # 1) Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # 2) Registrar office
#     if ro := data.get("registrar_office"):
#         for field in ("description", "admissions_policy"):
#             if val := ro.get(field, "").strip():
#                 docs.append({
#                     "text": val,
#                     "meta": {"source": f"{src}/registrar_office/{field}"}
#                 })

#     # 3) Admission ad
#     if ad := data.get("admission_ad"):
#         # programs
#         for cat, lst in ad.get("programs", {}).items():
#             if isinstance(lst, list):
#                 docs.append({
#                     "text": f"{cat}: {', '.join(lst)}",
#                     "meta": {"source": f"{src}/admission_ad/programs/{cat}"}
#                 })
#         # scholarships, facilities, key points
#         for field in ("financial_assistance_and_scholarships", "facilities", "key_points"):
#             if items := ad.get(field):
#                 docs.append({
#                     "text": f"{field.replace('_',' ')}: {'; '.join(items)}",
#                     "meta": {"source": f"{src}/admission_ad/{field}"}
#                 })
#         # online admission test note
#         if note := ad.get("online_admission_test", {}).get("note", "").strip():
#             docs.append({
#                 "text": note,
#                 "meta": {"source": f"{src}/admission_ad/online_test_note"}
#             })
#         # accreditation & recognition
#         if acc := ad.get("accreditation_and_recognition", {}):
#             for k, v in acc.items():
#                 if isinstance(v, str):
#                     docs.append({
#                         "text": v,
#                         "meta": {"source": f"{src}/admission_ad/accreditation_and_recognition/{k}"}
#                     })
#                 elif isinstance(v, dict):
#                     text = "; ".join(f"{kk}: {vv}" for kk, vv in v.items())
#                     docs.append({
#                         "text": text,
#                         "meta": {"source": f"{src}/admission_ad/accreditation_and_recognition/{k}"}
#                     })
#         # apply link
#         if link := ad.get("apply_online", "").strip():
#             docs.append({
#                 "text": f"Apply online at {link}",
#                 "meta": {"source": f"{src}/admission_ad/apply_online"}
#             })
#         # contact details
#         if ct := ad.get("contact_details", {}):
#             contact = "; ".join(f"{k}: {v}" for k, v in ct.items())
#             docs.append({
#                 "text": f"Contact: {contact}",
#                 "meta": {"source": f"{src}/admission_ad/contact_details"}
#             })

#     # 4) Eligibility criteria
#     if ec := data.get("eligibility_criteria"):
#         for prog, details in ec.items():
#             if reqs := details.get("requirements"):
#                 docs.append({
#                     "text": f"{prog} requirements: {'; '.join(reqs)}",
#                     "meta": {"source": f"{src}/eligibility_criteria/{prog}"}
#                 })

#     # 5) Admission test
#     if at := data.get("admission_test"):
#         if general := at.get("general", "").strip():
#             docs.append({
#                 "text": general,
#                 "meta": {"source": f"{src}/admission_test/general"}
#             })
#         if mer := at.get("merit_determination"):
#             parts = "; ".join(f"{k}: {v}" for k, v in mer.items())
#             docs.append({
#                 "text": f"Merit formula: {parts}",
#                 "meta": {"source": f"{src}/admission_test/merit"}
#             })

#     # 6) Faculty
#     if faculty := data.get("faculty", []):
#         for f in faculty:
#             if name := f.get("name"):
#                 desig = f.get("designation", "")
#                 ints  = ", ".join(f.get("areasOfInterest", []) or f.get("areas_of_interest", []))
#                 txt   = f"{name} ({desig}). Interests: {ints}."
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/faculty/{name}"}
#                 })

#     # 7) Programs (common)
#     if progs := data.get("programs"):
#         if isinstance(progs, dict):
#             items = progs.items()
#         elif isinstance(progs, list):
#             items = [
#                 (p.get("name", f"program_{i}"), p)
#                 for i, p in enumerate(progs) if isinstance(p, dict)
#             ]
#         else:
#             items = []

#         for prog, details in items:
#             if overview := details.get("description", "").strip():
#                 docs.append({
#                     "text": f"{prog}: {overview}",
#                     "meta": {"source": f"{src}/programs/{prog}/description"}
#                 })
#             if scheme := details.get("schemeOfStudy", []):
#                 for sem in scheme:
#                     if isinstance(sem, dict):
#                         sem_num = sem.get("semester")
#                         courses = sem.get("courses", [])
#                         clist = "; ".join(
#                             f"{c.get('code','')} {c.get('courseTitle','') or c.get('title','')} ({c.get('creditHours','')})"
#                             for c in courses if isinstance(c, dict)
#                         )
#                         docs.append({
#                             "text": f"{prog} Sem {sem_num}: {clist}",
#                             "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}"}
#                         })
#             if elects := details.get("electives", {}):
#                 for cat, lst in elects.items():
#                     clist = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','') or ''}"
#                         for c in lst if isinstance(c, dict)
#                     )
#                     docs.append({
#                         "text": f"{prog} electives in {cat}: {clist}",
#                         "meta": {"source": f"{src}/programs/{prog}/electives/{cat}"}
#                     })

#     # 8) Fallback: any other top-level key → JSON dump
#     known = {
#         "description","registrar_office","admission_ad",
#         "eligibility_criteria","admission_test","faculty","programs"
#     }
#     for key, val in data.items():
#         if key in known:
#             continue
#         snippet = json.dumps(val, indent=2)
#         docs.append({
#             "text": snippet,
#             "meta": {"source": f"{src}/{key}"}
#         })

#     return docs



###################################################################################


# import os
# import json
# from typing import List, Dict, Any
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Try to load a JSON file. If it fails with "Extra data",
#     wrap consecutive objects into a list. Returns dict, list, or {}.
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {'source': ...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # 1) Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # 2) Registrar office
#     if ro := data.get("registrar_office"):
#         for field in ("description", "admissions_policy"):
#             if val := ro.get(field, "").strip():
#                 docs.append({
#                     "text": val,
#                     "meta": {"source": f"{src}/registrar_office/{field}"}
#                 })

#     # 3) Admission ad
#     if ad := data.get("admission_ad"):
#         # programs
#         for cat, lst in ad.get("programs", {}).items():
#             if isinstance(lst, list):
#                 docs.append({
#                     "text": f"{cat}: {', '.join(lst)}",
#                     "meta": {"source": f"{src}/admission_ad/programs/{cat}"}
#                 })
#         # scholarships, facilities, key points
#         for field in ("financial_assistance_and_scholarships", "facilities", "key_points"):
#             if items := ad.get(field):
#                 docs.append({
#                     "text": f"{field.replace('_',' ')}: {'; '.join(items)}",
#                     "meta": {"source": f"{src}/admission_ad/{field}"}
#                 })
#         # online admission test note
#         if note := ad.get("online_admission_test", {}).get("note", "").strip():
#             docs.append({
#                 "text": note,
#                 "meta": {"source": f"{src}/admission_ad/online_test_note"}
#             })
#         # accreditation & recognition
#         if acc := ad.get("accreditation_and_recognition", {}):
#             for k, v in acc.items():
#                 if isinstance(v, str):
#                     docs.append({
#                         "text": v,
#                         "meta": {"source": f"{src}/admission_ad/accreditation_and_recognition/{k}"}
#                     })
#                 elif isinstance(v, dict):
#                     text = "; ".join(f"{kk}: {vv}" for kk, vv in v.items())
#                     docs.append({
#                         "text": text,
#                         "meta": {"source": f"{src}/admission_ad/accreditation_and_recognition/{k}"}
#                     })
#         # apply link
#         if link := ad.get("apply_online", "").strip():
#             docs.append({
#                 "text": f"Apply online at {link}",
#                 "meta": {"source": f"{src}/admission_ad/apply_online"}
#             })
#         # contact details
#         if ct := ad.get("contact_details", {}):
#             contact = "; ".join(f"{k}: {v}" for k, v in ct.items())
#             docs.append({
#                 "text": f"Contact: {contact}",
#                 "meta": {"source": f"{src}/admission_ad/contact_details"}
#             })

#     # 4) Eligibility criteria
#     if ec := data.get("eligibility_criteria"):
#         for prog, details in ec.items():
#             if reqs := details.get("requirements"):
#                 docs.append({
#                     "text": f"{prog} requirements: {'; '.join(reqs)}",
#                     "meta": {"source": f"{src}/eligibility_criteria/{prog}"}
#                 })

#     # 5) Admission test
#     if at := data.get("admission_test"):
#         if general := at.get("general", "").strip():
#             docs.append({
#                 "text": general,
#                 "meta": {"source": f"{src}/admission_test/general"}
#             })
#         if mer := at.get("merit_determination"):
#             parts = "; ".join(f"{k}: {v}" for k, v in mer.items())
#             docs.append({
#                 "text": f"Merit formula: {parts}",
#                 "meta": {"source": f"{src}/admission_test/merit"}
#             })

#     # 6) Faculty
#     if faculty := data.get("faculty", []):
#         for f in faculty:
#             if name := f.get("name"):
#                 desig = f.get("designation", "")
#                 ints  = ", ".join(f.get("areasOfInterest", []) or f.get("areas_of_interest", []))
#                 txt   = f"{name} ({desig}). Interests: {ints}."
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/faculty/{name}"}
#                 })

#     # 7) Programs (common)
#     if progs := data.get("programs"):
#         items = progs.items() if isinstance(progs, dict) else []
#         for prog, details in items:
#             # 7a) program overview
#             if overview := details.get("description", "").strip():
#                 docs.append({
#                     "text": overview,
#                     "meta": {"source": f"{src}/programs/{prog}/description"}
#                 })

#             # 7b) semester schemes + total credit hours
#             if scheme := details.get("schemeOfStudy", []):
#                 for sem in scheme:
#                     sem_num = sem.get("semester")
#                     # per-course listing
#                     courses = sem.get("courses", [])
#                     clist   = "; ".join(
#                         f"{c.get('code','')} {c.get('courseTitle','')} ({c.get('creditHours','')})"
#                         for c in courses if isinstance(c, dict)
#                     )
#                     docs.append({
#                         "text": f"{prog} Sem {sem_num}: {clist}",
#                         "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}/courses"}
#                     })
#                     # **new** total credit hours
#                     if total := sem.get("totalCreditHours"):
#                         docs.append({
#                             "text": f"{prog} Semester {sem_num} total credit hours: {total}",
#                             "meta": {"source": f"{src}/programs/{prog}/sem{sem_num}/totalCreditHours"}
#                         })

#             # 7c) supporting‑courses block
#             if prog.lower().endswith("supportingcourses"):
#                 if desc := details.get("description"):
#                     docs.append({
#                         "text": desc,
#                         "meta": {"source": f"{src}/programs/{prog}/description"}
#                     })
#                 for c in details.get("courses", []):
#                     docs.append({
#                         "text": f"{c.get('code')} {c.get('courseTitle')} ({c.get('creditHours')})",
#                         "meta": {"source": f"{src}/programs/{prog}/courses/{c.get('code')}"}
#                     })

#             # 7d) elective‑courses block
#             if prog.lower().endswith("electivecourses"):
#                 if desc := details.get("description"):
#                     docs.append({
#                         "text": desc,
#                         "meta": {"source": f"{src}/programs/{prog}/description"}
#                     })
#                 for c in details.get("courses", []):
#                     docs.append({
#                         "text": f"{c.get('code')} {c.get('courseTitle')} ({c.get('creditHours')})",
#                         "meta": {"source": f"{src}/programs/{prog}/courses/{c.get('code')}"}
#                     })

#     # 8) Fallback: any other top-level key → JSON dump
#     known = {
#         "description","registrar_office","admission_ad",
#         "eligibility_criteria","admission_test","faculty","programs"
#     }
#     for key, val in data.items():
#         if key in known:
#             continue
#         snippet = json.dumps(val, indent=2)
#         docs.append({
#             "text": snippet,
#             "meta": {"source": f"{src}/{key}"}
#         })

#     return docs




# import os
# import json
# from typing import List, Dict, Any
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Try to load a JSON file. If it fails with "Extra data",
#     wrap consecutive objects into a list. Returns dict, list, or {}.
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {'source': ...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # 1) Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # 2) Registrar office / officeOfRegistrar
#     ro = data.get("registrar_office") or data.get("officeOfRegistrar")
#     if isinstance(ro, dict):
#         for orig, norm in (
#             ("description", "description"),
#             ("admissions_policy", "admissions_policy"),
#             ("admissionsPolicy", "admissions_policy"),
#             ("policy", "policy"),
#         ):
#             val = ro.get(orig, "")
#             if isinstance(val, str) and (txt := val.strip()):
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/registrar_office/{norm}"}
#                 })

#     # 3) Instructions
#     if instrs := data.get("instructions"):
#         for i, ins in enumerate(instrs, 1):
#             if isinstance(ins, str) and (txt := ins.strip()):
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/instructions/{i}"}
#                 })

#     # 4) Provisional admission note
#     for key in ("provisional_admission_note", "provisionalAdmissionNote"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 5) Facilities
#     if fac := data.get("facilities"):
#         if isinstance(fac, list) and fac:
#             docs.append({
#                 "text": "Facilities: " + "; ".join(fac),
#                 "meta": {"source": f"{src}/facilities"}
#             })

#     # 6) Admission test / admissionTest
#     at = data.get("admission_test") or data.get("admissionTest")
#     if isinstance(at, dict):
#         if formats := at.get("formats"):
#             for prog, subs in formats.items():
#                 if isinstance(subs, dict):
#                     for subj, perc in subs.items():
#                         docs.append({
#                             "text": f"{prog} admission test {subj}: {perc}",
#                             "meta": {"source": f"{src}/admission_test/formats/{prog}/{subj}"}
#                         })
#         if elig := at.get("eligibility") or at.get("eligibility_criteria"):
#             if txt := str(elig).strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/admission_test/eligibility"}
#                 })

#     # 7) Programs offered / programsOffered
#     po = data.get("programs_offered") or data.get("programsOffered")
#     if isinstance(po, dict):
#         for deg, progs in po.items():
#             if isinstance(progs, list) and progs:
#                 docs.append({
#                     "text": f"{deg}: {', '.join(progs)}",
#                     "meta": {"source": f"{src}/programs_offered/{deg}"}
#                 })

#     # 8) Merit calculation (Engineering)
#     mc = data.get("meritCalculationEngineering") or data.get("merit_calculation_engineering")
#     if isinstance(mc, dict) and mc:
#         parts = "; ".join(f"{k}: {v}" for k, v in mc.items())
#         docs.append({
#             "text": f"Merit calculation: {parts}",
#             "meta": {"source": f"{src}/merit_calculation_engineering"}
#         })

#     # 9) Online admission / onlineAdmission
#     oa = data.get("online_admission") or data.get("onlineAdmission")
#     if isinstance(oa, dict):
#         for field in ("BSPrograms", "BSPrograms", "notes"):
#             if val := oa.get(field):
#                 if txt := str(val).strip():
#                     docs.append({
#                         "text": f"{field}: {txt}",
#                         "meta": {"source": f"{src}/online_admission/{field}"}
#                     })

#     # 10) Key points / keyPoints
#     for key in ("key_points", "keyPoints"):
#         if kps := data.get(key):
#             if isinstance(kps, list) and kps:
#                 docs.append({
#                     "text": f"Key points: {'; '.join(kps)}",
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 11) Accreditation / accreditation_and_recognition
#     acc = data.get("accreditation") or data.get("accreditation_and_recognition")
#     if isinstance(acc, dict):
#         for k, v in acc.items():
#             if isinstance(v, str):
#                 txt = v.strip()
#             elif isinstance(v, dict):
#                 txt = "; ".join(f"{kk}: {vv}" for kk, vv in v.items())
#             else:
#                 continue
#             if txt:
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/accreditation/{k}"}
#                 })

#     # 12) Contact details / contactDetails
#     ct = data.get("contact_details") or data.get("contactDetails")
#     if isinstance(ct, dict):
#         for k, v in ct.items():
#             if isinstance(v, list):
#                 txt = f"{k}: {', '.join(map(str, v))}"
#             else:
#                 txt = f"{k}: {v}"
#             if txt:
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/contact_details/{k}"}
#                 })

#     # 13) Announcement of results
#     for key in ("announcementOfResults", "announcement_of_results"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 14) Late admissions
#     for key in ("late_admissions", "lateAdmissions"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 15) Registration and Enrollment
#     rr = data.get("registration_and_enrollment") or data.get("registrationAndEnrollment")
#     if isinstance(rr, dict):
#         if proc := rr.get("process", "").strip():
#             docs.append({
#                 "text": proc,
#                 "meta": {"source": f"{src}/registration_and_enrollment/process"}
#             })
#         if prov := rr.get("provisional", "").strip():
#             docs.append({
#                 "text": prov,
#                 "meta": {"source": f"{src}/registration_and_enrollment/provisional"}
#             })

#     # 16) Internal Transfer
#     for key in ("internal_transfer", "internalTransfer"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 17) Fallback: dump any other top-level key not covered above
#     covered = {
#         "description", "registrar_office", "officeOfRegistrar",
#         "instructions", "provisional_admission_note", "provisionalAdmissionNote",
#         "facilities", "admission_ad", "eligibility_criteria",
#         "admission_test", "admissionTest", "programs",
#         "programs_offered", "programsOffered",
#         "meritCalculationEngineering", "merit_calculation_engineering",
#         "online_admission", "onlineAdmission",
#         "key_points", "keyPoints",
#         "accreditation", "accreditation_and_recognition",
#         "contact_details", "contactDetails",
#         "announcementOfResults", "announcement_of_results",
#         "late_admissions", "lateAdmissions",
#         "registration_and_enrollment", "registrationAndEnrollment",
#         "internal_transfer", "internalTransfer"
#     }
#     for key, val in data.items():
#         if key in covered:
#             continue
#         snippet = json.dumps(val, indent=2)
#         docs.append({
#             "text": snippet,
#             "meta": {"source": f"{src}/{key}"}
#         })

#     return docs


# import os
# import json
# from typing import List, Dict, Any
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Try to load a JSON file. If it fails with "Extra data",
#     wrap consecutive objects into a list. Returns dict, list, or {}.
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {'source': ...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # 1) Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # 1.a) Department name (for program files)
#     if dept := data.get("department"):
#         docs.append({
#             "text": f"Department: {dept}",
#             "meta": {"source": f"{src}/department"}
#         })

#     # 1.b) Faculty directory (if present)
#     if faculty := data.get("faculty"):
#         for fac in faculty:
#             name  = fac.get("name", "").strip()
#             title = fac.get("title", "").strip()
#             email = fac.get("email", "").strip()
#             if name:
#                 txt = name
#                 if title:
#                     txt += f", {title}"
#                 if email:
#                     txt += f", email: {email}"
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/faculty/{name.replace(' ', '_')}"}
#                 })

#     # 1.c) Programs offered (BS_/MS_/PhD blocks)
#     if progs := data.get("programs"):
#         # e.g. {"undergrad": [...], "postgrad": [...], "PhD": [...]}
#         for level, plist in progs.items():
#             if isinstance(plist, list):
#                 for prog in plist:
#                     code  = prog.get("code", "").strip()
#                     title = prog.get("courseTitle", prog.get("course_title", "")).strip()
#                     creds = prog.get("creditHours", prog.get("credit_hours", ""))
#                     parts = [p for p in (code, title, f"{creds}-cr") if p]
#                     txt = " | ".join(parts)
#                     docs.append({
#                         "text": txt,
#                         "meta": {"source": f"{src}/programs/{level}/{code}"}
#                     })

#     # 2) Registrar office / officeOfRegistrar
#     ro = data.get("registrar_office") or data.get("officeOfRegistrar")
#     if isinstance(ro, dict):
#         for orig, norm in (
#             ("description", "description"),
#             ("admissions_policy", "admissions_policy"),
#             ("admissionsPolicy", "admissions_policy"),
#             ("policy", "policy"),
#         ):
#             val = ro.get(orig, "")
#             if isinstance(val, str) and (txt := val.strip()):
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/registrar_office/{norm}"}
#                 })

#     # 3) Instructions
#     if instrs := data.get("instructions"):
#         for i, ins in enumerate(instrs, 1):
#             if isinstance(ins, str) and (txt := ins.strip()):
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/instructions/{i}"}
#                 })

#     # 4) Provisional admission note
#     for key in ("provisional_admission_note", "provisionalAdmissionNote"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 5) Facilities (services like cafeteria, hostel, transport)
#     fac = data.get("facilities")
#     if isinstance(fac, dict):
#         # 5.a) Cafeteria, Hostel, Sports descriptions
#         for svc in ("cafeteria", "hostelFacility", "sportsFacilities", "hostelFacility"):
#             if section := fac.get(svc):
#                 # handle either dict with "description" or list of strings
#                 if isinstance(section, dict):
#                     desc = section.get("description", "").strip()
#                 elif isinstance(section, list):
#                     desc = "; ".join(s.strip() for s in section if isinstance(s, str))
#                 else:
#                     desc = ""
#                 if desc:
#                     docs.append({
#                         "text": desc,
#                         "meta": {"source": f"{src}/facilities/{svc}/description"}
#                     })

#         # 5.b) Transport block
#         if t := fac.get("transport"):
#             # overall transport description
#             if desc := t.get("description", "").strip():
#                 docs.append({
#                     "text": desc,
#                     "meta": {"source": f"{src}/facilities/transport/description"}
#                 })
#             # contact numbers
#             if nums := t.get("contactNumbers") or t.get("contact_numbers"):
#                 docs.append({
#                     "text": "Transport contacts: " + ", ".join(nums),
#                     "meta": {"source": f"{src}/facilities/transport/contactNumbers"}
#                 })
#             # each route's drivers & stops
#             if routes := t.get("routes"):
#                 for route_name, info in routes.items():
#                     # driver contacts
#                     if drivers := info.get("driverContact") or info.get("driver_contact"):
#                         for drv, drv_nums in drivers.items():
#                             docs.append({
#                                 "text": f"{route_name} route driver: {drv}, contacts: {', '.join(drv_nums)}",
#                                 "meta": {"source": f"{src}/facilities/transport/routes/{route_name}/driverContact"}
#                             })
#                     # stops list
#                     if stops := info.get("stops", []):
#                         for stop in stops:
#                             name = stop.get("stopName", stop.get("stop", "")).strip()
#                             time = stop.get("time", "").strip()
#                             num  = stop.get("stopNumber") or stop.get("stop_number")
#                             snippet = name
#                             if time:
#                                 snippet += f" at {time}"
#                             if num is not None:
#                                 snippet += f" (#{num})"
#                             docs.append({
#                                 "text": snippet,
#                                 "meta": {"source": f"{src}/facilities/transport/routes/{route_name}/stops/{name.replace(' ','_')}"}
#                             })

#     # 6) Admission test / admissionTest
#     at = data.get("admission_test") or data.get("admissionTest")
#     if isinstance(at, dict):
#         if formats := at.get("formats"):
#             for prog, subs in formats.items():
#                 if isinstance(subs, dict):
#                     for subj, perc in subs.items():
#                         docs.append({
#                             "text": f"{prog} admission test {subj}: {perc}",
#                             "meta": {"source": f"{src}/admission_test/formats/{prog}/{subj}"}
#                         })
#         if elig := at.get("eligibility") or at.get("eligibility_criteria"):
#             if txt := str(elig).strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/admission_test/eligibility"}
#                 })

#     # 7) Programs offered / programsOffered
#     po = data.get("programs_offered") or data.get("programsOffered")
#     if isinstance(po, dict):
#         for deg, plist in po.items():
#             if isinstance(plist, list) and plist:
#                 docs.append({
#                     "text": f"{deg}: {', '.join(plist)}",
#                     "meta": {"source": f"{src}/programs_offered/{deg}"}
#                 })

#     # 8) Merit calculation (Engineering)
#     mc = data.get("meritCalculationEngineering") or data.get("merit_calculation_engineering")
#     if isinstance(mc, dict) and mc:
#         parts = "; ".join(f"{k}: {v}" for k, v in mc.items())
#         docs.append({
#             "text": f"Merit calculation: {parts}",
#             "meta": {"source": f"{src}/merit_calculation_engineering"}
#         })

#     # 9) Online admission / onlineAdmission
#     oa = data.get("online_admission") or data.get("onlineAdmission")
#     if isinstance(oa, dict):
#         for field in ("BSPrograms", "notes"):
#             if val := oa.get(field):
#                 if txt := str(val).strip():
#                     docs.append({
#                         "text": f"{field}: {txt}",
#                         "meta": {"source": f"{src}/online_admission/{field}"}
#                     })

#     # 10) Key points / keyPoints
#     for key in ("key_points", "keyPoints"):
#         if kps := data.get(key):
#             if isinstance(kps, list) and kps:
#                 docs.append({
#                     "text": f"Key points: {'; '.join(kps)}",
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 11) Accreditation / accreditation_and_recognition
#     acc = data.get("accreditation") or data.get("accreditation_and_recognition")
#     if isinstance(acc, dict):
#         for k, v in acc.items():
#             if isinstance(v, str):
#                 txt = v.strip()
#             elif isinstance(v, dict):
#                 txt = "; ".join(f"{kk}: {vv}" for kk, vv in v.items())
#             else:
#                 continue
#             if txt:
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/accreditation/{k}"}
#                 })

#     # 12) Contact details / contactDetails
#     ct = data.get("contact_details") or data.get("contactDetails")
#     if isinstance(ct, dict):
#         for k, v in ct.items():
#             if isinstance(v, list):
#                 txt = f"{k}: {', '.join(map(str, v))}"
#             else:
#                 txt = f"{k}: {v}"
#             if txt:
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/contact_details/{k}"}
#                 })

#     # 13) Announcement of results
#     for key in ("announcementOfResults", "announcement_of_results"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 14) Late admissions
#     for key in ("late_admissions", "lateAdmissions"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 15) Registration and Enrollment
#     rr = data.get("registration_and_enrollment") or data.get("registrationAndEnrollment")
#     if isinstance(rr, dict):
#         if proc := rr.get("process", "").strip():
#             docs.append({
#                 "text": proc,
#                 "meta": {"source": f"{src}/registration_and_enrollment/process"}
#             })
#         if prov := rr.get("provisional", "").strip():
#             docs.append({
#                 "text": prov,
#                 "meta": {"source": f"{src}/registration_and_enrollment/provisional"}
#             })

#     # 16) Internal Transfer
#     for key in ("internal_transfer", "internalTransfer"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     # 17) Fallback: dump any other top-level key not covered above
#     covered = {
#         "description", "department", "faculty", "programs",
#         "registrar_office", "officeOfRegistrar",
#         "instructions", "provisional_admission_note", "provisionalAdmissionNote",
#         "facilities", "admission_ad", "eligibility_criteria",
#         "admission_test", "admissionTest", "programs_offered", "programsOffered",
#         "meritCalculationEngineering", "merit_calculation_engineering",
#         "online_admission", "onlineAdmission",
#         "key_points", "keyPoints",
#         "accreditation", "accreditation_and_recognition",
#         "contact_details", "contactDetails",
#         "announcementOfResults", "announcement_of_results",
#         "late_admissions", "lateAdmissions",
#         "registration_and_enrollment", "registrationAndEnrollment",
#         "internal_transfer", "internalTransfer"
#     }
#     for key, val in data.items():
#         if key in covered:
#             continue
#         snippet = json.dumps(val, indent=2)
#         docs.append({
#             "text": snippet,
#             "meta": {"source": f"{src}/{key}"}
#         })

#     return docs


#######################################


# import os
# import json
# import re
# from typing import Any, Dict, List
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     text = open(path, encoding="utf-8").read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️ Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {'source': ...}} chunks.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # 1) Generic description
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})

#     # 1.a) Department name
#     if dept := data.get("department"):
#         docs.append({
#             "text": f"Department: {dept}",
#             "meta": {"source": f"{src}/department"}
#         })

#     # 1.b) Faculty directory
#     if faculty := data.get("faculty"):
#         for fac in faculty:
#             name  = fac.get("name", "").strip()
#             title = fac.get("title", "").strip()
#             email = fac.get("email", "").strip()
#             if name:
#                 txt = name
#                 if title:
#                     txt += f", {title}"
#                 if email:
#                     txt += f", email: {email}"
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/faculty/{name.replace(' ', '_')}"}
#                 })

#     # 2) Programs offered & explicit semester flattening
#     if progs := data.get("programs"):
#         # 2.a) flat lists
#         for level, plist in progs.items():
#             if isinstance(plist, list):
#                 for prog in plist:
#                     code  = prog.get("code", "").strip()
#                     title = prog.get("courseTitle", prog.get("course_title", "")).strip()
#                     creds = prog.get("creditHours", prog.get("credit_hours", ""))
#                     parts = [p for p in (code, title, f"{creds}-cr") if p]
#                     txt   = " | ".join(parts)
#                     docs.append({
#                         "text": txt,
#                         "meta": {"source": f"{src}/programs/{level}/{code}"}
#                     })

#         # 2.b) by-semester dicts
#         for level, semdict in progs.items():
#             if isinstance(semdict, dict):
#                 for sem_key, courses in semdict.items():
#                     if isinstance(courses, list):
#                         sem_label = re.sub(r"([0-9]+)([A-Za-z]+)", r"\1 \2", sem_key)
#                         sem_label = sem_label.replace("_", " ").title()
#                         for course in courses:
#                             code  = course.get("code", "").strip()
#                             title = course.get("courseTitle", course.get("course_title", "")).strip()
#                             creds = course.get("creditHours", course.get("credit_hours", ""))
#                             parts = [p for p in (code, title, f"{creds}cr") if p]
#                             txt   = f"{sem_label} — " + " | ".join(parts)
#                             docs.append({
#                                 "text": txt,
#                                 "meta": {"source": f"{src}/programs/{level}/{sem_key}/{code}"}
#                             })

#     # 3) Registrar office / policy
#     ro = data.get("registrar_office") or data.get("officeOfRegistrar")
#     if isinstance(ro, dict):
#         for orig, norm in (
#             ("description","description"),
#             ("admissions_policy","admissions_policy"),
#             ("admissionsPolicy","admissions_policy"),
#             ("policy","policy")
#         ):
#             if val := (ro.get(orig) or "").strip():
#                 docs.append({
#                     "text": val,
#                     "meta": {"source": f"{src}/registrar_office/{norm}"}
#                 })

#     # 4) Admission criteria, eligibility & policies
#     if ap := data.get("admission_policy"):
#         docs.append({
#             "text": ap.strip(),
#             "meta": {"source": f"{src}/admission_policy"}
#         })
#     if elig := data.get("admission_eligibility") or data.get("eligibility_criteria"):
#         docs.append({
#             "text": str(elig).strip(),
#             "meta": {"source": f"{src}/admission_eligibility"}
#         })

#     # 5) Admission test breakdown
#     at = data.get("admission_test") or data.get("admissionTest")
#     if isinstance(at, dict):
#         if formats := at.get("formats"):
#             for prog, subs in formats.items():
#                 if isinstance(subs, dict):
#                     for subj, perc in subs.items():
#                         docs.append({
#                             "text": f"{prog} admission test {subj}: {perc}",
#                             "meta": {"source": f"{src}/admission_test/formats/{prog}/{subj}"}
#                         })
#         if txt := (at.get("eligibility") or "").strip():
#             docs.append({
#                 "text": txt,
#                 "meta": {"source": f"{src}/admission_test/eligibility"}
#             })

#     # 6) Fee structure
#     if fee := data.get("fee_structure") or data.get("fees"):
#         if isinstance(fee, dict):
#             for prog, amount in fee.items():
#                 docs.append({
#                     "text": f"Fee for {prog}: {amount}",
#                     "meta": {"source": f"{src}/fee_structure/{prog}"}
#                 })

#     # 7) Deadlines
#     if dl := data.get("deadlines"):
#         for name, date in dl.items():
#             docs.append({
#                 "text": f"{name.replace('_',' ').title()} deadline: {date}",
#                 "meta": {"source": f"{src}/deadlines/{name}"}
#             })

#     # 8) Facilities: cafeteria, hostel, sports
#     fac = data.get("facilities")
#     if isinstance(fac, dict):
#         for svc in ("cafeteria","hostel","sports","sportsFacilities"):
#             if section := fac.get(svc):
#                 desc = ""
#                 if isinstance(section, dict):
#                     desc = section.get("description","").strip()
#                 elif isinstance(section, list):
#                     desc = "; ".join(s.strip() for s in section if isinstance(s,str))
#                 if desc:
#                     docs.append({
#                         "text": desc,
#                         "meta": {"source": f"{src}/facilities/{svc}/description"}
#                     })

#         # 8.b) Transport & bus routes
#         if t := fac.get("transport"):
#             if desc := t.get("description","").strip():
#                 docs.append({
#                     "text": desc,
#                     "meta": {"source": f"{src}/facilities/transport/description"}
#                 })
#             if nums := t.get("contactNumbers") or t.get("contact_numbers"):
#                 docs.append({
#                     "text": "Transport contacts: " + ", ".join(nums),
#                     "meta": {"source": f"{src}/facilities/transport/contactNumbers"}
#                 })
#             if routes := t.get("routes"):
#                 for route_name, info in routes.items():
#                     # driver contacts
#                     if drivers := info.get("driverContact") or info.get("driver_contact"):
#                         for drv, drv_nums in drivers.items():
#                             docs.append({
#                                 "text": f"{route_name} route driver: {drv}, contacts: {', '.join(drv_nums) if isinstance(drv_nums,list) else drv_nums}",
#                                 "meta": {"source": f"{src}/facilities/transport/routes/{route_name}/driverContact"}
#                             })
#                     # stops & timings
#                     if stops := info.get("stops", []):
#                         for stop in stops:
#                             name = stop.get("stopName", stop.get("stop","")).strip()
#                             time = stop.get("time","").strip()
#                             num  = stop.get("stopNumber") or stop.get("stop_number")
#                             snippet = name
#                             if time:
#                                 snippet += f" at {time}"
#                             if num is not None:
#                                 snippet += f" (#{num})"
#                             docs.append({
#                                 "text": snippet,
#                                 "meta": {"source": f"{src}/facilities/transport/routes/{route_name}/stops/{name.replace(' ','_')}"}
#                             })

#     # 9) Library & DSA support
#     if lib := data.get("library"):
#         docs.append({
#             "text": json.dumps(lib, ensure_ascii=False),
#             "meta": {"source": f"{src}/library"}
#         })
#     if dsa := data.get("dsa") or data.get("disability_support"):
#         docs.append({
#             "text": json.dumps(dsa, ensure_ascii=False),
#             "meta": {"source": f"{src}/dsa"}
#         })

#     # 10) Transfer & refund policies
#     if tp := data.get("transfer_policy"):
#         docs.append({
#             "text": tp.strip(),
#             "meta": {"source": f"{src}/transfer_policy"}
#         })
#     if rp := data.get("refund_policy"):
#         docs.append({
#             "text": rp.strip(),
#             "meta": {"source": f"{src}/refund_policy"}
#         })

#     # 11) Registration & enrollment
#     rr = data.get("registration_and_enrollment") or data.get("registrationAndEnrollment")
#     if isinstance(rr, dict):
#         if proc := rr.get("process","").strip():
#             docs.append({
#                 "text": proc,
#                 "meta": {"source": f"{src}/registration_and_enrollment/process"}
#             })
#         if prov := rr.get("provisional","").strip():
#             docs.append({
#                 "text": prov,
#                 "meta": {"source": f"{src}/registration_and_enrollment/provisional"}
#             })

#     # 12) Announcement, late admissions, key points, accreditation, contacts
#     for key in ("announcementOfResults","announcement_of_results",
#                 "late_admissions","lateAdmissions"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     for key in ("key_points","keyPoints"):
#         if kps := data.get(key):
#             if isinstance(kps, list) and kps:
#                 docs.append({
#                     "text": "Key points: " + "; ".join(kps),
#                     "meta": {"source": f"{src}/{key}"}
#                 })

#     acc = data.get("accreditation") or data.get("accreditation_and_recognition")
#     if isinstance(acc, dict):
#         for k, v in acc.items():
#             if isinstance(v, str):
#                 txt = v.strip()
#             elif isinstance(v, dict):
#                 txt = "; ".join(f"{kk}: {vv}" for kk, vv in v.items())
#             else:
#                 continue
#             if txt:
#                 docs.append({
#                     "text": txt,
#                     "meta": {"source": f"{src}/accreditation/{k}"}
#                 })

#     ct = data.get("contact_details") or data.get("contactDetails")
#     if isinstance(ct, dict):
#         for k, v in ct.items():
#             txt = f"{k}: {', '.join(v)}" if isinstance(v, list) else f"{k}: {v}"
#             docs.append({
#                 "text": txt,
#                 "meta": {"source": f"{src}/contact_details/{k}"}
#             })

#     # 13) Fallback: any other key not yet covered
#     covered = {
#         "description","department","faculty","programs","registrar_office","officeOfRegistrar",
#         "admission_policy","admission_eligibility","eligibility_criteria","admission_test","admissionTest",
#         "fee_structure","fees","deadlines","facilities","library","dsa","transfer_policy","refund_policy",
#         "registration_and_enrollment","registrationAndEnrollment","announcementOfResults","announcement_of_results",
#         "late_admissions","lateAdmissions","key_points","keyPoints","accreditation","accreditation_and_recognition",
#         "contact_details","contactDetails"
#     }
#     for key, val in data.items():
#         if key in covered:
#             continue
#         snippet = json.dumps(val, indent=2, ensure_ascii=False)
#         docs.append({
#             "text": snippet,
#             "meta": {"source": f"{src}/{key}"}
#         })

#     return docs


######################################################################

# import os
# import json
# import re
# from typing import Any, Dict, List
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     text = open(path, encoding="utf-8").read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️ Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     return a list of {'text': ..., 'meta': {'source': ...}} chunks
#     covering every key: programs, fees, deadlines, transport, faculty, etc.
#     """
#     docs: List[Dict[str, Any]] = []
#     if not isinstance(data, dict):
#         return docs

#     # 1) description & department
#     if text := data.get("description", "").strip():
#         docs.append({"text": text, "meta": {"source": f"{src}/description"}})
#     if dept := data.get("department"):
#         docs.append({"text": f"Department: {dept}",
#                      "meta": {"source": f"{src}/department"}})

#     # 2) faculty
#     if faculty := data.get("faculty"):
#         for fac in faculty:
#             name  = fac.get("name","").strip()
#             title = fac.get("title","").strip()
#             email = fac.get("email","").strip()
#             if name:
#                 txt = name
#                 if title: txt += f", {title}"
#                 if email: txt += f", email: {email}"
#                 docs.append({"text": txt,
#                              "meta": {"source": f"{src}/faculty/{name.replace(' ','_')}"}})

#     # 3) programs (flat lists and per-semester)
#     if progs := data.get("programs"):
#         # flat lists
#         for level, plist in progs.items():
#             if isinstance(plist, list):
#                 for prog in plist:
#                     code  = prog.get("code","").strip()
#                     title = prog.get("courseTitle", prog.get("course_title","")).strip()
#                     creds = prog.get("creditHours", prog.get("credit_hours",""))
#                     parts = [p for p in (code, title, f"{creds}-cr") if p]
#                     docs.append({"text": " | ".join(parts),
#                                  "meta": {"source": f"{src}/programs/{level}/{code}"}})
#         # by-semester dicts
#         for level, semdict in progs.items():
#             if isinstance(semdict, dict):
#                 for sem_key, courses in semdict.items():
#                     if isinstance(courses, list):
#                         sem_label = re.sub(r"([0-9]+)([A-Za-z]+)", r"\1 \2", sem_key)
#                         sem_label = sem_label.replace("_"," ").title()
#                         for course in courses:
#                             code  = course.get("code","").strip()
#                             title = course.get("courseTitle", course.get("course_title","")).strip()
#                             creds = course.get("creditHours", course.get("credit_hours",""))
#                             parts = [p for p in (code, title, f"{creds}cr") if p]
#                             docs.append({"text": f"{sem_label} — " + " | ".join(parts),
#                                          "meta": {"source": f"{src}/programs/{level}/{sem_key}/{code}"}})

#     # 4) registrar & admission policies
#     ro = data.get("registrar_office") or data.get("officeOfRegistrar")
#     if isinstance(ro, dict):
#         for orig,norm in (("description","description"),
#                           ("admissions_policy","admissions_policy"),
#                           ("policy","policy")):
#             if val := (ro.get(orig) or "").strip():
#                 docs.append({"text": val,
#                              "meta": {"source": f"{src}/registrar_office/{norm}"}})

#     if ap := data.get("admission_policy"):
#         docs.append({"text": ap.strip(),
#                      "meta": {"source": f"{src}/admission_policy"}})
#     if elig := data.get("admission_eligibility") or data.get("eligibility_criteria"):
#         docs.append({"text": str(elig).strip(),
#                      "meta": {"source": f"{src}/admission_eligibility"}})

#     # 5) admission test
#     at = data.get("admission_test") or data.get("admissionTest")
#     if isinstance(at, dict):
#         if formats := at.get("formats"):
#             for prog, subs in formats.items():
#                 if isinstance(subs, dict):
#                     for subj, perc in subs.items():
#                         docs.append({"text": f"{prog} admission test {subj}: {perc}",
#                                      "meta": {"source": f"{src}/admission_test/formats/{prog}/{subj}"}})
#         if txt := (at.get("eligibility") or "").strip():
#             docs.append({"text": txt,
#                          "meta": {"source": f"{src}/admission_test/eligibility"}})

#     # 6) fee structure
#     if fee := data.get("fee_structure") or data.get("fees"):
#         if isinstance(fee, dict):
#             for prog, amount in fee.items():
#                 docs.append({"text": f"Fee for {prog}: {amount}",
#                              "meta": {"source": f"{src}/fee_structure/{prog}"}})

#     # 7) deadlines
#     if dl := data.get("deadlines"):
#         for name, date in dl.items():
#             docs.append({"text": f"{name.replace('_',' ').title()} deadline: {date}",
#                          "meta": {"source": f"{src}/deadlines/{name}"}})

#     # 8) facilities: cafeteria, hostel, sports
#     fac = data.get("facilities")
#     if isinstance(fac, dict):
#         for svc in ("cafeteria","hostel","sports","sportsFacilities"):
#             if section := fac.get(svc):
#                 desc = ""
#                 if isinstance(section, dict):
#                     desc = section.get("description","").strip()
#                 elif isinstance(section, list):
#                     desc = "; ".join(s.strip() for s in section if isinstance(s,str))
#                 if desc:
#                     docs.append({"text": desc,
#                                  "meta": {"source": f"{src}/facilities/{svc}/description"}})

#         # transport & bus routes
#         if t := fac.get("transport"):
#             if desc := t.get("description","").strip():
#                 docs.append({"text": desc,
#                              "meta": {"source": f"{src}/facilities/transport/description"}})
#             if nums := t.get("contactNumbers") or t.get("contact_numbers"):
#                 docs.append({"text": "Transport contacts: " + ", ".join(nums),
#                              "meta": {"source": f"{src}/facilities/transport/contactNumbers"}})
#             if routes := t.get("routes"):
#                 for route_name, info in routes.items():
#                     # drivers
#                     if drivers := info.get("driverContact") or info.get("driver_contact"):
#                         for drv, drv_nums in drivers.items():
#                             docs.append({"text": f"{route_name} route driver: {drv}, contacts: {', '.join(drv_nums) if isinstance(drv_nums,list) else drv_nums}",
#                                          "meta": {"source": f"{src}/facilities/transport/routes/{route_name}/driverContact"}})
#                     # stops & timings
#                     if stops := info.get("stops", []):
#                         for stop in stops:
#                             name = stop.get("stopName", stop.get("stop","")).strip()
#                             time = stop.get("time","").strip()
#                             num  = stop.get("stopNumber") or stop.get("stop_number")
#                             snippet = name
#                             if time: snippet += f" at {time}"
#                             if num is not None: snippet += f" (#{num})"
#                             docs.append({"text": snippet,
#                                          "meta": {"source": f"{src}/facilities/transport/routes/{route_name}/stops/{name.replace(' ','_')}"}})

#     # 9) library & DSA
#     if lib := data.get("library"):
#         docs.append({"text": json.dumps(lib, ensure_ascii=False),
#                      "meta": {"source": f"{src}/library"}})
#     if dsa := data.get("dsa") or data.get("disability_support"):
#         docs.append({"text": json.dumps(dsa, ensure_ascii=False),
#                      "meta": {"source": f"{src}/dsa"}})

#     # 10) transfer & refund policies
#     if tp := data.get("transfer_policy"):
#         docs.append({"text": tp.strip(),
#                      "meta": {"source": f"{src}/transfer_policy"}})
#     if rp := data.get("refund_policy"):
#         docs.append({"text": rp.strip(),
#                      "meta": {"source": f"{src}/refund_policy"}})

#     # 11) registration & enrollment
#     rr = data.get("registration_and_enrollment") or data.get("registrationAndEnrollment")
#     if isinstance(rr, dict):
#         if proc := rr.get("process","").strip():
#             docs.append({"text": proc,
#                          "meta": {"source": f"{src}/registration_and_enrollment/process"}})
#         if prov := rr.get("provisional","").strip():
#             docs.append({"text": prov,
#                          "meta": {"source": f"{src}/registration_and_enrollment/provisional"}})

#     # 12) announcements, late admissions, key points, accreditation, contacts
#     for key in ("announcementOfResults","announcement_of_results",
#                 "late_admissions","lateAdmissions"):
#         if val := data.get(key, ""):
#             if txt := val.strip():
#                 docs.append({"text": txt,
#                              "meta": {"source": f"{src}/{key}"}})

#     for key in ("key_points","keyPoints"):
#         if kps := data.get(key):
#             if isinstance(kps, list) and kps:
#                 docs.append({"text": "Key points: " + "; ".join(kps),
#                              "meta": {"source": f"{src}/{key}"}})

#     acc = data.get("accreditation") or data.get("accreditation_and_recognition")
#     if isinstance(acc, dict):
#         for k, v in acc.items():
#             if isinstance(v, str):
#                 txt = v.strip()
#             elif isinstance(v, dict):
#                 txt = "; ".join(f"{kk}: {vv}" for kk,vv in v.items())
#             else:
#                 continue
#             if txt:
#                 docs.append({"text": txt,
#                              "meta": {"source": f"{src}/accreditation/{k}"}})

#     ct = data.get("contact_details") or data.get("contactDetails")
#     if isinstance(ct, dict):
#         for k, v in ct.items():
#             txt = f"{k}: {', '.join(v)}" if isinstance(v, list) else f"{k}: {v}"
#             docs.append({"text": txt,
#                          "meta": {"source": f"{src}/contact_details/{k}"}})

#     # fallback for any other key
#     covered = {
#         "description","department","faculty","programs","registrar_office","officeOfRegistrar",
#         "admission_policy","admission_eligibility","eligibility_criteria","admission_test","admissionTest",
#         "fee_structure","fees","deadlines","facilities","library","dsa","transfer_policy","refund_policy",
#         "registration_and_enrollment","registrationAndEnrollment","announcementOfResults","announcement_of_results",
#         "late_admissions","lateAdmissions","key_points","keyPoints","accreditation","accreditation_and_recognition",
#         "contact_details","contactDetails"
#     }
#     for key, val in data.items():
#         if key in covered:
#             continue
#         snippet = json.dumps(val, indent=2, ensure_ascii=False)
#         docs.append({"text": snippet,
#                      "meta": {"source": f"{src}/{key}"}})

#     return docs

#############################


import os
import json
import re
from typing import Any, Dict, List
from json import JSONDecodeError

def list_json_files(folder: str) -> List[str]:
    return [
        os.path.join(folder, f)
        for f in os.listdir(folder)
        if f.lower().endswith(".json")
    ]

def load_json(path: str) -> Any:
    text = open(path, encoding="utf-8").read()
    try:
        return json.loads(text)
    except JSONDecodeError:
        # Fix newline‐delimited JSON
        fixed = "[" + text.replace("}\n{", "},\n{") + "]"
        try:
            return json.loads(fixed)
        except JSONDecodeError:
            print(f"⚠️ Failed to parse JSON file: {path}")
            return {}

def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
    """
    Turn every field in one JSON object into searchable 
    {'text':..., 'meta':{'source':...}} chunks.
    """
    docs: List[Dict[str, Any]] = []
    if not isinstance(data, dict):
        return docs

    # 1) description & department
    if desc := data.get("description","").strip():
        docs.append({"text":desc, "meta":{"source":f"{src}/description"}})
    if dept := data.get("department"):
        docs.append({"text":f"Department: {dept}", "meta":{"source":f"{src}/department"}})

    # 2) faculty directory
    for fac in data.get("faculty", []):
        name, title, email = fac.get("name","").strip(), fac.get("title","").strip(), fac.get("email","").strip()
        if not name: continue
        parts = [name]
        if title: parts.append(title)
        if email: parts.append(f"email: {email}")
        docs.append({"text":", ".join(parts),
                     "meta":{"source":f"{src}/faculty/{name.replace(' ','_')}"}})

    # 3) programs & courses
    for level, entry in (data.get("programs") or {}).items():
        if isinstance(entry, list):
            for prog in entry:
                code  = prog.get("code","").strip()
                title = prog.get("courseTitle", prog.get("course_title","")).strip()
                creds = prog.get("creditHours", prog.get("credit_hours",""))
                txt   = " | ".join(p for p in (code, title, f"{creds}-cr") if p)
                docs.append({"text":txt, "meta":{"source":f"{src}/programs/{level}/{code}"}})
        elif isinstance(entry, dict):
            for sem, courses in entry.items():
                if not isinstance(courses, list): continue
                label = re.sub(r"([0-9]+)([A-Za-z]+)", r"\1 \2", sem).replace("_"," ").title()
                for course in courses:
                    code  = course.get("code","").strip()
                    title = course.get("courseTitle", course.get("course_title","")).strip()
                    creds = course.get("creditHours", course.get("credit_hours",""))
                    txt   = " | ".join(p for p in (code, title, f"{creds}cr") if p)
                    docs.append({"text":f"{label} — {txt}",
                                 "meta":{"source":f"{src}/programs/{level}/{sem}/{code}"}})

    # 4) admission policy & eligibility
    if ap := data.get("admission_policy"):
        docs.append({"text":ap.strip(), "meta":{"source":f"{src}/admission_policy"}})
    if elig := data.get("admission_eligibility") or data.get("eligibility_criteria"):
        docs.append({"text":str(elig).strip(), "meta":{"source":f"{src}/admission_eligibility"}})

    # 5) admission test breakdown
    at = data.get("admission_test") or data.get("admissionTest") or {}
    if isinstance(at, dict):
        for prog, subs in (at.get("formats") or {}).items():
            if isinstance(subs, dict):
                for subj, pct in subs.items():
                    docs.append({"text":f"{prog} admission test {subj}: {pct}",
                                 "meta":{"source":f"{src}/admission_test/formats/{prog}/{subj}"}})
        if txt := (at.get("eligibility") or "").strip():
            docs.append({"text":txt, "meta":{"source":f"{src}/admission_test/eligibility"}})

    # 6) fee‐related fields (catch all keys containing “fee”)
    for key, val in data.items():
        if re.search(r"fee", key, re.IGNORECASE):
            if isinstance(val, list):
                for item in val:
                    prog = item.get("program") or item.get("name") or "Unknown"
                    for fk, fv in item.items():
                        if fk.lower() in ("program","name"): continue
                        docs.append({"text":f"{prog} {fk}: {fv}",
                                     "meta":{"source":f"{src}/{key}/{prog}/{fk}"}})
            elif isinstance(val, dict):
                for fk, fv in val.items():
                    docs.append({"text":f"{fk}: {fv}",
                                 "meta":{"source":f"{src}/{key}/{fk}"}})

    # 7) deadlines
    for nm, dt in (data.get("deadlines") or {}).items():
        docs.append({"text":f"{nm.replace('_',' ').title()} deadline: {dt}",
                     "meta":{"source":f"{src}/deadlines/{nm}"}})

    # 8) facilities (cafeteria, hostel, sports)
    fac = data.get("facilities") or {}
    for svc in ("cafeteria","hostel","sports","sportsFacilities"):
        sec = fac.get(svc)
        if isinstance(sec, dict) and (d:=sec.get("description","").strip()):
            docs.append({"text":d, "meta":{"source":f"{src}/facilities/{svc}/description"}})
        elif isinstance(sec, list):
            joined = "; ".join(i for i in sec if isinstance(i, str))
            if joined:
                docs.append({"text":joined, "meta":{"source":f"{src}/facilities/{svc}/description"}})

    # transport routes, stops, timings
    t = fac.get("transport") or {}
    if isinstance(t, dict):
        if d:=t.get("description","").strip():
            docs.append({"text":d, "meta":{"source":f"{src}/facilities/transport/description"}})
        if nums := t.get("contactNumbers") or t.get("contact_numbers"):
            docs.append({"text":"Transport contacts: "+", ".join(nums),
                         "meta":{"source":f"{src}/facilities/transport/contactNumbers"}})
        for route, info in (t.get("routes") or {}).items():
            for drv, cnums in (info.get("driverContact") or info.get("driver_contact") or {}).items():
                docs.append({"text":f"{route} driver {drv}: {', '.join(cnums) if isinstance(cnums,list) else cnums}",
                             "meta":{"source":f"{src}/facilities/transport/routes/{route}/driverContact"}})
            for stop in (info.get("stops") or []):
                name = stop.get("stopName", stop.get("stop","")).strip()
                time = stop.get("time","").strip()
                num  = stop.get("stopNumber") or stop.get("stop_number")
                snip = name
                if time: snip+=f" at {time}"
                if num is not None: snip+=f" (#{num})"
                docs.append({"text":snip,
                             "meta":{"source":f"{src}/facilities/transport/routes/{route}/stops/{name.replace(' ','_')}"}})

    # 9) library & DSA
    if lib:=data.get("library"):
        docs.append({"text":json.dumps(lib,ensure_ascii=False),
                     "meta":{"source":f"{src}/library"}})
    if dsa:=data.get("dsa") or data.get("disability_support"):
        docs.append({"text":json.dumps(dsa,ensure_ascii=False),
                     "meta":{"source":f"{src}/dsa"}})

    # 10) transfer & refund
    if tp:=data.get("transfer_policy"):
        docs.append({"text":tp.strip(), "meta":{"source":f"{src}/transfer_policy"}})
    if rp:=data.get("refund_policy"):
        docs.append({"text":rp.strip(), "meta":{"source":f"{src}/refund_policy"}})

    # 11) registration/enrollment
    rr=data.get("registration_and_enrollment") or data.get("registrationAndEnrollment") or {}
    if isinstance(rr,dict):
        if p:=rr.get("process","").strip():
            docs.append({"text":p, "meta":{"source":f"{src}/registration_and_enrollment/process"}})
        if pv:=rr.get("provisional","").strip():
            docs.append({"text":pv, "meta":{"source":f"{src}/registration_and_enrollment/provisional"}})

    # 12) announcements, late, key points, accreditation, contacts
    for key in ("announcement_of_results","announcementOfResults",
                "late_admissions","lateAdmissions"):
        if v:=data.get(key,"").strip():
            docs.append({"text":v, "meta":{"source":f"{src}/{key}"}})
    for key in ("key_points","keyPoints"):
        if kps:=data.get(key):
            if isinstance(kps,list) and kps:
                docs.append({"text":"Key points: "+ "; ".join(kps),
                             "meta":{"source":f"{src}/{key}"}})
    acc=data.get("accreditation") or data.get("accreditation_and_recognition") or {}
    if isinstance(acc,dict):
        for k,v in acc.items():
            txt = v.strip() if isinstance(v,str) else "; ".join(f"{kk}: {vv}" for kk,vv in v.items())
            if txt:
                docs.append({"text":txt, "meta":{"source":f"{src}/accreditation/{k}"}})
    ct=data.get("contact_details") or data.get("contactDetails") or {}
    if isinstance(ct,dict):
        for k,v in ct.items():
            txt = f"{k}: {', '.join(v)}" if isinstance(v,list) else f"{k}: {v}"
            docs.append({"text":txt, "meta":{"source":f"{src}/contact_details/{k}"}})

    # 13) catch‐all
    covered = {
        "description","department","faculty","programs","admission_policy","admission_eligibility",
        "eligibility_criteria","admission_test","fee_structure","fees","deadlines","facilities",
        "library","dsa","transfer_policy","refund_policy","registration_and_enrollment",
        "announcement_of_results","announcementOfResults","late_admissions","lateAdmissions",
        "key_points","keyPoints","accreditation","accreditation_and_recognition",
        "contact_details","contactDetails"
    }
    for k,v in data.items():
        if k in covered: continue
        docs.append({"text":json.dumps(v,indent=2,ensure_ascii=False),
                     "meta":{"source":f"{src}/{k}"}})

    return docs



# import os
# import json
# from typing import Any, Dict, List, Union
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     """
#     Return a list of all .json file paths in the given folder.
#     """
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Safely load JSON from `path`. If parsing fails due to multiple top-level objects,
#     wrap them into a JSON array and retry. Returns a dict, list, or empty dict on failure.
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         # wrap consecutive objects into a list
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def _flatten_json(
#     obj: Any,
#     src: str,
#     path: str = ""
# ) -> List[Dict[str, Union[str, Dict[str, str]]]]:
#     """
#     Recursively traverse `obj`, collecting leaf values into text chunks.
#     Each chunk is a dict with 'text' and 'meta':{'source': '<src>/<path>'}.
#     """
#     docs: List[Dict[str, Union[str, Dict[str, str]]]] = []

#     def meta_key(p: str) -> str:
#         return f"{src}/{p}" if p else src

#     if isinstance(obj, dict):
#         for k, v in obj.items():
#             new_path = f"{path}/{k}" if path else k
#             docs.extend(_flatten_json(v, src, new_path))

#     elif isinstance(obj, list):
#         # If list of strings: join into one chunk
#         if all(isinstance(item, str) for item in obj):
#             cleaned = [item.strip() for item in obj if item and item.strip()]
#             if cleaned:
#                 docs.append({
#                     "text": "; ".join(cleaned),
#                     "meta": {"source": meta_key(path)}
#                 })
#         else:
#             # Otherwise flatten each element with its index
#             for idx, item in enumerate(obj):
#                 new_path = f"{path}[{idx}]"
#                 docs.extend(_flatten_json(item, src, new_path))

#     elif isinstance(obj, str):
#         text = obj.strip()
#         if text:
#             docs.append({
#                 "text": text,
#                 "meta": {"source": meta_key(path)}
#             })

#     elif obj is None:
#         # Skip null values
#         pass

#     else:
#         # Numbers or booleans → stringify
#         docs.append({
#             "text": str(obj),
#             "meta": {"source": meta_key(path)}
#         })

#     return docs

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Entry point: flatten a JSON-loaded dict or list under a given `src` prefix.
#     Returns a list of {'text': ..., 'meta': {'source': ...}} chunks.
#     """
#     if not isinstance(data, (dict, list)):
#         return []
#     # If it's a list at top-level, flatten each item
#     if isinstance(data, list):
#         docs: List[Dict[str, Any]] = []
#         for idx, item in enumerate(data):
#             docs.extend(_flatten_json(item, src, f"[{idx}]"))
#         return docs
#     # Otherwise it's a dict
#     return _flatten_json(data, src)

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


########################################


# import os
# import json
# from typing import List, Dict, Any
# from json import JSONDecodeError

# def list_json_files(folder: str) -> List[str]:
#     """
#     Return a list of all .json files in the given folder.
#     """
#     return [
#         os.path.join(folder, f)
#         for f in os.listdir(folder)
#         if f.lower().endswith(".json")
#     ]

# def load_json(path: str) -> Any:
#     """
#     Try to load a JSON file. If it fails with “Extra data” (multiple JSON
#     objects concatenated), wrap them in a list. Returns dict, list, or {}.
#     """
#     with open(path, 'r', encoding='utf-8') as f:
#         text = f.read()
#     try:
#         return json.loads(text)
#     except JSONDecodeError:
#         fixed = "[" + text.replace("}\n{", "},\n{") + "]"
#         try:
#             return json.loads(fixed)
#         except JSONDecodeError:
#             print(f"⚠️  Failed to parse JSON file: {path}")
#             return {}

# def flatten_department(data: Any, src: str) -> List[Dict[str, Any]]:
#     """
#     Given one JSON-loaded dict and a source prefix `src`,
#     spit out one {'text':..., 'meta':{'source':...}} for *every*
#     leaf field, keyed by its full JSON path under `src`.
#     """
#     docs: List[Dict[str, Any]] = []

#     def recurse(node: Any, path: str):
#         if isinstance(node, dict):
#             for k,v in node.items():
#                 recurse(v, f"{path}/{k}")
#         elif isinstance(node, list):
#             for i,item in enumerate(node):
#                 recurse(item, f"{path}[{i}]")
#         else:
#             txt = str(node).strip()
#             if txt:
#                 docs.append({"text": txt, "meta": {"source": path}})

#     if isinstance(data, dict):
#         recurse(data, src)
#     return docs
