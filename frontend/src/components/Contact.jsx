import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        { name, email, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(res.data.message);
      setName("");
      setEmail("");
      setMessage("");
      setSubject("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="contact container">
      <div className="banner">
        <div className="item">
          <h4>Address</h4>
          <p>Anywhere, Any City, Anytime</p>
        </div>
        <div className="item">
          <h4>Call Us</h4>
          <p>Call Us: 01877766670</p>
        </div>
        <div className="item">
          <h4>Mail Us</h4>
          <p>eliteevents@gmail.com</p>
        </div>
      </div>
      <div className="banner">
        <div className="item">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m12!1m8!1m3!1d3689.8402672129037!2d91.8214439!3d22.3596594!3m2!1i1024!2i768!4f13.1!2m1!1smap!5e0!3m2!1sen!2sbd!4v1734618177841!5m2!1sen!2sbd"
            style={{ border: 0, width: "100%", height: "450px" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="item">
          <form onSubmit={handleSendMessage}>
            <h2>CONTACT</h2>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              rows={10}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
