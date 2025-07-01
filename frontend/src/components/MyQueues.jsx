import React, { useEffect, useState } from "react";


function MyQueues() {
  const [myQueues, setMyQueues] = useState([]);

  useEffect(() => {
    fetch("/api/myqueues")
      .then((res) => res.json())
      .then((data) => setMyQueues(data))
      .catch(() => setMyQueues([]));
  }, []);

  return (
    <div className="min-h-screen bg-black py-10 px-2">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-6 text-white">My Queues</h1>
        <div className="text-center text-gray-200 mb-8 text-lg">View and manage your queues below</div>
        <div className="bg-black/80 rounded-2xl shadow-xl p-8 text-white">
          {myQueues.length === 0 ? (
            <div className="text-center text-gray-300 mt-12">You have no queues.</div>
          ) : (
            <div className="flex flex-col gap-6 items-center">
              {myQueues.map((queue, idx) => (
                <div key={queue._id || idx} className="w-full max-w-md bg-gray-50 rounded-xl shadow p-6 flex flex-col justify-between min-h-[140px]">
                  <div className="text-left">
                    <div className="font-semibold text-lg text-gray-900 mb-1">{queue.shopName}</div>
                    <div className="text-gray-500 text-sm mb-1">{queue.shopAddress}</div>
                    <div className="text-gray-400 text-xs mb-2">{queue.date} • {queue.time}</div>
                  </div>
                  <div className="flex justify-end">
                    <span className={`rounded px-3 py-2 text-sm font-semibold ${queue.position === 1 ? 'bg-green-600 text-white' : 'bg-gray-800 text-white'}`}>
                      Position: {queue.position === 1 ? 'Your Turn' : queue.position}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyQueues;
