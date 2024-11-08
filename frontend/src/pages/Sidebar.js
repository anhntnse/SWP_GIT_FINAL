import React from 'react';
import Draggable from 'react-draggable';
import { FaNewspaper, FaTimes, FaStore } from 'react-icons/fa'; // Đảm bảo icon được import
import './Sidebar.css';

import { Link, Routes, Route } from 'react-router-dom';
import SupportCustomer from '../components/Support';

const Sidebar = ({ onClose }) => {
  return (
    <Draggable>  
      <div className="sidebar"> 
   
        <div className="icon-list">
          <div className="icon-container">
            <Link to="/News">
              <FaNewspaper className="icon" />
            </Link>
          </div>
          
          <div className="icon-container">
            <Link to="/UserStore">
              <FaStore className="icon" /> {/* Thay FaHeadset bằng FaStore */}
              {/* Badge thông báo */}
              <span className="notification-badge">2</span>
            </Link>
          </div>
          
          <Routes>
            <Route path="/" element={<SupportCustomer />} />
          </Routes>
        </div>
      </div>
    </Draggable>
  );
};

export default Sidebar;
