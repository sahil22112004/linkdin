// export const uploadToCloudinary = async (file: File): Promise<string | null> => {
//     const CLOUDINARY_UPLOAD_PRESET = 'chat_app_preset';
//     const CLOUDINARY_CLOUD_NAME = 'dtivbuxxm';
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET ?? "");
//     formData.append("cloud_name", CLOUDINARY_CLOUD_NAME ?? "");
//     formData.append("folder", "images");

//     try {
//         const response = await fetch(
//             `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//             {
//                 method: "POST",
//                 body: formData,
//             }
//         );

//         const data = await response.json();
//         console.log('working',data)

//         if (data.secure_url) {
//             return data.secure_url;
//         } else {
//             throw new Error("Failed to get image URL");
//         }
//     } catch (error) {
//         console.error("Cloudinary upload error:", error);
//         throw error;
//     }
// };

export const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const CLOUDINARY_UPLOAD_PRESET = 'chat_app_preset'
    const CLOUDINARY_CLOUD_NAME = 'dtivbuxxm'

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET)
    formData.append("folder", "images")

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`,
            {
                method: "POST",
                body: formData
            }
        )

        const data = await response.json()

        if (data.secure_url) {
            return data.secure_url
        } else {
            throw new Error("Upload failed")
        }

    } catch (error) {
        console.error("Cloudinary upload error:", error)
        throw error
    }
}