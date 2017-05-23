String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function retardAText(text)
{
  for(i=0; i < text.length; i++)
  {
  	if(i % 2 == 0)
  		text = text.replaceAt(i, text.charAt(i).toUpperCase())
    else
    	text = text.replaceAt(i, text.charAt(i).toLowerCase())
  }
  return text;  
}

/*module['exports'] = function echoBot (hook) {
  var request = require('request');
  request
    .post('https://api.telegram.org/bot' + hook.env.echo_bot_key + '/sendMessage')
    .form({
      "chat_id": hook.params.message.chat.id,
      "text": retardAText(hook.params.message.text)
    });
};*/



module['exports'] = function imgBot (hook) {
  var request = require('request');
  var TOKEN = hook.env.echo_bot_key;
  var ENDPOINT = 'https://api.telegram.org/bot' + TOKEN;
  
  var message = hook.params.message;
  var from = message.chat.id;
  	
  if (message.text == "/img") {
    var photoURL = "http://i.imgur.com/uwlR640.jpg";
    var formData = {
      chat_id: from,
      photo: request(photoURL), 
	  text : retardAText(hook.params.message.text)
    };
    request.post({
      url: ENDPOINT + '/sendPhoto',
      formData: formData
    });
  }
}