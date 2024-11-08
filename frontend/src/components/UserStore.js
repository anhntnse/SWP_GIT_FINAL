import React, { useState, useEffect } from 'react';
import SummaryApi from '../common/index'; // Đảm bảo file này có endpoint cho getAllPost
import uploadImage from '../helpers/uploadImage';
import { toast } from 'react-toastify'; // Import toast for notifications
import { FaPlus, FaTimes } from 'react-icons/fa'; // Import icons

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  },
  grid: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    border: '1px solid #ced4da',
    borderRadius: '8px',
    width: '250px',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#ffffff',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  modal: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    zIndex: '2000',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    position: 'relative',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    zIndex: '2100',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
    backgroundColor: '#343a40',
    color: '#ffffff',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '5px',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    width: '100%',
    border: '1px solid #ced4da',
    borderRadius: '5px',
  },
  addButton: {
    backgroundColor: '#28a745',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '15px',
    transition: 'background-color 0.2s',
  },
};

const UserStore = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // Để lưu bài viết đã chọn
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false); // Modal cho chi tiết bài viết
  const [newPost, setNewPost] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    condition: '',
    address: '',
    phoneNumber: '',
    contactInfo: '',
  });

  // Fetch approved posts from the API
  const fetchApprovedPosts = async () => {
    try {
      const response = await fetch(SummaryApi.getAllPost.url, {
        method: SummaryApi.getAllPost.method,
        credentials: 'include',
      });
      const dataResponse = await response.json();
      if (Array.isArray(dataResponse) && dataResponse.length > 0) {
        const approvedPosts = dataResponse.filter(post => post.status === 'approved');
        setPosts(approvedPosts); // Chỉ set các bài viết đã được phê duyệt
      } else {
        toast.error("Không có dữ liệu hợp lệ từ API");
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bài viết:", error);
      toast.error("Lỗi khi lấy danh sách bài viết");
    }
  };

  useEffect(() => {
    fetchApprovedPosts(); // Gọi hàm fetchApprovedPosts khi component được mount
  }, []);

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    const uploadImageCloudinary = await uploadImage(file);
    setNewPost({ ...newPost, imageUrl: uploadImageCloudinary.url });
  };

  const handleAddPost = async () => {
    const token = localStorage.getItem('authToken'); // Lấy token từ localStorage
    if (!newPost.imageUrl) {
      toast.error("Vui lòng tải lên hình ảnh.");
      return;
    }
    if (!token) {
      alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
      return;
    }

    try {
      const response = await fetch(SummaryApi.createPost.url, {
        method: SummaryApi.createPost.method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });

      if (response.ok) {
        const result = await response.json();
        toast(result.message);

        // Thêm bài viết mới vào danh sách
        setPosts((prevPosts) => [...prevPosts, result.post]); // Thêm bài viết mới vào danh sách
        setIsModalOpen(false); // Đóng modal sau khi thêm thành công
        setNewPost({
          name: '',
          description: '',
          price: '',
          imageUrl: '',
          condition: '',
          address: '',
          phoneNumber: '',
          contactInfo: '',
        });
      } else {
        const errorResult = await response.json();
        console.error('Lỗi khi tạo bài viết:', errorResult);
        toast.error(errorResult.message); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error('Lỗi khi tạo bài viết:', error);
      toast.error('Đã xảy ra lỗi khi tạo bài viết.'); // Hiển thị thông báo lỗi
    }
  };

  const openDetailModal = (post) => {
    setSelectedPost(post);
    setIsDetailModalOpen(true); // Mở modal chi tiết
  };

  return (
    <div style={styles.container}>
      <button style={styles.addButton} onClick={() => setIsModalOpen(true)}>
        <FaPlus style={{ marginRight: '8px' }} /> Thêm Bài Viết
      </button>

      {isModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button className="close-button" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>
            <h2>Thêm Bài Viết Mới</h2>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={newPost.name}
              onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
              style={styles.input}
            />
            <textarea
              placeholder="Mô tả sản phẩm"
              value={newPost.description}
              onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
              style={{ ...styles.input, height: '100px' }}
            />
            <input
              type="number"
              placeholder="Giá sản phẩm"
              value={newPost.price}
              onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Tình trạng (Mới/Cũ)"
              value={newPost.condition}
              onChange={(e) => setNewPost({ ...newPost, condition: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Địa chỉ"
              value={newPost.address}
              onChange={(e) => setNewPost({ ...newPost, address: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Số điện thoại liên hệ"
              value={newPost.phoneNumber}
              onChange={(e) => setNewPost({ ...newPost, phoneNumber: e.target.value })}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Thông tin liên hệ"
              value={newPost.contactInfo}
              onChange={(e) => setNewPost({ ...newPost, contactInfo: e.target.value })}
              style={styles.input}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleUploadProduct}
              style={styles.input}
            />
            <button onClick={handleAddPost} style={styles.addButton}>
              Thêm
            </button>
          </div>
        </div>
      )}

      <div style={styles.grid}>
        {posts.map((post) => (
          <div key={post._id} style={styles.card} onClick={() => openDetailModal(post)}>
            <img src={post.imageUrl} alt={post.name} style={styles.image} />
            <div>
              <h3>{post.name}</h3>
              <p>{post.price}</p>
              <p>{post.condition}</p>
              <p>{post.address}</p>
            </div>
          </div>
        ))}
      </div>

      {isDetailModalOpen && selectedPost && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <button className="close-button" onClick={() => setIsDetailModalOpen(false)}>
              <FaTimes />
            </button>
            <h2>{selectedPost.name}</h2>
            <img src={selectedPost.imageUrl} alt={selectedPost.name} style={styles.image} />
            <p><strong>Giá:</strong> {selectedPost.price}</p>
            <p><strong>Tình trạng:</strong> {selectedPost.condition}</p>
            <p><strong>Địa chỉ:</strong> {selectedPost.address}</p>
            <p><strong>Số điện thoại:</strong> {selectedPost.phoneNumber}</p>
            <p><strong>Thông tin liên hệ:</strong> {selectedPost.contactInfo}</p>
            <p><strong>Mô tả:</strong> {selectedPost.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserStore;



// import React, { useState, useEffect } from 'react';
// import SummaryApi from '../common/index'; // Ensure this file has the endpoint for getAllPost
// import uploadImage from '../helpers/uploadImage';
// import { toast } from 'react-toastify'; // Import toast for notifications
// import { FaPlus, FaTimes } from 'react-icons/fa'; // Import icons

// const styles = {
//   container: {
//     maxWidth: '1200px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f8f9fa',
//     color: '#343a40',
//   },
//   grid: {
//     display: 'flex',
//     gap: '20px',
//     justifyContent: 'center',
//     flexWrap: 'wrap',
//   },
//   card: {
//     border: '1px solid #ced4da',
//     borderRadius: '8px',
//     width: '250px',
//     overflow: 'hidden',
//     cursor: 'pointer',
//     backgroundColor: '#ffffff',
//     transition: 'transform 0.2s',
//   },
//   image: {
//     width: '100%',
//     height: '150px',
//     objectFit: 'cover',
//   },
//   modal: {
//     position: 'fixed',
//     top: '0',
//     left: '0',
//     width: '100%',
//     height: '100%',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     display: 'flex',
//     zIndex: '2000',
//   },
//   modalContent: {
//     backgroundColor: '#ffffff',
//     padding: '20px',
//     borderRadius: '10px',
//     width: '400px',
//     position: 'relative',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
//     zIndex: '2100',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     cursor: 'pointer',
//     backgroundColor: '#343a40',
//     color: '#ffffff',
//     padding: '8px 12px',
//     border: 'none',
//     borderRadius: '5px',
//   },
//   input: {
//     marginBottom: '15px',
//     padding: '10px',
//     width: '100%',
//     border: '1px solid #ced4da',
//     borderRadius: '5px',
//   },
//   addButton: {
//     backgroundColor: '#28a745',
//     color: '#ffffff',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: '15px',
//     transition: 'background-color 0.2s',
//   },
//   addButtonHover: {
//     backgroundColor: '#218838',
//   },
// };

// const UserStore = () => {
//   const [posts, setPosts] = useState([]);
//   const [selectedPost, setSelectedPost] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newPost, setNewPost] = useState({
//     name: '',
//     description: '',
//     price: '',
//     imageUrl: '',
//     condition: '',
//     address: '',
//     phoneNumber: '',
//     contactInfo: '',
//   });

//   // Fetch approved posts from the API
//   const fetchApprovedPosts = async () => {
//     try {
//       const response = await fetch(SummaryApi.getAllPost.url, {
//         method: SummaryApi.getAllPost.method,
//         credentials: 'include',
//       });
//       const dataResponse = await response.json();
//       console.log("Data response:", dataResponse);

//       // Filter to only include approved posts
//       if (Array.isArray(dataResponse) && dataResponse.length > 0) {
//         const approvedPosts = dataResponse.filter(post => post.status === 'approved');
//         setPosts(approvedPosts); // Set the approved posts
//         console.log("Approved Posts set to:", approvedPosts);
//       } else {
//         toast.error("Không có dữ liệu hợp lệ từ API");
//       }
//     } catch (error) {
//       console.error("Lỗi khi lấy danh sách bài viết:", error);
//       toast.error("Lỗi khi lấy danh sách bài viết");
//     }
//   };

//   useEffect(() => {
//     fetchApprovedPosts(); // Call fetchApprovedPosts when the component mounts
//   }, []);

//   const openPostDetail = (post) => {
//     setSelectedPost(post);
//   };

//   const handleAddButtonClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleUploadProduct = async (e) => {
//     const file = e.target.files[0];
//     const uploadImageCloudinary = await uploadImage(file);
//     setNewPost({ ...newPost, imageUrl: uploadImageCloudinary.url });
//   };

//   const handleAddPost = async () => {
//     const token = localStorage.getItem('authToken'); // Lấy token từ localStorage

//     if (!token) {
//         alert('Token không hợp lệ. Vui lòng đăng nhập lại.');
//         return;
//     }
//     try {
//       const response = await fetch(SummaryApi.createPost.url, {
//         method: SummaryApi.createPost.method,
//         headers: {
//           'Content-Type': 'application/json',
//            Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newPost),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         alert(result.message);

//         // Thêm bài viết mới vào danh sách
//         setPosts([...posts, result.post]); // Add the new post to the existing posts
//         setIsModalOpen(false);
//         setNewPost({
//           name: '',
//           description: '',
//           price: '',
//           imageUrl: '',
//           condition: '',
//           address: '',
//           phoneNumber: '',
//           contactInfo: '',
//         });
//       } else {
//         const errorResult = await response.json();
//         console.error('Lỗi khi tạo bài viết:', errorResult);
//         toast(`Đã xảy ra lỗi khi tạo bài viết: ${errorResult.message}`);
//       }
//     } catch (error) {
//       console.error('Lỗi khi tạo bài viết:', error);
//       toast('Đã xảy ra lỗi khi tạo bài viết.');
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <button style={styles.addButton} onClick={handleAddButtonClick}>
//         <FaPlus style={{ marginRight: '8px' }} /> Thêm Bài Viết
//       </button>

//       {isModalOpen && (
//         <div style={styles.modal}>
//           <div style={styles.modalContent}>
//             <button className="close-button" onClick={() => setIsModalOpen(false)}>
//               <FaTimes />
//             </button>
//             <h2>Thêm Bài Viết Mới</h2>
//             <input
//               type="text"
//               placeholder="Tên sản phẩm"
//               value={newPost.name}
//               onChange={(e) => setNewPost({ ...newPost, name: e.target.value })}
//               style={styles.input}
//             />
//             <textarea
//               placeholder="Mô tả sản phẩm"
//               value={newPost.description}
//               onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
//               style={{ ...styles.input, height: '100px' }}
//             />
//             <input
//               type="number"
//               placeholder="Giá sản phẩm"
//               value={newPost.price}
//               onChange={(e) => setNewPost({ ...newPost, price: e.target.value })}
//               style={styles.input}
//             />
//             <input
//               type="text"
//               placeholder="Tình trạng (Mới/Cũ)"
//               value={newPost.condition}
//               onChange={(e) => setNewPost({ ...newPost, condition: e.target.value })}
//               style={styles.input}
//             />
//             <input
//               type="text"
//               placeholder="Địa chỉ"
//               value={newPost.address}
//               onChange={(e) => setNewPost({ ...newPost, address: e.target.value })}
//               style={styles.input}
//             />
//             <input
//               type="text"
//               placeholder="Số điện thoại liên hệ"
//               value={newPost.phoneNumber}
//               onChange={(e) => setNewPost({ ...newPost, phoneNumber: e.target.value })}
//               style={styles.input}
//             />
//             <input
//               type="text"
//               placeholder="Thông tin liên hệ"
//               value={newPost.contactInfo}
//               onChange={(e) => setNewPost({ ...newPost, contactInfo: e.target.value })}
//               style={styles.input}
//             />
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleUploadProduct}
//               style={styles.input}
//             />
//             <button onClick={handleAddPost} style={styles.addButton}>
//               Thêm
//             </button>
//           </div>
//         </div>
//       )}

//       <div style={styles.grid}>
//         {posts.map((post) => (
//           <div key={post.id} style={styles.card} onClick={() => openPostDetail(post)}>
//             <img src={post.imageUrl} alt={post.name} style={styles.image} />
//             <div>
//               <h3>{post.name}</h3>
//               <p>{post.price}</p>
//               <p>{post.condition}</p>
//               <p>{post.address}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {selectedPost && (
//         <div style={styles.modal}>
//           <div style={styles.modalContent}>
//             <button style={styles.closeButton} onClick={() => setSelectedPost(null)}>
//               Đóng
//             </button>
//             <h2>{selectedPost.name}</h2>
//             <img src={selectedPost.imageUrl} alt={selectedPost.name} style={styles.image} />
//             <p>
//               <strong>Giá:</strong> {selectedPost.price}
//             </p>
//             <p>
//               <strong>Tình trạng:</strong> {selectedPost.condition}
//             </p>
//             <p>
//               <strong>Địa chỉ:</strong> {selectedPost.address}
//             </p>
//             <p>
//               <strong>Số điện thoại:</strong> {selectedPost.phoneNumber}
//             </p>
//             <p>
//               <strong>Thông tin liên hệ:</strong> {selectedPost.contactInfo}
//             </p>
//             <p>
//               <strong>Mô tả:</strong> {selectedPost.description}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserStore;
