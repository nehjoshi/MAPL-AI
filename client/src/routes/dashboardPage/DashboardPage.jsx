import { useState } from "react";
import "./dashboardPage.css";
import { useAuth } from '@clerk/clerk-react';

export const DashboardPage = () => {

  const { userId } = useAuth();
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/chats", {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId,
        text: input
      })
    })
  }

  return (
    <div className='dashboardPage'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>MAPL AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Help me with my code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input onChange={e => setInput(e.target.value)} type="text" placeholder='Ask me anything...' />
          <button disabled={input.length === 0}>
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  )
}
