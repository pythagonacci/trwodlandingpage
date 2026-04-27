"use client";

import Image from "next/image";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import serumProductImage from "@/ChatGPT Image Apr 26, 2026, 11_23_09 PM.png";

const sidebarItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Everything", icon: <EverythingIcon /> },
  { label: "Workflow", icon: <WorkflowIcon /> },
  { label: "Products", icon: <ProductsIcon /> },
];

type ProjectItem = {
  id: string;
  label: string;
  color: string;
  badge?: string;
  tabs: string[];
  pinnedTabs: string[];
  lastOpenedTab: string;
  recentOrder: number;
  active?: boolean;
};

const projectItems: ProjectItem[] = [
  {
    id: "restore-serum-pdp",
    label: "Restore Serum — PDP",
    color: "#c0705a",
    active: true,
    tabs: ["Overview", "Go-Live Checklist", "Campaign Shoot", "PDP Assets", "Creator Briefs"],
    pinnedTabs: ["Go-Live Checklist", "PDP Assets"],
    lastOpenedTab: "Go-Live Checklist",
    recentOrder: 0,
  },
  {
    id: "q2-brand-refresh",
    label: "Q2 Brand Refresh",
    color: "#5a8a5a",
    tabs: ["Overview", "Brand Guidelines", "Asset Tracker", "Approvals"],
    pinnedTabs: ["Asset Tracker"],
    lastOpenedTab: "Brand Guidelines",
    recentOrder: 2,
  },
  {
    id: "summer-campaign",
    label: "Summer Campaign",
    color: "#6a7ec0",
    badge: "2",
    tabs: ["Overview", "Campaign Shoot", "Creator Briefs", "Launch Plan"],
    pinnedTabs: ["Launch Plan"],
    lastOpenedTab: "Campaign Shoot",
    recentOrder: 1,
  },
  {
    id: "packaging-v3",
    label: "Packaging v3",
    color: "#cccccc",
    tabs: ["Overview", "Supplier Review", "Final Dielines"],
    pinnedTabs: [],
    lastOpenedTab: "Supplier Review",
    recentOrder: 3,
  },
];

const secondarySidebarItems = [
  { label: "Docs", icon: <DocsIcon /> },
  { label: "Calendar", icon: <CalendarIcon /> },
];

const shopifyHighlights = [
  { label: "Price", value: "$64.00" },
  { label: "Inventory", value: "340 units", valueClassName: "hero-workspace-metric-value-success" },
];

const shopifyDetails = [
  { label: "Product", value: "The Restore Serum" },
  { label: "Variant", value: "30ml · Single variant" },
  { label: "SKU", value: "RS-30ML-001" },
  { label: "Shopify ID", value: "gid://9182746", valueClassName: "hero-workspace-metric-value-mono" },
];

const chartRows = [
  { label: "Done", value: 3, width: "37.5%", tone: "done" as const },
  { label: "In Progress", value: 1, width: "12.5%", tone: "progress" as const },
  { label: "To Do", value: 4, width: "50%", tone: "todo" as const },
];

const aiSuggestions = [
  { icon: "↑", tone: "hero-workspace-suggestion-icon-urgent", text: <><strong>PDP copy</strong> is the only Urgent task — blocking publish.</> },
  { icon: "→", tone: "hero-workspace-suggestion-icon-info", text: <><strong>Sara</strong> owns 3 of 4 remaining tasks. Consider redistributing.</> },
  { icon: "✓", tone: "hero-workspace-suggestion-icon-success", text: <>Listing is <strong>Draft</strong> — on track if tasks close today.</> },
];

const HERO_SCROLL_EPSILON = 2;
const HERO_SCROLL_ACTIVATION_TOP = 96;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function Pill({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "done" | "progress" | "todo" | "urgent" | "high";
}) {
  return <span className={cx("hero-workspace-pill", `hero-workspace-pill-${tone}`)}>{children}</span>;
}

function Avatar({
  children,
  tone,
  className,
}: {
  children: ReactNode;
  tone: "sl" | "jm" | "rc";
  className?: string;
}) {
  return <div className={cx("hero-workspace-avatar", `hero-workspace-avatar-${tone}`, className)}>{children}</div>;
}

export function HeroWorkspaceVisual() {
  const visualRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const aiMessagesRef = useRef<HTMLDivElement | null>(null);
  const lastTouchYRef = useRef<number | null>(null);
  const initialActiveProjectId = projectItems.find((project) => project.active)?.id ?? projectItems[0].id;
  const [activeProjectId, setActiveProjectId] = useState(initialActiveProjectId);
  const [activeTabByProject, setActiveTabByProject] = useState<Record<string, string>>(() =>
    projectItems.reduce<Record<string, string>>((acc, project) => {
      acc[project.id] = project.lastOpenedTab;
      return acc;
    }, {})
  );

  const activeProject = useMemo(
    () => projectItems.find((project) => project.id === activeProjectId) ?? projectItems[0],
    [activeProjectId]
  );
  const activeTab = activeTabByProject[activeProject.id] ?? activeProject.lastOpenedTab;
  const recentlyOpenedProjects = useMemo(
    () => [...projectItems].sort((a, b) => a.recentOrder - b.recentOrder).slice(0, 3),
    []
  );

  const openProject = (projectId: string, tab?: string) => {
    const project = projectItems.find((item) => item.id === projectId);
    if (!project) {
      return;
    }

    const nextTab = tab ?? activeTabByProject[projectId] ?? project.lastOpenedTab;
    setActiveProjectId(projectId);
    setActiveTabByProject((prev) => ({
      ...prev,
      [projectId]: nextTab,
    }));
  };

  useEffect(() => {
    const canConsumeScroll = (element: HTMLDivElement | null, deltaY: number) => {
      if (!element) {
        return false;
      }

      if (deltaY > 0) {
        return element.scrollTop + element.clientHeight < element.scrollHeight - HERO_SCROLL_EPSILON;
      }

      if (deltaY < 0) {
        return element.scrollTop > HERO_SCROLL_EPSILON;
      }

      return false;
    };

    const shouldCapturePageScroll = () => {
      const visual = visualRef.current;
      if (!visual) {
        return false;
      }

      const rect = visual.getBoundingClientRect();
      const hasReachedVisual = rect.top <= HERO_SCROLL_ACTIVATION_TOP;
      const visualStillInView = rect.bottom > window.innerHeight * 0.22;

      return hasReachedVisual && visualStillInView;
    };

    const consumeVisualScroll = (deltaY: number) => {
      if (deltaY <= 0) {
        return false;
      }

      const canvas = canvasRef.current;
      const aiMessages = aiMessagesRef.current;
      const canvasCanScroll = canConsumeScroll(canvas, deltaY);
      const aiCanScroll = canConsumeScroll(aiMessages, deltaY);

      if (!canvasCanScroll && !aiCanScroll) {
        return false;
      }

      if (canvasCanScroll) {
        canvas?.scrollBy({ top: deltaY });
      }

      if (aiCanScroll) {
        aiMessages?.scrollBy({ top: deltaY * 0.8 });
      }

      return true;
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      if (event.deltaY <= 0) {
        return;
      }

      if (!shouldCapturePageScroll()) {
        return;
      }

      if (consumeVisualScroll(event.deltaY)) {
        event.preventDefault();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 1) {
        lastTouchYRef.current = null;
        return;
      }

      lastTouchYRef.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length !== 1 || lastTouchYRef.current === null) {
        return;
      }

      const currentTouchY = event.touches[0].clientY;
      const deltaY = lastTouchYRef.current - currentTouchY;
      lastTouchYRef.current = currentTouchY;

      if (deltaY <= 0) {
        return;
      }

      if (!shouldCapturePageScroll()) {
        return;
      }

      if (consumeVisualScroll(deltaY)) {
        event.preventDefault();
      }
    };

    const resetTouch = () => {
      lastTouchYRef.current = null;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", resetTouch, { passive: true });
    window.addEventListener("touchcancel", resetTouch, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetTouch);
      window.removeEventListener("touchcancel", resetTouch);
    };
  }, []);

  return (
    <div ref={visualRef} className="hero-workspace-visual">
      <div className="hero-workspace-window">
        <div className="hero-workspace-app">
          <div className="hero-workspace-titlebar">
            <div className="hero-workspace-dots">
              <span className="hero-workspace-dot hero-workspace-dot-red" />
              <span className="hero-workspace-dot hero-workspace-dot-yellow" />
              <span className="hero-workspace-dot hero-workspace-dot-green" />
            </div>
          </div>

          <div className="hero-workspace-body">
            <aside className="hero-workspace-sidebar">
              <div className="hero-workspace-nav-scroll">
                {sidebarItems.map((item) => (
                  <div key={item.label} className="hero-workspace-nav-item">
                    {item.icon}
                    <span className="hero-workspace-nav-label">{item.label}</span>
                  </div>
                ))}

                <div className="hero-workspace-section-divider" />
                <div className="hero-workspace-section-title">Projects</div>

                {projectItems.map((project) => (
                  <div key={project.id} className="hero-workspace-project-group">
                    <button
                      type="button"
                      className={cx(
                        "hero-workspace-project-item",
                        project.id === activeProject.id && "is-active"
                      )}
                      onClick={() => openProject(project.id)}
                    >
                      <span className="hero-workspace-project-dot" style={{ backgroundColor: project.color }} />
                      <span className="hero-workspace-project-label">{project.label}</span>
                      {project.badge ? (
                        <span className="hero-workspace-project-badge">{project.badge}</span>
                      ) : null}
                    </button>
                    {project.pinnedTabs.length ? (
                      <div className="hero-workspace-pinned-tab-list">
                        {project.pinnedTabs.map((pinnedTab) => (
                          <button
                            key={`${project.id}-${pinnedTab}`}
                            type="button"
                            className={cx(
                              "hero-workspace-pinned-tab-item",
                              project.id === activeProject.id &&
                                activeTabByProject[project.id] === pinnedTab &&
                                "is-active"
                            )}
                            onClick={() => openProject(project.id, pinnedTab)}
                          >
                            <PinIcon />
                            <span>{pinnedTab}</span>
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}

                <div className="hero-workspace-section-title">Recently opened</div>
                {recentlyOpenedProjects.map((project) => (
                  <button
                    key={`recent-${project.id}`}
                    type="button"
                    className={cx(
                      "hero-workspace-recent-item",
                      project.id === activeProject.id && "is-active"
                    )}
                    onClick={() => openProject(project.id)}
                  >
                    <span className="hero-workspace-recent-project">{project.label}</span>
                    <span className="hero-workspace-recent-tab">
                      {activeTabByProject[project.id] ?? project.lastOpenedTab}
                    </span>
                  </button>
                ))}

                <div className="hero-workspace-section-divider" />

                {secondarySidebarItems.map((item) => (
                  <div key={item.label} className="hero-workspace-nav-item">
                    {item.icon}
                    <span className="hero-workspace-nav-label">{item.label}</span>
                  </div>
                ))}
              </div>
            </aside>

            <div className="hero-workspace-main">
              <div className="hero-workspace-project-header">
                <div className="hero-workspace-breadcrumb">
                  <ChevronLeftIcon />
                  <span>Projects</span>
                </div>
                <div className="hero-workspace-project-name">{activeProject.label}</div>
                <div className="hero-workspace-header-meta">
                  <span className="hero-workspace-status-chip">In Progress</span>
                  <span className="hero-workspace-date-chip">Due May 2</span>
                </div>
                <div className="hero-workspace-tabs">
                  {activeProject.tabs.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={cx("hero-workspace-tab", tab === activeTab && "is-active")}
                      onClick={() =>
                        setActiveTabByProject((prev) => ({
                          ...prev,
                          [activeProject.id]: tab,
                        }))
                      }
                    >
                      {tab}
                      {activeProject.pinnedTabs.includes(tab) ? (
                        <span className="hero-workspace-tab-pin" aria-hidden="true">
                          <PinIcon />
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hero-workspace-content-area">
                <div ref={canvasRef} className="hero-workspace-canvas" tabIndex={0}>
                  <div className="hero-workspace-block">
                    <div className="hero-workspace-block-bar">
                      <div className="hero-workspace-block-label">
                        <ChecklistIcon />
                        <span>{activeTab}</span>
                      </div>
                      <div className="hero-workspace-block-views">
                        <span className="hero-workspace-view-btn is-active">List</span>
                        <span className="hero-workspace-view-btn">Board</span>
                        <span className="hero-workspace-view-btn">Table</span>
                        <span className="hero-workspace-view-btn">Columns ∨</span>
                      </div>
                    </div>

                    <div className="hero-workspace-group-row">
                      <span className="hero-workspace-group-arrow" />
                      <span className="hero-workspace-group-name">Content &amp; Copy</span>
                      <span className="hero-workspace-group-count">3</span>
                    </div>

                    <div className="hero-workspace-task-row">
                      <span className="hero-workspace-check is-done" />
                      <div className="hero-workspace-task-main">
                        <span className="hero-workspace-task-title is-done">Write ingredient callouts</span>
                        <Pill tone="done">Done</Pill>
                      </div>
                      <div className="hero-workspace-task-meta">
                        <Avatar tone="sl">SL</Avatar>
                        <span className="hero-workspace-task-date">Apr 20</span>
                      </div>
                    </div>

                    <div className="hero-workspace-task-row is-selected">
                      <span className="hero-workspace-check is-progress" />
                      <div className="hero-workspace-task-main">
                        <span className="hero-workspace-task-title is-active">
                          Write PDP copy — The Restore Serum
                        </span>
                        <Pill tone="progress">In Progress</Pill>
                        <Pill tone="urgent">Urgent</Pill>
                      </div>
                      <div className="hero-workspace-task-meta">
                        <Avatar tone="sl">SL</Avatar>
                        <span className="hero-workspace-task-date">May 1</span>
                        <ChevronDownIcon />
                      </div>
                    </div>

                    <div className="hero-workspace-expanded-wrap">
                      <div className="hero-workspace-expanded-inner">
                        <div className="hero-workspace-expanded-left">
                          <div className="hero-workspace-expanded-title">
                            Write PDP copy — The Restore Serum
                          </div>
                          <div className="hero-workspace-expanded-pills">
                            <Pill tone="progress">In Progress</Pill>
                            <Pill tone="urgent">Urgent</Pill>
                            <span className="hero-workspace-tag">Copy</span>
                            <span className="hero-workspace-tag">PDP</span>
                          </div>
                          <div className="hero-workspace-expanded-description">
                            <p>
                              Write the full product description for The Restore Serum 30ml. Lead
                              with the hero benefit (barrier repair), call out key actives —
                              ceramides, niacinamide, squalane.
                            </p>
                            <p>Tone: clinical but warm. Match the brand voice doc.</p>
                          </div>

                          <div className="hero-workspace-section-label">
                            Subtasks <span>2 of 4</span>
                          </div>
                          <div className="hero-workspace-subtask-row">
                            <span className="hero-workspace-subtask-check is-done" />
                            <span className="hero-workspace-subtask-text is-done">
                              Review approved ingredient callouts
                            </span>
                          </div>
                          <div className="hero-workspace-subtask-row">
                            <span className="hero-workspace-subtask-check is-done" />
                            <span className="hero-workspace-subtask-text is-done">
                              Get final INCI list from Rosa
                            </span>
                          </div>
                          <div className="hero-workspace-subtask-row">
                            <span className="hero-workspace-subtask-check" />
                            <span className="hero-workspace-subtask-text">
                              Write hero paragraph + active callouts
                            </span>
                          </div>
                          <div className="hero-workspace-subtask-row">
                            <span className="hero-workspace-subtask-check" />
                            <span className="hero-workspace-subtask-text">
                              Write usage + who it&apos;s for section
                            </span>
                          </div>

                          <div className="hero-workspace-section-label hero-workspace-section-label-activity">
                            Activity
                          </div>
                          <div className="hero-workspace-comment">
                            <Avatar tone="jm" className="hero-workspace-avatar-comment">
                              JM
                            </Avatar>
                            <div className="hero-workspace-comment-body">
                              <div className="hero-workspace-comment-meta">
                                <span className="hero-workspace-comment-name">James</span>
                                <span className="hero-workspace-comment-time">2h ago</span>
                              </div>
                              <div className="hero-workspace-comment-text">
                                Going live <strong>tomorrow morning</strong> — this is the last
                                thing blocking publish.
                              </div>
                            </div>
                          </div>
                          <div className="hero-workspace-comment">
                            <Avatar tone="sl" className="hero-workspace-avatar-comment">
                              SL
                            </Avatar>
                            <div className="hero-workspace-comment-body">
                              <div className="hero-workspace-comment-meta">
                                <span className="hero-workspace-comment-name">Sara</span>
                                <span className="hero-workspace-comment-time">45 min ago</span>
                              </div>
                              <div className="hero-workspace-comment-text">
                                On it — was waiting on the <strong>final INCI list</strong> from
                                Rosa. First draft by EOD.
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="hero-workspace-expanded-right">
                          <div className="hero-workspace-section-label hero-workspace-section-label-top">
                            Properties
                          </div>
                          <div className="hero-workspace-property-row">
                            <span className="hero-workspace-property-label">Status</span>
                            <span className="hero-workspace-property-value">
                              <Pill tone="progress">In Progress</Pill>
                            </span>
                          </div>
                          <div className="hero-workspace-property-row">
                            <span className="hero-workspace-property-label">Priority</span>
                            <span className="hero-workspace-property-value">
                              <Pill tone="urgent">Urgent</Pill>
                            </span>
                          </div>
                          <div className="hero-workspace-property-row">
                            <span className="hero-workspace-property-label">Assignee</span>
                            <span className="hero-workspace-property-value">
                              <Avatar tone="sl" className="hero-workspace-avatar-inline">
                                SL
                              </Avatar>
                              Sara L.
                            </span>
                          </div>
                          <div className="hero-workspace-property-row">
                            <span className="hero-workspace-property-label">Due date</span>
                            <span className="hero-workspace-property-value">May 1, 2026</span>
                          </div>
                          <div className="hero-workspace-property-row">
                            <span className="hero-workspace-property-label">Tags</span>
                            <span className="hero-workspace-property-value">
                              <span className="hero-workspace-tag">Copy</span>
                              <span className="hero-workspace-tag">PDP</span>
                            </span>
                          </div>
                          <div className="hero-workspace-property-row">
                            <span className="hero-workspace-property-label">Subtasks</span>
                            <span className="hero-workspace-property-value is-success">2 / 4 done</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="hero-workspace-task-row">
                      <span className="hero-workspace-check" />
                      <div className="hero-workspace-task-main">
                        <span className="hero-workspace-task-title">Meta description + SEO title</span>
                        <Pill tone="todo">To Do</Pill>
                        <Pill tone="high">High</Pill>
                      </div>
                      <div className="hero-workspace-task-meta">
                        <Avatar tone="sl">SL</Avatar>
                        <span className="hero-workspace-task-date">May 1</span>
                      </div>
                    </div>

                    <div className="hero-workspace-group-row">
                      <span className="hero-workspace-group-arrow" />
                      <span className="hero-workspace-group-name">Shopify Setup</span>
                      <span className="hero-workspace-group-count">2</span>
                    </div>

                    <div className="hero-workspace-task-row">
                      <span className="hero-workspace-check is-done" />
                      <div className="hero-workspace-task-main">
                        <span className="hero-workspace-task-title is-done">
                          Set pricing + compare-at price
                        </span>
                        <Pill tone="done">Done</Pill>
                      </div>
                      <div className="hero-workspace-task-meta">
                        <Avatar tone="rc">RC</Avatar>
                        <span className="hero-workspace-task-date">Apr 28</span>
                      </div>
                    </div>

                    <div className="hero-workspace-task-row is-last">
                      <span className="hero-workspace-check" />
                      <div className="hero-workspace-task-main">
                        <span className="hero-workspace-task-title">Publish listing — go live</span>
                        <Pill tone="todo">To Do</Pill>
                        <Pill tone="urgent">Urgent</Pill>
                      </div>
                      <div className="hero-workspace-task-meta">
                        <Avatar tone="rc">RC</Avatar>
                        <span className="hero-workspace-task-date">May 2</span>
                      </div>
                    </div>

                    <div className="hero-workspace-add-task">
                      <PlusIcon />
                      <span>Add task</span>
                    </div>
                  </div>

                  <div className="hero-workspace-block">
                    <div className="hero-workspace-block-bar">
                      <div className="hero-workspace-block-label hero-workspace-block-label-doc">
                        <GoogleDocIcon />
                        <span className="hero-workspace-google-title">
                          PDP Copy — The Restore Serum
                        </span>
                        <span className="hero-workspace-google-meta">· Google Doc</span>
                      </div>
                      <div className="hero-workspace-doc-actions">
                        <span>Last edited by Sara · 45 min ago</span>
                        <span className="hero-workspace-doc-open">
                          Open
                          <OpenIcon />
                        </span>
                      </div>
                    </div>

                    <div className="hero-workspace-doc-content">
                      <div className="hero-workspace-doc-preview">
                        <div className="hero-workspace-doc-preview-topbar">
                          <GoogleDocIcon compact />
                          <span className="hero-workspace-doc-preview-title">
                            PDP Copy — The Restore Serum
                          </span>
                          <span className="hero-workspace-doc-preview-domain">docs.google.com</span>
                        </div>
                        <div className="hero-workspace-doc-preview-body">
                          <div className="hero-workspace-doc-heading">The Restore Serum — PDP Copy</div>
                          <div className="hero-workspace-doc-submeta">
                            Sara L. · edited 45 min ago · <span>Shared</span>
                          </div>

                          <div className="hero-workspace-doc-section">
                            <div className="hero-workspace-doc-section-title">Hero paragraph</div>
                            <div className="hero-workspace-doc-line" />
                            <div className="hero-workspace-doc-line hero-workspace-doc-line-short" />
                            <div className="hero-workspace-doc-line hero-workspace-doc-line-mid" />
                          </div>

                          <div className="hero-workspace-doc-section">
                            <div className="hero-workspace-doc-section-title">Key actives</div>
                            <div className="hero-workspace-doc-list-row">
                              <span className="hero-workspace-doc-bullet" />
                              <div className="hero-workspace-doc-line hero-workspace-doc-line-list" />
                            </div>
                            <div className="hero-workspace-doc-list-row">
                              <span className="hero-workspace-doc-bullet" />
                              <div className="hero-workspace-doc-line hero-workspace-doc-line-list-short" />
                            </div>
                            <div className="hero-workspace-doc-list-row">
                              <span className="hero-workspace-doc-bullet" />
                              <div className="hero-workspace-doc-line hero-workspace-doc-line-list-mid" />
                            </div>
                          </div>

                          <div className="hero-workspace-doc-section">
                            <div className="hero-workspace-doc-section-title">Usage instructions</div>
                            <div className="hero-workspace-doc-line" />
                            <div className="hero-workspace-doc-edit-row">
                              <div className="hero-workspace-doc-highlight-line" />
                              <div className="hero-workspace-doc-caret" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hero-workspace-doc-side">
                        <div>
                          <div className="hero-workspace-section-label hero-workspace-section-label-top">
                            Active now
                          </div>
                          <div className="hero-workspace-active-row">
                            <Avatar tone="sl" className="hero-workspace-avatar-online">
                              SL
                            </Avatar>
                            <span className="hero-workspace-active-text">Sara L. is editing</span>
                            <span className="hero-workspace-online-dot" />
                          </div>
                        </div>

                        <div>
                          <div className="hero-workspace-section-label hero-workspace-section-label-top">
                            Latest comment
                          </div>
                          <div className="hero-workspace-note-box">
                            <div className="hero-workspace-note-meta">
                              <Avatar tone="jm" className="hero-workspace-avatar-inline">
                                JM
                              </Avatar>
                              <span className="hero-workspace-comment-name">James</span>
                              <span className="hero-workspace-comment-time hero-workspace-comment-time-push">
                                2h ago
                              </span>
                            </div>
                            <div className="hero-workspace-note-text">
                              &quot;Lead with barrier repair — that&apos;s the hook.&quot;
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="hero-workspace-block">
                    <div className="hero-workspace-block-bar">
                      <div className="hero-workspace-block-label">
                        <ShopifyIcon />
                        <span className="hero-workspace-shopify-title">Shopify</span>
                        <span className="hero-workspace-shopify-meta">— The Restore Serum</span>
                      </div>
                      <span className="hero-workspace-shopify-sync">Last synced 14 min ago</span>
                    </div>

                    <div className="hero-workspace-shopify-panel">
                      <div className="hero-workspace-shopify-product-card">
                        <div className="hero-workspace-shopify-product-top">
                          <div className="hero-workspace-shopify-thumbnail">
                            <Image
                              src={serumProductImage}
                              alt="The Restore Serum product image"
                              className="hero-workspace-shopify-thumbnail-image"
                              sizes="46px"
                            />
                          </div>
                          <div className="hero-workspace-shopify-card">
                            <div className="hero-workspace-shopify-product-title">The Restore Serum</div>
                            <div className="hero-workspace-shopify-product-subtitle">
                              30ml · Single variant
                            </div>
                            <div className="hero-workspace-shopify-source-label">
                              Live product fields from Shopify
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="hero-workspace-shopify-side">
                        <div className="hero-workspace-shopify-highlights">
                          {shopifyHighlights.map((metric) => (
                            <div key={metric.label} className="hero-workspace-shopify-highlight-card">
                              <div className="hero-workspace-metric-label">{metric.label}</div>
                              <div
                                className={cx(
                                  "hero-workspace-metric-value",
                                  metric.valueClassName
                                )}
                              >
                                {metric.value}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="hero-workspace-shopify-detail-grid">
                          {shopifyDetails.map((detail) => (
                            <div key={detail.label} className="hero-workspace-shopify-detail-row">
                              <div className="hero-workspace-shopify-detail-label">{detail.label}</div>
                              <div
                                className={cx(
                                  "hero-workspace-shopify-detail-value",
                                  detail.valueClassName
                                )}
                              >
                                {detail.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <aside className="hero-workspace-ai-panel">
                  <div className="hero-workspace-ai-top">
                    <span className="hero-workspace-ai-dot" />
                    <span className="hero-workspace-ai-name">Trak AI</span>
                  </div>
                  <div ref={aiMessagesRef} className="hero-workspace-ai-messages" tabIndex={0}>
                    <div className="hero-workspace-ai-user">
                      Create a chart of tasks by status for this project
                    </div>
                    <div className="hero-workspace-ai-body">
                      <div className="hero-workspace-ai-intro">
                        Here&apos;s a breakdown of all 8 tasks by status:
                      </div>
                      <div className="hero-workspace-chart-box">
                        <div className="hero-workspace-chart-label">Tasks by status</div>
                        {chartRows.map((row) => (
                          <div key={row.label} className="hero-workspace-bar-row">
                            <div className="hero-workspace-bar-label">{row.label}</div>
                            <div className="hero-workspace-bar-track">
                              <div
                                className={cx(
                                  "hero-workspace-bar-fill",
                                  `hero-workspace-bar-fill-${row.tone}`
                                )}
                                style={{ width: row.width }}
                              />
                            </div>
                            <div className="hero-workspace-bar-count">{row.value}</div>
                          </div>
                        ))}
                        <div className="hero-workspace-legend">
                          <div className="hero-workspace-legend-item">
                            <span className="hero-workspace-legend-dot hero-workspace-legend-dot-done" />
                            <span>Done</span>
                          </div>
                          <div className="hero-workspace-legend-item">
                            <span className="hero-workspace-legend-dot hero-workspace-legend-dot-progress" />
                            <span>In progress</span>
                          </div>
                          <div className="hero-workspace-legend-item">
                            <span className="hero-workspace-legend-dot hero-workspace-legend-dot-todo" />
                            <span>To do</span>
                          </div>
                        </div>
                      </div>

                      <div className="hero-workspace-suggestions">
                        {aiSuggestions.map((suggestion) => (
                          <div key={suggestion.icon} className="hero-workspace-suggestion">
                            <span className={cx("hero-workspace-suggestion-icon", suggestion.tone)}>
                              {suggestion.icon}
                            </span>
                            <div className="hero-workspace-suggestion-text">{suggestion.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hero-workspace-ai-bottom">
                    <div className="hero-workspace-ai-input">
                      <span>Ask anything...</span>
                      <span className="hero-workspace-send-btn">
                        <SendIcon />
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M2 6L8 2L14 6V13C14 13.55 13.55 14 13 14H3C2.45 14 2 13.55 2 13V6Z" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function EverythingIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <ellipse cx="8" cy="8" rx="6" ry="4.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M8 3.5V12.5M2 8H14" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 8H11M5 5.5H11M5 10.5H8.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ProductsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 2L14 5V11L8 14L2 11V5L8 2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 2V14M2 5L8 8L14 5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function DocsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 2H10L13 5V14H4V2Z" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10 2V5H13" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6 8H11M6 10.5H9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5 3V2M11 3V2M2 7H14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ChevronLeftIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M6 2L3 5L6 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="0.5" y="0.5" width="11" height="11" rx="2" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M3 4H9M3 6H7M3 8H8" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path
        d="M4.2 2.2H7.8L7.2 5L8.9 6.7V7.4H6.6V10L5.4 10.8V7.4H3.1V6.7L4.8 5L4.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function GoogleDocIcon({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      width={compact ? "12" : "12"}
      height={compact ? "14" : "14"}
      viewBox="0 0 18 22"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M11 1H3C1.9 1 1 1.9 1 3V19C1 20.1 1.9 21 3 21H15C16.1 21 17 20.1 17 19V7L11 1Z"
        fill="#e8f0fe"
        stroke="#4285f4"
        strokeWidth="1.3"
      />
      <path d="M11 1V7H17" stroke="#4285f4" strokeWidth="1.3" strokeLinecap="round" />
      {!compact ? (
        <path d="M5 12H13M5 15.5H10" stroke="#4285f4" strokeWidth="1.3" strokeLinecap="round" />
      ) : null}
    </svg>
  );
}

function OpenIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 8L8 2M8 2H4M8 2V6" stroke="#4285f4" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShopifyIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M10.5 2.5C10.5 2.5 10.2 1 8.5 1C7.5 1 6.8 1.8 6.5 2.5H3L2 12H12L11 2.5H10.5Z" stroke="#3a8a30" strokeWidth="1.1" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
      <path d="M4 7V1M1 4L4 1L7 4" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
