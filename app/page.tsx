'use client'

import { useState } from 'react'
import Chat from './components/Chat'
import Sidebar from './components/Sidebar'
import { Button } from '@/app/components/ui/button'
import { MoonIcon, SunIcon, MenuIcon } from 'lucide-react'

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleTheme = () => setIsDarkMode(!isDarkMode)
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  return (
    <main className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-grow flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2 md:hidden">
              <MenuIcon className="h-5 w-5 text-black dark:text-white" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              AI <span className="text-green-600 dark:text-green-400">Kweku</span>
            </h1>
          </div>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {isDarkMode ? <SunIcon className="h-5 w-5 text-white" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
        </nav>
        <Chat />
      </div>
    </main>
  )
}