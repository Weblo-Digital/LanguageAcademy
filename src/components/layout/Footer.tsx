"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { footerTranslations } from "@/lib/translations";

export function Footer() {
  const { language } = useLanguage();
  const t = footerTranslations[language];

  return (
    <footer className="bg-[#0F1E43] text-white border-t border-white/10 pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* 6-Column Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 border-b border-white/10 pb-16">

          {/* Col 1: Brand & Contact Info */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 space-y-6">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
              <Image 
                src="/images/brand/next_point_academy.svg" 
                alt="Next Point Academy" 
                width={360} 
                height={130} 
                className="w-[360px] h-auto brightness-0 invert"
              />
            </Link>
            <p className="text-xs text-gray-300 leading-relaxed max-w-sm">
              {t.desc}
            </p>
            <div className="space-y-3 text-xs text-gray-300">
              <a href="mailto:contact@nextpointacademy.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="size-4 text-[#BEF264]" />
                contact@nextpointacademy.com
              </a>
              <a href="tel:+212522000000" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="size-4 text-[#BEF264]" />
                +212 522 00 00 00
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="size-4 text-[#BEF264]" />
                {t.address}
              </p>
            </div>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#BEF264]">{t.colPrograms}</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link href="/#programs" className="hover:text-white transition-colors">{t.kids}</Link></li>
              <li><Link href="/#programs" className="hover:text-white transition-colors">{t.juniors}</Link></li>
              <li><Link href="/#programs" className="hover:text-white transition-colors">{t.teens}</Link></li>
              <li><Link href="/#programs" className="hover:text-white transition-colors">{t.adults}</Link></li>
              <li><Link href="/#programs" className="hover:text-white transition-colors">{t.professionals}</Link></li>
              <li><Link href="/camps-ete" className="hover:text-white transition-colors">{t.summerCamps}</Link></li>
            </ul>
          </div>

          {/* Col 3: Languages - English, French, Spanish, Arabic only */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#BEF264]">{t.colLanguages}</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link href="/langues/anglais" className="hover:text-white transition-colors">🇬🇧 {t.english}</Link></li>
              <li><Link href="/langues/francais" className="hover:text-white transition-colors">🇫🇷 {t.french}</Link></li>
              <li><Link href="/langues/espagnol" className="hover:text-white transition-colors">🇪🇸 {t.spanish}</Link></li>
              <li><Link href="/langues/arabe" className="hover:text-white transition-colors">🇲🇦 {t.arabic}</Link></li>
            </ul>
          </div>

          {/* Col 4: Exams & Certifications */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#BEF264]">{t.colExams}</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link href="/examens" className="hover:text-white transition-colors">{t.ielts}</Link></li>
              <li><Link href="/examens" className="hover:text-white transition-colors">{t.toefl}</Link></li>
              <li><Link href="/examens" className="hover:text-white transition-colors">{t.delf}</Link></li>
              <li><Link href="/examens" className="hover:text-white transition-colors">{t.dele}</Link></li>
            </ul>
          </div>

          {/* Col 5: Academy */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#BEF264]">{t.colAcademy}</h4>
            <ul className="space-y-2.5 text-xs text-gray-300 font-medium">
              <li><Link href="/institut" className="hover:text-white transition-colors">{t.history}</Link></li>
              <li><Link href="/institut" className="hover:text-white transition-colors">{t.pedagogy}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.becomeTeacher}</Link></li>
              <li><Link href="/#testimonials" className="hover:text-white transition-colors">{t.testimonials}</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">{t.campus}</Link></li>
              <li><Link href="/#blog" className="hover:text-white transition-colors">{t.blog}</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section: Accreditations, Social Links, and Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-10 items-center">

          {/* Newsletter Box */}
          <div className="md:col-span-5 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#BEF264]">{t.newsletter}</h5>
            <p className="text-[11px] text-gray-300 leading-relaxed">
              {t.newsletterDesc}
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm">
              <input
                type="email"
                placeholder={t.newsletterPlaceholder}
                required
                className="bg-white/10 border border-white/15 rounded-xl px-4 py-2 text-xs text-white outline-none w-full placeholder-gray-400 focus:border-white/30"
              />
              <button type="submit" className="bg-[#BEF264] text-[#0F1E43] hover:bg-[#A3E635] text-xs font-bold px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer">
                {t.subscribe}
              </button>
            </form>
          </div>

          {/* Accreditations Row */}
          <div className="md:col-span-4 flex flex-wrap gap-4 items-center justify-start md:justify-center">
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-[10px] text-gray-300 font-bold">
              <Award className="size-4 text-[#BEF264]" />
              <span>CECRL Certifié</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-[10px] text-gray-300 font-bold">
              <Award className="size-4 text-[#BEF264]" />
              <span>Cambridge Partner</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-3.5">
            <a href="https://facebook.com" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
              <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </a>
            <a href="https://linkedin.com" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
              <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="https://instagram.com" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
              <svg className="size-4.5 stroke-current fill-none stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            <a href="https://youtube.com" className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors" aria-label="YouTube">
              <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.163c-.272-1.015-1.072-1.815-2.087-2.087-1.84-.495-9.21-.495-9.21-.495s-7.37 0-9.21.495c-1.015.272-1.815 1.072-2.087 2.087-.495 1.842-.495 5.688-.495 5.688s0 3.847.495 5.687c.272 1.015 1.072 1.816 2.087 2.088 1.84.495 9.21.495 9.21.495s7.37 0 9.21-.495c1.015-.272 1.815-1.072 2.087-2.088.495-1.84.495-5.687.495-5.687s0-3.846-.495-5.688zm-13.918 8.877v-8.08l6.984 4.04-6.984 4.04z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Legal Row */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-gray-400 font-semibold">
          <p>{t.copyright}</p>
          <div className="flex gap-4">
            <Link href="#privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="#terms" className="hover:text-white">Terms of Use</Link>
            <Link href="#legal" className="hover:text-white">Legal Notice</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
