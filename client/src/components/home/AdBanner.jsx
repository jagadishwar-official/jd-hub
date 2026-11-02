
import adBanner from "../../assets/banners/jd-hub-mega-sale.png";

function AdBanner() {
  return (
    <section className="mx-auto max-w-[1440px] px-4 py-5 lg:px-6">
      <a href="/products" className="block overflow-hidden rounded-xl">
        <img src={adBanner} alt="JD Hub - Upgrade Your Everyday Life" className="h-auto w-full object-cover transition duration-300 hover:opacity-95" />
      </a>
    </section>
  );
}

export default AdBanner;
