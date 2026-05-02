const listings = [
  {
    title: "Graphic Designer Needed",
    type: "job",
    icon: "🎨",
    location: "Nairobi",
    price: "$120",
    tag: "Remote"
  },
  {
    title: "Plumbing Service Available",
    type: "service",
    icon: "🛠️",
    location: "Westlands",
    price: "$25",
    tag: "Verified"
  },
  {
    title: "Laptop for Sale",
    type: "product",
    icon: "💻",
    location: "CBD",
    price: "$450",
    tag: "Good Deal"
  },
  {
    title: "Social Media Manager",
    type: "job",
    icon: "📱",
    location: "Karen",
    price: "$300",
    tag: "Part-time"
  },
  {
    title: "Home Cleaning Service",
    type: "service",
    icon: "🧼",
    location: "Kilimani",
    price: "$18",
    tag: "Top Rated"
  }
];

let activeType = "all";

const container = document.getElementById("listingContainer");
const searchInput = document.getElementById("searchInput");

function renderListings() {
  const search = searchInput.value.toLowerCase();

  const filtered = listings.filter(item => {
    const matchesType = activeType === "all" || item.type === activeType;
    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.location.toLowerCase().includes(search) ||
      item.type.toLowerCase().includes(search);

    return matchesType && matchesSearch;
  });

  container.innerHTML = filtered.map(item => `
    <article class="card" onclick="openModal('${item.title}', 'Located in ${item.location}. Category: ${item.type}. Price or budget: ${item.price}.')">
      <div class="thumb">${item.icon}</div>

      <div class="card-content">
        <h4>${item.title}</h4>
        <p>📍 ${item.location}</p>

        <div class="meta">
          <span class="pill">${item.type}</span>
          <span class="pill">${item.tag}</span>
        </div>
      </div>

      <div class="price">${item.price}</div>
    </article>
  `).join("");

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="card">
        <div class="thumb">🔎</div>

        <div class="card-content">
          <h4>No results found</h4>
          <p>Try another search or category.</p>
        </div>
      </div>
    `;
  }
}

function filterItems(type, element) {
  activeType = type;

  document.querySelectorAll(".category").forEach(category => {
    category.classList.remove("active");
  });

  element.classList.add("active");
  renderListings();
}

function resetFilter() {
  activeType = "all";
  searchInput.value = "";

  document.querySelectorAll(".category").forEach(category => {
    category.classList.remove("active");
  });

  document.querySelector(".category").classList.add("active");
  renderListings();
}

function openModal(title, text) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalText").textContent = text;
  document.getElementById("modal").classList.add("show");
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
}

function setNav(button, name) {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });

  button.classList.add("active");

  if (name !== "Home") {
    openModal(name, `${name} screen can be connected to real app pages later.`);
  }
}

searchInput.addEventListener("input", renderListings);

renderListings();
