const form = document.querySelector('form'); 
const submitBtn = form.querySelector('button[type="submit"]');
const successMsg = document.getElementById('successMessage');
const errorMsg = document.getElementById('errorMessage');
const drinkCountSelect = document.getElementById('drinkCount');
const drinkMessage = document.getElementById('drinkMessage');

drinkCountSelect.addEventListener('change', function () {
  const count = parseInt(this.value);
  if (!count) {
    drinkMessage.textContent = '';
  } else if (count < 4) {
    drinkMessage.textContent = `Just ${count}? Clearly, you believe in staying naturally high on productivity. ☀️`;
  } else if (count < 6) {
    drinkMessage.textContent = `${count} cups — ah, the beginner level of chai-driven efficiency! You're warming up. ☕`;
  } else if (count < 11) {
    drinkMessage.textContent = `${count} cups — You're now operating at peak 'chai pe charcha' bandwidth. True CDTC potential! 🚀`;
  } else if (count < 16) {
    drinkMessage.textContent = `${count} cups?! That’s not a caffeine habit — that’s a supply chain! 🏭 Let's hope HR isn't tracking this. 😄`;
  } else {
    drinkMessage.textContent = `${count} cups?! At this point, you deserve your own coffee logistics team. Shall we talk vendor contracts next? ☕📋`;
  }
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  successMsg.style.display = 'none';
  errorMsg.style.display = 'none';

  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Submitting... <span class="spinner"></span>';

  const formData = {
    name: document.getElementById('name').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    email: document.getElementById('email').value.trim(),
    dob: document.getElementById('dob').value,
    department: document.getElementById('department').value,
    mission: document.getElementById('mission').value.trim(),
    asset: document.getElementById('asset').value.trim(),
    drinkType: document.getElementById('drinkType').value,
    drinkCount: document.getElementById('drinkCount').value
  };

  const payload = new URLSearchParams();
  payload.append('Data', JSON.stringify(formData));

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzNdO2ogQt_Se54C9QTn0mIzqmJy7E0OBBdzK48Up3cJAMsOIQL-rtNktKHlhwKkxbGBw/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload
    });

    const result = await response.json();

  if (result.success) {
    successMsg.style.display = 'block';
    successMsg.innerHTML = result.message;
    errorMsg.style.display = 'none';   // Hide error on success!
  //  form.reset();
    drinkMessage.textContent = '';
  } else {
    errorMsg.textContent = result.message || 'Submission failed.';
    errorMsg.style.display = 'block';
    successMsg.style.display = 'none'; // Hide success on error!
    console.error('Error:', result.message);
  }

  } catch (err) {
    errorMsg.textContent = 'Something went wrong. Please try again later.';
    errorMsg.style.display = 'block';
    console.error('Submission error:', err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Submit Details';
  }
});

function validateForm() {
  return true;
}
