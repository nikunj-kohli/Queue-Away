import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { FaFilter } from "react-icons/fa";
import { Link } from "react-router-dom";

function QueueDirectory() {
  const [queueData, setQueueData] = useState([]);

  useEffect(() => {
    fetch("/api/shops")
      .then((res) => res.json())
      .then((data) => setQueueData(data))
      .catch(() => setQueueData([]));
  }, []);

  return (
    <div className="min-h-screen bg-[var(--input)] py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-center text-3xl font-bold mb-6 text-[var(--foreground)]">Queue Directory</h1>
        <div className="bg-[var(--card)] rounded-2xl shadow p-8 mb-8 w-full max-w-2xl mx-auto">
          {/* All inputs and buttons in one horizontal line */}
          <form className="flex flex-row justify-center items-center gap-6 w-full">
            <input
              id="search-shops"
              name="searchShops"
              type="text"
              placeholder="Search for shops and services"
              className="border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted)] rounded-2xl px-4 py-2 w-64 h-11 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            />
            <input
              id="location"
              name="location"
              type="text"
              placeholder="Location"
              className="border border-[var(--border)] bg-[var(--input)] text-[var(--foreground)] placeholder-[var(--muted)] rounded-2xl px-4 py-2 w-48 h-11 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition"
            />
            <Button
              variant="outline"
              type="button"
              className="flex items-center gap-2 rounded-2xl h-11 px-4 min-w-[90px]"
            >
              <FaFilter /> Filters
            </Button>
            <Button
              variant="default"
              type="submit"
              className="rounded-2xl h-11 px-5 min-w-[100px]"
            >
              Find Shops
            </Button>
          </form>
        </div>
        {queueData.length === 0 ? (
          <div className="text-center text-[var(--muted)] mt-12">No shops found.</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {queueData.map((shop, idx) => (
              <div
                key={shop._id || idx}
                className="bg-[var(--card)] rounded-2xl shadow-lg p-7 flex flex-col justify-between min-h-[170px] border border-[var(--border)] transition-transform hover:scale-[1.025] hover:shadow-xl"
                style={{ minWidth: 240 }}
              >
                <div>
                  <div className="font-bold text-xl text-[var(--foreground)] mb-1 truncate">{shop.name}</div>
                  <div className="text-[var(--muted)] text-sm mb-3 truncate">{shop.address}</div>
                </div>
                <div className="flex justify-end">
                  <Link to={`/queue-directory/${shop._id}/book`}>
                    <Button variant="default" className="rounded-xl px-5 py-2 text-base font-semibold">View</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QueueDirectory;