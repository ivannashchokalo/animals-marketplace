import Link from "next/link";

export default function Animals() {
  return (
    <div>
      <h1>Animals</h1>
      <ul style={{ display: "flex", gap: "20px" }}>
        <li>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 400,
              height: 500,
              backgroundColor: "teal",
              borderRadius: "15px",
              color: "white",
              fontSize: 40,
            }}
            href="/animals/cat"
          >
            Cats
          </Link>
        </li>
        <li>
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 400,
              height: 500,
              backgroundColor: "teal",
              borderRadius: "15px",
              color: "white",
              fontSize: 40,
            }}
            href="/animals/dog"
          >
            Dogs
          </Link>
        </li>
      </ul>
    </div>
  );
}
