import axios from 'axios';
import './App.css'

import React, { useState } from 'react';

function App() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [token, setToken] = useState('');
  const [description, setDescription] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('image', image || ''); // Provide a default value for the image if it is null
    formdata.append('title', title);
    formdata.append('token', token);
    formdata.append('productType', 'COURSE');
    formdata.append('description', description);
    console.log(formdata.get('image'));
    const response = await axios.post("http://localhost:4000/api/product/addproduct",formdata)
    console.log(response)
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className=''>
        <input type="file" name="image" onChange={handleImageChange} />
        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <input type="text" name="token" value={token} onChange={(e) => setToken(e.target.value)} placeholder="Token" />
        <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default App;
