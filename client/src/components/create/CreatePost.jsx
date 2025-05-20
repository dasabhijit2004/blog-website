import React, { useState, useEffect, useContext } from 'react';
import {
    styled, Box, TextareaAutosize, Button,
    InputBase, FormControl
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px auto',
    maxWidth: '900px',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
        margin: '20px',
    },
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
}));

const InputTextField = styled(InputBase)(({ theme }) => ({
    flex: 1,
    fontSize: '28px',
    fontWeight: 500,
    padding: '10px 15px',
    borderRadius: '8px',
    backgroundColor: '#f4f4f4',
    border: '1px solid #ccc',
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        fontSize: '22px',
    },
}));

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    marginTop: '30px',
    fontSize: '18px',
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    resize: 'none',
    backgroundColor: '#fdfdfd',
    fontFamily: 'inherit',
    '&:focus-visible': {
        outline: 'none',
        borderColor: '#3f51b5'
    }
}));

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
};

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [post, setPost] = useState(initialPost);
    const { account } = useContext(DataContext);

    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        setPost(prev => ({
            ...prev,
            picture: defaultImage,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username
        }));
    }, [account.username, location.search]);

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const savePost = async () => {
        try {
            await API.createPost(post);
            navigate('/');
        } catch (err) {
            console.error("Post creation failed:", err);
            alert("Failed to create post. Try again.");
        }
    };

    return (
        <Container>
            <Image src={defaultImage} alt="banner" />

            <StyledFormControl>
                <InputTextField
                    name='title'
                    placeholder="Enter Title"
                    onChange={handleChange}
                    value={post.title}
                />
                <Button
                    onClick={savePost}
                    variant="contained"
                    color="primary"
                    disabled={!post.title.trim() || !post.description.trim()}
                    sx={{ padding: '10px 24px', fontWeight: 600 }}
                >
                    Publish
                </Button>
            </StyledFormControl>

            <Textarea
                minRows={6}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange}
                value={post.description}
            />
        </Container>
    );
};

export default CreatePost;
