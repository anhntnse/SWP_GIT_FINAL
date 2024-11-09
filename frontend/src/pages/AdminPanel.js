// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { FaRegCircleUser } from "react-icons/fa6";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import ROLE from "../common/role";

// const AdminPanel = () => {
//   const user = useSelector((state) => state?.user?.user);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (user?.role !== ROLE.ADMIN) {
//       navigate("/");
//     }
//   }, [user]);

//   const links = [
//     { path: "all-users", label: "User Management" },
//     { path: "all-products", label: "Product Management" },
//     { path: "all-orders", label: "Order Management" },
//     { path: "all-shipping-methods", label: "Manage shipping methods" },
//     { path: "inventory-management", label: "Inventory Management" },
//     { path: "revenue-summary", label: "Revenue Summary" },
//     { path: "all-news", label: "News Management" },
//     { path: "discount", label: "Manage Discounts" },
//     { path: "all-review", label: "Manage Reviews" },
//     { path: "all-onSale", label: "Sales Manager" },
//     { path: "post-user", label: " Manage User Posts" },
//     { path: "all-pre-order", label: "Manage pre-orders" },
//   ];

//   return (
//     <div className="min-h-[calc(100vh-120px)] flex">
//       {/** Sidebar */}
//       <aside className="bg-white min-h-full w-64 shadow-lg border-r border-gray-700 p-2">
//         {/** User Profile with Medium Border */}
//         <div className="flex flex-col items-center justify-center mb-4 border-2 border-gray-700 rounded-lg p-4">
//           <div className="w-24 h-24 mb-2 rounded-full overflow-hidden border-2 border-gray-700">
//             {user?.profilePic ? (
//               <img
//                 src={user?.profilePic}
//                 className="w-full h-full object-cover rounded-full"
//                 alt={user?.name}
//               />
//             ) : (
//               <FaRegCircleUser className="text-6xl text-gray-400" />
//             )}
//           </div>
//           <p className="capitalize text-lg font-semibold">{user?.name}</p>
//           <p className="text-sm text-gray-500">{user?.role}</p>
//         </div>

//         {/** Table Navigation with Medium Border */}
//         <div className="p-2">
//           <table className="w-full border-2 border-gray-700 rounded-lg">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border-b-2 border-gray-700 p-3 text-left font-bold">
//                 Admin Management 
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {links.map((item, index) => (
//                 <tr key={index} className="hover:bg-gray-100">
//                   <td className="border-b-2 border-gray-700 p-3">
//                     <Link
//                       to={item.path}
//                       className="text-blue-600 font-semibold hover:underline"
//                     >
//                       {item.label}
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </aside>

//       {/** Main Content */}
//       <main className="flex-1 p-4">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminPanel;
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaUserCircle, FaUsers, FaBox, FaShoppingCart, FaTruck, FaWarehouse, FaChartLine, FaNewspaper, FaTags, FaStar, FaDollarSign, FaClipboardList, FaUserEdit } from "react-icons/fa";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user]);

  const links = [
    { path: "all-users", label: "User Management", icon: <FaUsers /> },
    { path: "all-products", label: "Product Management", icon: <FaBox /> },
    { path: "all-orders", label: "Order Management", icon: <FaShoppingCart /> },
    { path: "all-shipping-methods", label: "Manage Shipping Methods", icon: <FaTruck /> },
    { path: "inventory-management", label: "Inventory Management", icon: <FaWarehouse /> },
    { path: "revenue-summary", label: "Revenue Summary", icon: <FaChartLine /> },
    { path: "all-news", label: "News Management", icon: <FaNewspaper /> },
    { path: "discount", label: "Manage Discounts", icon: <FaTags /> },
    { path: "all-review", label: "Manage Reviews", icon: <FaStar /> },
    { path: "all-onSale", label: "Sales Manager", icon: <FaDollarSign /> },
    { path: "post-user", label: "Manage User Posts", icon: <FaClipboardList /> },
    { path: "all-pre-order", label: "Manage Pre-orders", icon: <FaUserEdit /> },
  ];

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      {/** Sidebar */}
      <aside className="bg-white min-h-full w-64 shadow-lg border-r border-gray-700 p-2">
        {/** User Profile with Medium Border */}
        <div className="flex flex-col items-center justify-center mb-4 border-2 border-gray-700 rounded-lg p-4">
          <div className="w-24 h-24 mb-2 rounded-full overflow-hidden border-2 border-gray-700">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-full h-full object-cover rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaUserCircle className="text-6xl text-gray-400" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.role}</p>
        </div>

        {/** Table Navigation with Medium Border */}
        <div className="p-2">
          <table className="w-full border-2 border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="border-b-2 border-gray-700 p-3 text-left font-bold">
                  Admin Management
                </th>
              </tr>
            </thead>
            <tbody>
              {links.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b-2 border-gray-700 p-3 flex items-center space-x-2">
                    {item.icon}
                    <Link
                      to={item.path}
                      className="text-blue-600 font-semibold hover:underline"
                    >
                      {item.label}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </aside>

      {/** Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;

