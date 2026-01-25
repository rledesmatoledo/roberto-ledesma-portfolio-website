//main JavaScript file


const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
        }
    });
}, observerOptions);

// Select all sections and cards to animate
document.querySelectorAll('.project-card, .skill-category, .about').forEach((el) => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});
const contactForm = document.getElementById('contact-form');
const statusMsg = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent page refresh
    
    // Change button state
    submitBtn.value = "Sending...";
    submitBtn.disabled = true;

    // Gather form data
    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://formspree.io/f/xvgwbadl", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        statusMsg.style.color = "#28a745"; // Success Green
        statusMsg.innerText = "Thanks! Your message has been sent.";
        contactForm.reset(); 
      } else {
        const data = await response.json();
        statusMsg.style.color = "#dc3545"; 
        statusMsg.innerText = data.errors ? data.errors.map(err => err.message).join(", ") : "There was a problem.";
      }
    } catch (error) {
      statusMsg.style.color = "#dc3545";
      statusMsg.innerText = " Connection failed. Try again later.";
    } finally {
      submitBtn.value = "Submit"; 
      submitBtn.disabled = false;
    }
  });
}
