function SettingsModal({
  openSettingsModal,
  setOpenSettingModal,
  setOpenEditBoardModal,
  setOpenDeleteModal,
  isTask = false,
}) {
  const handleDelete = () => {
    setOpenDeleteModal(true);
    setOpenSettingModal(false);
  };

  const handleEdit = () => {
    setOpenEditBoardModal(true);
    setOpenSettingModal(false);
  };

  return (
    openSettingsModal && (
      <div
        className={`absolute ${isTask ? 'top-[275px] right-20 lg:top-16 lg:right-6' : 'top-14 right-4 lg:top-16 lg:right-6'} bg-white dark:bg-slate-900 flex flex-col items-start gap-4 p-6 shadow-xl shadow-slate-300 dark:shadow-slate-800 rounded-md`}
      >
        <button
          type="button"
          className="text-gray-500 text-sm font-semibold"
          onClick={handleEdit}
        >
          {isTask ? 'Edit task' : 'Edit board'}
        </button>

        <button
          type="button"
          className="text-red-500 text-sm font-semibold"
          onClick={handleDelete}
        >
          {isTask ? 'Delete task' : 'Delete board'}
        </button>
      </div>
    )
  );
}

export default SettingsModal;
