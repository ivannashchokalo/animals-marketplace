import Link from "next/link";
import Container from "../Container/Container";
import FavoritesBadge from "../FavoritesBadge/FavoritesBadge";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { cookies } from "next/headers";

export default async function Header() {
  const cookieStore = await cookies();
  const isLogged = cookieStore.get("accessToken");

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
          {isLogged && (
            <Link
              href="/favorites"
              style={{ marginLeft: "auto", marginRight: 50 }}
            >
              <FavoritesBadge />
            </Link>
          )}
          <AuthNavigation />
        </div>
      </Container>
    </header>
  );
}
