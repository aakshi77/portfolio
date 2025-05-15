document.addEventListener("DOMContentLoaded", () => {
    // Custom cursor
    const cursor = document.querySelector(".cursor")
    const cursorFollower = document.querySelector(".cursor-follower")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      setTimeout(() => {
        cursorFollower.style.left = e.clientX + "px"
        cursorFollower.style.top = e.clientY + "px"
      }, 100)
    })
  
    document.addEventListener("mousedown", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(0.7)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(0.7)"
    })
  
    document.addEventListener("mouseup", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)"
    })
  
    // Hover effect for links and buttons
    const links = document.querySelectorAll("a, button, .menu-toggle")
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1.5)"
        cursor.style.backgroundColor = "transparent"
        cursor.style.border = "1px solid var(--primary-color)"
        cursorFollower.style.width = "40px"
        cursorFollower.style.height = "40px"
      })
  
      link.addEventListener("mouseleave", () => {
        cursor.style.transform = "translate(-50%, -50%) scale(1)"
        cursor.style.backgroundColor = "var(--primary-color)"
        cursor.style.border = "none"
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
      })
    })
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinksMobile = document.querySelector(".nav-links") // Renamed navLinks to avoid redeclaration
  
    if (menuToggle) {
      menuToggle.addEventListener("click", function () {
        this.classList.toggle("active")
        navLinksMobile.classList.toggle("active")
      })
    }
  
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll(".nav-link")
    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        menuToggle.classList.remove("active")
        navLinksMobile.classList.remove("active")
      })
    })
  
    // Typed text effect
    const typedTextSpan = document.querySelector(".typed-text")
    const cursorSpan = document.querySelector(".cursor")
  
    const textArray = ["Computer Science Engineer", "Creative Technologist", "Front-end Developer", "Event Organizer"]
    const typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000
    let textArrayIndex = 0
    let charIndex = 0
  
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
        charIndex++
        setTimeout(type, typingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        setTimeout(erase, newTextDelay)
      }
    }
  
    function erase() {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing")
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
        charIndex--
        setTimeout(erase, erasingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        textArrayIndex++
        if (textArrayIndex >= textArray.length) textArrayIndex = 0
        setTimeout(type, typingDelay + 1100)
      }
    }
  
    if (typedTextSpan) {
      setTimeout(type, newTextDelay + 250)
    }
  
    // Active nav link on scroll
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link") // Using the original navLinks variable name
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.clientHeight
        if (pageYOffset >= sectionTop - 200) {
          current = section.getAttribute("id")
        }
      })
  
      navLinks.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll(".progress-bar")
  
    function animateSkillBars() {
      skillBars.forEach((bar) => {
        const barPosition = bar.getBoundingClientRect().top
        const screenPosition = window.innerHeight / 1.3
  
        if (barPosition < screenPosition) {
          const width = bar.getAttribute("data-width")
          bar.style.width = width
        }
      })
    }
  
    window.addEventListener("scroll", animateSkillBars)
    animateSkillBars() // Initial check
  
    // Form submission with backend connection
    const contactForm = document.getElementById("contactForm")
    const formStatus = document.getElementById("formStatus")
  
    if (contactForm) {
      contactForm.addEventListener("submit", async (e) => {
        e.preventDefault()
  
        // Get form values
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const subject = document.getElementById("subject").value
        const message = document.getElementById("message").value
  
        // Show loading message
        formStatus.textContent = "Sending message..."
        formStatus.className = "form-status loading"
        formStatus.style.display = "block"
  
        try {
          // Send data to backend API
          const response = await fetch("http://localhost:5000/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, subject, message }),
          })
  
          const data = await response.json()
  
          if (response.ok) {
            // Success message
            formStatus.textContent = "Thank you for your message! I will get back to you soon."
            formStatus.className = "form-status success"
            // Reset the form
            contactForm.reset()
          } else {
            // Error message from server
            formStatus.textContent = data.message || "Something went wrong. Please try again."
            formStatus.className = "form-status error"
          }
        } catch (error) {
          console.error("Error submitting form:", error)
          formStatus.textContent = "Network error. Please check your connection and try again."
          formStatus.className = "form-status error"
        }
      })
    }
  
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        if (targetId === "#") return
  
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.offsetTop - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Disable custom cursor on mobile devices
    function isMobile() {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  
    if (isMobile()) {
      document.body.style.cursor = "auto"
      if (cursor) cursor.style.display = "none"
      if (cursorFollower) cursorFollower.style.display = "none"
    }
  })
  