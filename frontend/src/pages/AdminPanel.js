import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faBox,
  faReceipt,
  faTruck,
  faWarehouse,
  faChartLine,
  faNewspaper,
  faTags,
  faStar,
  faPercentage,
  faUserPlus,
  faClipboardList,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

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

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      <aside className="bg-white min-h-full  w-full  max-w-60 customShadow">
        <div className="h-32  flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/*** Navigation ***/}
        <div>
          <nav className="grid p-4">
            <Link to={"all-users"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              All Users
            </Link>
            <Link to={"all-products"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faBox} className="mr-2" />
              All Products
            </Link>
            <Link to={"all-orders"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faReceipt} className="mr-2" />
              All Orders
            </Link>
            <Link
              to={"all-shipping-methods"}
              className="px-2 py-1 hover:bg-slate-100"
            >
              <FontAwesomeIcon icon={faTruck} className="mr-2" />
              All Shipping Methods
            </Link>
            <Link
              to={"inventory-management"}
              className="px-2 py-1 hover:bg-slate-100"
            >
              <FontAwesomeIcon icon={faWarehouse} className="mr-2" />
              Inventory
            </Link>
            <Link
              to={"revenue-summary"}
              className="px-2 py-1 hover:bg-slate-100"
            >
              <FontAwesomeIcon icon={faChartLine} className="mr-2" />
              Revenue Summary
            </Link>
            <Link to={"AllNews"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faNewspaper} className="mr-2" />
              All News
            </Link>
            <Link to={"discount"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faTags} className="mr-2" />
              All Discounts
            </Link>
            <Link to={"all-review"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faStar} className="mr-2" />
              All Reviews
            </Link>
            <Link to={"all-onSale"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faPercentage} className="mr-2" />
              All On Sale
            </Link>
            <Link to={"post-user"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Post User
            </Link>
            <Link to={"all-pre-order-product"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faCartPlus} className="mr-2" />
              All Pre-Order Products
            </Link>
            <Link to={"all-pre-order"} className="px-2 py-1 hover:bg-slate-100">
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              All Pre-orders
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
