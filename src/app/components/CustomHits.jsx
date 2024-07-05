import React from "react";
import { useHits } from "react-instantsearch";
import Link from "next/link";

function CustomHits({ showHits }) {
  const { hits } = useHits();

  return (
    <>
      {showHits ? (
        <ul className="absolute top-[50px] backdrop-blur-2xl bg-black/50 text-white w-[400px] h-fit max-h-[200px] overflow-y-auto rounded-lg rounded-b-lg shadow-lg z-10">
          {hits.map((hit, index) => (
            <Link href={`/products/${hit.category}/${hit.name}`} key={index}>
              <li key={hit.objectID} className="py-6 px-4 hover:bg-zinc-400">
                {hit.brand} {hit.name}
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </>
  );
}

export default CustomHits;
