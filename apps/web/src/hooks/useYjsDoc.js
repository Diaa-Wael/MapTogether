import { useEffect, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

export function useYjsDoc(roomId) {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (!roomId) {
      setState(null);
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

    const handleUpdate = () => {
      setState((current) => (current === null ? {} : { ...current }));
    };

    doc.on("update", handleUpdate);

    setState({
      doc,
      provider,
      awareness
    });

    return () => {
      doc.off("update", handleUpdate);
      provider.destroy();
      doc.destroy();
    };
  }, [roomId]);

  return state;
}