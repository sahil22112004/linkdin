import React, { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { uploadToCloudinary } from '../cloudnairy/cloudnairy';
import './imageUploadModal.css';
import { apiUpdateImage, ImageType } from '@/app/services/profileApi';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { fetchUserProfile } from '@/app/redux/slices/authSlics';

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    type:ImageType
}

export default function ImageUploadModal({ isOpen, onClose, title ,type}: ImageUploadModalProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
            setSelectedFile(null);
            setPreviewUrl(null);
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;

        setIsUploading(true);
        try {
            const url = await uploadToCloudinary(selectedFile);
            if (url) {
                console.log("url is ",url)

                await apiUpdateImage(type,url)
                dispatch(fetchUserProfile())
                onClose();
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Failed to upload image. Please try again.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button type="button" className="modal-close-btn" onClick={onClose}>
                        <CloseIcon />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="upload-area">
                        {previewUrl ? (
                            <div className="image-preview">
                                <img src={previewUrl} alt="Preview" />
                            </div>
                        ) : (
                            <div className="upload-placeholder">
                                <p>Select an image to upload</p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            id="file-input"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="file-input" className="select-file-btn">
                            {selectedFile ? 'Change Image' : 'Select Image'}
                        </label>
                    </div>
                </div>

                <div className="modal-footer">
                    <button
                        onClick={handleUpload}
                        className="upload-btn"
                        disabled={!selectedFile || isUploading}
                    >
                        {isUploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    );
}

