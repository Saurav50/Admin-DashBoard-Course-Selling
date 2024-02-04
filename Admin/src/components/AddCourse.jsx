// src/components/AddCourse.js
import React, { useState } from 'react';
import './AddCourse.css'; // Import the CSS file for AddCourse component styling

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(); // Initialize with a default value
  const [published, setPublished] = useState(false);
  const [imageLink, setImageLink] = useState('');

  const handleAddCourse = async () => {
    // TODO: Implement logic to send the course data to the backend
    console.log('Adding course...', { title, description, price, published, imageLink });

    try {
      const response = await fetch('http://localhost:3000/admin/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')} `,
        },
        body: JSON.stringify({
          title,
          description,
          price,
          published,
          imageLink,
        }),
      });

      if (response.ok) {
        // Course added successfully
        const data = await response.json();
        console.log('Successful:', data);
        alert("Course added successfully!");
      } else {
        // Failed to add course
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="card-container">
      <h2>Add Course</h2>
      <label className="label">Title:</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input" />
      <br />
      <label className="label">Description:</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input" />
      <br />
      <label className="label">Price:</label>
      <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value) || 0)} className="input" />
      <br />
      <label className="label">Image Link:</label>
      <input type="text" value={imageLink} onChange={(e) => setImageLink(e.target.value)} className="input" />
      <br />
      <label className="checkbox-label">
        Published:
        <input type="checkbox" checked={published} onChange={() => setPublished(!published)} className="checkbox" />
      </label>
      <br />
      <button onClick={handleAddCourse} className="button">
        Add Course
      </button>
    </div>
  );
};

export default AddCourse;
