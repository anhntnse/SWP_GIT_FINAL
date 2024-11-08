const shippingModel = require('../../models/shippingModel');

async function addShippingMethod(req, res) {
    const { name, price, estimatedDelivery, minDeliveryDays, maxDeliveryDays } = req.body;

    // Check if all fields are provided
    if (!name || !price || !estimatedDelivery || minDeliveryDays === undefined || maxDeliveryDays === undefined) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Check if minDeliveryDays is less than or equal to maxDeliveryDays
    if (minDeliveryDays > maxDeliveryDays) {
        return res.status(400).json({ success: false, message: 'Minimum delivery days cannot be greater than maximum delivery days.' });
    }

    try {
        // Trim and convert name to lowercase for case-insensitive comparison
        if (minDeliveryDays > maxDeliveryDays) {
            return res.status(400).json({ success: false, message: 'Minimum delivery days cannot be greater than maximum delivery days.' });
        }
        const trimmedName = name.trim().toLowerCase();

        // Check if the shipping method already exists (case-insensitive)
        const existingMethod = await shippingModel.findOne({ name: { $regex: new RegExp(`^${trimmedName}$`, 'i') } });
        if (existingMethod) {
            return res.status(400).json({ success: false, message: 'Shipping method name already exists.' });
        }

        // If not exists, create a new shipping method
        const newMethod = new shippingModel({ 
            name: trimmedName,  // Store name in lowercase to maintain consistency
            price, 
            estimatedDelivery, 
            minDeliveryDays, 
            maxDeliveryDays 
        });

        await newMethod.save();
        res.json({ success: true, message: 'Shipping method added successfully' });
    } catch (error) {
        console.error("Error adding shipping method:", error); // Log detailed error to console
        res.status(500).json({ success: false, message: 'Failed to add shipping method' });
    }
};

module.exports = addShippingMethod;
