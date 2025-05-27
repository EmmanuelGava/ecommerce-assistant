const fetch = require('node-fetch'); // npm install node-fetch@2

const TOKEN = 'ya29.c.c0ASRK0GZGhKwpxeyck4ewq88RLCgTUmvExZpiypd8c0xLyoJgyXIt9l4cwbkA59E5gG0n7RStcds3iS_xvYgcDIO8hdPSBt0S_d9AblfE_f1rFx2X7YhrDpccO7aWCeYMdhzA71ArNVMagAWjZdF-IzAAi13WNpwE88k6bs9Xa5zLX-zHYsZvvJw8DOOrPVinVbPuKCwcorSk-94rfDIHuJdmT1kIgi5IkgbDlM_Exp_5B7d9aHzMETovXPGPmzb8cm6qOD5l733z8pG1ctQy41dVdREQ1eVUNYcjXiVYCLnUtC-JxKmmdx-5pChcmFmL-I6bjEmY0_n6gxnSdJOcRbT84H7T6YZv51FWKrRt8fg3d_AXWorqgPQGnAT387Af45B8MskZZjU6O1t5mzUpfUl9d4sSRnF0BS7_MOdORu9nJn6qFSiepMb4X8k0_Udm6khruiVI_UUu5OFenyUJYWZfUnpMx2X19ORh9UMliqJId5duci5Yyhdyp1ovUJcmJIc9W2Zd1b9dtUmbIOieXccdzS_weQFoVJ5O0Iu3Brcp9XnnnIUSZMs38jIFbxXzFJaFn8cnnXvRtdOWYwb1QUyoB8_I2U5kFbdmregFuYiRnwW0tF9Xug_wF018zp_hJZZ2lxek31jUn8-prmdUtt9FVug9jiU3mYBUdYkQ6hzFS9udV682zbvx1tw2FMRJbRbWxbyb9Mtn5tpt160VskBcOqip3Ou61lgfMaMgzhm9UdxRBoI9ZaVRuiUZQdFwnxxeylX5t9Wme-88lRSn6FauYaxRhYV8dlWQMOsIVBZ8twoolovv_W5rptSb_-aOvt07UB89tkmVMgB4b5IX89aMk91o0ap_wZpsUcdwyYont0vRgj_oRMObuYUFISie_qc2WrzbliSVOVfzOZktcnwbc05ronVq7-6xRjlYMpd9ixQs_m6q9ym445eqYoUt0ZXeZ6k-9sq_rak2ydU_089Q9pvtbxRtpIQvQdnOwbbp0m7ble_k_8h';
const PROJECT_ID = 'chatbot-ecommerce-460621';

const URL = `https://us-central1-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/us-central1/publishers/google/models/gemini-pro:generateContent`;

const body = {
  contents: [
    {
      role: 'user',
      parts: [{ text: "Hola, ¿quién eres?" }]
    }
  ]
};

fetch(URL, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})
  .then(res => res.json())
  .then(json => {
    console.log('Respuesta de Vertex AI:', JSON.stringify(json, null, 2));
  })
  .catch(err => {
    console.error('Error en la petición:', err);
  });
