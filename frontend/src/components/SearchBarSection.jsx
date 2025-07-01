import React from "react";
import { Button } from "./ui/button";
import { FaFilter } from "react-icons/fa";

function SearchBarSection() {
  return (
    <div className="min-h-screen flex items-center justify-center pb-5">
      <div className="w-full max-w-3xl mx-auto px-4">
        <div className="relative bg-black/80 rounded-2xl shadow-xl p-8 text-center text-white backdrop-blur-md">
          {/* Force white text for heading */}
          <h1
            className="font-bold text-4xl mb-3 !text-white"
            style={{ color: "white" }}
          >
            Queue Away
          </h1>

          {/* Force white text for paragraph */}
          <p
            className="!text-white mb-8"
            style={{ color: "white" }}
          >
            Discover and join queues at your favourite shops, salons and service providers.
          </p>

          {/* Inputs and buttons in one row */}
          <form className="flex flex-row justify-center items-center mb-6 w-full">
            <input
              id="search-bar"
              name="searchBar"
              type="text"
              placeholder="Search for salon, spa, clinics..."
              className="bg-[var(--input)] border border-[var(--border)] rounded-2xl px-4 py-2 w-64 h-11 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition text-[var(--foreground)] placeholder-[var(--muted)]"
              style={{ marginRight: "1.5rem" }}
            />
            <input
              id="location-bar"
              name="locationBar"
              type="text"
              placeholder="Location"
              className="bg-[var(--input)] border border-[var(--border)] rounded-2xl px-4 py-2 w-48 h-11 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition text-[var(--foreground)] placeholder-[var(--muted)]"
              style={{ marginRight: "1.5rem" }}
            />
            <Button
              variant="default"
              type="button"
              className="flex items-center gap-2 rounded-2xl h-11 px-4 min-w-[90px] bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]"
              style={{ marginRight: "1.5rem" }}
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
      </div>
    </div>
  );
}

export default SearchBarSection;
