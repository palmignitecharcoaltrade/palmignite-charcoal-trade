import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { SectionHeader } from "./ui/corporate/SectionHeader";
import { CorporateCard } from "./ui/corporate/CorporateCard";

const ExportSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const regions = [
    {
      region: "Asia",
      countries: [
        { name: "South Korea", code: "kr" },
        { name: "Japan", code: "jp" },
        { name: "China", code: "cn" },
        { name: "Vietnam", code: "vn" },
        { name: "Saudi Arabia", code: "sa" },
      ],
    },
    {
      region: "Europe",
      countries: [
        { name: "United Kingdom", code: "gb" },
        { name: "Nederland", code: "nl" },
      ],
    },
    {
      region: "America",
      countries: [{ name: "United States", code: "us" }],
    },
  ];

  return (
    <section id="export" ref={sectionRef} className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <SectionHeader 
          label="Global Presence"
          title={t("export.title")}
          subtitle={t("export.subtitle")}
        />

        <div className="max-w-6xl mx-auto space-y-6">
          {regions.map((region, regionIndex) => (
            <div key={regionIndex} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} style={{ transitionDelay: `${regionIndex * 150}ms` }}>
              <CorporateCard className="p-6 md:p-8 hover:bg-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gold/10">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">{region.region}</h3>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {region.countries.map((country, countryIndex) => (
                    <div key={countryIndex} className="group relative">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-300 cursor-pointer">
                        <img src={`https://flagicons.lipis.dev/flags/4x3/${country.code}.svg`} alt="" className="w-6 rounded-sm" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-gold transition-colors">{country.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CorporateCard>
            </div>
          ))}
        </div>

        <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { count: 8, label: "Countries Served" },
            { count: 5, label: "Continents" },
            { count: 24, label: "Support", suffix: "/7" }
          ].map((stat, i) => (
            <CorporateCard key={i} className="text-center p-6 bg-gold/5 border-gold/10">
              <p className="text-4xl font-bold text-gold font-[Onest] mb-2">
                <CountUp end={stat.count} duration={3} enableScrollSpy />
                {stat.suffix || "+"}
              </p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">{stat.label}</p>
            </CorporateCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
