interface ContainerProps {
  children: React.ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div style={{ minWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
      {children}
    </div>
  );
}
