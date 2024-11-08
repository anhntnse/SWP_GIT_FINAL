const notificationModel = require('../../models/notificationModel');
const userModel = require('../../models/userModel');

class NotificationService {
    static async createNotification(userId, message) {
        try {
            const notification = new notificationModel({
                userId: userId, // Directly use userId as a string
                message,
                read: false,
                createdAt: new Date(),
            });
            await notification.save(); // Save the notification to the database
            console.log("Notification saved:", notification);
            return notification;
        } catch (err) {
            console.error("Error saving notification:", err);
            return null;
        }
    }

    // New method to add a notification to a user
    static async addNotificationToUser(userId, message) {
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                console.error("User not found");
                return null; // or throw an error
            }
            
            const notification = await NotificationService.createNotification(userId, message);
            if (notification) {
                console.log(`Notification added for user ${user.email}:`, notification);
            }
            return notification;
        } catch (err) {
            console.error("Error adding notification to user:", err);
            return null;
        }
    }
    static async createNotificationForAllUsers(message) {
        try {
            // Lấy tất cả người dùng từ database
            const users = await userModel.find({});
            
            // Dùng Promise.all để tạo thông báo cho tất cả người dùng
            const notifications = await Promise.all(
                users.map(user => 
                    NotificationService.createNotification(user._id, message)
                )
            );
            
            console.log("Notifications created for all users");
            return notifications;
        } catch (err) {
            console.error("Error creating notifications for all users:", err);
            return null;
        }
    }
}

module.exports = NotificationService;