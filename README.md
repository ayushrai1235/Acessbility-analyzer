
# ♿ Accessibility Analyzer

A full-stack accessibility analyzer tool that detects and visualizes accessibility issues in any webpage using **axe-core**, with a clean **React + Chart.js** UI and a **Node.js** backend.

## 🚀 Features

- ✅ Analyze any webpage for accessibility violations using [axe-core](https://github.com/dequelabs/axe-core)
- 📈 Beautiful visualizations with **Chart.js**
- 🌐 Frontend built with **React**, styled using **CSS**
- ⚙️ Backend powered by **Node.js**
- 🔄 Axios-based integration between frontend and backend
- ♿ Promotes inclusive and accessible web development practices

## 🧪 Tech Stack

- **Frontend**: React, CSS, Chart.js
- **Backend**: Node.js, Express
- **API Integration**: Axios
- **Accessibility Engine**: axe-core


## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/ayushrai1235/Acessbility-analyzer.git
cd Acessbility-analyzer
```

### 2. Setup Backend

```bash
cd server
npm install
npm start
```

### 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```



## 📊 How It Works

1. User inputs a webpage URL in the frontend.
2. The frontend sends a request via **Axios** to the **Node.js backend**.
3. Backend runs **axe-core** on the requested page.
4. Detected issues are sent back to the frontend.
5. Issues are categorized and displayed in beautiful charts using **Chart.js**.

## 💡 Learnings

- Accessibility principles and best practices
- Using axe-core for audits and issue detection
- Integrating Node.js backend with React frontend
- Visualizing complex data with Chart.js

## 📃 License

[MIT License](LICENSE)

---

Built with 💙 to make the web more accessible for everyone!
