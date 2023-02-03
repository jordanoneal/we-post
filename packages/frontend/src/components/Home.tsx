import React from "react";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { auth } = useAuth();
  const authObj = auth as { username: string; password: string; response: { accessToken: string; refreshToken: string } };
  const username = authObj.username || "Guest";

  return (
    <div className="flex justify-center w-full">Welcome {username}
    </div>
  );
}
