'use client'
import { getWindowWidth } from '../lib/utils/common'
import { useEffect, useState, useCallback } from 'react'

export const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(getWindowWidth())

  const handleResize = useCallback(() => {
    setWindowWidth(getWindowWidth())
  }, [])

  useEffect(() => {
    setWindowWidth(getWindowWidth())
    
    window.addEventListener('resize', handleResize, true)

    return () => window.removeEventListener('resize', handleResize, true)
  }, [handleResize])

  return { windowWidth, handleResize }
}

export const useMediaQuery = (maxWidth: number) => {
  const {
    windowWidth: { windowWidth },
  } = useWindowWidth()
  const [isMedia, setIsMedia] = useState(false)

  useEffect(() => {
    setIsMedia(windowWidth <= maxWidth)
  }, [maxWidth, windowWidth])

  return isMedia
}
