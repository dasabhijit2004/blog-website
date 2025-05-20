import { styled, Box, Typography } from '@mui/material';

const Image = styled(Box)`
    width: 100%;
    height: 60vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8)),
                url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/cover no-repeat;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const Heading = styled(Typography)(({ theme }) => ({
    fontSize: '4rem',
    color: '#FFFFFF',
    fontWeight: 'bold',
    lineHeight: 1.2,
    [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
    },
}));

const SubHeading = styled(Typography)(({ theme }) => ({
    fontSize: '1.2rem',
    color: '#EEEEEE',
    background: 'rgba(255, 255, 255, 0.1)',
    padding: '8px 16px',
    borderRadius: '4px',
    marginTop: '12px',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        padding: '6px 12px',
    },
}));

const Banner = () => {
    return (
        <Image>
            <Heading variant="h1">BLOG</Heading>
            <SubHeading variant="subtitle1">Write Your Own Interests...</SubHeading>
        </Image>
    );
};

export default Banner;
