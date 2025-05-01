# 🎮 Memory Game

A simple Memory Matching Game built with HTML, CSS, and JavaScript using DOM manipulation. Flip two cards at a time to find matching pairs. Includes difficulty levels, move counter, and timer.

---

### 🚀 Features

✅ Flip and match cards
✅ Three difficulty levels: Easy (4x4), Medium (6x6), Hard (8x8)
✅ Move counter
✅ Timer
✅ Responsive design inside a centered game card
✅ Clean UI with modern styling

---

### 📝 How to Play
```
	1.	Select a difficulty from the dropdown (Easy, Medium, Hard).
	2.	Click New Game to start.
	3.	Click two cards to flip them.
	4.	If they match → they stay flipped.
If they don’t → they flip back after a second.
	5.	Match all pairs to win!
	6.	Track your moves and time as you play.
```
---

### 📂 Project Structure
```text
/Memory_Game
├── index.html
├── /CSS
│   └── styles.css
└── /JS
    └── scripts.js
```
---

### 💻 Key Code Highlights

✅ Functional Programming Concept:
Used Array.sort() with a function to shuffle cards randomly.

✅ DOM Manipulation Example:
Created card elements dynamically with document.createElement() and added to the board using appendChild().

✅ Event Listening Example:
Each card uses addEventListener('click', handleCardClick) to respond to clicks.

✅ ES6 Feature Example:
Arrow functions, const, let, and template literals.

---

### 🛠️ Tech Used
	•	HTML5
	•	CSS3 (Grid, Flexbox)
	•	Vanilla JavaScript (ES6+)

---

### 🧑‍💻 Credits

Developed by Benjamin.
Assignment for Web Development class.
