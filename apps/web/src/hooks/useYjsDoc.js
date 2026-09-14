import { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export function useYjsDoc(roomId) {
  const [connection, setConnection] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!roomId) {
      setConnected(false);
      return;
    }

    const doc = new Y.Doc();

    const serverUrl =
      import.meta.env.VITE_SYNC_SERVER_URL ||
      "ws://localhost:1234";

    const provider = new WebsocketProvider(
      serverUrl,
      roomId,
      doc
    );

    const handleStatus = ({ status }) => {
      setConnected(status === "connected");
    };

    provider.on("status", handleStatus);

    const awareness = provider.awareness;

    awareness.setLocalStateField("user", {
      id: crypto.randomUUID(),
      name: "Anonymous"
    });

    setConnection({
      doc,
      provider,
      awareness
    });

    return () => {
      provider.off("status", handleStatus);
      provider.destroy();
      doc.destroy();
      setConnected(false);
      setConnection(null);
    };
  }, [roomId]);

  return connection
    ? {
        ...connection,
        connected
      }
    : null;
}
