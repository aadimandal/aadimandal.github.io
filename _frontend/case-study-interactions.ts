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
