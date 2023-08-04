import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { ITEMS_PER_PAGE } from "../../app/constants";

function Pagination({ page, handlePage, setPage, totalItems }) {
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <>
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page === 1 ? true : false}
          onClick={() => setPage(page - 1)}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-slate-200"
        >
          Previous
        </button>
        <button
          disabled={page >= totalPages ? true : false}
          onClick={() => setPage(page + 1)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:bg-slate-200"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {page * ITEMS_PER_PAGE > totalItems
                ? totalItems
                : page * ITEMS_PER_PAGE}
            </span>{" "}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1 ? true : false}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-200 "
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {Array.from({ length: totalPages }).map((el, index) => (
              <button
                key={index}
                onClick={() => handlePage(index + 1)}
                aria-current="page"
                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semiboldfocus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border cursor-pointer ${
                  index + 1 === page
                    ? "bg-indigo-600 text-white"
                    : "text-gray-400"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages ? true : false}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:bg-slate-200"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Pagination;
