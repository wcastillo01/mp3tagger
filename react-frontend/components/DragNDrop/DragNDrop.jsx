import './DragNDrop.css';

const DragNDrop = () => {
    return (
        <div>
            <div className="drop-message">
                <div className="upload-icon">
                Drag & Drop files here or click to select
                </div>
            </div>
            <input type="file" multiple accept=".mp3" className="file-input" />
        </div>
    );
};

export default DragNDrop;