import { useState } from 'react';
import './DragNDrop.css';

const DragNDrop = () => {
    const [activeTab, setActiveTab] = useState('file');
    const [file, setFile] = useState(null);
    const [youtubeUrl, setYoutubeUrl] = useState('');
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'audio/mpeg') {
            setFile(droppedFile);
        } else {
            alert('Please drop only MP3 files');
        }
    };

    const handleFileInput = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'audio/mpeg') {
            setFile(selectedFile);
        } else {
            alert('Please select only MP3 files');
        }
    };

        const [metadata, setMetadata] = useState({
        name: '',
        albumName: '',
        artist: '',
        trackNumber: '',
        genre: '',
        year: ''
    });

    const handleMetadataChange = (e) => {
        const { name, value } = e.target;
        setMetadata(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleYoutubeUrlChange = (e) => {
        setYoutubeUrl(e.target.value);
    };

    const validateYoutubeUrl = (url) => {
        const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        return regex.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (activeTab === 'youtube' && !validateYoutubeUrl(youtubeUrl)) {
            alert('Please enter a valid YouTube URL');
            return;
        }
        console.log('Source Type:', activeTab);
        console.log(activeTab === 'file' ? 'File:' : 'YouTube URL:', activeTab === 'file' ? file : youtubeUrl);
        console.log('Metadata:', metadata);
    };

    const renderUploadArea = () => {
        if (file || (activeTab === 'youtube' && youtubeUrl)) {
            return (
                <form onSubmit={handleSubmit} className="metadata-form">
                    <div className="selected-file">
                        {activeTab === 'file' ? (
                            <>
                                <div>
                                    <p className="file-title">Selected file:</p>
                                    <p className="file-name">{file.name}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <p className="file-title">YouTube URL:</p>
                                    <p className="file-name">{youtubeUrl}</p>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="form-fields">
                        <div className="form-group">
                            <label>Track Name</label>
                            <input
                                type="text"
                                name="name"
                                value={metadata.name}
                                onChange={handleMetadataChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Artist</label>
                            <input
                                type="text"
                                name="artist"
                                value={metadata.artist}
                                onChange={handleMetadataChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Album Name</label>
                            <input
                                type="text"
                                name="albumName"
                                value={metadata.albumName}
                                onChange={handleMetadataChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Year</label>
                            <input
                                type="number"
                                name="year"
                                value={metadata.year}
                                onChange={handleMetadataChange}
                                min="1900"
                                max="2099"
                            />
                        </div>

                        <div className="form-group">
                            <label>Genre</label>
                            <input
                                type="text"
                                name="genre"
                                value={metadata.genre}
                                onChange={handleMetadataChange}
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Save Track
                        </button>
                    </div>
                </form>
            );
        }

        return activeTab === 'file' ? (
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`dropzone ${isDragging ? 'dragging' : ''}`}
            >
                <input
                    type="file"
                    accept=".mp3,audio/mpeg"
                    onChange={handleFileInput}
                    className="file-input"
                    id="file-input"
                />
                <label htmlFor="file-input">
                    <p className="main-text">Drop your MP3 file here</p>
                    <p className="sub-text">or click to browse</p>
                </label>
            </div>
        ) : (
            <div className="youtube-input">
                <input
                    type="url"
                    placeholder="Paste YouTube URL here"
                    value={youtubeUrl}
                    onChange={handleYoutubeUrlChange}
                />
                <p className="helper-text">Enter a valid YouTube video URL</p>
            </div>
        );
    };

    return (
        <div className="uploader-container">
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'file' ? 'active' : ''}`}
                    onClick={() => {
                        setActiveTab('file');
                        setYoutubeUrl('');
                    }}
                >
                    Upload MP3
                </button>
                <button
                    className={`tab ${activeTab === 'youtube' ? 'active' : ''}`}
                    onClick={() => {
                        setActiveTab('youtube');
                        setFile(null);
                    }}
                >
                    YouTube Link
                </button>
            </div>
            {renderUploadArea()}
        </div>
    );
};

export default DragNDrop;