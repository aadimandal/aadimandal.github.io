/*! Liquid Metal Button by johuniq (JolyUI), MIT. See THIRD-PARTY-NOTICES.md. */
import { liquidMetalFragmentShader, ShaderMount } from "@paper-design/shaders";

export function mountLiquidMetal(button: HTMLElement) {
  const edge = document.createElement("span");
  edge.className = "liquid-edge";
  edge.setAttribute("aria-hidden", "true");
  button.prepend(edge);

  try {
    const shader = new ShaderMount(edge, liquidMetalFragmentShader, {
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

    return () => {
      shader.dispose();
      edge.remove();
    };
  } catch (error) {
    edge.remove();
    throw error;
  }
}
