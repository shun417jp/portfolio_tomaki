// 横スクロールとナビの同期

const container = document.getElementById("scrollContainer");
const dots = document.querySelectorAll(".side-nav-dots .dot");
const panels = document.querySelectorAll(".panel");

if (container) {
  // マウスホイールで横スクロール
  container.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    },
    { passive: false }
  );

  // スクロール位置に応じてドットを更新
  container.addEventListener("scroll", () => {
    const scrollLeft = container.scrollLeft;
    const width = container.clientWidth;

    let activeIndex = 0;
    panels.forEach((panel, index) => {
      const panelLeft = panel.offsetLeft - container.offsetLeft;
      if (scrollLeft >= panelLeft - width / 2) {
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === activeIndex);
    });
  });
}

// ドットクリックで該当セクションへ
dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    const id = dot.dataset.target;
    const target = document.getElementById(id);
    if (target && container) {
      container.scrollTo({
        left: target.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  });
});

// Skills タブ切り替え
const tabButtons = document.querySelectorAll(".tab-button");
const groups = document.querySelectorAll("[data-tab-content]");

if (tabButtons.length) {
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;

      tabButtons.forEach((b) => b.classList.toggle("active", b === btn));
      groups.forEach((group) => {
        group.classList.toggle("hidden", group.dataset.tabContent !== tab);
      });
    });
  });
}

// Project Modal
const modal = document.getElementById("projectModal");
const projectCards = document.querySelectorAll(".project-card");
const modalClose = document.querySelector(".modal-close");
const modalOverlay = document.querySelector(".modal-overlay");

if (modal) {
  // モーダルを開く関数
  const openModal = (element) => {
    const title = element.dataset.title;
    const languages = element.dataset.languages;
    const tech = element.dataset.tech;
    const db = element.dataset.db;
    const period = element.dataset.period;
    const description = element.dataset.description;

    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalLanguages").textContent = languages;
    document.getElementById("modalTech").textContent = tech;
    document.getElementById("modalDB").textContent = db;
    document.getElementById("modalPeriod").textContent = period;
    document.getElementById("modalDescription").innerHTML = description;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  // プロジェクトカードをクリックしてモーダルを開く
  projectCards.forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  // モーダルを閉じる
  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  modalClose?.addEventListener("click", closeModal);
  modalOverlay?.addEventListener("click", closeModal);

  // Escキーで閉じる
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}
