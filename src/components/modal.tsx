export function Modal(props: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`fixed left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-md ${props.className}`}
    >
      {props.children}
    </div>
  );
}
