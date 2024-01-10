import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  IconButton,
  Box,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';

const CrudPosts = () => {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({ userId: '', title: '', body: '' });
  const [editingPostId, setEditingPostId] = useState(null);

  useEffect(() => {
    // Fetching list of posts from the endpoint
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editingPostId) {
      // If editing, update the existing post
      axios.put(`https://jsonplaceholder.typicode.com/posts/${editingPostId}`, formData)
        .then(response => {
          console.log('Data updated:', response.data);
          const updatedPosts = posts.map(post =>
            post.id === editingPostId ? response.data : post
          );
          setPosts(updatedPosts);
          setEditingPostId(null);
          setFormData({ userId: '', title: '', body: '' });
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
    } else {
      // If not editing, add a new post
      axios.post('https://jsonplaceholder.typicode.com/posts', formData)
        .then(response => {
          console.log('Data posted:', response.data);
          setPosts([...posts, response.data]);
          setFormData({ userId: '', title: '', body: '' });
        })
        .catch(error => {
          console.error('Error posting data:', error);
        });
    }
  };

  const handleEditClick = (postId) => {
    const postToEdit = posts.find(post => post.id === postId);
    setFormData({
      userId: postToEdit.userId,
      title: postToEdit.title,
      body: postToEdit.body
    });
    setEditingPostId(postId);
  };

  const handleDeleteClick = (postId) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(() => {
        console.log('Post deleted:', postId);
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
      })
      .catch(error => {
        console.error('Error deleting post:', error);
      });
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>CRUD Posts</h1>
      <br/>
      <form
        onSubmit={handleFormSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          width: '400px', // Menentukan lebar form
          margin: '0 auto', // Mengatur margin secara otomatis
        }}
      >
        <input
          type="text"
          name="userId"
          placeholder="User ID"
          value={formData.userId}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <br />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', padding: '8px' }}
        />
        <br />
        <textarea
          name="body"
          placeholder="Body"
          value={formData.body}
          onChange={handleInputChange}
          style={{ marginBottom: '10px', padding: '8px', height: '100px'}}
        ></textarea>
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: '#007bff',
            color: '#fff',
            padding: '8px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {editingPostId ? 'Update Post' : 'Add Post'}
        </button>
      </form>
      <h2>Posts List</h2>
      {posts.map(post => (
          <Accordion key={post.id} style={{ width: '100%' }}>
          <AccordionSummary>
            <Grid container alignItems="center" justifyContent="space-between">
              <Typography style={{ fontWeight: 'bold' }}>{post.title}</Typography>
              <Box display="flex">
                <Box marginLeft="auto">
                  <IconButton aria-label="Edit" onClick={() => handleEditClick(post.id)}>
                    <Edit />
                  </IconButton>
                </Box>
                <Box marginLeft={1}>
                  <IconButton aria-label="Delete" onClick={() => handleDeleteClick(post.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </AccordionSummary>
          <AccordionDetails style={{ width: '100%' }}>
      <Typography>{post.body}</Typography>
    </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CrudPosts;
