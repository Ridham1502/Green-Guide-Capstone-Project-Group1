const ContactUs = require('../Model/contactUsModel'); 

module.exports.createContactUsMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newMessage = new ContactUs({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    return res.status(200).json({
      message: "Message sent successfully!",
      contactUs: newMessage,
    });
  } catch (error) {
    console.error("Error saving contact us message:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactUs.find().sort({ createdAt: -1 });
    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error fetching contact us messages:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
