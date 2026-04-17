import Link from "next/link";
import Container from "../Container/Container";
import FavoritesBadge from "../FavoritesBadge/FavoritesBadge";
import Logout from "../Logout/Logout";

export default function Header() {
  return (
    <header style={{ padding: "25px 0" }}>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <nav style={{ display: "flex", gap: 40 }}>
            <Link href="/">Logo</Link>
            <ul style={{ display: "flex", gap: 16 }}>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/animals">Animals</Link>
              </li>
            </ul>
          </nav>
          <Link
            href="/favorites"
            style={{ marginLeft: "auto", marginRight: 50 }}
          >
            <FavoritesBadge />
          </Link>
          <Link href={"/sign-in"}>Sign in</Link>
          <Link href={"/sign-up"}>Sign up</Link>
          <Logout />
        </div>
      </Container>
    </header>
  );
}
