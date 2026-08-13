# 🤖 AI Detection System

An AI-powered web application designed to analyze user-provided content and identify whether the content is likely to be **AI-generated or human-generated**.

The project follows a **frontend–backend architecture**, with separate frontend and backend applications.

## 🌐 Live Demo

🚀 **Live Application:**
https://ai-detection-system-self.vercel.app/

## ✨ Features

* 🤖 AI-generated content detection
* 📝 Text-based content analysis
* 📊 Detection result presentation
* ⚡ Interactive web interface
* 🔗 Frontend and backend integration
* 🌐 Web-based accessibility
* 🔄 Real-time analysis workflow
* 📱 User-friendly interface

## 🏗️ System Architecture

```text
                    ┌────────────────────┐
                    │       User         │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │     Frontend       │
                    │                    │
                    │  User Interface   │
                    │  Text Input       │
                    │  Result Display   │
                    └─────────┬──────────┘
                              │
                         API Request
                              │
                              ▼
                    ┌────────────────────┐
                    │      Backend       │
                    │                    │
                    │  API Processing    │
                    │  AI Detection      │
                    │  Result Handling   │
                    └─────────┬──────────┘
                              │
                              ▼
                    ┌────────────────────┐
                    │ Detection Result   │
                    │                    │
                    │ AI / Human         │
                    │ Confidence/Score   │
                    └────────────────────┘
```

## 📂 Project Structure

```text
ai-detection-system/
│
├── backend/
│   └── ...
│
├── frontend/
│   └── ...
│
├── .gitignore
├── runtime.txt
└── README.md
```

The repository currently contains separate `backend` and `frontend` directories, along with `.gitignore` and `runtime.txt`.

## 🔄 How It Works

### 1. Enter Content

The user provides text that needs to be analyzed.

```text
User
 ↓
Enter / Paste Text
```

### 2. Submit for Analysis

The frontend sends the submitted content to the backend through an API request.

```text
Frontend
   ↓
API Request
   ↓
Backend
```

### 3. AI Detection

The backend processes the submitted content using the project's detection logic.

```text
Input Text
    ↓
Content Analysis
    ↓
AI Detection
    ↓
Result
```

### 4. Display Result

The analysis result is returned to the frontend and displayed to the user.

```text
              ┌─────────────────┐
              │ Analysis Result │
              └────────┬────────┘
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
       AI Generated          Human Written
```

## 🛠️ Technology Architecture

The project is organized into two major components:

### Frontend

Responsible for:

* User interface
* Text input
* Sending requests to backend
* Displaying detection results
* User interaction

### Backend

Responsible for:

* API handling
* Processing user requests
* AI detection logic
* Returning analysis results

## 🚀 Getting Started

### Prerequisites

Make sure you have the required runtime and development tools installed.

```bash
git --version
```

Clone the repository:

```bash
git clone https://github.com/HARINI-MOHAN-KUMAR/ai-detection-system.git

cd ai-detection-system
```

## ⚙️ Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies according to the backend configuration.

Then start the backend server using the project's configured start command.

## 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

## 🔐 Environment Variables

If the application requires API keys, backend URLs, model configuration, or other credentials, store them in environment variables rather than committing them directly to GitHub.

Example:

```env
API_KEY=your_api_key
BACKEND_URL=your_backend_url
```

> ⚠️ Never commit real API keys, passwords, tokens, or other secrets to a public repository.

## 🎯 Use Cases

The system can be useful for:

* 🎓 Academic content analysis
* 📝 Assignment analysis
* 📚 Educational platforms
* ✍️ Content verification
* 🔍 AI-generated text analysis
* 🧑‍💻 Demonstrating AI/ML application development

## 💡 Key Learning Outcomes

This project demonstrates experience with:

* Frontend development
* Backend development
* API integration
* AI-based content analysis
* Client-server architecture
* Web application deployment
* Git and GitHub
* Environment configuration

## 🚀 Future Enhancements

Possible improvements include:

* 📄 PDF and document upload
* 📊 Detailed confidence score
* 📈 Analysis history
* 👤 User authentication
* 💾 Database integration
* 📑 Downloadable analysis reports
* 🌐 Multilingual detection
* 🔍 Plagiarism detection
* 📱 Mobile-responsive improvements
* 📊 Admin dashboard
* ⚡ Batch document analysis

## ⚠️ Important Note

AI-generated-content detection is inherently probabilistic. Detection results should be treated as an **indicator rather than definitive proof** that content was generated by AI.

For academic or professional decisions, results should be combined with additional evidence and human review.

## 👩‍💻 Author

**Harini Mohankumar**

Computer and Communication Engineering
VSB Engineering College, Karur

## 🔗 Project Links

**GitHub Repository:**
https://github.com/HARINI-MOHAN-KUMAR/ai-detection-system

**Live Application:**
https://ai-detection-system-self.vercel.app/

---

⭐ If you find this project useful, consider giving the repository a star!
