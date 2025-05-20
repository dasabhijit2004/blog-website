import { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../../service/api';

// components
import Post from './Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response = await API.getAllPosts({ category: category || '' });
        if (response.isSuccess) {
          setPosts(response.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  if (loading) {
    return (
      <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18, textAlign: 'center' }}>
        Loading posts...
      </Box>
    );
  }

  return (
    <>
      {posts.length ? (
        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid item lg={3} sm={4} xs={12} key={post._id}>
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={`details/${post._id}`}
              >
                <Post post={post} />
              </Link>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ color: '#878787', margin: '30px 80px', fontSize: 18, textAlign: 'center' }}>
          No data is available for selected category
        </Box>
      )}
    </>
  );
};

export default Posts;
