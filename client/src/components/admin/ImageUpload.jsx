import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { FaCloudUploadAlt, FaSpinner } from 'react-icons/fa';

const ImageUpload = ({ onUpload, currentImage, label }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage);

  const isPdf = (url) => {
    if (!url) return false;
    if (url.toLowerCase().endsWith('.pdf')) return true;
    if (url.startsWith('blob:') && fileType === 'application/pdf') return true;
    return false;
  };

  const [fileType, setFileType] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFileType(file.type);
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpload(res.data.url);
      setUploading(false);
    } catch (error) {
      console.error('Upload failed:', error);
      setUploading(false);
      alert('Image upload failed');
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg', '.webp'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 dark:text-gray-300">{label}</label>
      
      <div className="flex gap-4 items-start">
        {preview && (
          <div className="w-24 h-24 rounded-lg overflow-hidden border dark:border-gray-700 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            {isPdf(preview) ? (
              <div className="text-center p-2">
                <span className="text-red-500 font-bold text-3xl block mb-1">PDF</span>
                <span className="text-xs text-gray-500">Uploaded</span>
              </div>
            ) : (
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            )}
          </div>
        )}
        
        <div 
          {...getRootProps()} 
          className={`flex-1 border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors
            ${isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'}
          `}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center text-blue-500">
              <FaSpinner className="animate-spin text-2xl mb-2" />
              <p className="text-sm">Uploading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
              <FaCloudUploadAlt className="text-3xl mb-2" />
              <p className="text-sm text-center">
                {isDragActive ? 'Drop image here' : 'Drag & drop or click to upload'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
