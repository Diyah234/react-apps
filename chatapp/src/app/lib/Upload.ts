const upload = async (file: File): Promise<string> => {
  const cloudName = "dzpzjnghk";
  const uploadPreset = "chat-app-upload";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    console.error("Upload failed", err);
    throw new Error("Upload failed.");
  }
};

export default upload;