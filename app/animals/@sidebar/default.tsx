// import { fetchAnimals } from "@/lib/animals-service";
// import Link from "next/link";

export default async function Sidebar() {
  // const { animals } = await fetchAnimals();
  // const uniqueTypes = [...new Set(animals.map((animal) => animal.type))];
  // //   await new Promise((r) => setTimeout(r, 5000));

  return (
    <p>Sidebar</p>

    // <div>
    //   <ul>
    //     <li>
    //       <Link href="/animals/all">All</Link>{" "}
    //     </li>
    //     {uniqueTypes.map((type) => (
    //       <li key={type}>
    //         <Link href={`/animals/${type}`}>
    //           {type.charAt(0).toLocaleUpperCase() + type.slice(1)}
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
}
