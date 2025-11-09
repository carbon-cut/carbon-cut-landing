import { useScopedI18n } from '@/locales/client'
import React from 'react'

function Recommendations() {

  const t = useScopedI18n('result.recommendations')
  return (
    <div className="mb-16">
            <h3 className="text-2xl font-light text-foreground mb-8 tracking-tight">{t('title')}</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  section: "transport",
                  icon: "🚗",
                  title: "transportation",
                  ////desc: "Opt for public transit, carpooling, or cycling",
                  gradient: "from-[#FFF0E6] to-[#FFE6D5]",
                  accent: "#FF6034",
                },
                {
                  section: "energie",
                  icon: "⚡",
                  title: "energie",
                  //desc: "Switch to renewable sources and improve insulation",
                  gradient: "from-[#E6F9F3] to-[#D1F2EB]",
                  accent: "#00A261",
                },
                {
                  section: "food",
                  icon: "🍽️",
                  title: "diet",
                  //desc: "Reduce meat consumption and buy local",
                  gradient: "from-[#FFF8E6] to-[#FFECCC]",
                  accent: "#FFB84D",
                },
                {
                  section: "waste",
                  icon: "♻️",
                  title: "waste",
                  //desc: "Recycle more and practice composting",
                  gradient: "from-[#E6FFFE] to-[#CCFDFC]",
                  accent: "#4ECDC4",
                },
              ].map((tip, i) => (
                <div
                  key={i}
                  className={`bg-gradient-to-br ${tip.gradient} rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300`}
                  style={{ borderColor: tip.accent + "30" }}
                >
                  <p className="text-3xl mb-3">{tip.icon}</p>
                  <h4 className="font-light text-foreground mb-2">{t(`${tip.section}.${tip.title}.title`)}</h4>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">{t(`${tip.section}.${tip.title}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
  )
}

export default Recommendations