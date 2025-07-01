import React from "react";
import { Button } from "../components/ui/button";

function ProfileMenu({ onProfile, onSettings, onLogout }) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 10,
        boxShadow: "0 2px 12px rgba(0,0,0,0.25)",
        padding: "12px 0",
        minWidth: 160,
        zIndex: 1000,
      }}
    >
      <Button
        variant="default"
        className="w-100 text-start px-4 py-2"
        style={{ border: "none", borderRadius: 0, fontWeight: 500 }}
        onClick={onProfile}
      >
        Profile
      </Button>
      <Button
        variant="default"
        className="w-100 text-start px-4 py-2"
        style={{ border: "none", borderRadius: 0, fontWeight: 500 }}
        onClick={onSettings}
      >
        Settings
      </Button>
      <Button
        variant="default"
        className="w-100 text-start px-4 py-2"
        style={{
          border: "none",
          borderRadius: 0,
          color: "var(--destructive)",
          fontWeight: 500,
        }}
        onClick={onLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default ProfileMenu;
