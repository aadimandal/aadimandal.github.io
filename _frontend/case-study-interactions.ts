export function enhanceDashboardZoom() {
  const dialog = document.querySelector<HTMLDialogElement>("[data-dashboard-dialog]");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const viewport = dialog.querySelector<HTMLElement>(".dashboard-dialog__viewport");
  const sizeButton = dialog.querySelector<HTMLButtonElement>("[data-dashboard-size]");
  if (!viewport || !sizeButton) return;

  let opener: HTMLAnchorElement | undefined;
  for (const trigger of document.querySelectorAll<HTMLAnchorElement>("[data-dashboard-zoom]")) {
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.addEventListener("click", (event) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      opener = trigger;
      dialog.showModal();
    });
  }

  sizeButton.addEventListener("click", () => {
    const actualSize = viewport.toggleAttribute("data-actual-size");
    sizeButton.textContent = actualSize ? "Fit to screen" : "Actual size";
    viewport.scrollTo(0, 0);
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    viewport.removeAttribute("data-actual-size");
    viewport.scrollTo(0, 0);
    sizeButton.textContent = "Actual size";
    opener?.focus();
  });
}

export function enhanceCaseIndex() {
  const index = document.querySelector<HTMLElement>("[data-case-index]");
  if (!index) return;

  const entries = Array.from(index.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')).flatMap((link) => {
    const target = document.getElementById(link.hash.slice(1));
    return target ? [{ link, target }] : [];
  });
  if (!entries.length) return;

  let activeLink: HTMLAnchorElement | undefined;
  let frame = 0;

  function update() {
    frame = 0;
    const readingLine = Math.min(112, window.innerHeight * 0.18);
    let current = entries[0];

    for (const entry of entries) {
      if (entry.target.getBoundingClientRect().top <= readingLine) current = entry;
    }

    const atEnd = window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
    if (atEnd) {
      const linked = entries.find(({ link, target }) => {
        if (link.hash !== location.hash) return false;
        const top = target.getBoundingClientRect().top;
        return top >= 0 && top < window.innerHeight;
      });
      current = linked ?? entries[entries.length - 1];
    }

    if (current.link === activeLink) return;
    activeLink?.removeAttribute("aria-current");
    current.link.setAttribute("aria-current", "location");
    activeLink = current.link;
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);
  window.addEventListener("load", scheduleUpdate, { once: true });
  void document.fonts.ready.then(scheduleUpdate);
}

const formatCount = new Intl.NumberFormat("en-US");

function animateMetric(metric: HTMLElement, preference: MediaQueryList) {
  const exact = metric.dataset.metricTicker;
  const match = exact?.match(/^([\d,]+)(%?)$/);
  const value = metric.firstElementChild;
  if (!exact || !match || !value) return;

  const target = Number(match[1].replaceAll(",", ""));
  const suffix = match[2];
  const start = performance.now();

  const tick = (time: number) => {
    const progress = Math.min(1, Math.max(0, (time - start) / 560));
    if (progress === 1 || !preference.matches) {
      value.textContent = exact;
      return;
    }

    const eased = 1 - (1 - progress) ** 3;
    value.textContent = formatCount.format(Math.round(target * (0.42 + eased * 0.58))) + suffix;
    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

export function enableCaseStudyMotion(preference: MediaQueryList) {
  const targets = document.querySelectorAll<HTMLElement>("[data-workflow-beam], [data-metric-ticker]");
  if (!targets.length || !preference.matches || !("IntersectionObserver" in window)) return;

  const revealThreshold = 0.2;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio < revealThreshold) continue;
      const target = entry.target as HTMLElement;
      observer.unobserve(target);
      if (!preference.matches) continue;
      if (target.hasAttribute("data-workflow-beam")) target.dataset.beamActive = "";
      else animateMetric(target, preference);
    }
  }, { threshold: revealThreshold });

  for (const target of targets) observer.observe(target);
}
