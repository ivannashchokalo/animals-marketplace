interface SectionProps {
  children: React.ReactNode;
}

export default function Section({ children }: SectionProps) {
  return <section style={{ padding: "50px 0" }}>{children}</section>;
}
