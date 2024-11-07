const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Ecommere_product");

    try {
        const dataResponse = await fetch(url, {
            method: "POST",
            body: formData,
        });

        // Check if the response is okay (status code 200-299)
        if (!dataResponse.ok) {
            throw new Error('Image upload failed. Please try again.');
        }

        const responseData = await dataResponse.json();

        // Ensure the expected structure is returned
        if (!responseData || !responseData.secure_url) {
            throw new Error('Invalid response from Cloudinary');
        }

        return { url: responseData.secure_url }; // Return the URL in the expected format
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Rethrow the error for handling in the calling function
    }
};

export default uploadImage;
