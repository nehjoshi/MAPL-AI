import { Link } from "react-router-dom";
import "./chatList.css";

export const ChatList = () => {
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a New</Link>
      <Link to="/">Explore MAPL AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">DASHBOARD</span>
      <div className="list">
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
        <Link to="/">My chat title</Link>
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to MAPL AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}
