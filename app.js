const STORAGE_KEY = 'dixit-homoeo-appointment-requests-v1';
document.querySelectorAll('.year').forEach(el => el.textContent = new Date().getFullYear());

const themeButton = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('dixit-site-theme');
if (savedTheme) document.documentElement.dataset.theme = savedTheme;
else if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.dataset.theme = 'dark';
function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.textContent = dark ? '☀' : '◐';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}
updateThemeButton();
themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  localStorage.setItem('dixit-site-theme', next);
  updateThemeButton();
});

const form = document.querySelector('#booking-form');
if (form) {
const statusBox = document.querySelector('#booking-status');
const bookingList = document.querySelector('#booking-list');
const dateInput = form.elements.date;
const today = new Date();
dateInput.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

function readBookings() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function renderBookings() {
  const bookings = readBookings();
  if (!bookings.length) {
    bookingList.innerHTML = '<p class="empty-state">No appointment requests saved yet.</p>';
    return;
  }
  bookingList.innerHTML = bookings.map((booking) => `<article class="booking-item"><div><strong>${escapeHtml(booking.name)}</strong><br><span>${escapeHtml(booking.phone)} · ${escapeHtml(booking.message || 'No note added')}</span></div><span>${escapeHtml(booking.date)} · ${escapeHtml(booking.created)}</span></article>`).join('');
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const bookings = readBookings();
  bookings.unshift({
    name: data.get('name').trim(),
    phone: data.get('phone').trim(),
    date: data.get('date'),
    message: '',
    created: new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date())
  });
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    renderBookings();
    statusBox.className = 'booking-status';
    const doctorWhatsApp = '919893457822';
    const message = [
      'Appointment request for Dixit Homoeo Centre',
      `Patient: ${bookings[0].name}`,
      `Phone: ${bookings[0].phone}`,
      `Preferred date: ${bookings[0].date}`
    ].join('\n');
    const whatsappUrl = `https://wa.me/${doctorWhatsApp}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    statusBox.textContent = whatsappWindow
      ? 'WhatsApp opened with your request. Tap Send there to notify the doctor. Your visit is confirmed only after the clinic replies.'
      : 'Your request is saved on this device, but WhatsApp could not be opened. Contact the clinic directly to send and confirm your request.';
    form.reset();
    dateInput.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  } catch {
    statusBox.className = 'booking-status error';
    statusBox.textContent = 'This browser could not save your request. Please contact the clinic directly.';
  }
});

document.querySelector('#clear-bookings').addEventListener('click', () => {
  if (!readBookings().length) return;
  localStorage.removeItem(STORAGE_KEY);
  renderBookings();
  statusBox.className = 'booking-status';
  statusBox.textContent = 'Saved requests were cleared from this device.';
});

renderBookings();
}
