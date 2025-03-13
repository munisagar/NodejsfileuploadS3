const { s3, PutObjectCommand } = require('../config/s3');
const pool = require('../config/db');

const uploadFile = async (req, res) => {
  const file = req.file;
  const uploader = req.body.uploader;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.originalname,
    Body: file.buffer,
  };

  try {
    // Upload file to S3 using AWS SDK v3
    const command = new PutObjectCommand(params);
    const s3Response = await s3.send(command);

    // Save file metadata to PostgreSQL
    const dbResponse = await pool.query(
      'INSERT INTO files (filename, size, uploader) VALUES ($1, $2, $3) RETURNING *',
      [file.originalname, file.size, uploader]
    );

    res.status(201).json({
      message: 'File uploaded successfully',
      file: dbResponse.rows[0],
      s3Response,
    });
  } catch (err) {
    console.error('Error uploading file:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { uploadFile };