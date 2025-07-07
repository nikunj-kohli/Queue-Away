import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, addDoc, query, onSnapshot, orderBy } from "firebase/firestore";
import { auth } from "../../firebase";

export default function ChatUI({ businessId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const q = query(
      collection(db, `chats/${businessId}/messages`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => doc.data()));
    });
    return unsubscribe;
  }, [businessId]);

  const sendMessage = async () => {
    await addDoc(collection(db, `chats/${businessId}/messages`), {
      text: newMessage,
      sender: auth.currentUser.uid,
      timestamp: new Date(),
    });
    setNewMessage("");
  };

  return (
    <div>
      {messages.map((msg, i) => (
        <div key={i}>{msg.text}</div>
      ))}
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}