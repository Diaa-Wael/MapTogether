import { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export function useYjsDoc(roomId) {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    if (!roomId) {
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
      provider.destroy();
      doc.destroy();
      setConnection(null);
    };
  }, [roomId]);

  return connection;
}