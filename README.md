# Speech-to-Text Transcription Web App

A full-stack web application for **audio transcription** and **live speech-to-text** using **Socket.io**, **Deepgram API**, **Express**, and **Multer**. The app allows users to upload pre-recorded audio files for transcription, perform live speech transcription, view transcription history, and manage user accounts.

---

## Features

1. **Authentication**
   - Users must **sign up** or **log in** to access the app.
   - Authentication ensures personalized history and secure access.

2. **Home Page**
   - A landing page after login with navigation options.
   - Users can navigate using **Get Started** or the **menu bar**.

3. **Navigation Bar**
   - **Home**: Overview and welcome page.
   - **Audio Transcriptor**: Upload audio files for transcription.
   - **Live Transcription**: Transcribe speech in real-time.
   - **History**: View and manage past transcriptions.
   - **Logout**: Securely log out of the account.

4. **Audio Transcription**
   - Upload a pre-recorded audio file.
   - Transcription starts after processing (~30 seconds depending on file length).
   - Generated text is displayed on the screen.

5. **Live Transcription**
   - Click **Start Recording** and speak in English.
   - Speech is converted to text in real-time using **Socket.io** and **Deepgram API**.

6. **History**
   - All past transcriptions are saved for each user.
   - Users can delete individual history items or clear all history at once.

7. **Logout**
   - Logs the user out and returns to the login page.

---

## Technologies Used

- **Frontend**
  - React
  - Tailwind CSS / any UI library
  - Socket.io-client

- **Backend**
  - Node.js
  - Express.js
  - Multer (for audio file uploads)
  - Socket.io
  - Deepgram API (for speech-to-text)

- **Database**
  - MongoDB / any preferred DB for storing user accounts and transcription history

---

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>

Install dependencies

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install


Set up environment variables
Create a .env file in the backend directory with the following:

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Server configuration
PORT=5000
NODE_ENV=production
node server.js

# Deepgram API keys
DEEPGRAM_API_KEY=<your-deepgram-api-key>
DEEPGRAM_SOCKET_API=wss://api.deepgram.com/v1/listen?model=nova&punctuate=true&language=en-US

# MongoDB configuration
MONGO_URI=<your-mongodb-uri>
DB_NAME=speechToTextApp

# JWT authentication
ACCESS_TOKEN_SECRET=<your-access-token-secret>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
REFRESH_TOKEN_EXPIRY=15d

# Frontend URL
FRONTEND_URL=http://localhost:5173
>
```
