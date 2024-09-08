import React, { useState } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  CircularProgress
} from '@mui/material';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    // TODO: Replace this with actual API call when available
    await new Promise(resolve => setTimeout(resolve, 1000));
    setArticles([
      { id: 1, title: 'Sample Financial Article 1', description: 'This is a placeholder for article 1.' },
      { id: 2, title: 'Sample Financial Article 2', description: 'This is a placeholder for article 2.' },
    ]);
    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Financial News Search
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="Search financial articles"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSearch} 
        disabled={loading}
      >
        Search
      </Button>
      {loading ? (
        <CircularProgress style={{ marginTop: '20px' }} />
      ) : (
        <List>
          {articles.map((article) => (
            <ListItem key={article.id}>
              <ListItemText 
                primary={article.title} 
                secondary={article.description} 
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Home;