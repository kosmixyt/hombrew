export function Modal(props: {
  children: React.ReactNode;
  className?: string;
  zindex?: number;
}) {
  return (
    <div
      style={{ zIndex: props.zindex }}
      className={`fixed left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-md ${props.className}`}
    >
      {props.children}
    </div>
  );
}
