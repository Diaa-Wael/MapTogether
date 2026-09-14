import { useEffect, useState } from "react";

export default function PresenceCursors({
  awareness
}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!awareness) return;

    function update() {
      const states = [];

      awareness.getStates().forEach((state) => {
        if (state.user) {
          states.push(state.user);
        }
      });

      setUsers(states);
    }

    awareness.on("change", update);

    update();

    return () => {
      awareness.off("change", update);
    };
  }, [awareness]);

  return (
    <div className="presence">
      {users.map((user) => (
        <div key={user.id}>
          🟢 {user.name}
        </div>
      ))}
    </div>
  );
}