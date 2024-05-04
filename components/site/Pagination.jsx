'use client'
import { useRouter, usePathname } from 'next/navigation';

export default function Pagination({
  activePage,
  perPage,
  count,
}) {
  const elements = () => {
    const renderedItems = [];
    const totalPages = Math.ceil(count / perPage);
    const tolerance = 2;

    const { replace } = useRouter();
    let pathname = usePathname();
    pathname = pathname.substring(0, pathname.lastIndexOf("/"));
    
    for (let i = 1; i <= totalPages; i++) {
      if (i >= activePage - tolerance && i <= activePage + tolerance) {
        renderedItems.push(
          <div
            key={i}
            className={`cursor-pointer rounded-md bg-accent_s text-primary_s p-3 hover:bg-opacity-50 ${i == activePage && "!text-white"
              }`}
            onClick={() => replace(pathname + '/' + i)}
          >
            {i}
          </div>,
        );
      } else if (i == 1) {
        renderedItems.push(
          <div
            key={i}
            className="cursor-pointer rounded-md p-3"
            onClick={() => replace(pathname + '/' + i)}
          >
            <u>{i}</u>
          </div>,
        );
      } else if (i == totalPages) {
        renderedItems.push(
          <div
            key={i}
            className="cursor-pointer rounded-md p-3"
            onClick={() => replace(pathname + '/' + i)}
          >
            <u>{i}</u>
          </div>,
        );
      }
    }

    return renderedItems;
  };

  return (
    <div className={`flex items-center justify-center gap-1 space-x-1`}>
      {elements()}
    </div>
  );
}
