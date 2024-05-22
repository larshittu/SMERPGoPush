const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const FCM_SERVER_KEY = 'AAAAl7xRHNA:APA91bFynZOSaREIEURMPV4_gSP4KmPPYS-lLy3Z0pdGwRJKTpKEWgjYER6KkiH8KPw3bI-UW7gNFLfiBsEXK5Y2o1jZQ6jvDfMwR9mpvwdOLZ_PUknHV8SlNxQlqxAyUF5udlMsziCC';

/**
 * @swagger
 * /send-notification/android:
 *   post:
 *     summary: Send a push notification to an Android device
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

/**
 * @swagger
 * /send-notification/ios:
 *   post:
 *     summary: Send a push notification to an iOS device
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       200:
 *         description: Notification sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

app.post('/send-notification/android', async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    to: token,
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    await axios.post('https://fcm.googleapis.com/fcm/send', message, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${FCM_SERVER_KEY}`,
      },
    });

    res.json({
      success: true,
      message: 'Notification sent successfully to Android device',
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Failed to send notification to Android device',
    });
  }
});

app.post('/send-notification/ios', async (req, res) => {
  const { token, title, body } = req.body;

  const message = {
    to: token,
    notification: {
      title: title,
      body: body,
    },
  };

  try {
    await axios.post('https://fcm.googleapis.com/fcm/send', message, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${FCM_SERVER_KEY}`,
      },
    });

    res.json({
      success: true,
      message: 'Notification sent successfully to iOS device',
    });
  } catch (error) {
    res.json({
      success: false,
      message: 'Failed to send notification to iOS device',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
