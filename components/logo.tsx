import { DollarSign } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg overflow-hidden">
        <DollarSign className="w-5 h-5 text-white dark:text-gray-900" />
      </div>
      <span className="font-bold text-xl text-gray-900 dark:text-white">SoftSell</span>
    </div>
  )
}
