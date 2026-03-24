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

> Prerequisites: **Modern browser** (Chrome (**recommended**) / Firefox)

**Steps:**
1. Navigate inside ```dist``` directory
2. Double-click on ```index.html``` file

---

#### (2) **Developer mode (Vite & Node.js):**

> Prerequisites: **Modern browser** (Chrome (**recommended**) / Firefox); **Node.js** (v20+)

**Steps:**
(inside root directory: ```swed-tech```)
1. run ```npm install```
2. run ```npm run dev```
3. Open ➜  ```Local: http://localhost:XXXX``` link in the terminal

---

### RELOAD

After any changes inside source code, run ```npm run build``` for the method (1) to reload; Method (2) reloads automatically.

---

## III. HOW TO TEST

---

Loan Calculator -> by navigating to ```Loan Calculator``` tab, OR pressing **START APPLICATION** inside ```Home``` tab.

```Theme toggle button``` & ```Language toggle button``` -> located on top-right side of the Header.

### Keyboard accessibility:
**1. Primary navigation:**

[<-] ```SHFIT-TAB``` - previous selection

[->] ```TAB``` - next selection

**2. Secondary Navigation:**
* ```Arrow Keys```, ```Space``` for Vertical scrolling.

**3. Activation:**
* ```Enter``` for opening dropdowns & triggering buttons.
* ```SPACE``` - for checking consent checkboxes

### Extras: 
```Extras``` tab in the navigation menu on top -> see links to github repo, Figma & Shorcut Board.

## IV. FEATURES

---

### Core
1. **Single layout design:** dynamic "main-content" and partials used for static components(Header + Footer) → prevents unnecessary refreshing, consistent UI(no flickering), slight performance improvement.
2. **Hash-based navigation** → one event "hashchange" instead of multiple clicks for each navigation link, prevents unnecessary page refresh.
3. **State-driven Declaration** → abstracts imperative programming, such as repetitive DOM manipulation logic.
4. **State management:** Automatically triggers UI update upon data change.
5. **Event Delegation & Centralization** → binds a single event listener to the root container rather than individual DOM elements, optimizing memory usage and ensuring complete removal during component destruction.

---

### Extra
6. UI& UX Design made using Figma: https://www.figma.com/design/4zkxUawp1PJ6gUiHnqfvGN/SWEDBANK?node-id=0-1&t=hPUyIWZGgM8GPrYl-1
7. Dual theme: Dark/Light theme optimization for all interfaces → accessibility improvement.
8. Render-based translation → avoids overloading DOM, most cost-effective translation.
9. Responsive Design for Mobile devices -> accessibility imporvement.