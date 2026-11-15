import { useEffect, useState } from "react";

type IconName = "profile" | "bag" | "wishlist";

const categories = ["Men", "Women", "Kids"];
const subcategoryNames = [
  "Casual wear",
  "Indian wear",
  "Formals",
  "Party wear",
  "Footwear",
];

const categoryImages: Record<string, string[]> = {
  Men: [
    "photo-1515886657613-9f3515b0c78f",
    "photo-1610030469983-98e550d6193c",
    "photo-1617137968427-85924c800a22",
    "photo-1618354691373-d851c5c3a990",
    "photo-1542291026-7eec264c27ff",
  ],
  Women: [
    "photo-1483985988355-763728e1935b",
    "photo-1594633312681-425c7b97ccd1",
    "photo-1539109136881-3be0616acf4b",
    "photo-1529139574466-a303027c1d8b",
    "photo-1543163521-1bf539c55dd2",
  ],
  Kids: [
    "photo-1519238263530-99bdd11df2ea",
    "photo-1503919005314-30d93d07d823",
    "photo-1503342217505-b0a15ec3261c",
    "photo-1519238263530-99bdd11df2ea",
    "photo-1514989940723-e8e51635b782",
  ],
};

const shirts = [
  { slug: "soft-stripe-shirt", name: "Soft Stripe Shirt", price: "₹2,490", image: "photo-1483985988355-763728e1935b" },
  { slug: "everyday-white-shirt", name: "Everyday White Shirt", price: "₹2,190", image: "photo-1539109136881-3be0616acf4b" },
  { slug: "weekend-cotton-shirt", name: "Weekend Cotton Shirt", price: "₹2,390", image: "photo-1529139574466-a303027c1d8b" },
  { slug: "relaxed-linen-shirt", name: "Relaxed Linen Shirt", price: "₹2,790", image: "photo-1524504388940-b1c1722653e1" },
  { slug: "classic-blue-shirt", name: "Classic Blue Shirt", price: "₹2,290", image: "photo-1525507119028-ed4c629a60a3" },
  { slug: "easy-day-shirt", name: "Easy Day Shirt", price: "₹1,990", image: "photo-1515886657613-9f3515b0c78f" },
  { slug: "soft-collar-shirt", name: "Soft Collar Shirt", price: "₹2,490", image: "photo-1490481651871-ab68de25d43d" },
  { slug: "relaxed-fit-shirt", name: "Relaxed Fit Shirt", price: "₹2,590", image: "photo-1485968579580-b6d095142e6e" },
  { slug: "sunny-day-shirt", name: "Sunny Day Shirt", price: "₹2,190", image: "photo-1509631179647-0177331693ae" },
  { slug: "daily-cotton-shirt", name: "Daily Cotton Shirt", price: "₹1,890", image: "photo-1503342217505-b0a15ec3261c" },
];

const tryOnViews = [
  { image: "photo-1539109136881-3be0616acf4b", pose: "Front view" },
  { image: "photo-1529139574466-a303027c1d8b", pose: "Three-quarter view" },
  { image: "photo-1524504388940-b1c1722653e1", pose: "Side view" },
  { image: "photo-1515886657613-9f3515b0c78f", pose: "Relaxed pose" },
  { image: "photo-1490481651871-ab68de25d43d", pose: "Back view" },
];

function getCategoryFromPath() {
  const path = window.location.pathname.toLowerCase();
  return categories.find((category) => path.startsWith(`/shop/${category.toLowerCase()}`));
}

function NavigationIcon({ name }: { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    profile: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c.7-3.1 3.2-5 7-5s6.3 1.9 7 5" />
      </>
    ),
    bag: (
      <>
        <path d="M5 8h14l1 12H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    wishlist: <path d="M20.5 8.8c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10A4.3 4.3 0 0 1 12 6.4a4.3 4.3 0 0 1 8.5 2.4Z" />,
  };

  return (
    <svg
      aria-hidden="true"
      className="nav-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function UnsplashImage({ id, alt }: { id: string; alt: string }) {
  return (
    <img
      src={`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=85`}
      alt={alt}
    />
  );
}

function ProductListing() {
  return (
    <section className="product-listing-page">
      <a className="back-link" href="/shop/women">
        <span aria-hidden="true">←</span> Shop Women
      </a>
      <div className="product-listing-heading">
        <p className="eyebrow">Women / Casual wear</p>
        <h1>Casual shirts</h1>
        <p>Easy pieces for every day</p>
      </div>
      <div className="product-grid">
        {shirts.map((shirt) => (
          <a className="product-card" href={`/product/${shirt.slug}`} key={shirt.slug}>
            <div className="product-card-image">
              <UnsplashImage id={shirt.image} alt={`${shirt.name} on a model`} />
            </div>
            <h2>{shirt.name}</h2>
            <p>{shirt.price}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

function TryOnCarousel({ onClose }: { onClose: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeView = tryOnViews[activeIndex];

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        setActiveIndex((index) => (index + 1) % tryOnViews.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((index) => (index - 1 + tryOnViews.length) % tryOnViews.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="try-on-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Virtual try-on preview"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="try-on-lightbox">
        <div className="try-on-header">
          <div>
            <p className="eyebrow">Aakriti virtual try-on</p>
            <h2>See it from every angle</h2>
          </div>
          <button className="lightbox-close" onClick={onClose} aria-label="Close try-on preview">
            ×
          </button>
        </div>
        <div className="try-on-image-wrap">
          <button
            className="carousel-arrow carousel-previous"
            onClick={() => setActiveIndex((index) => (index - 1 + tryOnViews.length) % tryOnViews.length)}
            aria-label="Previous pose"
          >
            ‹
          </button>
          <UnsplashImage
            id={activeView.image}
            alt={`Virtual try-on sample, ${activeView.pose.toLowerCase()}`}
          />
          <button
            className="carousel-arrow carousel-next"
            onClick={() => setActiveIndex((index) => (index + 1) % tryOnViews.length)}
            aria-label="Next pose"
          >
            ›
          </button>
        </div>
        <div className="try-on-footer">
          <span>{activeView.pose}</span>
          <div className="carousel-dots" aria-label="Choose a pose">
            {tryOnViews.map((view, index) => (
              <button
                key={view.pose}
                className={index === activeIndex ? "active" : ""}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${view.pose.toLowerCase()}`}
                aria-current={index === activeIndex ? "step" : undefined}
              />
            ))}
          </div>
          <span>{activeIndex + 1} / {tryOnViews.length}</span>
        </div>
        <p className="try-on-disclaimer">Sample pose preview</p>
      </div>
    </div>
  );
}

function ProductDetails({ slug }: { slug: string }) {
  const [showTryOn, setShowTryOn] = useState(false);
  const shirt = shirts.find((item) => item.slug === slug) ?? shirts[0];

  return (
    <>
      <section className="product-details-page">
        <a className="back-link" href="/shop/women/casual-wear">
          <span aria-hidden="true">←</span> Back to casual shirts
        </a>
        <div className="product-details">
          <div className="product-details-image">
            <UnsplashImage id={shirt.image} alt={`${shirt.name} on a model`} />
          </div>
          <div className="product-details-copy">
            <p className="eyebrow">Women / Casual wear</p>
            <h1>{shirt.name}</h1>
            <p className="product-price">{shirt.price}</p>
            <p className="product-description">
              An easy, everyday shirt with a relaxed fit and a soft, breathable feel.
              Made to be worn your way.
            </p>
            <div className="product-detail-divider" />
            <p className="product-detail-label">Colour</p>
            <p className="product-colour">Soft blue</p>
            <button className="try-on-button" onClick={() => setShowTryOn(true)}>
              Try On <span aria-hidden="true">↗</span>
            </button>
            <p className="try-on-note">Preview this style in five poses</p>
          </div>
        </div>
      </section>
      {showTryOn && <TryOnCarousel onClose={() => setShowTryOn(false)} />}
    </>
  );
}

function App() {
  const selectedCategory = getCategoryFromPath();
  const path = window.location.pathname.toLowerCase();
  const isCasualListing = path === "/shop/women/casual-wear";
  const productSlug = path.startsWith("/product/") ? path.slice("/product/".length) : null;

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Aakriti Studio home">
          A<span>.</span>
        </a>

        <nav className="category-nav" aria-label="Shop by category">
          {categories.map((category) => (
            <a
              aria-current={selectedCategory === category ? "page" : undefined}
              href={`/shop/${category.toLowerCase()}`}
              key={category}
            >
              {category}
            </a>
          ))}
        </nav>

        <nav className="utility-nav" aria-label="Account and shopping">
          <a href="#profile">
            <NavigationIcon name="profile" />
            <span>Profile</span>
          </a>
          <a href="#bag">
            <NavigationIcon name="bag" />
            <span>Bag</span>
          </a>
          <a href="#wishlist">
            <NavigationIcon name="wishlist" />
            <span>Wishlist</span>
          </a>
          <a className="contact-link" href="mailto:hello@aakritistudio.com">
            Contact Us
          </a>
        </nav>
      </header>

      <main id="home">
        {productSlug ? (
          <ProductDetails slug={productSlug} />
        ) : isCasualListing ? (
          <ProductListing />
        ) : selectedCategory ? (
          <section className="subcategory-page" aria-labelledby="subcategory-title">
            <a className="back-link" href="/">
              <span aria-hidden="true">←</span> Back to home
            </a>
            <div className="subcategory-heading">
              <p className="eyebrow">The Aakriti edit</p>
              <h1 id="subcategory-title">Shop {selectedCategory}</h1>
              <p>Explore by category</p>
            </div>
            <div className="subcategory-grid">
              {subcategoryNames.map((subcategory, index) => (
                selectedCategory === "Women" && subcategory === "Casual wear" ? (
                  <a
                    className="subcategory-card"
                    href="/shop/women/casual-wear"
                    key={subcategory}
                  >
                    <img
                      src={`https://images.unsplash.com/${categoryImages[selectedCategory][index]}?auto=format&fit=crop&w=900&q=80`}
                      alt={`${subcategory} for women`}
                      loading="lazy"
                    />
                    <h2>{subcategory}</h2>
                  </a>
                ) : (
                  <article className="subcategory-card" key={subcategory}>
                    <img
                      src={`https://images.unsplash.com/${categoryImages[selectedCategory][index]}?auto=format&fit=crop&w=900&q=80`}
                      alt={`${subcategory} for ${selectedCategory.toLowerCase()}`}
                      loading="lazy"
                    />
                    <h2>{subcategory}</h2>
                  </article>
                )
              ))}
            </div>
          </section>
        ) : (
          <>
            <section className="hero" aria-labelledby="hero-title">
              <div className="hero-image-wrap">
                <img
                  className="hero-image"
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=85"
                  alt="Model wearing a refined neutral-toned outfit"
                />
                <span className="image-caption">A new point of view</span>
              </div>

              <div className="hero-copy">
                <p className="eyebrow">Style, made personal</p>
                <h1 id="hero-title">
                  Aakriti’s
                  <br />
                  Studio
                </h1>
                <p className="hero-description">
                  Discover pieces that feel like you. Find your fit with a more
                  personal way to shop.
                </p>
                <a className="shop-link" href="#collection">
                  Explore the collection <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>

            <section className="collection-note" id="collection">
              <p>Thoughtful style. A better fit.</p>
              <span>Virtual try-on, coming soon</span>
            </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <a className="footer-wordmark" href="/">
          Aakriti’s Studio
        </a>
        <span>© {new Date().getFullYear()} Aakriti’s Studio</span>
        <a href="mailto:hello@aakritistudio.com">Get in touch</a>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Quick links">
        {(["profile", "bag", "wishlist"] as const).map((item) => (
          <a href={`#${item}`} key={item}>
            <NavigationIcon name={item} />
            <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}

export default App;
