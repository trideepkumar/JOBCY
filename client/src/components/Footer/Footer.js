import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Footer() {
  return (
    <div style={{ marginTop: '2rem' }}>
      <Card className="right-card-bottom">
        <CardContent style={{ color: 'grey' }}>
          <Typography gutterBottom variant="h5" component="div">
            JOBCY
          </Typography>
          <Typography variant="body2" component="div">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li>About</li>
                  <li>Accessibility</li>
                  <li>Help Center</li>
                </ul>
              </div>
              <div>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                  <li>Privacy &amp; Terms</li>
                  <li>Ad Choices</li>
                  <li>Advertising</li>
                </ul>
              </div>
            </div>
          </Typography>
          <Typography variant="body2" style={{ fontSize: '0.7rem' }}>
            JOCY Corporation © 2023
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default Footer;
