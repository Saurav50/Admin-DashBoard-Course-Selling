// src/components/Courses.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Courses.css';

const Courses = () => {
    const navigate=useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const clickHandler=(courseId)=>{
    navigate(`/course/${courseId}`)
  }

  useEffect(() => {
    // Mock API endpoint
    const apiUrl = 'http://localhost:3000/admin/courses';

    // Fetch courses from the API
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')} `
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setCourses(data.courses);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching courses:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='courses-list'>
      <h2>All Courses!</h2>
      {loading ? (
        <p>Loading courses...</p>
      ) : (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.id} className="card" onClick={() => clickHandler(course._id)}>
              <img
                src={course.imageLink} // Assuming the API returns an 'image' property for each course
                alt={course.title}
                className="course-image"
              />
              <h3>{course.title}</h3>
              {/* <p>{course.description}</p> */}
              {/* <p>Published: {course.published ? 'Yes' : 'No'}</p> */}
              <p>Price: ${course.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Courses;
