import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { LeadCaptureCard } from "@/components/shared/LeadCaptureCard";
import { Translated } from "@/components/client/Translated";

import { getPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const defaults = {
    title: "Contactez-nous | Next Point Academy",
    description: "Contactez Next Point Academy pour toute question, inscription ou réservation de test de niveau.",
  };
  return getPageMetadata("/contact", defaults);
}

export default function ContactPage() {
  const breadcrumbs = [
    { label: "Accueil", href: "/" }
  ];

  return (
    <div className="pb-24">
      <PageHero
        title={<Translated fr="Contactez notre académie" en="Contact Our Academy" />}
        subtitle={<Translated fr="Notre équipe pédagogique est à votre disposition pour vous orienter et planifier votre test de niveau." en="Our pedagogical team is at your disposal to guide you and schedule your placement test." />}
        badgeText="Contact"
        breadcrumbs={breadcrumbs}
      />

      <section className="max-w-7xl mx-auto px-6 mt-16 sm:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h2 className="text-2xl font-black text-brand-navy tracking-tight">
              <Translated fr="Nos campus au Maroc" en="Our campuses in Morocco" />
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              <Translated 
                fr="N'hésitez pas à nous rendre visite ou à nous contacter par téléphone ou email." 
                en="Feel free to visit us or contact us by phone or email." 
              />
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-brand-warm-white p-6 rounded-2xl border border-slate-100/80 sm:col-span-2">
                <MapPin className="size-6 text-brand-navy mb-4" />
                <h3 className="font-bold text-brand-navy text-sm">
                  <Translated fr="Notre Adresse" en="Our Address" />
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  rue ibnou katir, résidence les perles de casablanca n1
                </p>
              </div>

              <div className="bg-brand-warm-white p-6 rounded-2xl border border-slate-100/80">
                <Phone className="size-6 text-brand-navy mb-4" />
                <h3 className="font-bold text-brand-navy text-sm">
                  <Translated fr="Téléphone / WhatsApp" en="Phone / WhatsApp" />
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  <a href="tel:+212663068618" className="hover:underline text-brand-navy font-bold">+212 6 63 06 86 18</a>
                </p>
              </div>

              <div className="bg-brand-warm-white p-6 rounded-2xl border border-slate-100/80">
                <Clock className="size-6 text-brand-navy mb-4" />
                <h3 className="font-bold text-brand-navy text-sm">
                  <Translated fr="Horaires d'ouverture" en="Opening Hours" />
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  <Translated fr="Lundi au Samedi : 10:00 - 21:00" en="Monday to Saturday: 10:00 AM - 9:00 PM" />
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Capture Card */}
          <div className="lg:col-span-6">
            <LeadCaptureCard
              title={<Translated fr="Envoyez-nous un message" en="Send Us a Message" />}
              description={<Translated fr="Remplissez le formulaire ci-dessous et un conseiller vous répondra sous 24 heures." en="Fill out the form below and an advisor will respond within 24 hours." />}
              submitLabel={<Translated fr="Envoyer mon message" en="Send Message" />}
              fields={[
                { name: "name", label: <Translated fr="Nom complet" en="Full Name" />, type: "text", placeholder: "Ex: Youssef El Alami", required: true },
                { name: "email", label: <Translated fr="Adresse email" en="Email Address" />, type: "email", placeholder: "Ex: youssef@gmail.com", required: true },
                { name: "phone", label: <Translated fr="Numéro WhatsApp" en="WhatsApp Number" />, type: "tel", placeholder: "Ex: +212 6...", required: false },
                { name: "message", label: <Translated fr="Votre message" en="Your Message" />, type: "textarea", placeholder: "Comment pouvons-nous vous aider ?", placeholderEn: "How can we help you?", required: true }
              ]}
              actionUrl="/api/contact"
              successContent={
                <div className="bg-emerald-50 border border-emerald-200/50 rounded-2xl p-6 text-center space-y-4">
                  <h4 className="text-sm font-black text-emerald-950">
                    <Translated fr="Message envoyé avec succès !" en="Message sent successfully!" />
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    <Translated 
                      fr="Merci ! Un conseiller de Next Point Academy vous contactera très prochainement." 
                      en="Thank you! A Next Point Academy advisor will contact you very soon." 
                    />
                  </p>
                </div>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
