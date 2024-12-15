import Message from "../models/message.model.js";
import User from "../models/user.model.js";

// fetch every single user for sidebar/contact list but not myself
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // find all the id of users except the logged in user (ne=not equal)
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getUsersForSidebar controller ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// get all messages between two users
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // renamed to userToChatId
    const myId = req.user._id; // id of logged in user

    // find all the messages where i am the sender or the other user is sender
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

// message could be both text and image
export const sendMessage = async (req, res) => {
  try {
    const {text, image} = req.params
    const {id : receiverId} = req.params // receiverId is id where i am sending the message
    const senderId = req.user._id

    // check if user is sending image or not
    let imageUrl
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image) // uploading image to cloudinary
      imageUrl = uploadResponse.secure_url
    }

    // create a new message
    const newMessage =  new Message({
      senderId,
      receiverId,
      text,
      image : imageUrl
    })

    await newMessage.save()

    // todo -> realtime functionality using socket.io

    res.status(201).json(newMessage)
  } catch (error) {
    console.log("Error in sendMessage controller ", error.message);
    res.status(500).json({error : "Internal server error"})
  }
};
