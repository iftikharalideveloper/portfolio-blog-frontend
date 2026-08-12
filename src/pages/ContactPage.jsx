import { useState } from "react";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message: messageText }),
      });

      const data = await response.json();

      if (data.success) {
        setStatusMsg("Message sent! I'll get back to you soon.");
        setName("");
        setEmail("");
        setMessageText("");
      } else {
        setStatusMsg("Failed to send message. Try again.");
      }
    } catch (error) {
      setStatusMsg("Something went wrong.");
    }
  };

  return (
    <div>
      <h2>Contact Me</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          placeholder="Your Message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button type="submit">Send Message</button>
      </form>
      {statusMsg && <p>{statusMsg}</p>}
    </div>
  );
}

export default ContactPage;