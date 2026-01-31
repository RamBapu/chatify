import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }, // not equal to logged in user
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getting all contacts", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const { id } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, recieverId: id },
        { senderId: id, recieverId: loggedInUserId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getting messages", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const loggedInUserId = req.user._id;
    const { id } = req.params;

    if (!text && !image) {
      return res.status(400).json({ message: "Text or image is required." });
    }
    if (loggedInUserId.equals(id)) {
      return res
        .status(400)
        .json({ message: "Cannot send messages to yourself." });
    }
    const receiverExists = await User.exists({ _id: id });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found." });
    }

    let imageUrl;
    if (image) {
      // upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: loggedInUserId,
      recieverId: id,
      text,
      image: imageUrl,
    });

    const savedMessage = await newMessage.save();

    // Send message in real time if user is online - socket.io
    const recieverSocketIds = getRecieverSocketId(id);
    if (recieverSocketIds && recieverSocketIds.size > 0) {
      io.to([...recieverSocketIds]).emit("newMessage", newMessage);
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    console.error("Error in send message controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { recieverId: loggedInUserId }],
    });

    const chatPartnerIds = messages.map((msg) =>
      msg.senderId.toString() === loggedInUserId.toString()
        ? msg.recieverId.toString()
        : msg.senderId.toString(),
    );
    const uniqueChatPartnerIds = [...new Set(chatPartnerIds)];

    const chatPartners = await User.find({
      _id: { $in: uniqueChatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.error("Error in send message controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
