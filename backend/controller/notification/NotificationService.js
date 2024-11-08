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
}

module.exports = NotificationService;