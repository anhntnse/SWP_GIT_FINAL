const notificationModel = require('../../models/notificationModel');
class NotificationController{
    static async getNotifications(userId, readStatus = null, page = 1, limit = 20) {
        try {
            // Add a filter for the read status if provided
            const filter = { userId };
            if (readStatus !== null) {
                filter.read = readStatus === 'false' ? false : true;
            }
    
            // Calculate skip and limit for pagination
            const skip = (page - 1) * limit;
    
            const notifications = await notificationModel.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit);
    
            // Get total count for pagination calculation
            const total = await notificationModel.countDocuments(filter);
    
            return { notifications, total };
        } catch (error) {
            console.error("Error fetching notifications:", error);
            return null;
        }
    }
    static async markNotificationAsRead(notificationId){
        try{
            const notification = await notificationModel.findById(notificationId);
            notification.read = true;
            await notification.save();
            console.log("Notification marked as read:", notificationId);
            return notification;
        }catch(err){
            console.error("Error marking notification as read:", error);
            return null;
        }
    }
}
module.exports = NotificationController;