import React, { useState } from 'react';
import { 
  Button, 
  Typography, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  ThemeProvider,
  Box
} from '@mui/material';
import theme from "../src/theme";
import { Search as SearchIcon } from 'lucide-react';
import { BookOpen as BookOpenIcon} from 'lucide-react';

import ky from 'ky';

const NEWS_API_KEY = '6b27f085df724fa9b1631e862970ad62';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

const suggestions = [
  "Google Ads",
  "Facebook Ads Manager",
  "The Trade Desk",
  "DV360",
  "retargeting",
  "behavioral targeting",
  "demographic targeting",
  "contextual targeting",
  "display ads",
  "video ads",
  "native ads",
  "mobile ads",
  "ad serving",
  "ad security",
  "ad tracking",
  "ad analytics",
  "ad attribution",
  "ad fraud detection",
  "ad fraud prevention",
  "ad fraud tools",
  "GDPR",
  "CCPA",
  "privacy compliance",
  "ad privacy solutions",
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trendingArticles, setTrendingArticles] = useState({
    adsense: [],
    marketingAI: [],
    adtech: []
  });
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await ky.get(NEWS_API_URL, {
        searchParams: {
          q: `${searchTerm} AND (adtech OR "ad tech" OR advertising OR marketing)`,
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 10,
          apiKey: NEWS_API_KEY
        }
      }).json();
  
      const articles = response.articles
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
    } finally {
      setLoading(false);
    }
  };

  const fetchTrendingArticles = async () => {
    const categories = {
      adsense: 'AdSense',
      marketingAI: 'Marketing AI',
      adtech: 'AdTech'
    };
    
    const promises = Object.keys(categories).map(async (key) => {
      const response = await ky.get(NEWS_API_URL, {
        searchParams: {
          q: categories[key],
          language: 'en',
          sortBy: 'publishedAt',
          pageSize: 1,
          apiKey: NEWS_API_KEY
        }
      }).json();

      const articles = response.articles
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

      return { key, articles };
    });

    const results = await Promise.all(promises);
    const trending = results.reduce((acc, { key, articles }) => {
      acc[key] = articles;
      return acc;
    }, {});

    setTrendingArticles(trending);
  };

  React.useEffect(() => {
    fetchTrendingArticles();
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Typography variant="h1" component="h1" gutterBottom align="center" 
                    sx={{ mb: 1, color: 'primary.main' }}>
          AdTech Insights
        </Typography>
        <Typography variant="h4" component="h4" gutterBottom align="center" 
                    sx={{ mb: 3, color: 'primary.main' }}>
          The latest news from around the world
        </Typography>
        
        <Grid container spacing={2} alignItems="center" sx={{ mb: 10, px: { xs: 2, sm: 0 } }}>
          <Grid item xs={10}>
            <Box position="relative">
              <input
                type="text"
                placeholder="ad tracking, ad security..."
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch();
                  }
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  outline: 'none',
                  background: 'transparent'
                }}
              />
              {showSuggestions && filteredSuggestions.length > 0 && (
                <Box 
                  position="absolute" 
                  top="100%" 
                  left={0} 
                  right={0} 
                  bgcolor="white" 
                  boxShadow={2} 
                  zIndex={1}
                  maxHeight="200px"
                  overflow="auto"
                  color="black"
                >
                  {filteredSuggestions.map((suggestion, index) => (
                    <Box 
                      key={index} 
                      onClick={() => handleSuggestionClick(suggestion)} 
                      sx={{ 
                        padding: '10px', 
                        cursor: 'pointer',
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}
                    >
                      {suggestion}
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSearch} 
              disabled={loading}
 fullWidth
              sx={{ 
                height: '47px', 
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                  backgroundColor: 'primary.dark',
                }
              }}
            >
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>

      <Grid container spacing={5} sx={{ mb: 6 }}>
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
                <Button size="small" color="primary" href={article.url} target="_blank" rel="noopener noreferrer" variant='contained'>
                Read More&nbsp;&nbsp;<BookOpenIcon />
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h1" component="h1" gutterBottom align="center" 
                  sx={{ mb: 4, color: 'primary.main' }}>
        Trending
      </Typography>

      <Grid container direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 3, md: 4 }} alignItems="stretch">
      {Object.keys(trendingArticles).map((key) => {

  return (
    <Grid item xs={4} key={key}>
      <Card sx={{ 
        boxShadow: 'none', 
        border: '5px solid #111', 
        borderColor: 'secondary.main',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.5)'
        },
        padding: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between' 
      }}>
        <CardContent
        >
          <Typography variant="h2" component="h2" gutterBottom>
            {key === 'adsense' ? 'AdSense' : key === 'marketingAI' ? 'Marketing AI' : 'AdTech'}
          </Typography>
          {trendingArticles[key].map((article) => (
            <div key={article.id}>
              <Typography variant="body1" color="text.secondary" sx={{
        fontWeight: 400,
        paragraph: true,
        '&:hover': {
          fontWeight: 'bold', // Change to bold on hover
        },
      }} paragraph>
                {article.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(article.publishedAt).toLocaleDateString()}
              </Typography>
            </div>
          ))}
        </CardContent>
        <CardActions>
          <Button size="small" color="info" href={trendingArticles[key][0]?.url} target="_blank" rel="noopener noreferrer" variant='contained'>
            Read More&nbsp;&nbsp;<BookOpenIcon />
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
})}
      </Grid>     
    </Container>
  </ThemeProvider>
  );
};

export default Home;