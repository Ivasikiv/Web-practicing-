import { Schema, model } from 'mongoose';                           // імпорт схеми та моделі з mongoose (mongoose - це бібліотека для роботи з MongoDB)
import moment from 'moment';
const chatSchema = new Schema({
    chatName: { type: String },
    members: [{
      username: { type: String},
    }],
    messages: [{
      sender: { type: String },
      message: { type: String },
      sendAt: { type: String, default: moment().format('h:mm a') }
    }]
});

const Chat = model("Chat", chatSchema);
export default Chat;