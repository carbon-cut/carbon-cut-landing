import { useScopedI18n } from '@/locales/client'
import Link from 'next/link'
import React from 'react'

function Footer() {

  const t = useScopedI18n('result.footer')

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#00A261] to-[#2EC97F] text-white font-light hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105">
              {t('download')}
            </button>

            <button className="px-8 py-3 rounded-lg border-2 border-[#FF6034] bg-white text-[#FF6034] font-light hover:bg-[#FFF0E6] transition-colors duration-300 shadow-md hover:shadow-lg">
              {t('share')}
            </button>

            <Link href={'/form'} className="px-8 py-3 rounded-lg border-2 border-[#4ECDC4] bg-white text-[#4ECDC4] font-light hover:bg-[#E6FFFE] transition-colors duration-300 shadow-md hover:shadow-lg">
              {t('retake')}
            </Link>
          </div>
  )
}

export default Footer