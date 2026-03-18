import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroContent, setHeroContent] = useState(null);
  const [aboutContent, setAboutContent] = useState(null);
  const [faqContent, setFaqContent] = useState(null);
  const [whyCards, setWhyCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [heroRes, aboutRes, faqRes] = await Promise.all([
          api.get("/company-content/hero"),
          api.get("/company-content/about-preview"),
          api.get("/company-content/faq")
        ]);
        setHeroContent(heroRes.data.data);
        setAboutContent(aboutRes.data.data);
        setFaqContent(faqRes.data.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const slides = heroContent?.images?.filter(image => image.includes('imagekit.io')).map((image, index) => ({
    image,
    title: heroContent.title || "Welcome to Biosynvanta",
    subtitle: heroContent.subtitle || "Leading provider of quality medical equipment"
  })) || [];

  useEffect(() => {
    if (!heroContent || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchWhyCards = async () => {
      try {
        const res = await api.get("/company-content/why-cards");
        setWhyCards(res.data.data || res.data);
      } catch (error) {
        console.error("Error fetching why cards:", error);
      }
    };
    fetchWhyCards();
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (slides.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleCardFlip = (cardId) => {
    setFlippedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
          </div>
        ))}
        <div className="relative z-20 h-full flex items-center justify-center text-center px-6">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up text-white drop-shadow-lg">
              {heroContent?.title || "Welcome to Biosynvanta"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up-delay text-white drop-shadow-md">
              {heroContent?.subtitle || "Leading provider of quality medical equipment"}
            </p>
            <Link
              to="/contact"
              className="btn-primary text-lg animate-fade-in-up-delay-2"
            >
              Enquire Now
            </Link>
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 glass text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 glass text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8 shadow-medium'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>
      <section className="py-16" style={{backgroundColor: '#F1F5F9'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h2 className="text-3xl font-bold text-gradient mb-6">About Biosynvanta</h2>
              <p className="text-lg mb-8" style={{color: 'var(--text-secondary)'}}>
                {aboutContent?.content || "Biosynvanta is a leading global provider of high-quality medical, surgical, and laboratory equipment. With over two decades of experience, we deliver innovative healthcare solutions that meet the highest international standards and exceed customer expectations worldwide."}
              </p>
              <Link
                to="/about"
                className="btn-primary"
              >
                Learn More
              </Link>
            </div>
            <div className="order-first md:order-last">
              {aboutContent?.images && aboutContent.images.length > 0 ? (
                <img
                  src={aboutContent.images[0]}
                  alt="About Biosynvanta"
                  className="w-full h-96 object-cover shadow-medium rounded-lg"
                  onError={(e) => {
                    console.error('Failed to load about image:', e.target.src);
                    e.target.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
                  }}
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="About Biosynvanta"
                  className="w-full h-96 object-cover shadow-medium rounded-lg"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      <section className="py-16" style={{backgroundColor: 'rgba(37, 181, 174, 0.2)'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">Product Categories</h2>
            <p className="text-lg" style={{color: 'var(--text-secondary)'}}>Explore our comprehensive range of Healthcare products</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {categories.length > 0 ? (
              categories.map((category) => (
                <div key={category._id} className="card card-accent hover:shadow-lg transition-all duration-300">
                  <div className="h-48" style={{backgroundColor: 'var(--bg-light)'}}>
                    <img
                      src={category.imageURL || "https://images.unsplash.com/photo-1579684451722-219f54b73314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load category image on home page:', e.target.src);
                        console.error('Category imageURL field:', category.imageURL);
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-4" style={{color: 'var(--text-primary)'}}>{category.name}</h3>
                    <Link
                      to={`/products?category=${category.slug || category._id}`}
                      className="btn-primary text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 text-lg">No categories available at the moment.</p>
              </div>
            )}
          </div>
          <div className="text-center">
            <Link
              to="/categories"
              className="btn-secondary"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16" style={{backgroundColor: '#F1F5F9'}}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-4">Why Choose Biosynvanta?</h2>
            <p className="text-lg" style={{color: 'var(--text-secondary)'}}>Your trusted partner in healthcare solutions</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {whyCards.length > 0 ? (
              whyCards.map((card) => (
                <div key={card._id} className="flip-card-container h-80 group">
                  <div 
                    className="flip-card relative w-full h-full transition-transform duration-700 transform-style-preserve-3d group-hover:rotate-y-180"
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {/* Front of card - Image */}
                    <div 
                      className="flip-card-front absolute w-full h-full rounded-2xl shadow-medium overflow-hidden backface-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img 
                        src={card.imageURL || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"}
                        alt={card.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Failed to load card image:', e.target.src);
                          e.target.src = "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80";
                        }}
                      />
                    </div>
                    
                    {/* Back of card - Title and Description */}
                    <div 
                      className="flip-card-back absolute w-full h-full shadow-medium p-6 flex flex-col justify-center backface-hidden rotate-y-180"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <h3 className="text-xl font-bold text-gradient mb-4">{card.title}</h3>
                      <p style={{color: 'var(--text-secondary)'}} className="leading-relaxed">{card.description}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Fallback to FAQ content if whyCards is empty
              faqContent?.faqItems?.map((faq, index) => (
                <div key={index} className="card p-6 border-l-4" style={{borderColor: 'var(--teal)'}}>
                  <h3 className="text-xl font-semibold mb-3" style={{color: 'var(--text-primary)'}}>
                    {faq.question}
                  </h3>
                  <p style={{color: 'var(--text-secondary)'}} className="leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
      <div className="mt-12 text-center py-12" style={{backgroundColor: 'rgba(37, 181, 174, 0.2)'}}>
        <div className="max-w-4xl mx-auto px-6">
          <h3 className="text-3xl font-semibold mb-2 text-gradient">
            Get in Touch
          </h3>
          <p className="mb-4 max-w-2xl mx-auto" style={{color: 'var(--text-secondary)'}}>
            Explore our comprehensive portfolio of high-quality medical, surgical, and laboratory
            consumables engineered for global healthcare excellence.
          </p>
          <p style={{color: 'var(--text-primary)'}} className="font-semibold">
            Contact Us: +91 89765 04666
          </p>
        </div>
      </div>
      <style jsx="true">{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        .animate-fade-in-delay-2 {
          animation: fade-in 1s ease-out 0.6s both;
        }
        
        /* Flip Card Styles */
        .flip-card-container {
          perspective: 1000px;
        }
        
        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.7s;
          transform-style: preserve-3d;
        }
        
        .flip-card.rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .flip-card-front {
          background-color: #ffffff;
        }
        
        .flip-card-back {
          background-color: #ffffff;
          transform: rotateY(180deg);
        }
        
        .hover\:scale-105:hover {
          transform: scale(1.05);
        }
        
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}