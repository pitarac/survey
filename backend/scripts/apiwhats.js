import Whatsapp from 'whatsapp'


const senderNumber = 342511982276896;
const wa = new WhatsApp( senderNumber );


curl -i -X POST \
  https://graph.facebook.com/v20.0/342511982276896/messages \
  -H 'Authorization: Bearer EAAQo4IQW58IBOy17ZCtg34UCMsVB3yY8qkAljqaHzvLe8RzllxJGi18ABR7tXmr0SdDrotNaNV7Vt9cCx4Hd8RoPS8ZCqZBp7N6AZC1rvWOGHP0ysqjOjGw2oazbkZCYWkPCJo0RJB4VOVDqnN3IYjPjepiQVOslKtZCqyPUPUE43FhbwyH085lDypSSkir0tIqNqDZBsAhZAJcsfAxiivJZAZBZCcPfpcZD' \
  -H 'Content-Type: application/json' \
  -d '{ "messaging_product": "whatsapp", "to": "5561981388239", "type": "template", "template": { "name": "teste01", "language": { "code": "pt_BR" } } }'