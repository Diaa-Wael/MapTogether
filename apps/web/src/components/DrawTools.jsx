export default function DrawTools({
  mode,
  setMode
}) {
  return (
    <div className="draw-tools">
      <button
        className={mode === "select" ? "active" : ""}
        onClick={() => setMode("select")}
      >
        Select
      </button>

      <button
        className={mode === "point" ? "active" : ""}
        onClick={() => setMode("point")}
      >
        Point
      </button>

      <button
        className={mode === "line" ? "active" : ""}
        onClick={() => setMode("line")}
      >
        Line
      </button>

      <button
        className={mode === "polygon" ? "active" : ""}
        onClick={() => setMode("polygon")}
      >
        Polygon
      </button>
    </div>
  );
}