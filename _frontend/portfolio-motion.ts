export function enhanceHeroHandoff(preference: MediaQueryList) {
  const hero = document.querySelector<HTMLElement>(".hero");
  const work = document.querySelector<HTMLElement>(".selected-work");
  if (!hero || !work) return;

  let frame = 0;
  const render = () => {
    frame = 0;
    const viewport = window.innerHeight;
    const exit = Math.min(1, Math.max(0, -hero.getBoundingClientRect().top / (viewport * 0.7)));
    const arrival = Math.min(1, Math.max(0, (viewport * 0.92 - work.getBoundingClientRect().top) / (viewport * 0.42)));
    hero.style.setProperty("--portrait-drift", `${-exit * 26}px`);
    work.style.setProperty("--heading-drift", `${(1 - arrival) * 9}px`);
    work.style.setProperty("--heading-rule", `${0.42 + arrival * 0.58}`);
  };

  const schedule = () => {
    if (!frame) frame = window.requestAnimationFrame(render);
  };

  const sync = () => {
    if (preference.matches) {
      render();
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule);
      return;
    }
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    window.cancelAnimationFrame(frame);
    frame = 0;
    hero.style.removeProperty("--portrait-drift");
    work.style.removeProperty("--heading-drift");
    work.style.removeProperty("--heading-rule");
  };

  sync();
  preference.addEventListener("change", sync);
}
