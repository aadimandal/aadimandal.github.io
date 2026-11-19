import { useLayoutEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import GlassFolder, { type FolderFile } from "@/components/ui/glass-folder-cards";
import { enhanceMetalButtons } from "@/components/ui/liquid-metal-button";
import { enableScrollMotion } from "./portfolio-motion";
import { enhanceDashboardZoom, enableCaseStudyMotion } from "./case-study-interactions";

function ProjectFolder({ target, animate }: { target: HTMLElement; animate: boolean }) {
  const { folderLabel, caseStudy, dashboard, repository, workflow } = target.dataset;
  const [width, setWidth] = useState(320);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const fit = () => setWidth(Math.max(1, Math.min(320, target.clientWidth - 32)));
    fit();
    const resize = new ResizeObserver(fit);
    resize.observe(target);
    return () => resize.disconnect();
  }, [target]);

  const files: FolderFile[] = [{ name: "Case study", href: caseStudy }];
  if (dashboard) files.push({ name: "Tableau dashboard", href: dashboard });
  if (repository) files.push({ name: "Project repository", href: repository });
  if (workflow) files.push({ name: "Recreation workflow", href: workflow });

  return (
    <GlassFolder
      action="none"
      appear={animate}
      art="none"
      className="portfolio-folder"
      files={files}
      label={folderLabel}
      meta={open ? "Close project links" : "Open project links"}
      metaClassName="metal-button metal-button--compact"
      open={open}
      onOpenChange={setOpen}
      tone="dark"
      width={width}
    />
  );
}

const motionPreference = window.matchMedia("(prefers-reduced-motion: no-preference)");
enhanceMetalButtons(motionPreference);
enhanceDashboardZoom();
enableCaseStudyMotion(motionPreference);
for (const host of document.querySelectorAll<HTMLElement>("[data-project-folder]")) {
  createRoot(host).render(<ProjectFolder target={host} animate={motionPreference.matches} />);
}

const heroPanel = document.querySelector<HTMLElement>(".hero");
const work = document.querySelector<HTMLElement>(".selected-work");
if (heroPanel && work) enableScrollMotion(heroPanel, work, motionPreference);

const projectLinks = new Map<Element, HTMLAnchorElement>();
for (const link of document.querySelectorAll<HTMLAnchorElement>("[data-work-index] a")) {
  const project = document.getElementById(link.hash.slice(1));
  if (project) projectLinks.set(project, link);
}

if (projectLinks.size && "IntersectionObserver" in window) {
  const inReadingArea = new Set<Element>();
  const indexObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) inReadingArea.add(entry.target);
      else inReadingArea.delete(entry.target);
    }
    const active = [...projectLinks.keys()].find((project) => inReadingArea.has(project));
    for (const [project, link] of projectLinks) {
      if (project === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }, { rootMargin: "-8% 0px -68% 0px" });
  for (const project of projectLinks.keys()) indexObserver.observe(project);
}
