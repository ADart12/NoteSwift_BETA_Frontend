const Pagination = ({
  currentPage = 1,
  setCurrentPage,
  totalPages = 1,
}) => {
  const safeTotalPages = Math.max(1, Number(totalPages) || 1);
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= safeTotalPages;

  return (
    <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-xl border border-slate-200">
      <button
        type="button"
        disabled={isFirstPage}
        onClick={() =>
          setCurrentPage((prev) => Math.max(1, prev - 1))
        }
        className={`px-5 py-2 border rounded-lg text-sm font-semibold transition ${
          isFirstPage
            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-slate-700 hover:bg-slate-50 border-slate-300 cursor-pointer shadow-xs"
        }`}
      >
        Previous
      </button>

      <span className="font-semibold text-slate-700 text-sm">
        Page {currentPage} of {safeTotalPages}
      </span>

      <button
        type="button"
        disabled={isLastPage}
        onClick={() =>
          setCurrentPage((prev) =>
            prev < safeTotalPages ? prev + 1 : prev
          )
        }
        className={`px-5 py-2 border rounded-lg text-sm font-semibold transition ${
          isLastPage
            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
            : "bg-white text-slate-700 hover:bg-slate-50 border-slate-300 cursor-pointer shadow-xs"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;