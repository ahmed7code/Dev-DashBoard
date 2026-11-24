// 1. مصفوفة الـ 20 لون الاحترافية
const accentColors = [
  "#e11d48", // Crimson (الأحمر الكرزي)
  "#ef4444", // Red
  "#f97316", // Orange
  "#f59e0b", // Amber
  "#eab308", // Yellow
  "#84cc16", // Lime
  "#22c55e", // Green
  "#10b981", // Emerald
  "#14b8a6", // Teal
  "#06b6d4", // Cyan
  "#0ea5e9", // Sky
  "#3b82f6", // Blue
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#a855f7", // Purple
  "#d946ef", // Fuchsia
  "#ec4899", // Pink
  "#f43f5e", // Rose
  "#fde047", // Slate
  "#d4af37"  // Royal Gold (ذهبي رمضاني)
];

const colorsGrid = document.getElementById("colors-grid");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll(".page-section");

// 2. توليد دوائر الـ 20 لون وتفعيل التبديل
function renderColors() {
  const savedColor = localStorage.getItem("accentColor") || accentColors[0];
  setAccentColor(savedColor);

  accentColors.forEach((color) => {
    const dot = document.createElement("div");
    dot.classList.add("color-dot");
    dot.style.backgroundColor = color;
    if (color === savedColor) dot.classList.add("active");

    dot.addEventListener("click", () => {
      document.querySelectorAll(".color-dot").forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");
      setAccentColor(color);
      localStorage.setItem("accentColor", color);
    });

    colorsGrid.appendChild(dot);
  });
}

// دالة تغيير اللون في الـ CSS
function setAccentColor(color) {
  document.documentElement.style.setProperty("--accent", color);
  // تحويل اللون لشفاف للخلفيات الخفيفة
  document.documentElement.style.setProperty("--accent-soft", color + "26");
}

// 3. تبديل Dark / Light Mode وحفظه
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.classList.replace("bx-sun", "bx-moon");
  }
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  
  if (isLight) {
    themeIcon.classList.replace("bx-sun", "bx-moon");
    localStorage.setItem("theme", "light");
  } else {
    themeIcon.classList.replace("bx-moon", "bx-sun");
    localStorage.setItem("theme", "dark");
  }
});

// 4. التنقل بين الأقسام الأربعة
navItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    // إزالة active من الجميع
    navItems.forEach((item) => item.classList.remove("active"));
    sections.forEach((sec) => sec.classList.remove("active"));

    // تفعيل الزر والقسم المطلوب
    btn.classList.add("active");
    const targetId = btn.getAttribute("data-target");
    document.getElementById(targetId).classList.add("active");
  });
});

// تشغيل الدوال عند فتح الصفحة
renderColors();
initTheme();


// ===== PROFILE & SKILLS LOGIC =====
const profileForm = document.getElementById("profile-form");

// تحميل البيانات المحفوظة عند فتح الصفحة
function loadProfile() {
  const savedProfile = JSON.parse(localStorage.getItem("devProfile"));
  if (savedProfile) {
    document.getElementById("display-name").textContent = savedProfile.name;
    document.getElementById("display-role").textContent = savedProfile.role;
    document.getElementById("display-age").textContent = savedProfile.age;
    document.getElementById("display-nationality").textContent = savedProfile.nationality;
    document.getElementById("display-city").textContent = savedProfile.city;
    document.getElementById("display-avatar").src = savedProfile.avatar;

    // تعبئة الـ Inputs بنفس البيانات
    document.getElementById("input-name").value = savedProfile.name;
    document.getElementById("input-role").value = savedProfile.role;
    document.getElementById("input-age").value = savedProfile.age;
    document.getElementById("input-nationality").value = savedProfile.nationality;
    document.getElementById("input-city").value = savedProfile.city;
    document.getElementById("input-avatar").value = savedProfile.avatar;
  }
}

// حفظ التعديلات من الـ 6 Inputs
profileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const profileData = {
    name: document.getElementById("input-name").value,
    role: document.getElementById("input-role").value,
    age: document.getElementById("input-age").value,
    nationality: document.getElementById("input-nationality").value,
    city: document.getElementById("input-city").value,
    avatar: document.getElementById("input-avatar").value
  };

  localStorage.setItem("devProfile", JSON.stringify(profileData));
  loadProfile();
});

// إدارة المهارات (Skills)
let skills = JSON.parse(localStorage.getItem("devSkills")) || [
  "HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "Tailwind CSS", "Git & GitHub", "Responsive Design"
];

const skillsList = document.getElementById("skills-list");
const newSkillInput = document.getElementById("new-skill-input");
const addSkillBtn = document.getElementById("add-skill-btn");

function renderSkills() {
  skillsList.innerHTML = "";
  skills.forEach((skill, index) => {
    const tag = document.createElement("div");
    tag.classList.add("skill-tag");
    tag.innerHTML = `
      <span>${skill}</span>
      <i class='bx bx-x' title="Remove skill" onclick="removeSkill(${index})"></i>
    `;
    skillsList.appendChild(tag);
  });
  localStorage.setItem("devSkills", JSON.stringify(skills));
}

addSkillBtn.addEventListener("click", () => {
  const val = newSkillInput.value.trim();
  if (val && !skills.includes(val)) {
    skills.push(val);
    newSkillInput.value = "";
    renderSkills();
  }
});

window.removeSkill = function(index) {
  skills.splice(index, 1);
  renderSkills();
};

loadProfile();
renderSkills();





// ===== PROJECTS LOGIC =====
let projects = JSON.parse(localStorage.getItem("devProjects")) || [
  {
    title: "Women's Fashion E-Commerce",
    client: "Private Client (Jeddah)",
    tech: "Frontend + Sister's Backend",
    status: "Completed"
  },
  {
    title: "Personal Portfolio Website",
    client: "Ahmed Almaghrabi",
    tech: "React.js + Vite",
    status: "Completed"
  },
  {
    title: "Developer Personal Dashboard",
    client: "Self Project",
    tech: "HTML, CSS, Vanilla JS",
    status: "In Progress"
  }
];

const projectForm = document.getElementById("project-form");
const projectsGrid = document.getElementById("projects-grid");

function renderProjects() {
  projectsGrid.innerHTML = "";
  let completedCount = 0;
  let progressCount = 0;

  projects.forEach((proj, index) => {
    if (proj.status === "Completed") completedCount++;
    else progressCount++;

    const isCompleted = proj.status === "Completed";
    const card = document.createElement("div");
    card.classList.add("project-card");
    card.innerHTML = `
      <div>
        <div class="proj-top">
          <h3>${proj.title}</h3>
          <span class="status-badge ${isCompleted ? 'status-completed' : 'status-progress'}">
            ${proj.status}
          </span>
        </div>
        <div class="proj-info" style="margin-top: 14px;">
          <span><i class='bx bx-briefcase'></i> Client: ${proj.client}</span>
          <span><i class='bx bx-code-curly'></i> Tech: ${proj.tech}</span>
        </div>
      </div>

      <div class="proj-actions">
        <button class="btn-outline" onclick="toggleProjectStatus(${index})">
          <i class='bx bx-refresh'></i> Switch Status
        </button>
        <button class="btn-delete" title="Delete Project" onclick="deleteProject(${index})">
          <i class='bx bx-trash'></i>
        </button>
      </div>
    `;
    projectsGrid.appendChild(card);
  });

  // تحديث العدادات العلوية
  document.getElementById("total-projects").textContent = projects.length;
  document.getElementById("completed-projects").textContent = completedCount;
  document.getElementById("progress-projects").textContent = progressCount;

  localStorage.setItem("devProjects", JSON.stringify(projects));
}

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newProj = {
    title: document.getElementById("proj-title").value.trim(),
    client: document.getElementById("proj-client").value.trim(),
    tech: document.getElementById("proj-tech").value.trim(),
    status: document.getElementById("proj-status").value
  };

  projects.unshift(newProj);
  projectForm.reset();
  renderProjects();
});

window.toggleProjectStatus = function(index) {
  projects[index].status = projects[index].status === "Completed" ? "In Progress" : "Completed";
  renderProjects();
};

window.deleteProject = function(index) {
  projects.splice(index, 1);
  renderProjects();
};

renderProjects();




// ===== TO-DO LIST & MODAL =====
let todos = JSON.parse(localStorage.getItem("devTodosModal")) || [
  { desc: "Finish Ramadan section", date: "2026-11-24", time: "21:00", done: false }
];

let currentFilter = "all";
const todoList = document.getElementById("todo-list");
const filterBtns = document.querySelectorAll(".filter-btn");
const todoModal = document.getElementById("todo-modal");
const todoForm = document.getElementById("todo-form");

document.getElementById("open-todo-modal").addEventListener("click", () => {
  document.getElementById("todo-date").valueAsDate = new Date();
  todoModal.classList.add("show");
});

function closeModal() {
  todoModal.classList.remove("show");
  todoForm.reset();
}

document.getElementById("close-todo-modal").addEventListener("click", closeModal);
document.getElementById("cancel-todo-modal").addEventListener("click", closeModal);
todoModal.addEventListener("click", (e) => { if (e.target === todoModal) closeModal(); });

function renderTodos() {
  todoList.innerHTML = "";
  const doneCount = todos.filter(t => t.done).length;
  const percent = todos.length === 0 ? 0 : Math.round((doneCount / todos.length) * 100);
  document.getElementById("todo-percent").textContent = `${percent}%`;
  document.getElementById("todo-progress-bar").style.width = `${percent}%`;

  const filtered = todos.filter(todo => {
    if (currentFilter === "pending") return !todo.done;
    if (currentFilter === "completed") return todo.done;
    return true;
  });

  filtered.forEach((todo) => {
    const realIndex = todos.indexOf(todo);
    const item = document.createElement("div");
    item.classList.add("todo-item");
    if (todo.done) item.classList.add("done");

    item.innerHTML = `
      <div class="todo-left" onclick="toggleTodo(${realIndex})">
        <div class="todo-check"><i class='bx bx-check'></i></div>
        <div class="todo-details">
          <span class="todo-text">${todo.desc}</span>
          <div class="todo-datetime">
            <span><i class='bx bx-calendar'></i> ${todo.date}</span>
            <span><i class='bx bx-time-five'></i> ${todo.time}</span>
          </div>
        </div>
      </div>
      <button class="btn-delete" onclick="deleteTodo(${realIndex})"><i class='bx bx-trash'></i></button>
    `;
    todoList.appendChild(item);
  });

  localStorage.setItem("devTodosModal", JSON.stringify(todos));
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("todo-desc").value.trim();
  const date = document.getElementById("todo-date").value;
  const time = document.getElementById("todo-time").value;
  if (desc) {
    todos.unshift({ desc, date, time, done: false });
    renderTodos();
    closeModal();
  }
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.getAttribute("data-filter");
    renderTodos();
  });
});

window.toggleTodo = function(index) {
  todos[index].done = !todos[index].done;
  renderTodos();
};

window.deleteTodo = function(index) {
  todos.splice(index, 1);
  renderTodos();
};

renderTodos();



// ===== RAMADAN SECTION LOGIC =====
const todayEl = document.getElementById("today-date-display");
const now = new Date();
todayEl.textContent = now.toLocaleDateString("en-US", {
  weekday: "long", year: "numeric", month: "short", day: "numeric"
});

const ramadanDate = new Date("February 8, 2027 00:00:00").getTime();

function updateCountdown() {
  const current = new Date().getTime();
  const diff = ramadanDate - current;

  if (diff > 0) {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cd-mins").textContent = String(mins).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(secs).padStart(2, "0");
  }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 2. الصلوات الخمس
let prayers = JSON.parse(localStorage.getItem("fivePrayers")) || [
  { name: "Fajr (الفجر)", prayed: false },
  { name: "Dhuhr (الظهر)", prayed: false },
  { name: "Asr (العصر)", prayed: false },
  { name: "Maghrib (المغرب)", prayed: false },
  { name: "Isha (العشاء)", prayed: false }
];

const prayersList = document.getElementById("prayers-list");

function renderPrayers() {
  prayersList.innerHTML = "";
  let count = 0;

  prayers.forEach((p, index) => {
    if (p.prayed) count++;
    const item = document.createElement("div");
    item.classList.add("prayer-item");
    if (p.prayed) item.classList.add("prayed");

    item.innerHTML = `
      <div class="prayer-name">
        <i class='bx ${p.prayed ? "bxs-check-circle" : "bx-circle"}'></i>
        <span>${p.name}</span>
      </div>
      <span style="font-size: 0.8rem; color: var(--text-muted);">${p.prayed ? "Done" : "Pending"}</span>
    `;
    item.addEventListener("click", () => {
      prayers[index].prayed = !prayers[index].prayed;
      renderPrayers();
    });
    prayersList.appendChild(item);
  });

  document.getElementById("prayers-count").textContent = count;
  document.getElementById("summary-prayers").textContent = `${count}/5`;
  localStorage.setItem("fivePrayers", JSON.stringify(prayers));
}

document.getElementById("reset-prayers-btn").addEventListener("click", () => {
  prayers.forEach(p => p.prayed = false);
  renderPrayers();
});

// 3. المسبحة والقائمة المنسدلة المودرن
let tasbihCount = parseInt(localStorage.getItem("tasbihCount")) || 0;
const tasbihCounterEl = document.getElementById("tasbih-counter");
const summaryTasbihEl = document.getElementById("summary-tasbih");
const currentDhikrText = document.getElementById("current-dhikr-text");

const dropdown = document.getElementById("dhikr-dropdown");
const dropdownTrigger = document.getElementById("dropdown-trigger");
const selectedDhikr = document.getElementById("selected-dhikr");
const dropdownOptions = document.querySelectorAll(".dropdown-option");

dropdownTrigger.addEventListener("click", () => {
  dropdown.classList.toggle("open");
});

dropdownOptions.forEach(option => {
  option.addEventListener("click", () => {
    dropdownOptions.forEach(opt => opt.classList.remove("active"));
    option.classList.add("active");

    const val = option.getAttribute("data-value");
    selectedDhikr.textContent = val;
    currentDhikrText.textContent = val;
    dropdown.classList.remove("open");
  });
});

document.addEventListener("click", (e) => {
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});

function updateTasbihUI() {
  tasbihCounterEl.textContent = tasbihCount;
  summaryTasbihEl.textContent = tasbihCount;
  localStorage.setItem("tasbihCount", tasbihCount);
}

document.getElementById("tasbih-btn").addEventListener("click", () => {
  tasbihCount++;
  updateTasbihUI();
});

document.getElementById("reset-tasbih-btn").addEventListener("click", () => {
  tasbihCount = 0;
  updateTasbihUI();
});

renderPrayers();
updateTasbihUI();


// ===== MOBILE MENU & SIDEBAR DRAWER =====
const sidebar = document.querySelector(".sidebar");
const menuBtn = document.getElementById("menu-btn");
const closeSidebarBtn = document.getElementById("close-sidebar-btn");
const sidebarOverlay = document.getElementById("sidebar-overlay");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
const mobileThemeIcon = document.getElementById("mobile-theme-icon");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("show");
}

menuBtn.addEventListener("click", openSidebar);
closeSidebarBtn.addEventListener("click", closeSidebar);
sidebarOverlay.addEventListener("click", closeSidebar);

// إغلاق القائمة تلقائياً عند اختيار أي قسم في الجوال
navItems.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (window.innerWidth <= 992) closeSidebar();
  });
});

// ربط زر الثيم العلوي في الجوال مع الثيم الرئيسي
mobileThemeToggle.addEventListener("click", () => {
  themeToggle.click();
  const isLight = document.body.classList.contains("light-mode");
  mobileThemeIcon.className = isLight ? "bx bx-moon" : "bx bx-sun";
});
