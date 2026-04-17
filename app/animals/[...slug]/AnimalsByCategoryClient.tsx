"use client";
import AnimalsList from "@/components/AnimalsList/AnimalsList";
import { fetchAnimals } from "@/lib/animals-service";
import { useQuery } from "@tanstack/react-query";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function AnimalsByCategoryClient() {
  const searchParams = useSearchParams();
  const { slug } = useParams<{ slug: string[] }>();
  const router = useRouter();
  const pathname = usePathname();
  const type = slug[0];
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";

  const { data } = useQuery({
    queryKey: ["animals", { page, type, search }],
    queryFn: () => fetchAnimals(page, type, search),
    refetchOnMount: false,
  });

  const handlePageChange = ({ selected }: { selected: number }) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(selected + 1));

    //замість цього setSearchParams(params);

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      {data?.animals && data.animals.length > 0 && (
        <AnimalsList animals={data.animals} />
      )}
      {(data?.totalPages ?? 0) > 1 && (
        <ReactPaginate
          pageCount={data?.totalPages ?? 0}
          onPageChange={handlePageChange}
          forcePage={page - 1}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          previousLabel="<-"
          nextLabel="->"
          breakLabel="..."
          renderOnZeroPageCount={null}
          // containerClassName={styles.pagination}
          // activeClassName={styles.active}
          // disabledClassName={styles.disabled}
        />
      )}
    </div>
  );
}
