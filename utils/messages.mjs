// get current time
import moment from 'moment';
import pkg from 'mongoose';
const { connect, connection } = pkg;
import Message from './messageModel.mjs';
const url = "mongodb+srv://dimaivas:LXF1gy5dMunsotAX@lab5-6.dvshw95.mongodb.net/?retryWrites=true&w=majority";

connect(url, {
    dbName: 'students',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(result => console.log('db connected1')).catch(error => console.log(error));

export function formatMessage(username, text) {
    // return object
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

export function saveMessage(room, username, text, time)
{
    const newMessage = new Message({
        room: room,
        user: username,
        message: text,
        createdAt: time
    });
    
    newMessage.save().then(() => {
        console.log('Message added to the collection in db');
        //mongoose.connection.close(); // Close the connection after saving
    }).catch(error => {
        console.log('Error adding message:', error);
        connection.close();
    });
}

export async function getChatHistory(room) {
    try {
      const chatHistory = await Message.find({ room }).lean().exec();
      return chatHistory;
    } catch (error) {
      console.log('Error getting chat history:', error);
      return [];
    }
  }

// for exporting
export default {
    formatMessage,
    saveMessage,
    getChatHistory
};