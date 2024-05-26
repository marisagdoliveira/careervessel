import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaFileUpload } from "react-icons/fa";
import '../../app/globals.css';

const FileUploadComponent = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const { data: session } = useSession();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile || !session) return;

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64String = reader.result.split(',')[1]; // Extracting base64 data
            const userId = session.user.id;

            try {
                const response = await fetch('/api/user_img', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, img: base64String }), // Sending base64 encoded image data
                });

                if (response.ok) {
                    const data = await response.json();
                    onUploadSuccess(data.fileName);
                } else {
                    console.error('Upload failed', await response.json());
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        };

        reader.readAsDataURL(selectedFile); // Convert file to base64 string
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} className='flex flex-col' />
            <div className='flex flex-col justify-center items-center'>
                <button onClick={handleUpload}>
                    <div className='flex flex-col items-center'>
                        <FaFileUpload style={{ color: "#555555", width: "30px", height: "30px", marginTop: "10px" }} />
                        <p className='text-gradient'>Save</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default FileUploadComponent;
