/* ============================================================
   script.js — Alex Mercer Portfolio
   Concepts used:
     ✔ getElementById, querySelector, querySelectorAll
     ✔ addEventListener
     ✔ if / else if / else
     ✔ for loop (no forEach)
     ✔ Form validation
     ✔ DOM manipulation
   Features:
     1. Typed-text animation (hero subtitle)
     2. Dark mode toggle
     3. Skill category filter (show/hide + loop)
     4. Add / remove custom projects (list manipulation)
     5. Form validation + success message
     6. Live character count
     7. Live date & time display
     8. Scroll-based nav active state + header shadow
     9. Hamburger mobile menu
    10. Dynamic greeting based on time of day
   ============================================================ */

/* ---- 1. DOM READY WRAPPER ---- */
document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     FEATURE 1: Typed Text Animation in Hero
     — Changes text dynamically, uses a for-style counter
  ============================================================ */
  var typedEl = document.getElementById('typed-text');
  var phrases = [
    'Front-End Developer.',
    'Data Scientist.',
    'Problem Solver.',
    'Open-Source Contributor.'
  ];
  var phraseIndex = 0;
  var charIndex   = 0;
  var isDeleting  = false;

  function typeLoop() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
      charIndex--;
    } else {
      charIndex++;
    }

    typedEl.textContent = current.substring(0, charIndex);

    var delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === current.length) {
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting   = false;
      phraseIndex  = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  }
  if (typedEl) { typeLoop(); }


  /* ============================================================
     FEATURE 2: Dynamic Greeting based on time-of-day
  ============================================================ */
  var greetingEl = document.getElementById('hero-greeting');
  if (greetingEl) {
    var hour = new Date().getHours();
    var greeting;

    if (hour >= 5 && hour < 12) {
      greeting = 'Good morning! ☀️';
    } else if (hour >= 12 && hour < 17) {
      greeting = 'Good afternoon! 👋';
    } else if (hour >= 17 && hour < 21) {
      greeting = 'Good evening! 🌆';
    } else {
      greeting = 'Hello, night owl! 🌙';
    }
    greetingEl.textContent = greeting;
  }


  /* ============================================================
     FEATURE 3: Dark Mode Toggle
  ============================================================ */
  var themeBtn  = document.getElementById('theme-toggle');
  var body      = document.querySelector('body');
  var isDark    = false;

  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      isDark = !isDark;

      if (isDark) {
        body.classList.add('dark-mode');
        body.classList.remove('light-mode');
        themeBtn.textContent = '☀️';
      } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
        themeBtn.textContent = '🌙';
      }
    });
  }


  /* ============================================================
     FEATURE 4: Skill Category Filter
     — Show / hide cards using a for loop + conditional
  ============================================================ */
  var filterBtns  = document.querySelectorAll('.filter-btn');
  var skillCards  = document.querySelectorAll('.skill-card');

  for (var i = 0; i < filterBtns.length; i++) {
    filterBtns[i].addEventListener('click', function () {

      // Remove active from all buttons
      for (var j = 0; j < filterBtns.length; j++) {
        filterBtns[j].classList.remove('active');
      }
      this.classList.add('active');

      var filter = this.getAttribute('data-filter');

      // Show / hide skill cards
      for (var k = 0; k < skillCards.length; k++) {
        var cat = skillCards[k].getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          skillCards[k].style.display = '';
        } else {
          skillCards[k].style.display = 'none';
        }
      }
    });
  }


  /* ============================================================
     FEATURE 5: Add / Remove Custom Projects (list manipulation)
  ============================================================ */
  var addBtn     = document.getElementById('add-project-btn');
  var projList   = document.getElementById('custom-projects');
  var projTitle  = document.getElementById('proj-title');
  var projTech   = document.getElementById('proj-tech');

  if (addBtn) {
    addBtn.addEventListener('click', function () {
      var title = projTitle.value.trim();
      var tech  = projTech.value.trim();

      if (title === '') {
        alert('Please enter a project title.');
        projTitle.focus();
        return;
      }

      // Create list item
      var li        = document.createElement('li');
      var label     = title + (tech ? ' — ' + tech : '');
      li.textContent = label;

      // Remove button
      var removeBtn      = document.createElement('span');
      removeBtn.textContent = '✕';
      removeBtn.className   = 'remove-proj';
      removeBtn.title       = 'Remove project';

      removeBtn.addEventListener('click', function () {
        projList.removeChild(li);
      });

      li.appendChild(removeBtn);
      projList.appendChild(li);

      // Clear inputs
      projTitle.value = '';
      projTech.value  = '';
      projTitle.focus();
    });
  }


  /* ============================================================
     FEATURE 6: Live Character Count for Textarea
  ============================================================ */
  var textarea  = document.getElementById('fmessage');
  var charCount = document.getElementById('char-count');

  if (textarea && charCount) {
    textarea.addEventListener('input', function () {
      var len  = this.value.length;
      var max  = parseInt(this.getAttribute('maxlength'), 10);
      charCount.textContent = len + ' / ' + max;

      if (len >= max * 0.9) {
        charCount.style.color = '#e74c3c';
      } else {
        charCount.style.color = '';
      }
    });
  }


  /* ============================================================
     FEATURE 7: Live Date & Time Display
  ============================================================ */
  var datetimeEl = document.getElementById('live-datetime');

  function updateTime() {
    if (!datetimeEl) { return; }
    var now = new Date();

    var days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    var day   = days[now.getDay()];
    var date  = now.getDate();
    var month = months[now.getMonth()];
    var year  = now.getFullYear();

    var hours   = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var ampm    = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    if (hours === 0) { hours = 12; }

    var mm = minutes < 10 ? '0' + minutes : minutes;
    var ss = seconds < 10 ? '0' + seconds : seconds;

    datetimeEl.textContent =
      day + ', ' + date + ' ' + month + ' ' + year +
      '  |  ' + hours + ':' + mm + ':' + ss + ' ' + ampm;
  }

  updateTime();
  setInterval(updateTime, 1000);


  /* ============================================================
     FEATURE 8: Contact Form Validation + Success Message
  ============================================================ */
  var form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var valid = true;

      // Helper: show/clear errors
      function showError(fieldId, errId, msg) {
        var field = document.getElementById(fieldId);
        var err   = document.getElementById(errId);
        if (err)  { err.textContent = msg; }
        if (field){ field.classList.add('invalid'); }
      }
      function clearError(fieldId, errId) {
        var field = document.getElementById(fieldId);
        var err   = document.getElementById(errId);
        if (err)  { err.textContent = ''; }
        if (field){ field.classList.remove('invalid'); }
      }

      // Validate full name
      var fname = document.getElementById('fname').value.trim();
      if (fname.length < 2) {
        showError('fname', 'fname-err', 'Please enter your full name (min 2 chars).');
        valid = false;
      } else {
        clearError('fname', 'fname-err');
      }

      // Validate email
      var femail = document.getElementById('femail').value.trim();
      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(femail)) {
        showError('femail', 'femail-err', 'Please enter a valid email address.');
        valid = false;
      } else {
        clearError('femail', 'femail-err');
      }

      // Validate phone (optional but if filled must be 10-11 digits)
      var fphone = document.getElementById('fphone').value.trim();
      if (fphone !== '' && (fphone.length < 10 || fphone.length > 11)) {
        showError('fphone', 'fphone-err', 'Phone must be 10–11 digits.');
        valid = false;
      } else {
        clearError('fphone', 'fphone-err');
      }

      // Validate service dropdown
      var fservice = document.getElementById('fservice').value;
      if (fservice === '') {
        showError('fservice', 'fservice-err', 'Please select a service.');
        valid = false;
      } else {
        clearError('fservice', 'fservice-err');
      }

      // Validate budget radio — use a for loop
      var budgetRadios = document.querySelectorAll('input[name="budget"]');
      var budgetChosen = false;
      for (var r = 0; r < budgetRadios.length; r++) {
        if (budgetRadios[r].checked) {
          budgetChosen = true;
          break;
        }
      }
      var budgetErr = document.getElementById('budget-err');
      if (!budgetChosen) {
        if (budgetErr) { budgetErr.textContent = 'Please select a budget range.'; }
        valid = false;
      } else {
        if (budgetErr) { budgetErr.textContent = ''; }
      }

      // Validate availability checkboxes — use a for loop
      var availChecks   = document.querySelectorAll('input[name="avail"]');
      var availSelected = false;
      for (var c = 0; c < availChecks.length; c++) {
        if (availChecks[c].checked) {
          availSelected = true;
          break;
        }
      }
      var availErr = document.getElementById('avail-err');
      if (!availSelected) {
        if (availErr) { availErr.textContent = 'Please select at least one availability slot.'; }
        valid = false;
      } else {
        if (availErr) { availErr.textContent = ''; }
      }

      // Validate message
      var fmessage = document.getElementById('fmessage').value.trim();
      if (fmessage.length < 10) {
        showError('fmessage', 'fmessage-err', 'Message must be at least 10 characters.');
        valid = false;
      } else {
        clearError('fmessage', 'fmessage-err');
      }

      // Validate agree checkbox
      var fagree    = document.getElementById('fagree');
      var fagreeErr = document.getElementById('fagree-err');
      if (!fagree.checked) {
        if (fagreeErr) { fagreeErr.textContent = 'You must agree to the privacy policy.'; }
        valid = false;
      } else {
        if (fagreeErr) { fagreeErr.textContent = ''; }
      }

      // If valid, show success message
      if (valid) {
        var successMsg  = document.getElementById('success-msg');
        var successName = document.getElementById('success-name');

        if (successName) { successName.textContent = 'Thanks, ' + fname + '! 🎉'; }
        if (successMsg)  {
          successMsg.classList.remove('hidden');
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        form.reset();
        if (charCount) { charCount.textContent = '0 / 300'; }
      }
    });

    // Close success message
    var closeSuccess = document.getElementById('close-success');
    if (closeSuccess) {
      closeSuccess.addEventListener('click', function () {
        var successMsg = document.getElementById('success-msg');
        if (successMsg) { successMsg.classList.add('hidden'); }
      });
    }

    // Real-time validation: remove error as user types
    var inputFields = form.querySelectorAll('input, select, textarea');
    for (var fi = 0; fi < inputFields.length; fi++) {
      inputFields[fi].addEventListener('input', function () {
        this.classList.remove('invalid');
      });
    }
  }


  /* ============================================================
     FEATURE 9: Scroll-based Nav Highlight & Header Shadow
  ============================================================ */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link');
  var header   = document.getElementById('main-header');

  window.addEventListener('scroll', function () {
    var scrollY = window.scrollY;

    // Header shadow on scroll
    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active nav link
    for (var s = 0; s < sections.length; s++) {
      var sec    = sections[s];
      var top    = sec.offsetTop - 90;
      var bottom = top + sec.offsetHeight;

      if (scrollY >= top && scrollY < bottom) {
        var id = sec.getAttribute('id');
        for (var n = 0; n < navLinks.length; n++) {
          navLinks[n].classList.remove('active');
          if (navLinks[n].getAttribute('href') === '#' + id) {
            navLinks[n].classList.add('active');
          }
        }
      }
    }
  });


  /* ============================================================
     FEATURE 10: Hamburger Mobile Menu Toggle
  ============================================================ */
  var hamburger = document.getElementById('hamburger');
  var navMenu   = document.getElementById('nav-links');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked
    var mobileLinks = navMenu.querySelectorAll('.nav-link');
    for (var ml = 0; ml < mobileLinks.length; ml++) {
      mobileLinks[ml].addEventListener('click', function () {
        navMenu.classList.remove('open');
      });
    }
  }


  /* ============================================================
     Footer: Set current year dynamically
  ============================================================ */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

}); // end DOMContentLoaded
