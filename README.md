# Swedbank's Tech Challenge

## I. OVERVIEW

---

**Requirements:**
* HTML, CSS, JavaScript only (no frameworks).
* "Swedbank-like" style
* SPA-style.
* Made for modern browsers (Chrome / Firefox).

---

**Authors:** Aleksei Kurõljov, Vladislav Nesterenko, Artjom Kulikovski.

## II. SETUP

---

### There are 2 ways to use this application:


#### (1) **Locally, by opening ```./dist/index.html``` from your hard-disk:**

> Prerequisites: **Modern browser** (Chrome / Firefox)
1. Navigate inside ```dist``` directory
2. Double-click on ```index.html``` file

---

#### (2) **Developer mode (Vite & Node.js):**

> Prerequisites: **Modern browser** (Chrome / Firefox); **Node.js** (v20+)

(inside root directory: ```swed-tech```)
1. run ```npm install```
2. run ```npm run dev```
3. Open ➜  ```Local: http://localhost:XXXX``` link in the terminal


## III. HOW TO TEST

---

...

## IV. FEATURES

---

### Core
1. **Single layout design:** dynamic "main-content" and partials used for static components(Header + Footer) → prevents unnecessary refreshing, consistent UI(no flickering), slight performance improvement.
2. **Hash-based navigation** → one event "hashchange" instead of multiple clicks for each navigation link, prevents unnecessary page refresh.
3. **State-driven Declaration** → abstracts imperative programming, such as repetitive DOM manipulation logic
4. **State management:** Automatically triggers UI update upon data change.
5. **Event Delegation & Centralization** → binds a single event listener to the root container rather than individual DOM elements, optimizing memory usage and ensuring complete removal during component destruction.

---

### Extra
