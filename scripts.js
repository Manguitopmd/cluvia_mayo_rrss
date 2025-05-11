document.addEventListener('DOMContentLoaded', () => {
  // Initialize Swiper
  const swiper = new Swiper('.swiper', {
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 1,
    spaceBetween: 10,
    effect: 'slide',
    speed: 600,
  });

  // Thumbnail Menu Toggle
  const toggleButton = document.querySelector('.thumbnail-menu-toggle');
  const thumbnailMenu = document.querySelector('.thumbnail-menu');
  toggleButton.addEventListener('click', () => {
    thumbnailMenu.classList.toggle('active');
    gsap.to(thumbnailMenu, {
      x: thumbnailMenu.classList.contains('active') ? 0 : '100%',
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  // Thumbnail Navigation
  const thumbnailItems = document.querySelectorAll('.thumbnail-item');
  thumbnailItems.forEach((item) => {
    item.addEventListener('click', () => {
      const slideIndex = parseInt(item.getAttribute('data-slide'));
      swiper.slideTo(slideIndex);
      thumbnailMenu.classList.remove('active');
      gsap.to(thumbnailMenu, { x: '100%', duration: 0.5, ease: 'power2.out' });
    });
  });

  // Chart.js for Pillar Distribution
  const ctx = document.getElementById('pillarChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Inspiración', 'Educación', 'Comunidad', 'Detrás del Lanzamiento', 'Impacto Social'],
      datasets: [{
        data: [30, 25, 20, 15, 10],
        backgroundColor: ['#FF6F61', '#6B7280', '#10B981', '#FBBF24', '#3B82F6'],
        borderColor: ['#fff'],
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 14, family: 'Lato' },
            color: '#191f74',
          },
        },
        tooltip: {
          backgroundColor: '#191f74',
          titleFont: { family: 'Lato' },
          bodyFont: { family: 'Lato' },
        },
      },
    },
  });

  // GSAP Animations for Slide Transitions
  swiper.on('slideChange', () => {
    const activeSlide = document.querySelector('.swiper-slide-active .slide-content');
    gsap.fromTo(activeSlide, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  });

  // Initial Animation
  gsap.from('.swiper-slide-active .slide-content', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
  });
});