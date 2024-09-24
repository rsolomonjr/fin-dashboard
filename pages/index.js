import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  ThemeProvider,
  createTheme
} from '@mui/material';
import { Search as SearchIcon } from 'lucide-react';

import axios from 'axios';

const NEWS_API_KEY = '6b27f085df724fa9b1631e862970ad62';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1c1c1c', // Dark gray for primary color
    },
    secondary: {
      main: '#f5f5f5', // Light gray for secondary color
    },
    background: {
      default: '#ffffff', // White background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
});

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(NEWS_API_URL, {
        params: {
          q: `${searchTerm} AND (adtech OR "ad tech" OR advertising OR marketing)`,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 10,
          apiKey: NEWS_API_KEY
        }
      });
  
      const articles = response.data.articles
        .filter(article => 
          article.title !== "[Removed]" && 
          article.description !== "[Removed]"
        )
        .map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description,
          url: article.url,
          publishedAt: article.publishedAt,
          source: article.source.name
        }));
  
      setArticles(articles);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Handle the error appropriately
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h1" component="h1" gutterBottom align="center" 
                  sx={{ mb: 6, color: 'primary.main' }}>
        AdTech Insights
      </Typography>
      
      <Grid container spacing={2} alignItems="center" sx={{ mb: 6 }}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            label="Search articles"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSearch} 
            disabled={loading}
            fullWidth
            sx={{ 
              height: '56px', 
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none',
                backgroundColor: 'primary.dark',
              },
            }}
          >
            <SearchIcon />
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={5}>
        {articles.map((article) => (
          <Grid item xs={12} key={article.id}>
            <Card sx={{ 
              boxShadow: 'none', 
              border: '5px solid #111', 
              borderColor: 'secondary.main',
              transition: '0.3s',
              '&:hover': {
                boxShadow: '0 4px 20px 0 rgba(0,0,0,0.5)',
              },
              padding: '16px '
            }}>
              <CardContent>
                <Typography variant="h2" component="h2" gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {article.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date(article.publishedAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={article.url} target="_blank" rel="noopener noreferrer">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </ThemeProvider>
  );
};

export default Home;