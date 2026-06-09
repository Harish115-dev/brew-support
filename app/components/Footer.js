import React from 'react'

export const Footer = () => {
  return (
          <footer className="w-full max-w-5xl mx-auto border-t border-[#e8dcc8] pt-8 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#b09a7a]">
        <span>© 2026 brewfund</span>
        <div className="flex gap-5">
          <a href="#" className="hover:text-[#2c1a0e] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#2c1a0e] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#2c1a0e] transition-colors">Contact</a>
        </div>
      </footer>
  )
}
