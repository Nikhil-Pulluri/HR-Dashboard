export default function SkeletonCard() {
  return (
    <div className="max-w-sm w-full bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-700 overflow-hidden animate-pulse">
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-full bg-gray-300 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>

        <div className="space-y-2 pl-1">
          <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>

        <div className="flex gap-1 pl-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-4 w-4 bg-gray-300 dark:bg-gray-700 rounded" />
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded" />
          ))}
        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700" />
    </div>
  )
}
