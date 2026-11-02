function Footer() {
  const linkStyle = "block text-sm text-slate-700 hover:text-yellow-500"

  const payments = [
    { name: "Visa", image: "https://img.icons8.com/color/48/visa.png" },
    { name: "Mastercard", image: "https://img.icons8.com/color/48/mastercard.png" },
    { name: "PayPal", image: "https://img.icons8.com/color/48/paypal.png" },
    { name: "Google Pay", image: "https://img.icons8.com/color/48/google-pay.png" },
  ]

  return (
    <footer className="mt-12 bg-white text-black">
      <div className="mx-auto max-w-[1440px] px-6 pt-8 lg:px-10">
        <div className="flex flex-col gap-6 rounded-2xl bg-blue-50 p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-100">
              <img src="https://img.icons8.com/fluency/96/new-post.png" alt="Newsletter" className="h-10 w-10 object-contain" />
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold text-blue-700">Stay Updated</p>
              <h2 className="text-2xl font-bold text-blue-950 md:text-3xl">Get Exclusive Offers & Deals</h2>
              <p className="mt-2 text-sm text-slate-600">Subscribe to our newsletter and never miss a deal.</p>
            </div>
          </div>
          <form onSubmit={(e) => e.preventDefault()} className="flex w-full flex-col gap-3 sm:flex-row md:max-w-xl">
            <input type="email" required placeholder="Enter your email address" className="min-w-0 flex-1 rounded-full border border-slate-200 bg-white px-5 py-4 text-sm outline-none focus:border-yellow-400" />
            <button type="submit" className="rounded-full bg-yellow-400 px-7 py-4 font-semibold text-black hover:bg-yellow-300">Subscribe →</button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div>
            <a href="/" className="mb-5 flex w-fit items-center">
              <img src="/images/jd-hub-logo.png" alt="JD Hub Logo" className="h-20 w-48 object-contain object-left" />
            </a>
            <p className="max-w-xs text-sm leading-7 text-slate-700">Your one-stop destination for quality products at great prices.</p>
            <div className="mt-6 flex gap-3">
              <a href="https://www.facebook.com/" aria-label="Facebook"><img src="https://img.icons8.com/color/48/facebook-new.png" alt="" className="h-10 w-10" /></a>
              <a href="https://www.instagram.com/" aria-label="Instagram"><img src="https://img.icons8.com/color/48/instagram-new.png" alt="" className="h-10 w-10" /></a>
              <a href="https://www.youtube.com/" aria-label="YouTube"><img src="https://img.icons8.com/color/48/youtube-play.png" alt="" className="h-10 w-10" /></a>
              <a href="https://www.x.com/" aria-label="X"><img src="https://img.icons8.com/ios-filled/50/twitterx--v1.png" alt="" className="h-9 w-9" /></a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-bold">Shop</h3>
            <div className="space-y-4">
              <a href="/products" className={linkStyle}>All Products</a>
              <a href="/categories" className={linkStyle}>Categories</a>
              <a href="/products?sort=latest" className={linkStyle}>Latest Arrivals</a>
              <a href="/products?sort=deals" className={linkStyle}>Best Deals</a>
              <a href="/products?featured=true" className={linkStyle}>Featured Products</a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-bold">Customer Support</h3>
            <div className="space-y-4">
              <a href="/contact" className={linkStyle}>Contact Us</a>
              <a href="/faqs" className={linkStyle}>FAQs</a>
              <a href="/shipping" className={linkStyle}>Shipping Policy</a>
              <a href="/returns" className={linkStyle}>Returns & Refunds</a>
              <a href="/orders" className={linkStyle}>Order Tracking</a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-bold">About</h3>
            <div className="space-y-4">
              <a href="/about" className={linkStyle}>Our Story</a>
              <a href="/why-choose-us" className={linkStyle}>Why Choose Us</a>
              <a href="/careers" className={linkStyle}>Careers</a>
              <a href="/terms" className={linkStyle}>Terms & Conditions</a>
              <a href="/privacy" className={linkStyle}>Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-950">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="text-sm text-white">© {new Date().getFullYear()} JD Hub. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
            {payments.map((payment) => (
              <div key={payment.name} className="flex items-center gap-2">
                <img src={payment.image} alt={payment.name} title={payment.name} className="h-8 w-10 object-contain" onError={(e) => { e.currentTarget.style.display = "none" }} />
                <span className="text-xs text-white">{payment.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer