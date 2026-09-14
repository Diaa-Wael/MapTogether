import { useState } from "react";

export default function RoomJoin({
  onJoin
}) {
  const [room, setRoom] = useState("");

  function submit(event) {
    event.preventDefault();

    const normalized = room.trim();

    if (!normalized) return;

    onJoin(normalized);
  }

  return (
    <form onSubmit={submit}>
      <input
        value={room}
        onChange={(event) =>
          setRoom(event.target.value)
        }
        placeholder="Enter room ID"
      />

      <button type="submit">
        Join room
      </button>
    </form>
  );
}