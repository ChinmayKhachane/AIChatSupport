// pages/loggedin.js
import { useState } from 'react';
import { Container, TextField, Button, Box, Typography, Paper } from '@mui/material';

export default function LoggedIn() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!input) return;
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input }),
      });

      const data = await res.json();
      // Assuming data.message might be an object, check for it and display properly
      setResponse(data.message.content || 'No response from AI');
    } catch (error) {
      console.error('Error calling Chat API:', error);
      setResponse('Sorry, something went wrong. Please try again.');
    }

    setLoading(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h4" gutterBottom>
          ChatGPT Interface
        </Typography>
        <Paper elevation={3} style={{ padding: '16px' }}>
          <TextField
            label="Ask a question"
            fullWidth
            multiline
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            variant="outlined"
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleChat}
            disabled={loading}
            fullWidth
          >
            {loading ? 'Loading...' : 'Send'}
          </Button>
          {response && (
            <Box mt={4}>
              <Typography variant="h6">Response:</Typography>
              <Paper elevation={2} style={{ padding: '16px', backgroundColor: '#f5f5f5' }}>
                {/* Ensure that only strings or valid elements are rendered */}
                <Typography>
                  {response}
                </Typography>
              </Paper>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
