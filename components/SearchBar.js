export default function SearchBar({
  actionPath = "/gallery",
  defaultValue = "",
  hiddenFields = {},
  placeholder = "Search the archive by title..."
}) {
  return (
    <form action={actionPath} className="flex flex-col gap-3 rounded-[22px] bg-surface p-3 shadow-sm sm:flex-row">
      {Object.entries(hiddenFields).map(([name, value]) =>
        value ? <input key={name} type="hidden" name={name} value={value} /> : null
      )}
      <input
        type="search"
        name="q"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="h-12 flex-1 rounded-2xl bg-transparent px-4 text-sm outline-none transition placeholder:text-muted focus:bg-background"
      />
      <button
        type="submit"
        className="soft-button inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
      >
        Search
      </button>
    </form>
  );
}
