import React, { useState, useEffect } from 'react';
import SummaryApi from "../common/index";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PostUser = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Biến lưu bài viết đang được chọn
  const [postToDelete, setPostToDelete] = useState(null); // Biến lưu bài viết chuẩn bị xóa
  const [statusModalPost, setStatusModalPost] = useState(null); // Biến lưu bài viết để thay đổi trạng thái
  const [newStatus, setNewStatus] = useState(''); // Biến lưu trạng thái mới

  const fetchPosts = async () => {
    try {
      const response = await fetch(SummaryApi.getAllPost.url, {
        method: SummaryApi.getAllPost.method,
        credentials: "include",
      });
      const dataResponse = await response.json();
      console.log("Data response:", dataResponse);

      if (Array.isArray(dataResponse) && dataResponse.length > 0) {
        setPosts(dataResponse);
        console.log("Posts set to:", dataResponse);
      } else {
        toast.error("Không có dữ liệu hợp lệ từ API");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
      toast.error("Lỗi khi lấy danh sách bài viết");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Hàm xử lý khi nhấn vào một bài viết để xem chi tiết
  const handleRowClick = (post) => {
    setSelectedPost(post);
  };

  // Hàm mở modal xóa bài viết
  const handleDeleteClick = (post) => {
    setPostToDelete(post);
  };

  // Xác nhận xóa bài viết
  const confirmDelete = async () => {
    try {
      const response = await fetch(SummaryApi.deletePost.url(postToDelete._id), {
        method: SummaryApi.deletePost.method,
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== postToDelete._id));
        setPostToDelete(null);
        toast.success("Xóa bài viết thành công");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lỗi khi xóa bài viết");
      }
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      toast.error("Lỗi khi xóa bài viết");
    }
  };

  // Hủy xóa bài viết
  const cancelDelete = () => {
    setPostToDelete(null);
  };

  // Đóng modal chi tiết bài viết
  const closeModal = () => {
    setSelectedPost(null);
  };

  // Mở modal thay đổi trạng thái bài viết
  const openStatusModal = (post) => {
    setStatusModalPost(post);
    setNewStatus(post.status); 
  };

  // Xử lý thay đổi trạng thái
  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  // Xác nhận cập nhật trạng thái bài viết
  const confirmStatusUpdate = async () => {
    try {
      const response = await fetch(SummaryApi.updateStatus.url(statusModalPost._id), {
        method: SummaryApi.updateStatus.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        setPosts(posts.map((post) => (post._id === statusModalPost._id ? { ...post, status: newStatus } : post)));
        setStatusModalPost(null);
        toast.success("Cập nhật trạng thái thành công");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Lỗi khi cập nhật trạng thái");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái:", error);
      toast.error("Lỗi khi cập nhật trạng thái");
    }
  };

  const styles = {
    container: { margin: '20px', fontFamily: 'Arial, sans-serif' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '10px', textAlign: 'left', border: '1px solid #ddd', backgroundColor: '#f2f2f2' },
    td: { padding: '10px', textAlign: 'left', border: '1px solid #ddd', position: 'relative' },
    rowHover: { cursor: 'pointer', backgroundColor: '#f5f5f5' },
    deleteIcon: { cursor: 'pointer', color: 'red', marginLeft: '10px' },
    modal: { position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', zIndex: 1000, width: '80%', maxWidth: '400px' },
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 },
    closeButton: { marginTop: '10px', padding: '5px 10px', backgroundColor: '#d9534f', color: '#fff', border: 'none', cursor: 'pointer' },
    confirmButton: { marginTop: '10px', padding: '5px 10px', backgroundColor: '#5cb85c', color: '#fff', border: 'none', cursor: 'pointer' },
    dropdown: { padding: '5px', marginRight: '5px' },
    image: { width: '100%', height: 'auto', marginBottom: '10px' }
  };

  const statusOptions = [
    { value: 'approved', label: 'Đã phê duyệt' },
    { value: 'pending', label: 'Chờ phê duyệt' },
    { value: 'blocked', label: 'Đã bị chặn' }
  ];

  const statusIcons = {
    approved: '✅',
    pending: '🕒',
    blocked: '🚫'
  };

  return (
    <div style={styles.container}>
    <ToastContainer />
    <h2>Quản Lý Bài Viết</h2>
    <table style={styles.table}>
      <thead>
        <tr>
          <th style={styles.th}>Tên Bài</th>
          <th style={styles.th}>Người Đăng Bài</th>
          <th style={styles.th}>Nội Dung</th>
          <th style={styles.th}>Trạng Thái</th>
          <th style={styles.th}>Tình Trạng</th> {/* Thêm cột Tình Trạng */}
          <th style={styles.th}>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post) => (
            <tr key={post._id} style={styles.rowHover}>
              <td style={styles.td} onClick={() => handleRowClick(post)}>{post.name}</td>
              <td style={styles.td} onClick={() => handleRowClick(post)}>{post.userId || "N/A"}</td>
              <td style={styles.td} onClick={() => handleRowClick(post)}>{post.description ? post.description.substring(0, 50) : "No description"}...</td>
              <td style={styles.td}>
                <span onClick={() => openStatusModal(post)} style={{ cursor: 'pointer' }}>
                  {statusIcons[post.status]}
                </span>
              </td>
              <td style={styles.td}>{post.condition}</td> {/* Hiển thị tình trạng */}
              <td style={styles.td}>
                <span style={styles.deleteIcon} onClick={() => handleDeleteClick(post)}>🗑️</span>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" style={styles.td}>Không có bài viết nào</td>
          </tr>
        )}
      </tbody>
    </table>

      {/* Modal Chi Tiết Bài Viết */}
      {selectedPost && (
  <>
    <div style={styles.overlay} onClick={closeModal}></div>
    <div style={styles.modal}>
      <h3>Chi Tiết Bài Viết</h3>
      <img src={selectedPost.imageUrl} alt="Post" style={styles.image} />
      <p><strong>Tên Bài:</strong> {selectedPost.name}</p>
      <p><strong>Người Đăng:</strong> {selectedPost.userId || "N/A"}</p>
      <p><strong>Mô Tả:</strong> {selectedPost.description}</p>
      <p><strong>Giá:</strong> {selectedPost.price} VND</p>
      <p><strong>Địa Chỉ:</strong> {selectedPost.address}</p>
      <p><strong>Số Điện Thoại:</strong> {selectedPost.phoneNumber}</p>
      <p><strong>Thông Tin Liên Hệ:</strong> {selectedPost.contactInfo}</p>
      <p><strong>Trạng Thái:</strong> {statusOptions.find((option) => option.value === selectedPost.status)?.label || "N/A"}</p>
      <p><strong>Tình Trạng:</strong> {selectedPost.condition}</p> {/* Hiển thị tình trạng */}
      <button onClick={closeModal} style={styles.closeButton}>Đóng</button>
    </div>
  </>
)}

      {/* Modal Thay Đổi Trạng Thái */}
      {statusModalPost && (
        <>
          <div style={styles.overlay} onClick={() => setStatusModalPost(null)}></div>
          <div style={styles.modal}>
            <h3>Thay Đổi Trạng Thái Bài Viết</h3>
            <p><strong>Bài viết:</strong> {statusModalPost.name}</p>
            <select value={newStatus} onChange={handleStatusChange} style={styles.dropdown}>
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button onClick={confirmStatusUpdate} style={styles.confirmButton}>Xác Nhận</button>
            <button onClick={() => setStatusModalPost(null)} style={styles.closeButton}>Hủy</button>
          </div>
        </>
      )}

      {/* Modal Xác Nhận Xóa */}
      {postToDelete && (
        <>
          <div style={styles.overlay} onClick={cancelDelete}></div>
          <div style={styles.modal}>
            <h3>Xác Nhận Xóa</h3>
            <p>Bạn có chắc chắn muốn xóa bài viết <strong>{postToDelete.name}</strong> không?</p>
            <button onClick={confirmDelete} style={styles.confirmButton}>Xác Nhận</button>
            <button onClick={cancelDelete} style={styles.closeButton}>Hủy</button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostUser;

