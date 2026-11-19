const clampProgress = (value: number) => Math.min(1, Math.max(0, value));

export function enableScrollMotion(hero: HTMLElement, work: HTMLElement, preference: MediaQueryList) {
  let frame = 0;

  const render = () => {
    frame = 0;
    const viewport = window.innerHeight;
    const heroBounds = hero.getBoundingClientRect();
    const workBounds = work.getBoundingClientRect();
    const exit = clampProgress(-heroBounds.top / (heroBounds.height * 0.8));
    const arrival = clampProgress((viewport * 0.95 - workBounds.top) / (viewport * 0.49));
    const travel = Math.min(heroBounds.width * 0.09, 52);

    hero.style.setProperty("--hero-copy-shift", `${exit * travel * 0.63}px`);
    hero.style.setProperty("--hero-portrait-shift", `${-exit * travel}px`);
    hero.style.setProperty("--hero-light-shift", `${-exit * 14}%`);
    work.style.setProperty("--work-title-shift", `${(1 - arrival) * 24}px`);
    work.style.setProperty("--work-title-scale", `${1 + (1 - arrival) * 0.17}`);
    work.style.setProperty("--work-line", `${0.16 + arrival * 0.84}`);
  };

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  const sync = () => {
    if (preference.matches) {
      render();
      hero.dataset.motionReady = "";
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      return;
    }

    delete hero.dataset.motionReady;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.cancelAnimationFrame(frame);
    frame = 0;
  };

  sync();
  preference.addEventListener("change", sync);
}
