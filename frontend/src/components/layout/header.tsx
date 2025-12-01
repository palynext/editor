export default function Header() {
  return (
    <div
      className="h-7 w-full top-0 left-0 absolute"
      style={{ ["--wails-draggable" as any]: "drag" }}
    ></div>
  );
}
