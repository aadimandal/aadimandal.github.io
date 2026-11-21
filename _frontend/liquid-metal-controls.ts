const selector = "a.button, button.button, summary.button, [data-liquid-control]";

function findControl(target: EventTarget | null) {
  const control = target instanceof Element ? target.closest<HTMLElement>(selector) : null;
  return control?.hasAttribute("data-liquid-control") ? control.querySelector<HTMLElement>(".button") : control;
}

export function enhanceLiquidMetal(preference: MediaQueryList) {
  let desired: HTMLElement | null = null;
  let dispose: (() => void) | undefined;
  let module: ReturnType<typeof loadShader> | undefined;
  let supported = true;

  function loadShader() {
    return import("./components/ui/liquid-metal-shader.js");
  }

  function activate(control: HTMLElement | null) {
    const next = supported && preference.matches ? control : null;
    if (next === desired) return;
    desired = next;
    dispose?.();
    dispose = undefined;
    if (!next) return;

    (module ??= loadShader()).then(({ mountLiquidMetal }) => {
      if (desired === next && !dispose && next.isConnected && preference.matches) {
        dispose = mountLiquidMetal(next);
      }
    }).catch(() => {
      supported = false;
      activate(null);
    });
  }

  document.addEventListener("pointerover", event => {
    const control = findControl(event.target);
    if (event.pointerType !== "touch" && control && control !== findControl(event.relatedTarget)) activate(control);
  });
  document.addEventListener("pointerout", event => {
    const control = findControl(event.target);
    const next = findControl(event.relatedTarget);
    if (event.pointerType !== "touch" && control && control !== next) {
      activate(next ?? findControl(document.querySelector(":focus-visible")));
    }
  });
  document.addEventListener("focusin", event => activate(findControl(event.target)));
  document.addEventListener("focusout", event => activate(findControl(event.relatedTarget)));
  preference.addEventListener("change", () => activate(null));
  window.addEventListener("pagehide", () => activate(null));
}
