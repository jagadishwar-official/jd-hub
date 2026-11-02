import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroMobiles from "../../assets/banners/hero-mobiles.jpg";
import heroGadgets from "../../assets/banners/hero-gadgets.png";
import heroHomeLiving from "../../assets/banners/hero-home-living.png";
import fashionSale from "../../assets/banners/fashion-sale.jpg";
import homeEssentials from "../../assets/banners/home-essentials.jpg";

function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroBanners = [heroMobiles, heroGadgets, heroHomeLiving];

    function previousSlide() { setCurrentSlide((currentSlide - 1 + heroBanners.length) % heroBanners.length); }
    function nextSlide() { setCurrentSlide((currentSlide + 1) % heroBanners.length); }

    useEffect(() => {
        const slideInterval = setInterval(() => { setCurrentSlide((currentSlide) => (currentSlide + 1) % heroBanners.length); }, 5000);
        return () => clearInterval(slideInterval);
    }, [heroBanners.length]);

    return (
        <section className="mx-auto max-w-[1440px] px-4 py-4 lg:px-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <div className="relative overflow-hidden rounded-xl md:col-span-2">
                    <img src={heroBanners[currentSlide]} alt={`JD Hub promotional banner ${currentSlide + 1}`} className="h-48 w-full object-cover sm:h-60 lg:h-[280px]" />
                    <button type="button" onClick={previousSlide} aria-label="Previous banner" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-blue-700 shadow hover:bg-yellow-400"><ChevronLeft size={22} /></button>
                    <button type="button" onClick={nextSlide} aria-label="Next banner" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 text-blue-700 shadow hover:bg-yellow-400"><ChevronRight size={22} /></button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
                        {heroBanners.map((banner, index) => <button key={banner} type="button" onClick={() => setCurrentSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-current={currentSlide === index ? "true" : undefined} className={`h-2.5 w-2.5 rounded-full ${currentSlide === index ? "bg-blue-600" : "bg-white/70"}`} />)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
                    <a href="/products?category=Fashion" className="overflow-hidden rounded-xl"><img src={fashionSale} alt="Fashion sale" className="h-full min-h-24 w-full object-cover md:h-[134px]" /></a>
                    <a href="/products?category=Home%20%26%20Living" className="overflow-hidden rounded-xl"><img src={homeEssentials} alt="Home essentials" className="h-full min-h-24 w-full object-cover md:h-[134px]" /></a>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
