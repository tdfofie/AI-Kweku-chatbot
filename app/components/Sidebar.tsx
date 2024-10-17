import { Button } from '@/app/components/ui/button'
import { PlusIcon, XIcon } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h2 className="text-xl font-semibold">Chat History</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
          <XIcon className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-4">
        <Button className="w-full justify-start" variant="outline">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </div>
      {/* Chat history list would go here */}
    </div>
  )
}