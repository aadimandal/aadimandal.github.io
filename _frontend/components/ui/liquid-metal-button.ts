/*! Liquid Metal Button by johuniq (JolyUI), MIT. See THIRD-PARTY-NOTICES.md. */
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";

function findControl(target: EventTarget | null) {
  return target instanceof Element
    ? target.closest<HTMLElement>("a.metal-button, button.metal-button, [data-metal-control]")
    : null;
}

export function enhanceMetalButtons(preference: MediaQueryList) {
  let surface: HTMLElement | null = null;
  let layer: HTMLElement | undefined;
  let shader: ShaderMount | undefined;
  let shaderAvailable = true;

  const activate = (control: HTMLElement | null) => {
    const next = preference.matches && shaderAvailable && control
      ? control.closest<HTMLElement>(".metal-button")
        ?? control.parentElement?.querySelector<HTMLElement>(".metal-button")
        ?? null
      : null;
    if (next === surface && (!next || layer?.isConnected)) return;

    shader?.dispose();
    layer?.remove();
    shader = undefined;
    surface = next;
    if (!surface) return;

    layer = document.createElement("span");
    layer.className = "metal-button__shader";
    layer.setAttribute("aria-hidden", "true");
    surface.prepend(layer);

    try {
      shader = new ShaderMount(layer, liquidMetalFragmentShader, {
        u_repetition: 4,
        u_softness: 0.5,
        u_shiftRed: 0.05,
        u_shiftBlue: 0.25,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 45,
        u_scale: 8,
        u_shape: 1,
        u_offsetX: 0.1,
        u_offsetY: -0.1,
      }, undefined, 0.8);
    } catch {
      shaderAvailable = false;
      layer.remove();
      surface = null;
    }
  };

  document.addEventListener("pointerover", (event) => {
    if (event.pointerType !== "touch") {
      const control = findControl(event.target);
      if (control && control !== findControl(event.relatedTarget)) activate(control);
    }
  });
  document.addEventListener("pointerout", (event) => {
    if (event.pointerType !== "touch" && findControl(event.target) !== findControl(event.relatedTarget)) {
      activate(findControl(event.relatedTarget) ?? findControl(document.activeElement));
    }
  });
  document.addEventListener("focusin", (event) => activate(findControl(event.target)));
  document.addEventListener("focusout", (event) => activate(findControl(event.relatedTarget)));
  preference.addEventListener("change", () => activate(null));
  window.addEventListener("pagehide", () => activate(null));
}
