import React from "react";
import "./HTMLforum.css";

class Forum extends React.Component {
  render() {
    return (
      <div id="InputForm">
        <div id="message-container"></div>
        <form id="send-container">
          <input type="text" id="message-input" />
          <button type="submit" id="send-button">
            Send
          </button>
        </form>
      </div>
    );
  }
}

export default Forum;
