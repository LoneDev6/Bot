/*FUNCTIONS*/
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function retardAText(text)
{
  for(i=0; i < text.length; i++)
  {
  	if(i % 2 == 1)
  		text = text.replaceAt(i, text.charAt(i).toUpperCase())
    else
    	text = text.replaceAt(i, text.charAt(i).toLowerCase())
  }
  return text;  
}

function sendMessage(request, messageObj, text)
{
	request
	.post('https://api.telegram.org/bot' + hook.env.echo_bot_key + '/sendMessage')
	.form({
	  "chat_id": messageObj.chat.id,
	  "text": retardAText(text)
	});
}

/*MAIN*/
module['exports'] = function imgBot (hook) {
	var request = require('request');
	var TOKEN = hook.env.echo_bot_key;
	var ENDPOINT = 'https://api.telegram.org/bot' + TOKEN;
  
	var messageObj = hook.params.message;
	
	switch(messageObj.text)
	{
		case "/start":								
				sendMessage(request, messageObj, "How to use: Reply a message using the command /retard as text.");
		break;
		case "/retard":
			if(messageObj.reply_to_message)
			{
				var photoURL = "http://i.imgur.com/uwlR640.jpg";
				var formData = 
				{
					chat_id: messageObj.chat.id,
					photo: request(photoURL), 
					caption : retardAText(messageObj.reply_to_message.text),
					reply_to_message_id : messageObj.reply_to_message.message_id
				};
				request.post(
				{
					url: ENDPOINT + '/sendPhoto',
					formData: formData
				});
			}
			else
			{
				sendMessage(request, messageObj, "You need to reply to a message!")
			}
		break;
	}
}