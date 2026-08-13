import { useState } from "react";
import { API_URL } from "../config/api";

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [messageText, setMessageText] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/api/messages`, {
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6 py-16">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900 mb-1">Get in Touch</h2>
        <p className="text-slate-500 text-sm mb-6">
          Have a question or want to work together? Send a message.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <textarea
            placeholder="Your Message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            rows={5}
            className="border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition"
          >
            Send Message
          </button>
        </form>

        {statusMsg && (
          <p className="text-sm text-slate-600 mt-4 text-center">{statusMsg}</p>
        )}
      </div>
    </div>
  );
}

export default ContactPage;