/**
 * File: script.js
 * Deskripsi: Skrip utama untuk fungsionalitas interaktif situs TechCorp.
 *
 * === DAFTAR ISI ===
 * 1. Fungsionalitas Menu Mobile (Hamburger)
 * 2. Animasi Saat Scroll (Intersection Observer)
 * 3. Fungsionalitas Form Kontak & Modal
 * 4. Menu Dropdown (Klik) - Sistem Data-Atribut
 * 5. Menu Dropdown (Hover) - Header Atas
 * 6. Efek & Interaksi Tambahan (Header Scroll, Card Hover)
 * 7. Inisialisasi Slider 3D (SwiperJS)
 */

// Menjalankan semua skrip setelah seluruh konten halaman (DOM) dimuat.
// Ini adalah praktik terbaik untuk mencegah error karena elemen belum ada.
document.addEventListener("DOMContentLoaded", function () {
  /* =================================================================
     1. Fungsionalitas Menu Mobile (Hamburger)
     ================================================================= */
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
      mobileMenuBtn.classList.toggle("active");
    });

    // Tutup menu jika tautan di dalam menu diklik
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
      });
    });

    // Tutup menu jika area di luar menu (overlay) diklik
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
      }
    });
  }

  /* =================================================================
     2. Animasi Saat Scroll (Fade, Slide, Scale)
     ================================================================= */
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right, .scale-in")
    .forEach((el) => {
      observer.observe(el);
    });

  /* =================================================================
     3. Fungsionalitas Form Kontak & Modal
     ================================================================= */
  const contactForm = document.getElementById("contactForm");
  const successModal = document.getElementById("successModal");
  const loadingOverlay = document.getElementById("loadingOverlay");
  const sendWhatsAppBtn = document.getElementById("sendWhatsAppBtn");

  // Fungsi untuk menutup modal (dijadikan global)
  window.closeModal = function () {
    if (successModal) {
      successModal.classList.add("hidden");
    }
  };

  if (contactForm && loadingOverlay && successModal) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      loadingOverlay.classList.remove("hidden");

      const formData = {
        name: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value,
      };

      // Simulasi pengiriman form
      setTimeout(() => {
        loadingOverlay.classList.add("hidden");
        document.getElementById("modalName").textContent = formData.name;
        document.getElementById("modalEmail").textContent = formData.email;
        document.getElementById("modalSubject").textContent = formData.subject;
        document.getElementById("modalMessage").textContent = formData.message;
        successModal.classList.remove("hidden");
        contactForm.reset();
      }, 2000);
    });
  }

  // Event listener untuk tombol kirim WhatsApp
  if (sendWhatsAppBtn) {
    sendWhatsAppBtn.addEventListener("click", function () {
      const message = "Halo, saya ingin menghubungi Anda melalui WhatsApp.";
      const phoneNumber = "+6285257752793";
      const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(url, "_blank");
      setTimeout(window.closeModal, 3000);
    });
  }

  // Event listener untuk menutup modal saat mengklik di luar area modal
  if (successModal) {
    successModal.addEventListener("click", function (e) {
      if (e.target === this) {
        window.closeModal();
      }
    });
  }

  /* =================================================================
     4. Menu Dropdown (Klik) - Sistem Data-Atribut
     (Sebelumnya ada di dalam listener DOMContentLoaded yang ter-nesting)
     ================================================================= */
  const dropdownContainers = document.querySelectorAll(
    "[data-dropdown-container]"
  );

  dropdownContainers.forEach((container) => {
    const dropdownBtn = container.querySelector("[data-dropdown-toggle]");
    const dropdownMenu = container.querySelector("[data-dropdown-menu]");
    const dropdownLinks = dropdownMenu.querySelectorAll("a");
    const arrowIcon = dropdownBtn.querySelector("svg");

    // Fungsi untuk menampilkan menu
    function showDropdown() {
      dropdownMenu.classList.remove("hidden", "opacity-0");
      dropdownMenu.classList.add("opacity-100");
      dropdownBtn.setAttribute("aria-expanded", "true");
      arrowIcon.classList.add("rotate-180");
    }

    // Fungsi untuk menyembunyikan menu
    function hideDropdown() {
      dropdownMenu.classList.add("hidden", "opacity-0");
      dropdownMenu.classList.remove("opacity-100");
      dropdownBtn.setAttribute("aria-expanded", "false");
      arrowIcon.classList.remove("rotate-180");
    }

    // Toggle dropdown saat tombol disentuh atau diklik
    dropdownBtn.addEventListener("click", (event) => {
      event.preventDefault(); // Mencegah perilaku default tautan
      event.stopPropagation(); // Menghentikan event dari menyebar ke dokumen
      if (dropdownMenu.classList.contains("hidden")) {
        // Sembunyikan semua dropdown lain sebelum menampilkan yang ini
        document.querySelectorAll("[data-dropdown-menu]").forEach((menu) => {
          if (menu !== dropdownMenu && !menu.classList.contains("hidden")) {
            menu.classList.add("hidden", "opacity-0");
            menu.classList.remove("opacity-100");
            menu.previousElementSibling.setAttribute("aria-expanded", "false");
            menu.previousElementSibling
              .querySelector("svg")
              .classList.remove("rotate-180");
          }
        });
        showDropdown();
      } else {
        hideDropdown();
      }
    });

    // Menyembunyikan dropdown ketika tautan di dalam menu dipilih
    dropdownLinks.forEach((link) => {
      link.addEventListener("click", () => {
        hideDropdown();
      });
    });

    // Menyembunyikan dropdown saat pengguna mengklik di luar area menu
    document.addEventListener("click", (event) => {
      if (!container.contains(event.target)) {
        hideDropdown();
      }
    });
  });

  /* =================================================================
     5. Menu Dropdown (Hover) - Header Atas
     (Sebelumnya ada di akhir file, di luar listener)
     ================================================================= */
  const dropdownContainer = document.getElementById("dropdownContainer");
  const dropdownButton = document.getElementById("dropdownButton");
  const dropdownMenu = document.querySelector(
    "#dropdownContainer .dropdown-menu"
  );
  const dropdownArrow = document.getElementById("dropdownArrow");

  if (dropdownContainer && dropdownButton && dropdownMenu && dropdownArrow) {
    // Tampilkan menu saat tombol atau menu disentuh
    dropdownContainer.addEventListener("mouseenter", () => {
      dropdownMenu.classList.add("show");
      dropdownArrow.classList.add("rotate-180");
    });

    // Sembunyikan menu saat kursor keluar dari container
    dropdownContainer.addEventListener("mouseleave", () => {
      setTimeout(() => {
        // Periksa apakah kursor benar-benar di luar
        if (!dropdownContainer.matches(":hover")) {
          dropdownMenu.classList.remove("show");
          dropdownArrow.classList.remove("rotate-180");
        }
      }, 100);
    });
  }

  // Fungsi untuk kotak pesan kustom (pengganti alert)
  // Dibuat global (window.) agar bisa dipanggil dari atribut onclick di HTML
  function showMessageBox(message) {
    const messageBox = document.getElementById("messageBox");
    const messageText = document.getElementById("messageText");
    if (messageBox && messageText) {
      messageText.textContent = `Anda telah memilih: ${message}`;
      messageBox.classList.remove("hidden");
    }
  }

  // Fungsi yang dipanggil saat memilih opsi
  // Dibuat global (window.)
  window.selectOption = function (option) {
    showMessageBox(option);
    if (dropdownMenu) {
      dropdownMenu.classList.remove("show");
    }
    if (dropdownArrow) {
      dropdownArrow.classList.remove("rotate-180");
    }
  };

  // Dibuat global (window.)
  window.closeMessageBox = function () {
    const messageBox = document.getElementById("messageBox");
    if (messageBox) {
      messageBox.classList.add("hidden");
    }
  };

  /* =================================================================
     6. Efek & Interaksi Tambahan
     ================================================================= */
  // Efek latar belakang header saat di-scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("bg-opacity-95");
      } else {
        header.classList.remove("bg-opacity-95");
      }
    }
  });

  // Efek hover pada kartu
  document.querySelectorAll(".card-hover").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });
    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  /* =================================================================
     7. Inisialisasi Slider 3D (SwiperJS)
     ================================================================= */
  // Pastikan library SwiperJS sudah dimuat sebelum ini dijalankan
  if (typeof Swiper !== "undefined") {
    var swiper = new Swiper(".mySwiper", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } else {
    console.error(
      "SwiperJS library not found. Please make sure it is included in your HTML."
    );
  }
});
