# Project Planning Document
## Personal Portfolio + Blog Platform

---

## 1. Requirements Document

### 1.1 Project Ka Maqsad (Goal)
Ek aisi website banani hai jo:
- Ali ka **personal portfolio** ho (skills, projects dikhana)
- Sath mein ek **blog** ho jahan Ali technical topics pe likh sake
- Employers aur clients ko impress kare — real, working, deployed project ke through
- **Long-term maintainable** ho — naye projects/posts add karna aasan ho, bina code change kiye

### 1.2 Target Audience (Kaun Use Karega)
- **Ali (Admin)** — content manage karega (posts, projects)
- **Visitors (Public)** — portfolio dekhenge, blog padhenge
- **Registered Users** — comment kar sakenge blog posts par

### 1.3 Feature List (Iss Version Mein Kya Banega)

**Public Features:**
- [ ] Home/About page (intro, skills, resume)
- [ ] Projects page (dynamic — database se aata hai)
- [ ] Blog listing page (with pagination + search)
- [ ] Single blog post page (with comments)
- [ ] Contact form
- [ ] Register/Login

**User Features (Login Required):**
- [ ] Comment on blog posts
- [ ] Edit/delete apna comment

**Admin Features (Sirf Ali):**
- [ ] Dashboard
- [ ] Create/Edit/Delete blog posts
- [ ] Create/Edit/Delete projects (portfolio items)
- [ ] View contact messages

### 1.4 Scope Se Bahar (Abhi Ke Liye NAHI Banega)
- E-commerce / payment system
- Multi-admin support
- Email notifications (baad mein add ho sakta hai)
- Real-time chat

*(Ye list zaroori hai — taake "scope creep" na ho, jaisa humne discuss kiya)*

---

## 2. Database Schema (ERD — Entity Relationship Design)

### Models Aur Unka Relationship

```
User (1) ──────< (Many) Post        [Ek user ke multiple posts]
User (1) ──────< (Many) Comment     [Ek user ke multiple comments]
Post (1) ──────< (Many) Comment     [Ek post ke multiple comments]
User (1) ──────< (Many) Project     [Sirf admin ke projects, but structurally linked]
(No user) ─────< (Many) Message     [Contact form — koi login nahi chahiye]
```

### Model 1: `User` (Already Bana Hua Hai)
| Field | Type | Notes |
|-------|------|-------|
| name | String | required |
| email | String | required, unique |
| password | String | required, hashed |
| role | String | "admin" ya "user" — **NAYA FIELD add karna hoga** |
| age | Number | optional (agar chahiye) |

### Model 2: `Post` (Blog Ke Liye — Naya)
| Field | Type | Notes |
|-------|------|-------|
| title | String | required |
| content | String | required |
| image | String | post ka thumbnail (URL) |
| category | String | jaise "Backend", "Frontend", "Career" |
| author | ObjectId (ref: User) | konsa user ne likha |
| slug | String | URL-friendly title, jaise "my-first-post" |

### Model 3: `Comment` (Naya)
| Field | Type | Notes |
|-------|------|-------|
| content | String | required |
| post | ObjectId (ref: Post) | konsi post pe comment hai |
| author | ObjectId (ref: User) | kisne comment kiya |

### Model 4: `Project` (Portfolio Ke Liye — Naya)
| Field | Type | Notes |
|-------|------|-------|
| title | String | required |
| description | String | required |
| techStack | [String] | array, jaise ["React", "Node.js"] |
| liveLink | String | deployed URL |
| githubLink | String | repo URL |
| image | String | screenshot |
| featured | Boolean | home page pe highlight karna hai? |

### Model 5: `Message` (Contact Form Ke Liye — Naya)
| Field | Type | Notes |
|-------|------|-------|
| name | String | required |
| email | String | required |
| message | String | required |
| read | Boolean | default false — admin ne padha ya nahi |

---

## 3. API Route List (Planning)

### Auth Routes (`/api/auth`) — Already Bana Hua
| Method | Route | Access | Kaam |
|--------|-------|--------|------|
| POST | /register | Public | Naya user banana |
| POST | /login | Public | Login karna, token dena |

### Post Routes (`/api/posts`) — Naya
| Method | Route | Access | Kaam |
|--------|-------|--------|------|
| GET | / | Public | Sab posts dikhana (pagination) |
| GET | /:id | Public | Ek post dikhana |
| POST | / | Admin Only | Naya post banana |
| PUT | /:id | Admin Only | Post update karna |
| DELETE | /:id | Admin Only | Post delete karna |

### Comment Routes (`/api/comments`) — Naya
| Method | Route | Access | Kaam |
|--------|-------|--------|------|
| POST | /:postId | Logged-in User | Comment karna |
| DELETE | /:id | Owner Only | Apna comment delete karna |

### Project Routes (`/api/projects`) — Naya
| Method | Route | Access | Kaam |
|--------|-------|--------|------|
| GET | / | Public | Sab projects dikhana |
| POST | / | Admin Only | Naya project add karna |
| PUT | /:id | Admin Only | Project update karna |
| DELETE | /:id | Admin Only | Project delete karna |

### Message Routes (`/api/messages`) — Naya
| Method | Route | Access | Kaam |
|--------|-------|--------|------|
| POST | / | Public | Contact form submit karna |
| GET | / | Admin Only | Sab messages dekhna |

---

## 4. Build Sequence (Kis Tarteeb Mein Banana Hai)

### Phase 0: Project Setup — ✅ DONE
- [x] Project folder banaya: `C:\Projects\portfolio-blog-backend`
- [x] `npm init -y` chalaya
- [x] Git initialize kiya, GitHub repo bana ke connect kiya
- [x] `.gitignore` bana (node_modules, .env)
- [x] Zaroori packages install kiye (express, mongoose, dotenv, morgan, cors, bcrypt, jsonwebtoken)
- [x] Folder structure banayi (model, controller, routes, middleware, database)
- [x] `database/database.js` banaya
- [x] `index.js` basic setup kiya
- [x] `model/user.model.js` banaya (role field ke sath)

### Phase 1: Foundation — ✅ DONE
1. `User` model — ✅ (role field ke sath: "admin"/"user")
2. `protect` middleware (token verify) — ✅ bana hua, ready
3. `isAdmin` middleware (role check) — ✅ bana hua, ready (abhi kisi route pe use nahi hua)
4. Auth system (register/login/JWT) — ✅ working, dono roles se test kiya
5. Ek user ko Compass se manually "admin" banaya — ✅

### Phase 2: Blog System — ✅ DONE
6. `Post` model — ✅ (title, content, image, category, author with User reference)
7. Post controller — ✅ (5 functions: create, getAll, getById, update, delete)
8. Post routes — ✅ (GET public, POST/PUT/DELETE protected with `protect` + `isAdmin`)
9. Tested — ✅ (user got 403, admin got 201, public GET worked with populate)
10. README.md created, code pushed to GitHub — ✅

### Phase 3: Comments — ✅ DONE
11. `Comment` model — ✅ (content, post reference, author reference)
12. Comment controller — ✅ (create, getByPost, delete with ownership check)
13. Comment routes — ✅ (protect only, no isAdmin — any logged-in user can comment)
14. Tested — ✅ (create, getAll, delete all working — including ownership check)

### Phase 4: Projects (Portfolio Showcase) — ✅ DONE
15. `Project` model — ✅ (title, description, techStack array, links, image, featured)
16. Project controller — ✅ (5 functions, same pattern as Post)
17. Project routes — ✅ (GET public, POST/PUT/DELETE protected)
18. Tested — ✅ (create + getAll both working)

### Phase 5: Contact Messages — ✅ DONE
19. `Message` model — ✅ (name, email, message, read status with default false)
20. Message controller — ✅ (sendMessage, getAllMessages with sort, markAsRead, deleteMessage)
21. Message routes — ✅ (POST public, rest admin only)
22. Tested — ✅ (send worked, read-marking worked)

## 🎉 BACKEND CORE COMPLETE (Phases 0-5)
Poora backend ban chuka hai: Auth (register/login/JWT), role-based access (admin/user),
Posts CRUD, Comments (with ownership check), Projects CRUD, Contact Messages.

### Phase 6: React Frontend — 🔄 IN PROGRESS
**Note: Ali ne React kabhi nahi seekha tha pehle (seedha backend pe aaye the) — isliye React fundamentals bhi
is Phase ke andar, isi project ke real code ke sath, sikhaye jayenge. Deep teacher mode.**

23. Vite se React project setup — ✅ DONE (`portfolio-blog-frontend` folder, JS variant)
24. React Fundamentals (isi project ke andar sikhaya jayega):
    - [x] JSX kya hai, Components kya hote hain — ✅ (index.html, main.jsx, App.jsx samjhe)
    - [x] Frontend GitHub repo bhi set up ho gaya (portfolio-blog-frontend)
    - [x] Multiple Components banana (Header, Footer) — ✅
    - [x] Props kya hain — ✅ (ProjectCard component se seekha)
    - [x] State aur useState hook — ✅ (Header menu toggle se seekha)
    - [x] useEffect hook (data fetch karne ke liye) — ✅ (ProjectsPage — real backend data fetch hua)
    - [x] async/await pattern useEffect ke andar — ✅
    - [x] Lists aur .map() — ✅ (projects dikhane ke liye)
    - [x] Loading/Error states (conditional rendering) — ✅
    - [x] React Router (BrowserRouter, Routes, Route, Link) — ✅ Home/Projects/Blog pages navigate karte hain

25. Pages banao — 🔄 IN PROGRESS:
    - [x] HomePage, ProjectsPage (real data), BlogPage (basic)
    - [ ] Register/Login pages (forms + backend connect) — 🔄 NEXT
    - [ ] Single Post page (with comments)
    - [ ] Admin Dashboard
    - [ ] Contact page
25. Pages banao: Home/About, Projects, Blog List, Single Post (with comments), Login, Register, Admin Dashboard
26. Backend se connect karo (fetch/axios), token ko localStorage mein save karo
27. Styling (Tailwind ya CSS)

### Phase 7: Deployment — ⬜ PENDING
28. Backend deploy karo (Render)
29. Frontend deploy karo (Vercel)
30. Final live testing

### Phase 3: Comments
6. `Comment` model banao
7. Comment controller + routes banao
8. Test karo

### Phase 4: Portfolio
9. `Project` model banao
10. Project controller + routes banao
11. Test karo

### Phase 5: Contact
12. `Message` model banao
13. Message controller + routes banao
14. Test karo

### Phase 6: Frontend (React)
15. Pages banao (Home, Projects, Blog, Post Detail, Login, Register, Dashboard)
16. Backend se connect karo (fetch/axios)

### Phase 7: Deployment
17. Backend deploy karo (Render)
18. Frontend deploy karo (Vercel)
19. Final testing (live pe)

---

*Is document ko reference ke taur pe use karo har step pe — jab confuse ho "ab kya karna hai", yahan wapis aao.*