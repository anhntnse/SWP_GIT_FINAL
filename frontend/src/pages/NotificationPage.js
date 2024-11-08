import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SummaryApi from "../common";

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all"); // State to manage the filter
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const [totalNotifications, setTotalNotifications] = useState(0); // Total notifications for pagination

    const user = useSelector((state) => state?.user?.user);
    const userId = user?._id;
    const notificationsPerPage = 4;

    const fetchNotifications = async (selectedFilter, page) => {
        try {
            setLoading(true);
            let url = SummaryApi.getNotifications.url(userId);
            url += `?page=${page}&limit=${notificationsPerPage}`;
            
            if (selectedFilter === "read") {
                url += `&readStatus=true`;
            } else if (selectedFilter === "unread") {
                url += `&readStatus=false`;
            }
            
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error("Failed to fetch notifications");
            }
            const data = await res.json();
            setNotifications(data.notifications);
            setTotalNotifications(data.total);
        } catch (err) {
            setError("Error fetching notifications");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (event) => {
        const selectedFilter = event.target.value;
        setFilter(selectedFilter);
        setCurrentPage(1); // Reset to the first page on filter change
    };

    const markNotificationAsRead = async (notificationId) => {
        try {
            const url = SummaryApi.markNotificationAsRead.url(notificationId);
            const res = await fetch(url, { method: 'PUT' });
            if (!res.ok) {
                throw new Error("Failed to mark notification as read");
            }
            setNotifications((prevNotifications) =>
                prevNotifications.map((notification) =>
                    notification._id === notificationId
                        ? { ...notification, read: true }
                        : notification
                )
            );
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch notifications when `filter` or `currentPage` changes
    useEffect(() => {
        fetchNotifications(filter, currentPage);
    }, [filter, currentPage]);

    const totalPages = Math.ceil(totalNotifications / notificationsPerPage);

    if (loading) return <div className="text-center py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Notifications</h1>

            {/* Dropdown menu for filter */}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <label htmlFor="filter" className="text-gray-700 font-semibold mr-2">Filter:</label>
                    <select
                        id="filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="border border-gray-300 p-2 rounded-lg"
                    >
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                </div>
                <div>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        className={`px-3 py-1 border rounded-lg mr-2 ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    >
                        Previous
                    </button>
                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        className={`px-3 py-1 border rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
                    >
                        Next
                    </button>
                </div>
            </div>

            <ul className="space-y-4">
                {notifications.map(notification => (
                    <li
                        key={notification._id}
                        className={`border border-gray-300 p-3 rounded-lg shadow-sm transition-all ${notification.read ? 'bg-gray-200' : 'bg-white'}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-lg font-semibold text-gray-800">{notification.title}</h2>
                            <button
                                onClick={() => markNotificationAsRead(notification._id)}
                                className="focus:outline-none"
                            >
                                {notification.read ? (
                                    <span className="text-green-500 text-xl">✓</span>
                                ) : (
                                    <span className="text-red-500 text-xl">●</span>
                                )}
                            </button>
                        </div>
                        <p className="text-gray-700 text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{new Date(notification.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NotificationPage;
