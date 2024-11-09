// import { useState } from 'react';
// import { FaHeadset, FaTimes } from 'react-icons/fa'; // Import Font Awesome icons

// function SupportCustomer() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [message, setMessage] = useState('');
//     const [unreadCount, setUnreadCount] = useState(2);

//     const toggleChat = () => {
//         setIsOpen(!isOpen);
//         setUnreadCount(0); 
//     };

//     const sendMessage = () => {
//         if (message.trim()) {
//             alert(`Your message: "${message}" sent!`);
//             setMessage(''); 
//         } else {
//             alert('Please enter a message before sending.');
//         }
//     };

//     return (
//         <div>
//             <div id="chatButtonContainer">
//                 <button id="chatBtn" onClick={toggleChat}>
//                     <FaHeadset size={24} />
//                     {unreadCount > 0 && <span id="unreadCount">{unreadCount}</span>}
//                 </button>
//             </div>

//             {isOpen && (
//                 <div id="chatPopup" className="popup">
//                     <div className="popup-header">
//                         <FaTimes className="close" onClick={toggleChat} />
//                         <h2>Support</h2>
//                     </div>
//                     <div className="popup-content">
//                         <textarea
//                             id="chatInput"
//                             value={message}
//                             onChange={(e) => setMessage(e.target.value)}
//                             placeholder="Hi! What do you need?...">
//                         </textarea>
//                         <button id="sendMsg" onClick={sendMessage}>Send</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default SupportCustomer;
import { useState } from "react";
import { FaHeadset, FaTimes } from "react-icons/fa";

function SupportCustomer() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(2);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const sendMessage = () => {
    if (message.trim()) {
      alert(`Your message: "${message}" sent!`);
      setMessage("");
    } else {
      alert("Please enter a message before sending.");
    }
  };

  const styles = {
    chatButtonContainer: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: 1000,
    },
    chatBtn: {
      backgroundColor: "#2c3e50",
      color: "#ffffff",
      border: "none",
      borderRadius: "50%",
      padding: "10px",
      top:"11px",
      right:"-10px",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      position: "relative",
    },
    chatBtnHover: {
      transform: "scale(1.1)",
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
    },
    unreadCount: {
      position: "absolute",
      top: "-8px",
      right: "-8px",
      backgroundColor: "#e74c3c",
      color: "#fff",
      fontSize: "12px",
      fontWeight: "bold",
      padding: "4px 6px",
      borderRadius: "50%",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    },
    chatPopup: {
      position: "fixed",
      bottom: "80px",
      right: "20px",
      width: "320px",
      backgroundColor: "#34495e",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
      overflow: "hidden",
      zIndex: 1000,
    },
    popupHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#2c3e50",
      color: "#fff",
      padding: "12px",
      borderBottom: "1px solid #444",
    },
    closeIcon: {
      cursor: "pointer",
      color: "#bdc3c7",
      transition: "color 0.2s ease",
    },
    closeIconHover: {
      color: "#e74c3c",
    },
    popupContent: {
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    chatInput: {
      width: "100%",
      height: "100px",
      padding: "10px",
      border: "1px solid #555",
      borderRadius: "8px",
      backgroundColor: "#2c3e50",
      color: "#ecf0f1",
      resize: "none",
      fontSize: "14px",
    },
    sendMsgBtn: {
      backgroundColor: "#3498db",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "10px",
      fontSize: "14px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    sendMsgBtnHover: {
      backgroundColor: "#2980b9",
    },
  };

  return (
    <div>
      <div style={styles.chatButtonContainer}>
        <button
          style={styles.chatBtn}
          onClick={toggleChat}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          <FaHeadset size={24} />
          {unreadCount > 0 && <span style={styles.unreadCount}>{unreadCount}</span>}
        </button>
      </div>

      {isOpen && (
        <div style={styles.chatPopup}>
          <div style={styles.popupHeader}>
            <FaTimes
              style={styles.closeIcon}
              onClick={toggleChat}
              onMouseEnter={(e) => (e.target.style.color = "#e74c3c")}
              onMouseLeave={(e) => (e.target.style.color = "#bdc3c7")}
            />
            <h2>Support</h2>
          </div>
          <div style={styles.popupContent}>
            <textarea
              style={styles.chatInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Hi! What do you need?..."></textarea>
            <button
              style={styles.sendMsgBtn}
              onClick={sendMessage}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#2980b9")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#3498db")}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SupportCustomer;
