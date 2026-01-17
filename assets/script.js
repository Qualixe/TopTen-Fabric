$(document).ready(function () {
  "use strict";
  // navbar js start ---
  $(window).on("load scroll", function () {
    var scrolling = $(this).scrollTop();
    if (scrolling > 10) {
      $(".navbar").addClass("nav-fixed");
    } else {
      $(".navbar").removeClass("nav-fixed");
    }
  });

  $(".ham-menu").click(function (event) {
    event.stopPropagation();
    $(".sidebar-wrapper").toggleClass("active");
    $(".ham-menu").toggleClass("active");
    $(".sidebar-wrapper-inner").toggleClass("active");
    $("body").toggleClass("active");
  });

  $(".mobile-menu-close-window-btn").click(function (event) {
    event.stopPropagation();
    $(".sidebar-wrapper").toggleClass("active");
    $(".ham-menu").toggleClass("active");
    $(".sidebar-wrapper-inner").toggleClass("active");
    $("body").toggleClass("active");
  });

  // **..mobile-dropdown-accordion js start..**
  $(".sidebar-dropdown-sub-menu").slideUp();
  $(".sidebar-dropdown-btn").on("click", function () {
    $(this).next(".sidebar-dropdown-sub-menu").slideToggle();
    $(this).toggleClass("active");
  });

  $(".sidebar-submenu-open").on("click", function () {
    $(this).next(".megamenu-wrapper").addClass("active");
  });

  $(".sidebar-close-btn").on("click", function () {
    $(this).parent().parent().parent(".megamenu-wrapper").removeClass("active");
  });
  // **..mobile-dropdown-accordion js end..**

  $(".search-bar-open-btn").click(function (event) {
    event.stopPropagation();
    $(".search-bar").toggleClass("active");
    $(".search-bar-window-close-btn").toggleClass("active");
    $("body").toggleClass("active");
  });

  $(".search-bar-window-close-btn").click(function (event) {
    event.stopPropagation();
    $(".search-bar").toggleClass("active");
    $(this).toggleClass("active");
    $("body").toggleClass("active");
  });

  $(".search-close-btn").click(function (event) {
    event.stopPropagation();
    $(".search-bar").toggleClass("active");
    $(".search-bar-window-close-btn").toggleClass("active");
    $("body").toggleClass("active");
  });

  // navbar js end ---

  // cart-sidebar js start---
  $(".side-cart-btn").click(function (event) {
    event.stopPropagation();
    $(".cart-sidebar").addClass("active");
    $(".cart-sidebar-box").addClass("active");
    $("body").addClass("active");
  });

  $(".cart-sidebar-close-window-btn").click(function (event) {
    event.stopPropagation();
    $(".cart-sidebar").removeClass("active");
    $(".cart-sidebar-box").removeClass("active");
    $("body").removeClass("active");
  });

  $(".side-cart-close-btn").click(function (event) {
    event.stopPropagation();
    $(".cart-sidebar").removeClass("active");
    $(".cart-sidebar-box").removeClass("active");
    $("body").removeClass("active");
  });
  // cart-sidebar js end---

  // collection filter sidebar js start--
  $(".filter-open-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-filter").addClass("active");
    $("body").addClass("active");
  });

  $(".filter-window-close-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-filter").removeClass("active");
    $("body").removeClass("active");
  });

  $(".filter-close-btn").click(function (event) {
    event.stopPropagation();
    $(".collection-filter").removeClass("active");
    $("body").removeClass("active");
  });
  // collection filter sidebar js end--

  // **..collection filter-accordion js start..**
  $(".accordion-toggle-btn").on("click", function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass("active");
  });
  // **..collection filter-accordion js end..**

  // size-chart-sidebar js start---
  $(".size-sidebar-btn").click(function (event) {
    event.stopPropagation();
    $(".size-chart-sidebar").addClass("active");
    $(".size-chart-sidebar-inner").addClass("active");
    $("body").addClass("active");
  });

  $(".size-chart-sidebar-close-window-btn").click(function (event) {
    event.stopPropagation();
    $(".size-chart-sidebar").removeClass("active");
    $(".size-chart-sidebar-inner").removeClass("active");
    $("body").removeClass("active");
  });

  $(".size-chart-close-btn").click(function (event) {
    event.stopPropagation();
    $(".size-chart-sidebar").removeClass("active");
    $(".size-chart-sidebar-inner").removeClass("active");
    $("body").removeClass("active");
  });
  // size-chart-sidebar js end---

  // **..product-accordion js start..**
  $(".product-accordion-toggle-btn").on("click", function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active")
      .find(".product-accordion-item-content")
      .slideUp();
  });
  // **..product-accordion js end..**

  // **..faq-accordion js start..**
  $(".faq-accordion-toggle-btn").on("click", function () {
    $(this).next().slideToggle();
    $(this).parent().toggleClass("active");
    $(this)
      .parent()
      .siblings()
      .removeClass("active")
      .find(".faq-accordion-item-content")
      .slideUp();
  });
  // **..faq-accordion js end..**
});

// btn js ---
// primary btn---
$(function () {
  $(".primary-btn")
    .on("mouseenter", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    })
    .on("mouseout", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    });
});

// secondary btn--
$(function () {
  $(".secondary-btn")
    .on("mouseenter", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    })
    .on("mouseout", function (e) {
      var parentOffset = $(this).offset(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      $(this).find("span").css({
        top: relY,
        left: relX,
      });
    });
});
// btn js ---

// hero slider js start--
var swiper = new Swiper(".hero-slider", {
  slidesPerView: 1,
  grabCursor: true,
  loop: true,
  speed: 1000,
  effect: "fade",
  autoplay: {
    delay: 3000,
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
// hero slider js end--

// category js start--
var swiper = new Swiper(".category-slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  grabCursor: true,
  loop: false,
  navigation: {
    nextEl: ".category-slider-button-next",
    prevEl: ".category-slider-button-prev",
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
    1361: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});
// category js end--

// card-slider js start--
var swiper = new Swiper(".card-slider", {
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
    1361: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});
// card-slider js end--

// gift-card-slider js start--
var swiper = new Swiper(".gift-card-slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  grabCursor: true,
  loop: false,
  navigation: {
    nextEl: ".gift-card-slider-button-next",
    prevEl: ".gift-card-slider-button-prev",
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
    1361: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});
// gift-card-slider js end--

// product-slider js start---
var swiper = new Swiper(".product-slider-thumb", {
  direction: "vertical",
  loop: true,
  spaceBetween: 20,
  slidesPerView: 5,
  freeMode: true,
  mousewheel: true,
  breakpoints: {
    // when window width is >= 320px
    1: {
      direction: "horizontal",
      spaceBetween: 10,
      slidesPerView: 4,
    },
    // when window width is >= 576px
    576: {
      direction: "horizontal",
      spaceBetween: 20,
      slidesPerView: 5,
    },
    // when window width is >= 767px
    768: {
      direction: "vertical",
      spaceBetween: 20,
      slidesPerView: 5,
    },
    // when window width is >= 767px
    993: {
      direction: "vertical",
    },
  },
});
var swiper2 = new Swiper(".product-slider", {
  loop: true,
  // autoHeight: true,
  spaceBetween: 10,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".product-slider-pagination",
    clickable: true,
  },
  thumbs: {
    swiper: swiper,
  },
});
// product-slider js end---

// related-product-slider js start--
var swiper = new Swiper(".related-product-slider", {
  slidesPerView: 4,
  spaceBetween: 20,
  grabCursor: true,
  loop: false,
  navigation: {
    nextEl: ".related-product-slider-btn-next",
    prevEl: ".related-product-slider-btn-prev",
  },
  breakpoints: {
    // when window width is >= 1px
    1: {
      spaceBetween: 10,
      slidesPerView: 1.7,
    },
    // when window width is >= 430px
    576: {
      spaceBetween: 20,
      slidesPerView: 2.3,
    },
    // when window width is >= 767px
    768: {
      spaceBetween: 20,
      slidesPerView: 3.2,
    },
    // when window width is >= 767px
    993: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  },
});
// related-product-slider js end--

// side-cart-slider js start--
var swiper = new Swiper(".side-cart-slider", {
  slidesPerView: 2.2,
  spaceBetween: 10,
  grabCursor: true,
  loop: false,
  speed: 1000,
});
// side-cart-slider js end--

// progesss-bar js start--
// const progress = document.querySelector(".progress");
// progress.addEventListener("input", function () {
//   const value = this.value;
//   this.style.background = `linear-gradient(to right,rgb(133 168 104) 0%,rgb(133 168 104) ${value}%,rgb(216, 216, 216) ${value}%)`;
// });
// progesss-bar js end--


$(document).ready(function () {

  $('.select_sort').on('change', function () {
    applyFilters();

  });

});


function applyFilters() {

  var sort = $('.select_sort option:selected').val();
  var coll = $('.collection_name').val();

  if (coll === 'products') {
    coll = 'all';
  }

  var query = [];

  // checkbox filters
  var option_name = $('.filter-item-checkbox:checked')
    .map(function () {
      return $(this).data('option') + '=' + $(this).val();
    })
    .get();

  if (option_name.length) {
    query.push(option_name.join('&'));
  }

  // price filters
  var minPrice = $('.price-min').val();
  var maxPrice = $('.price-max').val();

  if (minPrice) {
    query.push('filter.v.price.gte=' + minPrice);
  }

  if (maxPrice) {
    query.push('filter.v.price.lte=' + maxPrice);
  }

  // sorting
  if (sort) {
    query.push('sort_by=' + sort);
  }

  var baseUrl = '/collections/' + coll;
  var finalUrl = baseUrl + (query.length ? '?' + query.join('&') : '');

  window.history.pushState({}, '', finalUrl);
  filter_update(finalUrl);
}


$(document).on('click', '.price-filter-btn', function () {
  applyFilters();
});

$(document).on('keyup', '.price-min, .price-max', function (e) {

  applyFilters();

});
$(document).on('change', '.price-min, .price-max', function (e) {

  applyFilters();
});



function filterCheck() {
  applyFilters();
  $('.added_filter').text($('.filter-item-checkbox:checked').length);
}


function filter_update(url) {
  fetch(url)
    .then(response => response.text())
    .then(infoData => {
      var productsSection = $(infoData).find('.collection-product-wrap');
      $('.collection-product-wrap').replaceWith(productsSection);
    });
}


function filterActive(e, el) {
  $(el).next().slideToggle();
  $(el).toggleClass('inactive');
}


$(".quantity-increase").click(function () {
  // $("#quantity").val(parseInt($(".quantity-total").val()) + 1);
  $(".quantity-total, #variant_qty").val(parseInt($(".quantity-total").val()) + 1);

});

$(".quantity-decrease").click(function () {
  var currentValue = parseInt($(".quantity-total").val());
  if (currentValue > 1) {
    $(".quantity-total, #variant_qty").val(currentValue - 1);
    // $("#quantity").val(currentValue - 1);

    console.log('qty updated');
  }
});



// ajax search js start--
$(function () {
  const $input = $('#ajax-search-input');
  const $box = $('.search-results-box');
  const $results = $('.search-results');
  const $loading = $('.search-loading');
  const $viewAll = $('.search-view-all');

  let debounce;

  $('.search-close-btn, .search-bar-window-close-btn').on('click', function () {
    $box.removeClass('active');
    $input.val('');
  });

  $input.on('input', function () {
    clearTimeout(debounce);

    debounce = setTimeout(() => {
      const query = $.trim($input.val());

      if (query.length < 2) {
        $box.removeClass('active');
        return;
      }

      $box.addClass('active');
      $loading.show();
      $results.empty();

      $.getJSON('/search/suggest.json', {
        q: query,
        'resources[type]': 'product',
        'resources[limit]': 6,
      }).done((data) => {
        $loading.hide();

        const products = data?.resources?.results?.products || [];

        if (!products.length) {
          $results.html('<p style="padding:12px">No products found</p>');
          $viewAll.hide();
          return;
        }

        $results.html(
          products
            .map(
              (p) => `
          <a href="${p.url}" class="search-result-item">
            <div class="search-result-image">
              ${p.featured_image?.url ? `<img src="${p.featured_image.url}&width=80">` : ''}
            </div>
            <div>
              <p class="search-result-title">${highlight(p.title, query)}</p>
              <div class="search-result-price">${formatMoney(p.price_min)}</div>
            </div>
          </a>
        `
            )
            .join('')
        );

        $viewAll.attr('href', `/search?q=${encodeURIComponent(query)}&type=product`).show();
      });
    }, 300);
  });

  function highlight(text, query) {
    const r = new RegExp(`(${query})`, 'gi');
    return text.replace(r, '<mark>$1</mark>');
  }

  function formatMoney(cents) {
    return Shopify?.formatMoney ? Shopify.formatMoney(cents) : (cents / 100).toFixed(2);
  }
});