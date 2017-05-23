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
	
	switch(message.text)
	{
		case "/start":
				var photoURL = "http://i.imgur.com/uwlR640.jpg";
				var formData = 
				{
					chat_id: message.chat.id,
					photo: request(photoURL), 
					caption : retardAText("/start"),
					reply_to_message_id : message.message_id
				};
				request.post(
				{
					url: ENDPOINT + '/sendPhoto',
					formData: formData
				});
				
				request
				.post('https://api.telegram.org/bot' + hook.env.echo_bot_key + '/sendMessage')
				.form({
				  "chat_id": hook.params.message.chat.id,
				  "text": retardAText("How to use:")
				});
				
				request
				.post('https://api.telegram.org/bot' + hook.env.echo_bot_key + '/sendMessage')
				.form({
				  "chat_id": hook.params.message.chat.id,
				  "text": retardAText("Reply a message using the command /retard as text.")
				});
				
				
		
		break;
		
		case "/retard":
			if(message.reply_to_message)
			{
				var photoURL = "http://i.imgur.com/uwlR640.jpg";
				var formData = 
				{
					chat_id: message.chat.id,
					photo: request(photoURL), 
					caption : retardAText(message.reply_to_message.text),
					reply_to_message_id : message.reply_to_message.message_id
				};
				request.post(
				{
					url: ENDPOINT + '/sendPhoto',
					formData: formData
				});
			}
			else
			{
				request
				.post('https://api.telegram.org/bot' + hook.env.echo_bot_key + '/sendMessage')
				.form({
				  "chat_id": hook.params.message.chat.id,
				  "text": retardAText("You need to reply to a message!")
				});
			}
		break;
	}
}