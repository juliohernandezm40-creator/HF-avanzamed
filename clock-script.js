// ===================================
// Timezone Data
// ===================================

const timezones = [
    // Asia
    { city: 'Tokyo', timezone: 'Asia/Tokyo', region: 'asia', offset: '+09:00' },
    { city: 'Shanghai', timezone: 'Asia/Shanghai', region: 'asia', offset: '+08:00' },
    { city: 'Hong Kong', timezone: 'Asia/Hong_Kong', region: 'asia', offset: '+08:00' },
    { city: 'Bangkok', timezone: 'Asia/Bangkok', region: 'asia', offset: '+07:00' },
    { city: 'Singapore', timezone: 'Asia/Singapore', region: 'asia', offset: '+08:00' },
    { city: 'Dubai', timezone: 'Asia/Dubai', region: 'asia', offset: '+04:00' },
    { city: 'Mumbai', timezone: 'Asia/Kolkata', region: 'asia', offset: '+05:30' },
    { city: 'Bangkok', timezone: 'Asia/Bangkok', region: 'asia', offset: '+07:00' },
    { city: 'Seoul', timezone: 'Asia/Seoul', region: 'asia', offset: '+09:00' },
    { city: 'Jakarta', timezone: 'Asia/Jakarta', region: 'asia', offset: '+07:00' },
    
    // Europe
    { city: 'London', timezone: 'Europe/London', region: 'europe', offset: '+00:00' },
    { city: 'Paris', timezone: 'Europe/Paris', region: 'europe', offset: '+01:00' },
    { city: 'Berlin', timezone: 'Europe/Berlin', region: 'europe', offset: '+01:00' },
    { city: 'Madrid', timezone: 'Europe/Madrid', region: 'europe', offset: '+01:00' },
    { city: 'Rome', timezone: 'Europe/Rome', region: 'europe', offset: '+01:00' },
    { city: 'Moscow', timezone: 'Europe/Moscow', region: 'europe', offset: '+03:00' },
    { city: 'Istanbul', timezone: 'Europe/Istanbul', region: 'europe', offset: '+03:00' },
    { city: 'Amsterdam', timezone: 'Europe/Amsterdam', region: 'europe', offset: '+01:00' },
    { city: 'Prague', timezone: 'Europe/Prague', region: 'europe', offset: '+01:00' },
    { city: 'Vienna', timezone: 'Europe/Vienna', region: 'europe', offset: '+01:00' },
    
    // Americas
    { city: 'New York', timezone: 'America/New_York', region: 'americas', offset: '-05:00' },
    { city: 'Los Angeles', timezone: 'America/Los_Angeles', region: 'americas', offset: '-08:00' },
    { city: 'Chicago', timezone: 'America/Chicago', region: 'americas', offset: '-06:00' },
    { city: 'Toronto', timezone: 'America/Toronto', region: 'americas', offset: '-05:00' },
    { city: 'Mexico City', timezone: 'America/Mexico_City', region: 'americas', offset: '-06:00' },
    { city: 'São Paulo', timezone: 'America/Sao_Paulo', region: 'americas', offset: '-03:00' },
    { city: 'Buenos Aires', timezone: 'America/Argentina/Buenos_Aires', region: 'americas', offset: '-03:00' },
    { city: 'Bogotá', timezone: 'America/Bogota', region: 'americas', offset: '-05:00' },
    { city: 'Lima', timezone: 'America/Lima', region: 'americas', offset: '-05:00' },
    { city: 'Vancouver', timezone: 'America/Vancouver', region: 'americas', offset: '-08:00' },
    
    // Africa
    { city: 'Cairo', timezone: 'Africa/Cairo', region: 'africa', offset: '+02:00' },
    { city: 'Lagos', timezone: 'Africa/Lagos', region: 'africa', offset: '+01:00' },
    { city: 'Johannesburg', timezone: 'Africa/Johannesburg', region: 'africa', offset: '+02:00' },
    { city: 'Nairobi', timezone: 'Africa/Nairobi', region: 'africa', offset: '+03:00' },
    { city: 'Casablanca', timezone: 'Africa/Casablanca', region: 'africa', offset: '+00:00' },
    { city: 'Accra', timezone: 'Africa/Accra', region: 'africa', offset: '+00:00' },
    
    // Oceania
    { city: 'Sydney', timezone: 'Australia/Sydney', region: 'oceania', offset: '+10:00' },
    { city: 'Melbourne', timezone: 'Australia/Melbourne', region: 'oceania', offset: '+10:00' },
    { city: 'Auckland', timezone: 'Pacific/Auckland', region: 'oceania', offset: '+12:00' },
    { city: 'Fiji', timezone: 'Pacific/Fiji', region: 'oceania', offset: '+12:00' },
    { city: 'Perth', timezone: 'Australia/Perth', region: 'oceania', offset: '+08:00' },
    
    // UTC
    { city: 'UTC (Coordinated)', timezone: 'UTC', region: 'utc', offset: '+00:00' },
];

// ===================================
// DOM Elements
// ===================================

const clocksGrid = document.getElementById('clocksGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const format24hCheckbox = document.getElementById('format24h');
const showSecondsCheckbox = document.getElementById('showSeconds');
const showDateCheckbox = document.getElementById('showDate');
const totalTimezonesEl = document.getElementById('totalTimezones');
const totalRegionsEl = document.getElementById('totalRegions');
const activeClocksEl = document.getElementById('activeClocks');
const lastUpdateEl = document.getElementById('lastUpdate');

// ===================================
// State Management
// ===================================

let currentFilter = 'all';
let currentSearch = '';
let displayedClocks = [...timezones];

// ===================================
// Initialization
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    renderClocks();
    updateStatistics();
    setInterval(updateAllClocks, 1000);
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => applyFilter(btn));
    });
    
    format24hCheckbox.addEventListener('change', updateAllClocks);
    showSecondsCheckbox.addEventListener('change', updateAllClocks);
    showDateCheckbox.addEventListener('change', updateAllClocks);
});

// ===================================
// Render Clocks
// ===================================

function renderClocks() {
    clocksGrid.innerHTML = '';
    
    if (displayedClocks.length === 0) {
        clocksGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <div class="empty-state-icon">🔍</div>
                <h3>No timezones found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    displayedClocks.forEach((tzData, index) => {
        const clockCard = createClockCard(tzData, index);
        clocksGrid.appendChild(clockCard);
    });
    
    updateAllClocks();
    updateStatistics();
}

function createClockCard(tzData, index) {
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.style.animationDelay = `${index * 0.05}s`;
    card.innerHTML = `
        <button class="btn-remove" title="Remove this timezone">×</button>
        <div class="clock-region">${tzData.region.toUpperCase()}</div>
        <div class="clock-city">${tzData.city}</div>
        <div class="digital-clock" data-timezone="${tzData.timezone}">--:--:--</div>
        <div class="clock-date" data-date-display="${tzData.timezone}"></div>
        <div class="clock-offset">${tzData.timezone} (${tzData.offset})</div>
        <div class="clock-info">
            <span class="timezone-label">${tzData.timezone}</span>
        </div>
    `;
    
    // Remove button functionality
    card.querySelector('.btn-remove').addEventListener('click', () => {
        card.remove();
        displayedClocks = displayedClocks.filter(tz => tz.timezone !== tzData.timezone);
        updateStatistics();
    });
    
    return card;
}

// ===================================
// Update All Clocks
// ===================================

function updateAllClocks() {
    const clockElements = document.querySelectorAll('.digital-clock');
    
    clockElements.forEach(clockEl => {
        const timezone = clockEl.getAttribute('data-timezone');
        updateClockDisplay(clockEl, timezone);
    });
    
    updateLastUpdateTime();
}

function updateClockDisplay(clockEl, timezone) {
    try {
        const time = getTimeInTimezone(timezone);
        const format24h = format24hCheckbox.checked;
        const showSeconds = showSecondsCheckbox.checked;
        const showDate = showDateCheckbox.checked;
        
        // Format time
        let timeString = formatTime(time, format24h, showSeconds);
        clockEl.textContent = timeString;
        
        // Update date if needed
        if (showDate) {
            const dateDisplay = clockEl.parentElement.querySelector('[data-date-display]');
            if (dateDisplay) {
                dateDisplay.textContent = formatDate(time);
            }
        } else {
            const dateDisplay = clockEl.parentElement.querySelector('[data-date-display]');
            if (dateDisplay) {
                dateDisplay.textContent = '';
            }
        }
    } catch (error) {
        console.error(`Error updating clock for ${timezone}:`, error);
        clockEl.textContent = 'ERROR';
    }
}

function getTimeInTimezone(timezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });
        
        const now = new Date();
        const parts = formatter.formatToParts(now);
        
        return {
            hour: parseInt(parts.find(p => p.type === 'hour').value),
            minute: parseInt(parts.find(p => p.type === 'minute').value),
            second: parseInt(parts.find(p => p.type === 'second').value),
            date: new Intl.DateTimeFormat('en-US', {
                timeZone: timezone,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            }).format(now),
        };
    } catch (error) {
        throw new Error(`Invalid timezone: ${timezone}`);
    }
}

function formatTime(time, format24h, showSeconds) {
    let hour = time.hour;
    let minute = String(time.minute).padStart(2, '0');
    let second = String(time.second).padStart(2, '0');
    
    if (!format24h) {
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        hour = String(hour).padStart(2, '0');
        
        if (showSeconds) {
            return `${hour}:${minute}:${second} ${period}`;
        } else {
            return `${hour}:${minute} ${period}`;
        }
    } else {
        hour = String(hour).padStart(2, '0');
        
        if (showSeconds) {
            return `${hour}:${minute}:${second}`;
        } else {
            return `${hour}:${minute}`;
        }
    }
}

function formatDate(time) {
    const [month, day, year] = time.date.split('/');
    return `${year}-${month}-${day}`;
}

function updateLastUpdateTime() {
    const now = new Date();
    lastUpdateEl.textContent = now.toLocaleTimeString();
}

// ===================================
// Search Functionality
// ===================================

function performSearch() {
    currentSearch = searchInput.value.toLowerCase().trim();
    filterAndRenderClocks();
}

function filterAndRenderClocks() {
    displayedClocks = timezones.filter(tz => {
        const matchesSearch = 
            tz.city.toLowerCase().includes(currentSearch) ||
            tz.timezone.toLowerCase().includes(currentSearch);
        
        const matchesFilter = 
            currentFilter === 'all' || 
            tz.region === currentFilter;
        
        return matchesSearch && matchesFilter;
    });
    
    renderClocks();
}

// ===================================
// Filter Functionality
// ===================================

function applyFilter(btn) {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    
    // Add active class to clicked button
    btn.classList.add('active');
    
    // Update filter
    currentFilter = btn.getAttribute('data-filter');
    
    // Render
    filterAndRenderClocks();
}

// ===================================
// Statistics
// ===================================

function updateStatistics() {
    const uniqueRegions = new Set(displayedClocks.map(tz => tz.region)).size;
    
    totalTimezonesEl.textContent = displayedClocks.length;
    totalRegionsEl.textContent = uniqueRegions;
    activeClocksEl.textContent = displayedClocks.length;
}

// ===================================
// Utilities
// ===================================

function getUTCOffset(timezone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    
    const now = new Date();
    const tzTime = new Date(formatter.format(now));
    const utcTime = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    const offset = (tzTime - utcTime) / (1000 * 60 * 60);
    const sign = offset >= 0 ? '+' : '';
    return `${sign}${offset.toFixed(1)}`;
}

// ===================================
// Console Welcome Message
// ===================================

console.log('%c🌍 World Time Clock', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cReal-time clock displays across different time zones', 'color: #4ecdc4; font-size: 14px;');
console.log('%cVersion 1.0 | Built with vanilla JavaScript', 'color: #a0a0c0; font-size: 12px;');
