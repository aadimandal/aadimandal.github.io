import { enhanceDashboardZoom, enhanceCaseIndex, enableCaseStudyMotion } from "./case-study-interactions";

import { enhanceLiquidMetal } from "./liquid-metal-controls";
import { enhanceHeroHandoff } from "./portfolio-motion";

const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
enhanceLiquidMetal(motion);
enhanceHeroHandoff(motion);
enhanceDashboardZoom();
enhanceCaseIndex();
enableCaseStudyMotion(motion);

const projectLinks = new Map<Element, HTMLAnchorElement>();
for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-work-index] a")) {
  const project = document.getElementById(link.hash.slice(1));
  if (project) projectLinks.set(project, link);
}

if (projectLinks.size && "IntersectionObserver" in window) {
  const visibleProjects = new Set<Element>();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visibleProjects.add(entry.target);
      else visibleProjects.delete(entry.target);
    }
    const activeProject = [...projectLinks.keys()].find((project) => visibleProjects.has(project));
    for (const [project, link] of projectLinks) {
      if (project === activeProject) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-12% 0px -64% 0px" });

  for (const project of projectLinks.keys()) observer.observe(project);
}
