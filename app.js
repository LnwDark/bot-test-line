const express = require('express');
const line = require('@line/bot-sdk');

const config = {
  channelAccessToken: '20Nnr26uzHKc3gQe2glcLuLqoZuwlY/q1D2Lnqkrm9SJxJQIMb3+/KZw0wtmWi1q4CDuf7gqeYr9EjcxDOT+LJuwyMUfPyhjORZWEArTprKgIFg28JCnhmKBMgJOqqii0kl8hRK0ueXwNMGahrTvyAdB04t89/1O/w1cDnyilFU=',
  channelSecret: '427e040b468687b7bba3d999b42fdfcd'
};

const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }
  console.log(event)
  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);