/**
 * Swiper Manager for Shopify Theme Editor
 * 
 * This class handles Swiper initialization and reinitialization during theme editing.
 * It solves the issue where Swipers break in the Shopify theme editor when sections
 * are being customized, by listening to Shopify's theme editor events and properly
 * reinitializing all Swiper instances.
 * 
 * Features:
 * - Automatic detection of theme editor mode
 * - Proper cleanup and reinitialization of Swiper instances
 * - Support for all Swiper types used in the theme
 * - Event listeners for section load/unload/select events
 * 
 * Usage:
 * This manager is automatically initialized when the DOM is loaded.
 * No manual intervention required - it handles everything automatically.
 */

class SwiperManager {
  constructor() {
    this.swiperInstances = new Map();
    this.isThemeEditor = window.Shopify && window.Shopify.designMode;
    this.init();
  }

  init() {
    // Initialize all swipers on page load
    this.initializeAllSwipers();
    
    // Listen for theme editor events if in design mode
    if (this.isThemeEditor) {
      this.setupThemeEditorListeners();
    }
  }

  setupThemeEditorListeners() {
    // Listen for section reloads in theme editor
    document.addEventListener('shopify:section:load', (event) => {
      setTimeout(() => {
        this.reinitializeSwipers(event.target);
      }, 100);
    });

    // Listen for section unloads
    document.addEventListener('shopify:section:unload', (event) => {
      this.destroySwipers(event.target);
    });

    // Listen for section selects (when user clicks on a section in editor)
    document.addEventListener('shopify:section:select', (event) => {
      setTimeout(() => {
        this.reinitializeSwipers(event.target);
      }, 100);
    });

    // Listen for block selects
    document.addEventListener('shopify:block:select', (event) => {
      setTimeout(() => {
        this.reinitializeSwipers(event.target);
      }, 100);
    });
  }

  initializeAllSwipers() {
    // Destroy existing instances first
    this.destroyAllSwipers();

    // Initialize all swiper types
    this.initTopBarSlider();
    this.initHeroSlider();
    this.initCategorySlider();
    this.initCollectionTabSlide();
    this.initCardSlider();
    this.initCardSlider2();
    this.initRelatedProductSlider();
    this.initSideCartSlider();
    this.initProductSliders();
  }

  reinitializeSwipers(container = document) {
    // Find and reinitialize swipers within the container
    const swiperElements = container.querySelectorAll('.swiper');
    
    swiperElements.forEach(element => {
      const existingInstance = this.swiperInstances.get(element);
      if (existingInstance) {
        existingInstance.destroy(true, true);
        this.swiperInstances.delete(element);
      }
    });

    // Reinitialize based on container content
    setTimeout(() => {
      this.initializeAllSwipers();
    }, 50);
  }

  destroySwipers(container) {
    const swiperElements = container.querySelectorAll('.swiper');
    
    swiperElements.forEach(element => {
      const instance = this.swiperInstances.get(element);
      if (instance) {
        instance.destroy(true, true);
        this.swiperInstances.delete(element);
      }
    });
  }

  destroyAllSwipers() {
    this.swiperInstances.forEach((instance) => {
      instance.destroy(true, true);
    });
    this.swiperInstances.clear();
  }

  createSwiper(selector, options) {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      if (element && !this.swiperInstances.has(element)) {
        try {
          const instance = new Swiper(element, options);
          this.swiperInstances.set(element, instance);
        } catch (error) {
          console.warn(`Failed to initialize Swiper for ${selector}:`, error);
        }
      }
    });
  }

  // Individual swiper initializers
  initTopBarSlider() {
    this.createSwiper(".top-bar-slider", {
      slidesPerView: 1,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  }

  initHeroSlider() {
    this.createSwiper(".hero-slider", {
      slidesPerView: 1,
      grabCursor: true,
      loop: true,
      speed: 1000,
      effect: "fade",
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".hero-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".hero-button-next",
        prevEl: ".hero-button-prev",
      },
    });
  }

  initCategorySlider() {
    this.createSwiper(".category-slider", {
      slidesPerView: 6,
      spaceBetween: 24,
      grabCursor: true,
      loop: false,
      navigation: {
        nextEl: ".category-slider-button-next",
        prevEl: ".category-slider-button-prev",
      },
      breakpoints: {
        1: {
          spaceBetween: 10,
          slidesPerView: 2.7,
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 3.7,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        993: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
        1201: {
          spaceBetween: 24,
          slidesPerView: 6,
        },
      },
    });
  }

  initCollectionTabSlide() {
    this.createSwiper(".collection-tab-slide", {
      slidesPerView: 4,
      spaceBetween: 20,
      grabCursor: true,
      loop: false,
      navigation: {
        nextEl: ".collection-tab-slide-button-next",
        prevEl: ".collection-tab-slide-button-prev",
      },
      breakpoints: {
        1: {
          spaceBetween: 10,
          slidesPerView: 1.7,
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 2.3,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3.2,
        },
        993: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
    });
  }

  initCardSlider() {
    this.createSwiper(".card-slider", {
      slidesPerView: 4,
      spaceBetween: 20,
      grabCursor: true,
      loop: false,
      navigation: {
        nextEl: ".card-slider-button-next",
        prevEl: ".card-slider-button-prev",
      },
      breakpoints: {
        1: {
          spaceBetween: 10,
          slidesPerView: 1.7,
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 2.3,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3.2,
        },
        993: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
    });
  }

  initCardSlider2() {
    this.createSwiper(".card-slider2", {
      slidesPerView: 3,
      spaceBetween: 20,
      grabCursor: true,
      loop: false,
      navigation: {
        nextEl: ".card-slider2-button-next",
        prevEl: ".card-slider2-button-prev",
      },
      breakpoints: {
        1: {
          spaceBetween: 10,
          slidesPerView: 1.7,
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 2.3,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3.2,
        },
        993: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
      },
    });
  }

  initRelatedProductSlider() {
    this.createSwiper(".related-product-slider", {
      slidesPerView: 4,
      spaceBetween: 20,
      grabCursor: true,
      loop: false,
      navigation: {
        nextEl: ".related-product-slider-btn-next",
        prevEl: ".related-product-slider-btn-prev",
      },
      breakpoints: {
        1: {
          spaceBetween: 10,
          slidesPerView: 1.7,
        },
        576: {
          spaceBetween: 20,
          slidesPerView: 2.3,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 3.2,
        },
        993: {
          spaceBetween: 20,
          slidesPerView: 4,
        },
      },
    });
  }

  initSideCartSlider() {
    this.createSwiper(".side-cart-slider", {
      slidesPerView: 2.2,
      spaceBetween: 10,
      grabCursor: true,
      loop: false,
      speed: 1000,
    });
  }

  initProductSliders() {
    // Product slider thumb
    this.createSwiper(".product-slider-thumb", {
      direction: "vertical",
      loop: true,
      spaceBetween: 20,
      slidesPerView: 5,
      freeMode: true,
      mousewheel: true,
      breakpoints: {
        1: {
          direction: "horizontal",
          spaceBetween: 10,
          slidesPerView: 4,
        },
        576: {
          direction: "horizontal",
          spaceBetween: 20,
          slidesPerView: 5,
        },
        768: {
          direction: "vertical",
          spaceBetween: 20,
          slidesPerView: 5,
        },
        993: {
          direction: "vertical",
        },
      },
    });

    // Product slider main
    setTimeout(() => {
      const thumbSliders = document.querySelectorAll(".product-slider-thumb");
      
      thumbSliders.forEach(thumbElement => {
        const thumbInstance = this.swiperInstances.get(thumbElement);
        const mainElement = thumbElement.parentElement?.querySelector(".product-slider");
        
        if (mainElement && thumbInstance && !this.swiperInstances.has(mainElement)) {
          try {
            const mainInstance = new Swiper(mainElement, {
              loop: true,
              autoHeight: true,
              spaceBetween: 10,
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
              thumbs: {
                swiper: thumbInstance,
              },
            });
            this.swiperInstances.set(mainElement, mainInstance);
          } catch (error) {
            console.warn("Failed to initialize product main slider:", error);
          }
        }
      });
    }, 100);
  }
}

// Initialize the Swiper Manager
document.addEventListener('DOMContentLoaded', function() {
  window.swiperManager = new SwiperManager();
});

// Export for global access
window.SwiperManager = SwiperManager;