import React, { useState, useEffect } from 'react';
import {
    styled,
    TextareaAutosize,
    Button,
    FormControl,
    InputBase,
    Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';

const Container = styled(Paper)(({ theme }) => ({
    margin: '50px auto',
    padding: '20px',
    maxWidth: '900px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    [theme.breakpoints.down('md')]: {
        margin: '20px',
        padding: '15px'
    }
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '10px'
});

const StyledFormControl = styled(FormControl)`
    margin-top: 20px;
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 20px;
`;

const InputTextField = styled(InputBase)`
    flex: 1;
    font-size: 24px;
    border-bottom: 2px solid #ccc;
    padding: 5px;
    transition: border-color 0.3s ease;

    &:focus-within {
        border-color: #3f51b5;
    }
`;

const StyledTextArea = styled(TextareaAutosize)`
    width: 100%;
    border: none;
    margin-top: 30px;
    font-size: 18px;
    resize: none;
    font-family: inherit;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 5px;
    box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);

    &:focus-visible {
        outline: none;
        background: #fff;
    }
`;

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date()
};

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [post, setPost] = useState(initialPost);

    const defaultImage = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            const response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container elevation={3}>
            <Image src={post.picture || defaultImage} alt="post" />

            <StyledFormControl>
                <InputTextField
                    onChange={handleChange}
                    value={post.title}
                    name='title'
                    placeholder="Enter title"
                />

                <Button
                    onClick={updateBlogPost}
                    variant="contained"
                    color="primary"
                >
                    Update
                </Button>
            </StyledFormControl>

            <StyledTextArea
                minRows={6}
                placeholder="Tell your story..."
                name='description'
                onChange={handleChange}
                value={post.description}
            />
        </Container>
    );
};

export default Update;
