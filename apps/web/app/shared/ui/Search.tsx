'use client'
import { motion, AnimatePresence } from 'motion/react'
// import { Search as SearchIcon, X } from 'lucide-react'
import { IoSearch } from "react-icons/io5";
import { MdOutlineClear } from "react-icons/md";
import { useRef, useState } from 'react'

interface SearchProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export default function Search({ 
  placeholder = "Поиск фильмов", 
  onSearch,
  className = "" 
}: SearchProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch?.(query)
    }
  }

  const handleClear = () => {
    setQuery('')
    onSearch?.('')
    inputRef.current?.focus()
  }

  return (
    <div className={`relative ${className}`}>
      <motion.form 
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
          className={`
            relative
            flex items-center
            h-12
            px-4
            bg-(--first-bg-color)
            border border-(--first-border-color)
            rounded-xl
            transition-all duration-300
            ${isFocused ? 'ring-2 ring-(--link-color)/30 shadow-lg' : 'shadow-md'}
          `}
        >
          <IoSearch 
            className={`w-5 h-5 transition-colors mr-3 ${
              isFocused || query ? 'text-(--link-color)' : 'text-(--second-text-color)'
            }`}
          />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="
              flex-1
              h-full
              bg-transparent 
              outline-none 
              text-(--first-text-color)
              placeholder:text-(--second-text-color)/60
              text-base
              pr-10
            "
          />
          
          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                onClick={handleClear}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="
                  absolute right-3
                  p-1
                  rounded-full 
                  bg-(--first-border-color)/50
                  hover:bg-(--first-border-color)
                  transition-colors
                "
              >
                <MdOutlineClear className="w-4 h-4 text-(--second-text-color)" />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.form>

      {/* Поисковые подсказки (опционально) */}
      <AnimatePresence>
        {query && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute top-full left-0 right-0 mt-2
              bg-(--first-bg-color)
              border border-(--first-border-color)
              rounded-xl
              shadow-xl
              overflow-hidden
              z-50
            "
          >
            <div className="py-2">
              {/* Примеры подсказок */}
              <SearchSuggestion 
                query={query}
                suggestion="Как приручить дракона"
              />
              <SearchSuggestion 
                query={query}
                suggestion="Как приручить дракона 2"
              />
              <SearchSuggestion 
                query={query}
                suggestion="Как приручить дракона 3"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function SearchSuggestion({ query, suggestion }: { query: string; suggestion: string }) {
  const getHighlightedText = () => {
    const index = suggestion.toLowerCase().indexOf(query.toLowerCase())
    if (index === -1) return suggestion

    const before = suggestion.substring(0, index)
    const match = suggestion.substring(index, index + query.length)
    const after = suggestion.substring(index + query.length)

    return (
      <>
        {before}
        <span className="text-(--link-color) font-medium">{match}</span>
        {after}
      </>
    )
  }

  return (
    <button
      className="
        w-full
        px-4 py-3
        text-left
        text-(--second-text-color)
        hover:text-(--first-text-color)
        hover:bg-(--first-border-color)/30
        transition-colors
        border-b border-(--first-border-color)/30
        last:border-b-0
      "
      onClick={() => {
        // Логика при клике на подсказку
        console.log('Selected:', suggestion)
      }}
    >
      <div className="flex items-center gap-3">
        <IoSearch className="w-4 h-4 text-(--second-text-color)/60" />
        <span className="text-sm">{getHighlightedText()}</span>
      </div>
    </button>
  )
}