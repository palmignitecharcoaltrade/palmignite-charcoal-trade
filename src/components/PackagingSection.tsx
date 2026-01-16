import bulkLooseImg from "@/assets/packaging-bulk-loose.png";
import bulkPkgImg from "@/assets/packaging-bulk.png";
import fullPkgImg from "@/assets/packaging-full.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Box, CheckCircle2, Layers, Package } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CorporateCard } from "./ui/corporate/CorporateCard";
import { SectionHeader } from "./ui/corporate/SectionHeader";

const PackagingSection = () => {
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
      { threshold: 0.1 }
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

  const options = [
    {
      title: t("packaging.bulkLoose.title"),
      desc: t("packaging.bulkLoose.desc"),
      image: bulkLooseImg,
      icon: Package,
    },
    {
      title: t("packaging.full.title"),
      desc: t("packaging.full.desc"),
      image: fullPkgImg,
      icon: Layers,
    },
    {
      title: t("packaging.bulk.title"),
      desc: t("packaging.bulk.desc"),
      image: bulkPkgImg,
      icon: Box,
    },
  ];

  return (
    <section id="packaging" ref={sectionRef} className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader label={t("packaging.label")} title={t("packaging.title")} subtitle={t("packaging.subtitle")} />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {options.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="h-full flex flex-col overflow-hidden group rounded-xl border border-gold">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={option.image} alt={option.title} className="w-full h-full object-cover transition-transform duration-700" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-gold/10 text-gold">
                          <Icon className="w-5 h-5" />
                        </div>
                        <h4 className="font-bold text-white text-lg">{option.title}</h4>
                      </div>
                      <p className="text-gray-400 text-sm leading-relaxed flex-1">{option.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <CorporateCard className="p-8 border-l-4 border-l-gold">
                <div className="overflow-hidden rounded-t-xl">
                  <img className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105" src={bulkPkgImg} alt="img" />
                </div>

                <br />
                <h4 className="text-white font-bold text-xl mb-3 flex items-center gap-2">
                  <Box className="w-5 h-5 text-gold" />
                  {t("packaging.masterBox.title")}
                </h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("packaging.masterBox.sizes")}</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("packaging.masterBox.color")}</span>
                  </li>
                </ul>
              </CorporateCard>

              <CorporateCard className="p-8 border-l-4 border-l-gold">
                <div className="overflow-hidden rounded-t-xl">
                  <img className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105" src={bulkPkgImg} alt="img" />
                </div>
                <br />
                <h4 className="text-white font-bold text-xl mb- flex items-center gap-2">
                  <Layers className="w-5 h-5 text-gold" />
                  {t("packaging.innerBox.title")}
                </h4>
                <ul className="space-y-1">
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("packaging.innerBox.sizes")}</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <span>{t("packaging.innerBox.color")}</span>
                  </li>
                </ul>
              </CorporateCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingSection;
