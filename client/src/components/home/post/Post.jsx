import { styled, Box, Typography } from '@mui/material';

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  height: 380px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  background: #fff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 12px 20px rgba(0,0,0,0.15);
  }
`;

const Image = styled('img')({
  width: '100%',
  objectFit: 'cover',
  borderRadius: '10px 10px 0 0',
  height: 180,
  transition: 'transform 0.3s ease',
  [`${Container}:hover &`]: {
    transform: 'scale(1.05)'
  }
});

const CategoryLabel = styled(Typography)`
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  align-self: flex-start;
  margin: 10px 0 5px 10px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Heading = styled(Typography)`
  font-family: 'Poppins', sans-serif;
  font-size: 20px;
  font-weight: 700;
  margin: 0 10px 8px 10px;
  color: #212121;
`;

const AuthorText = styled(Typography)`
  color: #6c757d;
  font-size: 13px;
  margin: 0 10px 12px 10px;
  font-style: italic;
`;

const Details = styled(Typography)`
  font-size: 14px;
  word-break: break-word;
  color: #444;
  margin: 0 10px 15px 10px;
  flex-grow: 1;
`;

const Post = ({ post }) => {
  const categoryImages = {
    All: 'https://picsum.photos/800/600?random=1',
    Music: 'https://picsum.photos/800/600?random=2',
    Movies: 'https://picsum.photos/800/600?random=3',
    Sports: 'https://picsum.photos/800/600?random=4',
    Tech: 'https://picsum.photos/800/600?random=5',
    Fashion: 'https://picsum.photos/800/600?random=6',
  };

  const url = post.picture
    ? post.picture
    : categoryImages[post.categories] || categoryImages["All"];

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '...' : str;
  };

  return (
    <Container>
      <Image src={url} alt="post" />
      <CategoryLabel>{post.categories}</CategoryLabel>
      <Heading>{addEllipsis(post.title, 25)}</Heading>
      <AuthorText>Author: {post.username}</AuthorText>
      <Details>{addEllipsis(post.description, 120)}</Details>
    </Container>
  );
};

export default Post;
