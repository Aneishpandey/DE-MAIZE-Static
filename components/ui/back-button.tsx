'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  fallbackHref?: string
  label?: string
}

export function BackButton({ fallbackHref = '/', label = 'Go Back' }: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Check if there's browser history to go back to
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      // Fallback to the provided href if no history
      router.push(fallbackHref)
    }
  }

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
    >
      <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
      {label}
    </button>
  )
}
