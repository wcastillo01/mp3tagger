import DragNDrop from '../DragNDrop/DragNDrop';
import './Filebox.css';

const Filebox = () => {
    return (
        <div className = "drop-container">
            <div className="divider">
                <button>Upload Your Music</button>
                <button>Youtube URL</button>
            </div>
            <DragNDrop />
        </div>
    );
};

export default Filebox