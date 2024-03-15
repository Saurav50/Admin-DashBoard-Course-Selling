// src/components/CourseDetail.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CourseDetail.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    // Fetch the particular course based on courseId
    const apiUrl = `http://localhost:3000/admin/course/${courseId}`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")} `,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCourse(data.course);
        setTitle(data.course.title);
        setDescription(data.course.description);
        setPublished(data.course.published);
        setImageLink(data.course.imageLink);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching course details:", error);
        setLoading(false);
      });
  }, [courseId]);

  const handleUpdateCourse = async () => {
    // Update course details using the PUT endpoint
    const apiUrl = `http://localhost:3000/admin/courses/${courseId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")} `,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          published: published,
          imageLink: imageLink,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedCourse = data.updatedCourse;
        setCourse(updatedCourse);
        console.log("Successful:", data);
        toast("Your Course is updated succesfully!");
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <ToastContainer />;
      <div className="individual-course">
        <div className="detail-container">
          {loading ? (
            <p>Loading course details...</p>
          ) : (
            <>
              <div className="course-details">
                <h2>Existing Course</h2>
                <p>Title: {course.title}</p>
                <img
                  src={course.imageLink}
                  alt={course.title}
                  className="course-image"
                />
                <p>Description: {course.description}</p>
                <p>Published: {course.published ? "Yes" : "No"}</p>
              </div>

              <div className="form-container">
                <h2>Update Course</h2>
                <label>Title:</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                />
                <br />
                <label>Description:</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="input"
                />
                <br />
                <label>Image Link:</label>
                <input
                  type="text"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  className="input"
                />
                <br />
                <label>Published:</label>
                <input
                  type="checkbox"
                  checked={published}
                  onChange={() => setPublished(!published)}
                  className="checkbox"
                />
                <br />
                <button onClick={handleUpdateCourse} className="button">
                  Update Course
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
