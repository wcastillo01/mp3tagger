import { useState } from 'react'
import axios from 'axios';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://127.0.0.1:5000/', {
        file_path: filePath,
        tags: tags
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating tags:', error);
    }
  };


  return (
    <>
      <h1>MP3 TAGGER</h1>

    </>
  )
}

export default App
