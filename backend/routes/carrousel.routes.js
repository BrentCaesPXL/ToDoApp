const express = require('express');
const AWS = require('aws-sdk');
const carrouselRouter = express.Router();

// Configureer de AWS SDK
const s3 = new AWS.S3({
  region: 'us-west-2', // Pas aan naar de regio van je bucket
});

carrouselRouter.get('', async (req, res) => {
  const bucketName = 'my-very-special-bucket-brentcaes';
  const region = 'us-west-2';

  try {
    // Vraag de lijst van objecten in de bucket op
    const params = {
      Bucket: bucketName,
    };

    const data = await s3.listObjectsV2(params).promise();
    
    // Maak een lijst met de URLs van alle afbeeldingsbestanden
    const imageUrls = data.Contents.map(file => `https://${bucketName}.s3.${region}.amazonaws.com/${file.Key}`);
    
    // Stuur de lijst met afbeeldings-URLs als JSON terug
    res.json(imageUrls);

  } catch (error) {
    console.error('Error retrieving files from S3:', error);
    console.error('Detailed error:', error.stack);  // Log stack trace for better insights
    res.status(500).send(Error retrieving images: ${error.message});
  }
});

module.exports = carrouselRouter;
