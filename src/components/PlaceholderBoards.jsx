function PlaceholderBoards({ active = false }) {
  return (
    <li>
      <button
        type="button"
        className={`${active ? 'bg-indigo-700' : 'bg-gray-300'} flex items-center gap-4 pl-6 py-4 rounded-r-full w-full transition-all duration-200 ease-in-out animate-pulse`}
      >
        <span className="w-5 h-5 bg-gray-600 rounded-md" />
      </button>
    </li>
  );
}

export default PlaceholderBoards;
