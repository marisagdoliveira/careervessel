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
            const base64String = reader.result.split(',')[1];
            const userId = session.user.id;

            try {
                const response = await fetch('/api/user_img', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId, img: base64String }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setResetPic(false)
                    onUploadSuccess(data.fileName);
                } else {
                    console.error('Upload failed', await response.json());
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        };

        reader.readAsDataURL(selectedFile); 
    };

    return (
        <div className="file-upload-container flex flex-col gap-2">
            <label className="custom-file-upload flex justify-center">
                
                <input type="file" onChange={handleFileChange} className="hidden-input" />
                <div className='flex justify-center'>
                    <FaFileUpload style={{ color: "#555555", width: "30px", height: "30px", marginTop: "10px" }} />
                    </div>
                <span className='text-gradient'>Choose file</span>
            </label>
            <div className='flex flex-col justify-center items-center'>
                <button onClick={handleUpload}>
                    <div className='flex flex-col items-center'>
                       
                        <p className='text-white box-gradient w-[100px] rounded-lg hover:border-purple-500'>Save</p>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default FileUploadComponent;
