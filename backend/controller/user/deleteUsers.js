const User =require('../../models/userModel') ;


 const deleteUser = async (req, res) => {
   try {
        const userId = req.params.userId;
        const user = await User.findByIdAndDelete(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the user' });
    }
};
module.exports=deleteUser;