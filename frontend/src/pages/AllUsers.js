import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import { RiDeleteBin6Line } from "react-icons/ri";

const AllUsers = () => {    
    const [allUser,setAllUsers] = useState([])
    const [openUpdateRole,setOpenUpdateRole] = useState(false)
    const [updateUserDetails,setUpdateUserDetails] = useState({
        email : "",
        name : "",
        role : "",
        _id  : ""
    })
// Phân trang
const [currentPage, setCurrentPage] = useState(1);
const [usersPerPage] = useState(20); // Số người dùng trên mỗi trang

    const fetchAllUsers = async() =>{
        const fetchData = await fetch(SummaryApi.allUser.url,{
            method : SummaryApi.allUser.method,
            credentials : 'include'
        })

        const dataResponse = await fetchData.json()

        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.message)
        }

    }
    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`${SummaryApi.deleteUser.url}/${userId}`, {
                method: SummaryApi.deleteUser.method,
                credentials: 'include'
            });
    
            const result = await response.json();
    
            if (result.success) {
                toast.success("User deleted successfully");
                fetchAllUsers(); 
            } else {
                toast.error(result.message || "Failed to delete user");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("An error occurred while deleting the user.");
        }
    };
    useEffect(()=>{
        fetchAllUsers()
    },[])

   // Tính toán người dùng hiển thị cho trang hiện tại
   const indexOfLastUser = currentPage * usersPerPage;
   const indexOfFirstUser = indexOfLastUser - usersPerPage;
   const currentUsers = allUser.slice(indexOfFirstUser, indexOfLastUser);

   // Tính toán số trang
   const pageNumbers = [];
   for (let i = 1; i <= Math.ceil(allUser.length / usersPerPage); i++) {
       pageNumbers.push(i);
   }


  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    currentUsers.map((el,index) => {
                        return(
                            <tr>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)

                                    }}  
                                    >
                                        <MdModeEdit/>
                                    </button>
                                    <button className='bg-red-100 p-2 rounded-full cursor-pointer hover:bg-red-500 hover:text-white'
                                       onClick={()=>{
                                        deleteUser(el._id)
                                       }}
                                       >
                                      <RiDeleteBin6Line />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChangeUserRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.name}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchAllUsers}
                />
            )      
        }
          {/* Phân trang */}
         <div className='flex justify-center mt-4'>
                {pageNumbers.map(number => (
                    <button key={number} onClick={() => setCurrentPage(number)} className={`mx-1 px-3 py-1 border rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}>
                        {number}
                    </button>
                ))}
            </div>
    </div>
  )
}

export default AllUsers