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
    const progress = Math.min(1, Math.max(0, (time - start) / 650));
    if (progress === 1 || !preference.matches) {
      value.textContent = exact;
      return;
    }

    const eased = 1 - Math.pow(1 - progress, 3);
    const count = Math.round(target * (0.42 + eased * 0.58));
    value.textContent = formatCount.format(count) + suffix;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function enableCaseStudyMotion(preference: MediaQueryList) {
  const targets = document.querySelectorAll<HTMLElement>("[data-workflow-beam], [data-metric-ticker]");
  if (!targets.length || !preference.matches || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const target = entry.target as HTMLElement;
      observer.unobserve(target);
      if (!preference.matches) continue;
      if (target.hasAttribute("data-workflow-beam")) target.dataset.beamActive = "";
      else animateMetric(target, preference);
    }
  }, { threshold: 0.25 });

  for (const target of targets) observer.observe(target);
}
