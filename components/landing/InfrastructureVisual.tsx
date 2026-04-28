"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";

const collageImages = [
  { key: "s1", src: "/media/infraforbrands/s1.jpg", alt: "Snowboard launch inspiration hero" },
  { key: "s2", src: "/media/infraforbrands/s2.jpeg", alt: "Snowboard launch inspiration angle two" },
  { key: "s3", src: "/media/infraforbrands/s3.jpg", alt: "Snowboard launch inspiration angle three" },
  { key: "s4", src: "/media/infraforbrands/s4.jpeg", alt: "Snowboard launch inspiration angle four" },
] as const;

const designTasks = [
  {
    title: "Review snowboard spray photo for email hero",
    status: "In Progress",
    priority: "Medium",
    assignee: "Malia",
    due: "Mar 18",
    comments: 1,
  },
  {
    title: "Shortlist action shots for launch visuals",
    status: "Done",
    priority: "Urgent",
    assignee: "Amna",
    due: "Mar 16",
    comments: 1,
  },
  {
    title: "Refine top sheet graphic for the Pro Rider board",
    status: "In Progress",
    priority: "High",
    assignee: "Inez",
    due: "Mar 20",
    comments: 0,
  },
  {
    title: "Apply winter launch color palette to board graphics",
    status: "To-Do",
    priority: "Medium",
    assignee: "Amna",
    due: "Mar 22",
    comments: 0,
    tags: ["Brand", "Creative"],
  },
  {
    title: "Create product badge placement for the snowboard visuals",
    status: "To-Do",
    priority: "Medium",
    assignee: "Robert",
    due: "",
    comments: 0,
  },
] as const;

const PEOPLE = [
  { name: "Inez", avatar: "I" },
  { name: "Isabel", avatar: "I" },
  { name: "Imani", avatar: "I" },
  { name: "Malia", avatar: "M" },
  { name: "Robert", avatar: "R" },
  { name: "Amna", avatar: "A" },
] as const;

const COMMENT_BODY = "use this photo for the header on Monday's email newsletter";
const NOTE_BODY = "Finalized the black snowboard shot.";
const LOOP_MS = 15600;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function typedSlice(text: string, elapsed: number, start: number, speed: number) {
  if (elapsed < start) {
    return "";
  }

  const count = Math.floor((elapsed - start) / speed) + 1;
  return text.slice(0, clamp(count, 0, text.length));
}

function rangeProgress(elapsed: number, start: number, end: number) {
  if (elapsed <= start) {
    return 0;
  }

  if (elapsed >= end) {
    return 1;
  }

  return (elapsed - start) / (end - start);
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function pointBetween(
  from: { x: number; y: number },
  to: { x: number; y: number },
  progress: number,
) {
  return {
    x: lerp(from.x, to.x, progress),
    y: lerp(from.y, to.y, progress),
  };
}

function statusPillClass(status: string) {
  switch (status) {
    case "Done":
      return "bg-[#DFFAE6] text-[#15803d]";
    case "In Progress":
      return "bg-[#E0EAF5] text-[#2A537A]";
    default:
      return "bg-[#F3F3F1] text-[#666]";
  }
}

function priorityPillClass(priority: string) {
  switch (priority) {
    case "Urgent":
      return "bg-[#FEE2E2] text-[#B91C1C]";
    case "High":
      return "bg-[#FFE7D1] text-[#C2410C]";
    default:
      return "bg-[#FEF5D8] text-[#A16207]";
  }
}

export function InfrastructureVisual() {
  const [clock, setClock] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const firstImageRef = useRef<HTMLDivElement | null>(null);
  const commentInputRef = useRef<HTMLDivElement | null>(null);
  const firstTaskRowRef = useRef<HTMLDivElement | null>(null);
  const notesFieldRef = useRef<HTMLDivElement | null>(null);
  const firstStatusPillRef = useRef<HTMLSpanElement | null>(null);
  const doneStatusOptionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.35 },
    );

    const current = shellRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    const start = performance.now();
    let frameId = 0;

    const tick = () => {
      setClock(performance.now() - start);
      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(frameId);
  }, [hasStarted]);

  const elapsed = hasStarted ? clock % LOOP_MS : 0;
  const isFocused = elapsed >= 1320;
  const showContextMenu = elapsed >= 2200 && elapsed < 3140;
  const highlightAddComment = elapsed >= 2770 && elapsed < 2990;
  const showCommentPanel = elapsed >= 3240;
  const showCommentBubble = elapsed >= 3520;
  const showMentionPopup = elapsed >= 3880 && elapsed < 5140;
  const highlightMention = elapsed >= 4700 && elapsed < 4940;
  const mentionCommitted = elapsed >= 4940;
  const commentPosted = elapsed >= 7580;
  const showTaskModal = elapsed >= 9620 && elapsed < 12150;
  const showStatusMenu = elapsed >= 12600 && elapsed < 13650;
  const highlightDoneOption = elapsed >= 13120 && elapsed < 13650;
  const isDone = elapsed >= 13650;
  const showTaskRowHighlight = elapsed >= 9120 && elapsed < 9570;

  const rawMentionQuery = typedSlice("inez", elapsed, 4050, 46);
  const mentionQuery = mentionCommitted ? "inez" : rawMentionQuery;
  const commentTail = typedSlice(COMMENT_BODY, elapsed, 5260, 32);
  const noteText = typedSlice(NOTE_BODY, elapsed, 10040, 34);

  const filteredMentions = (mentionQuery ? PEOPLE.filter((person) => person.name.toLowerCase().startsWith(mentionQuery)) : PEOPLE.slice(0, 4)).slice(0, 4);

  const currentStatus = isDone ? "Done" : "In Progress";

  const getRelativePoint = (
    element: HTMLElement | null,
    horizontal = 0.5,
    vertical = 0.5,
    fallback = { x: 0, y: 0 },
  ) => {
    const frame = frameRef.current;
    if (!frame || !element) {
      return fallback;
    }

    const frameRect = frame.getBoundingClientRect();
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left - frameRect.left + rect.width * horizontal,
      y: rect.top - frameRect.top + rect.height * vertical,
    };
  };

  const imagePoint = getRelativePoint(firstImageRef.current, 0.5, 0.5, { x: 140, y: 185 });
  const heroPoint = getRelativePoint(firstImageRef.current, 0.55, 0.38, { x: 690, y: 262 });
  const commentInputPoint = getRelativePoint(commentInputRef.current, 0.86, 0.82, { x: 1080, y: 340 });
  const taskPoint = getRelativePoint(firstTaskRowRef.current, 0.35, 0.5, { x: 300, y: 476 });
  const notesPoint = getRelativePoint(notesFieldRef.current, 0.9, 0.3, { x: 1015, y: 520 });
  const statusPoint = getRelativePoint(firstStatusPillRef.current, 0.5, 0.5, { x: 250, y: 495 });
  const doneStatusPoint = getRelativePoint(doneStatusOptionRef.current, 0.78, 0.5, { x: 285, y: 602 });

  const imageApproachPoint = { x: imagePoint.x - 50, y: imagePoint.y - 20 };
  const heroApproachPoint = { x: heroPoint.x - 40, y: heroPoint.y - 15 };

  let cursor = { x: imageApproachPoint.x, y: imageApproachPoint.y, opacity: 0 };
  if (elapsed >= 800 && elapsed < LOOP_MS) {
    cursor.opacity = elapsed > 14950 ? 1 - rangeProgress(elapsed, 14950, 15550) : 1;

    if (elapsed < 1280) {
      const progress = rangeProgress(elapsed, 760, 1280);
      cursor = { ...pointBetween(imageApproachPoint, imagePoint, progress), opacity: 1 };
    } else if (elapsed < 1920) {
      const progress = rangeProgress(elapsed, 1440, 1920);
      cursor = { ...pointBetween(heroApproachPoint, heroPoint, progress), opacity: 1 };
    } else if (elapsed < 3180) {
      cursor = { ...heroPoint, opacity: 1 };
    } else if (elapsed < 3560) {
      const progress = rangeProgress(elapsed, 3180, 3560);
      cursor = { ...pointBetween(heroPoint, commentInputPoint, progress), opacity: 1 };
    } else if (elapsed < 9120) {
      cursor = { ...commentInputPoint, opacity: 1 };
    } else if (elapsed < 9570) {
      const progress = rangeProgress(elapsed, 9120, 9570);
      cursor = { ...pointBetween(commentInputPoint, taskPoint, progress), opacity: 1 };
    } else if (elapsed < 10140) {
      const progress = rangeProgress(elapsed, 9570, 10140);
      cursor = { ...pointBetween(taskPoint, notesPoint, progress), opacity: 1 };
    } else if (elapsed < 12150) {
      cursor = { ...notesPoint, opacity: 1 };
    } else if (elapsed < 12560) {
      const progress = rangeProgress(elapsed, 12150, 12560);
      cursor = { ...pointBetween(notesPoint, statusPoint, progress), opacity: 1 };
    } else if (elapsed < 13110) {
      const progress = rangeProgress(elapsed, 12740, 13110);
      cursor = { ...pointBetween(statusPoint, doneStatusPoint, progress), opacity: 1 };
    } else {
      cursor = { ...doneStatusPoint, opacity: cursor.opacity };
    }
  }

  const commentMeta = mentionCommitted ? (
    <>
      <span className="rounded-[4px] bg-[#E6EEF7] px-[5px] py-[1px] font-medium text-[#2A537A]">@Inez</span>{" "}
      {commentTail}
      {!commentPosted ? <TypingCaret /> : null}
    </>
  ) : elapsed >= 4200 ? (
    <>
      @{mentionQuery}
      {showCommentBubble && !commentPosted ? <TypingCaret /> : null}
    </>
  ) : elapsed >= 3900 ? (
    <>
      @
      <TypingCaret />
    </>
  ) : null;

  return (
    <div ref={shellRef} className="infra-demo-shell mx-auto w-full max-w-[1240px]">
      <div className="infra-demo-window">
        <div
          ref={frameRef}
          className="relative overflow-hidden rounded-[14px] border border-[#E5E2DC] bg-white shadow-[0_18px_42px_rgba(28,25,23,0.08)]"
        >
          <div
            className="pointer-events-none absolute z-40 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(0,0,0,0.65)] shadow-[0_0_0_2px_rgba(255,255,255,0.88)] transition-opacity duration-300"
            style={{ left: cursor.x, top: cursor.y, opacity: cursor.opacity }}
          />
          <div className="flex h-[38px] items-center gap-4 border-b border-[#E5E2DC] px-5 text-[12px] text-[#999]">
            <div className="flex items-center gap-1">
              <ArrowLeftIcon />
              <span>Back to projects</span>
            </div>
            <div className="flex items-center gap-1">
              <GridIcon />
              <span>Overview</span>
            </div>
            <div className="flex items-center gap-1">
              <DocIcon />
              <span>Drive</span>
            </div>
          </div>

          <div className="px-5 pb-0 pt-4">
            <div className="mb-1 text-[22px] font-normal tracking-[-0.02em] text-[#111]">
              Limited Ed. Snowboard Launch
            </div>
            <span className="inline-flex rounded-[5px] border border-[#DDD] bg-[#F1F0ED] px-2 py-[2px] text-[11px] font-medium text-[#666]">
              Not Started
            </span>
          </div>

          <div className="mt-[10px] flex items-center gap-0 overflow-hidden border-b border-[#E5E2DC] px-5 text-[12.5px]">
            {[
              "Overview",
              "Launch Timeline",
              "Campaign Shoot",
              "Design Inspiration",
              "Product and Inventory",
              "Content Calendar",
            ].map((tab) => (
              <div
                key={tab}
                className={`whitespace-nowrap border-b-2 px-3 py-[9px] ${
                  tab === "Design Inspiration"
                    ? "border-[#111] font-medium text-[#111]"
                    : "border-transparent text-[#999]"
                }`}
              >
                {tab}
              </div>
            ))}
            <div className="px-3 py-[9px] text-[#D97706]">Creator Tracking</div>
            <div className="px-2 py-[6px] text-[15px] text-[#BBB]">+</div>
          </div>

          <div className="relative h-[700px] overflow-hidden bg-[#FCFBF9]">
            <div
              className="px-5 pt-[18px] transition-transform duration-500"
              style={{ transform: "translateY(0px)" }}
            >
              <div className="mb-[9px] flex items-center justify-between">
                <span className="text-[13px] font-medium text-[#111]">Campaign Inspiration Photos</span>
                <div className="flex gap-[5px]">
                  <button className="rounded-[5px] border border-[#111] bg-[#111] px-[10px] py-[3px] text-[12px] font-medium text-white">
                    Collage
                  </button>
                  <button className="rounded-[5px] border border-[#DDD] px-[10px] py-[3px] text-[12px] font-medium text-[#888]">
                    Array
                  </button>
                </div>
              </div>

              <div className="mb-7 flex items-start gap-3 rounded-[10px] border border-[#E5E2DC] bg-white p-[14px]">
                <div
                  className={`relative grid min-w-0 flex-1 gap-[6px] transition-all duration-500 ${
                    isFocused
                      ? "grid-cols-[80px_80px_minmax(0,1fr)] grid-rows-[75px_75px]"
                      : "grid-cols-4 grid-rows-[170px]"
                  }`}
                >
                  {collageImages.map((image, index) => {
                    const isHero = index === 0;
                    let placement = "";

                    if (isFocused) {
                      if (isHero) {
                        placement = "col-start-3 row-span-2 h-full";
                      } else if (index === 1) {
                        placement = "col-start-1 row-start-1";
                      } else if (index === 2) {
                        placement = "col-start-2 row-start-1";
                      } else {
                        placement = "col-start-1 row-start-2";
                      }
                    }

                    return (
                      <div
                        key={image.key}
                        ref={index === 0 ? firstImageRef : undefined}
                        className={`relative overflow-hidden rounded-[6px] bg-[#E2DFD9] transition-all duration-500 ${placement} ${
                          isHero && isFocused ? "shadow-[0_0_0_2px_#2A537A]" : ""
                        }`}
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes={isFocused ? (isHero ? "460px" : "80px") : "25vw"}
                          className="object-cover"
                        />
                        {isHero && showCommentPanel ? (
                          <div className="pointer-events-none absolute left-[7%] top-[22%] rounded-full border-2 border-white bg-[#2A537A] px-[7px] py-[2px] text-[10px] font-medium text-white shadow-[0_6px_16px_rgba(0,0,0,0.2)]">
                            1
                          </div>
                        ) : null}
                      </div>
                    );
                  })}

                  <div
                    className={`pointer-events-none absolute left-[55%] top-[18%] z-20 min-w-[170px] rounded-[9px] border border-[#E0DCD6] bg-white p-[5px] shadow-[0_8px_28px_rgba(0,0,0,0.14)] transition-all duration-150 ${
                      showContextMenu ? "opacity-100" : "translate-y-[-4px] scale-[0.94] opacity-0"
                    }`}
                  >
                    <div
                      className={`flex items-center gap-[10px] rounded-[6px] px-[10px] py-[7px] text-[13px] text-[#222] ${
                        highlightAddComment ? "bg-[#F5F3F0]" : ""
                      }`}
                    >
                      <CommentIcon />
                      <span>Add comment</span>
                    </div>
                    <div className="flex items-center gap-[10px] px-[10px] py-[7px] text-[13px] text-[#222]">
                      <ExpandIcon />
                      <span>View expanded</span>
                    </div>
                    <div className="mx-0.5 my-1 h-px bg-[#EEE]" />
                    <div className="flex items-center gap-[10px] px-[10px] py-[7px] text-[13px] text-[#222]">
                      <ReplaceIcon />
                      <span>Replace image</span>
                    </div>
                    <div className="flex items-center gap-[10px] px-[10px] py-[7px] text-[13px] text-[#DC2626]">
                      <TrashIcon />
                      <span>Remove</span>
                    </div>
                  </div>

                  <div
                    className={`pointer-events-none absolute right-[10px] top-[50px] z-30 w-[170px] rounded-[8px] border border-[#E0DCD6] bg-white p-[3px] shadow-[0_8px_28px_rgba(0,0,0,0.16)] transition-all duration-150 ${
                      showMentionPopup ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"
                    }`}
                  >
                    <div className="px-[7px] pb-[2px] pt-1 text-[9px] font-semibold uppercase tracking-[0.06em] text-[#AAA]">
                      Mention someone
                    </div>
                    <div className="flex flex-col gap-px">
                      {filteredMentions.length ? (
                        filteredMentions.map((person, index) => (
                          <div
                            key={person.name}
                            className={`flex items-center gap-[7px] rounded-[4px] px-[7px] py-1 text-[11.5px] text-[#222] ${
                              highlightMention && index === 0 ? "bg-[#F5F3F0]" : ""
                            }`}
                          >
                            <div className="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#DDE7F1] text-[9px] font-semibold text-[#2A537A]">
                              {person.avatar}
                            </div>
                            <div>{person.name}</div>
                          </div>
                        ))
                      ) : (
                        <div className="px-[7px] py-[6px] text-[10.5px] text-[#AAA]">No matches</div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    showCommentPanel ? "w-[260px] opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="w-[260px] rounded-[10px] border border-[#E5E2DC] bg-white p-[11px] shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#111]">
                        {commentPosted ? "1 comment" : "0 comments"}
                      </span>
                      <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#F0EDE8] text-[11px] text-[#999]">
                        x
                      </span>
                    </div>
                    <div
                      ref={commentInputRef}
                      className={`rounded-[7px] px-[10px] pb-[5px] pt-[8px] transition-all duration-300 ${
                        commentPosted ? "border border-[#E8E5E0] pb-[8px]" : "border border-[#C7D8EA]"
                      } ${showCommentBubble ? "opacity-100" : "opacity-0"}`}
                    >
                      <div className="min-h-[18px] text-[12.5px] leading-[1.45] text-[#222]">{commentMeta}</div>
                      {commentPosted ? (
                        <div className="mt-1 text-[10.5px] text-[#999]">3/16/2026, 4:36:58 AM · You</div>
                      ) : (
                        <div className="mt-[5px] flex items-center justify-end gap-2">
                          <span className="text-[11.5px] text-[#888]">Cancel</span>
                          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#111]">
                            <SendIcon />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-[14px] pb-1">
                <div className={`min-w-0 transition-all duration-300 ${showTaskModal ? "flex-[0.92]" : "flex-1"}`}>
                  <div className="mb-[10px] flex items-center justify-between gap-[10px]">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-[#AAA]">
                      Design Tasks
                    </span>
                    <div className="flex gap-[3px]">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] border border-[#111] bg-[#111]">
                        <ListIcon active />
                      </span>
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] border border-[#E0DCD6]">
                        <BoardIcon />
                      </span>
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-[5px] border border-[#E0DCD6]">
                        <TableIcon />
                      </span>
                    </div>
                  </div>

                  <div className="overflow-hidden rounded-[8px] border border-[#E5E2DC]">
                    {designTasks.map((task, index) => {
                      const rowStatus = index === 0 ? currentStatus : task.status;
                      const rowDone = index === 0 ? isDone : task.status === "Done";
                      const isPrimaryRow = index === 0;
                      const showStatusDropdownForRow = isPrimaryRow && showStatusMenu;

                      return (
                        <div
                          key={task.title}
                          ref={isPrimaryRow ? firstTaskRowRef : undefined}
                          className={`flex items-start gap-[10px] border-b border-[#E5E2DC] bg-white px-[14px] py-3 last:border-b-0 ${
                            isPrimaryRow && showTaskRowHighlight ? "bg-[#F5F3F0]" : ""
                          }`}
                        >
                          <div
                            className={`mt-[1px] flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full border-[1.5px] ${
                              rowDone
                                ? "border-[#16A34A] bg-[#16A34A]"
                                : index <= 2
                                  ? "border-[#AAA]"
                                  : "border-[#CCC]"
                            }`}
                          >
                            {rowDone ? (
                              <CheckIcon />
                            ) : index <= 2 ? (
                              <ClockIcon />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div
                              className={`mb-[6px] text-[13px] leading-[1.3] ${
                                rowDone ? "text-[#AAA] line-through" : "text-[#111]"
                              }`}
                            >
                              {task.title}
                            </div>
                            <div className="flex flex-wrap items-center gap-[5px]">
                              {isPrimaryRow ? (
                                <div className="relative inline-flex">
                                  <span
                                    ref={firstStatusPillRef}
                                    className={`inline-flex rounded-[4px] px-[7px] py-[2px] text-[11px] font-medium ${statusPillClass(rowStatus)}`}
                                  >
                                    {rowStatus}
                                  </span>
                                  <div
                                    className={`absolute left-0 top-[calc(100%+4px)] z-20 min-w-[148px] rounded-[8px] border border-[#E0DCD6] bg-white p-[7px] shadow-[0_8px_24px_rgba(0,0,0,0.14)] transition-all duration-150 ${
                                      showStatusDropdownForRow ? "translate-y-0 opacity-100" : "translate-y-[-4px] opacity-0"
                                    }`}
                                  >
                                    <div className="mb-[6px] rounded-[6px] border border-[#D8D4CD] bg-white px-[9px] py-[5px] text-[11.5px] text-[#222]">
                                      Status
                                    </div>
                                    <div className="space-y-0.5">
                                      <StatusOption label="None" tone="text-[#222]" />
                                      <StatusOption label="To-Do" tone="bg-[#ECECEC] text-[#444]" />
                                      <StatusOption label="In Progress" tone="bg-[#DDE8F3] text-[#2A537A]" />
                                      <StatusOption
                                        label="Done"
                                        optionRef={doneStatusOptionRef}
                                        tone={`bg-[#DFF1E1] text-[#15803D] ${highlightDoneOption ? "ring-2 ring-[#15803D]" : ""}`}
                                      />
                                      <StatusOption label="Blocked" tone="bg-[#F5D5D5] text-[#B91C1C]" />
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <span className={`inline-flex rounded-[4px] px-[7px] py-[2px] text-[11px] font-medium ${statusPillClass(rowStatus)}`}>
                                  {rowStatus}
                                </span>
                              )}
                              <span
                                className={`inline-flex items-center gap-[3px] rounded-[4px] px-[7px] py-[2px] text-[11px] font-medium ${priorityPillClass(task.priority)}`}
                              >
                                <FlagIcon />
                                {task.priority}
                              </span>
                              <span className="inline-flex items-center gap-[3px] text-[11px] text-[#777]">
                                <UserIcon />
                                {task.assignee}
                              </span>
                              {task.due ? (
                                <span className="inline-flex items-center gap-[3px] text-[11px] text-[#999]">
                                  <CalendarIcon />
                                  {task.due}
                                </span>
                              ) : null}
                              {task.tags?.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex rounded-[4px] border border-[#E5E2DC] bg-[#F3F3F1] px-[7px] py-[2px] text-[11px] font-medium text-[#555]"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="ml-auto flex flex-shrink-0 items-center gap-[6px] pt-[1px]">
                            {task.comments ? (
                              <span className="inline-flex items-center gap-[3px] text-[11px] text-[#BBB]">
                                <CommentBubbleIcon />
                                {task.comments}
                              </span>
                            ) : null}
                            <span className="px-[3px] text-[14px] tracking-[1px] text-[#CCC]">···</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    showTaskModal ? "w-[300px] opacity-100" : "w-0 opacity-0"
                  }`}
                >
                  <div className="w-[300px] rounded-[10px] border border-[#E5E2DC] bg-white px-4 pb-[18px] pt-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                    <div className="mb-[3px] flex items-start justify-between">
                      <div className="pr-2 text-[14px] font-semibold leading-[1.35] text-[#111]">
                        Review snowboard spray photo for email hero
                      </div>
                      <span className="flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-full bg-[#F0EDE8] text-[12px] text-[#999]">
                        x
                      </span>
                    </div>
                    <div className="mb-2 flex items-center gap-[10px] text-[12px] text-[#AAA]">
                      <span>March 17</span>
                      <span className="inline-flex items-center gap-1">
                        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#DCFCE7] text-[9px] font-semibold text-[#15803D]">
                          M
                        </span>
                        <span className="text-[#555]">Malia</span>
                      </span>
                    </div>
                    <div className="mb-1 flex flex-wrap items-center gap-[5px]">
                      <span
                        className={`inline-flex rounded-[4px] px-[7px] py-[2px] text-[11px] font-medium ${statusPillClass(currentStatus)}`}
                      >
                        {currentStatus}
                      </span>
                      <span
                        className={`inline-flex items-center gap-[3px] rounded-[4px] px-[7px] py-[2px] text-[11px] font-medium ${priorityPillClass("Medium")}`}
                      >
                        <FlagIcon />
                        Medium
                      </span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#DDD" strokeWidth="1.5">
                        <path d="M2 8h10M2 5h6" />
                      </svg>
                    </div>
                    <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#BBB]">
                      Notes
                    </div>
                    <div
                      ref={notesFieldRef}
                      className="mt-[5px] min-h-[34px] rounded-[6px] bg-[#F9F7F5] px-[11px] py-[9px] text-[12.5px] leading-[1.5] text-[#333]"
                    >
                      {noteText}
                      {showTaskModal && !noteText.endsWith(NOTE_BODY) ? <TypingCaret /> : null}
                    </div>
                    <div className="mt-3 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#BBB]">
                      Comments
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#E5E2DC] text-[9px] text-[#888]">
                        A
                      </span>
                      <span className="flex-1 border-b border-[#E5E2DC] py-[3px] text-[12px] text-[#BBB]">
                        Write a comment...
                      </span>
                      <span className="text-[11px] font-medium text-[#BBB]">Add</span>
                      <ClipIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[150px] bg-[linear-gradient(180deg,rgba(252,251,249,0)_0%,rgba(252,251,249,0.7)_48%,var(--cream-2)_100%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusOption({
  label,
  tone,
  optionRef,
}: {
  label: string;
  tone: string;
  optionRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={optionRef} className={`rounded-[6px] px-[9px] py-[4px] text-[11.5px] font-medium ${tone}`}>
      {label}
    </div>
  );
}

function TypingCaret() {
  return <span className="ml-px inline-block h-3 w-[1.5px] animate-pulse align-middle bg-[#111]" />;
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] stroke-current fill-none stroke-[1.5]">
      <path d="M7.5 9L4.5 6l3-3" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] stroke-current fill-none stroke-[1.5]">
      <rect x="1" y="1" width="10" height="10" rx="2" />
      <path d="M1 5h10M5 5v6" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 12 12" className="h-[11px] w-[11px] stroke-current fill-none stroke-[1.5]">
      <rect x="2" y="1" width="8" height="10" rx="1" />
      <path d="M4 4h4M4 6.5h4M4 9h2" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-[14px] w-[14px] flex-shrink-0 stroke-[#555] fill-none stroke-[1.4]">
      <path d="M2.5 3h11a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8.5L5 14.5V12H2.5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-[14px] w-[14px] flex-shrink-0 stroke-[#555] fill-none stroke-[1.4]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 6.5L13.5 2.5M13.5 2.5H10M13.5 2.5V6M6.5 9.5L2.5 13.5M2.5 13.5H6M2.5 13.5V10" />
    </svg>
  );
}

function ReplaceIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-[14px] w-[14px] flex-shrink-0 stroke-[#555] fill-none stroke-[1.4]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3h6v3h3v3M3 3v6h6V3M9 9h4v4H6" />
      <path d="M3 9l2-2M11 7l2-2" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-[14px] w-[14px] flex-shrink-0 stroke-[#DC2626] fill-none stroke-[1.4]"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5h10M6 4.5V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v1.5M4.5 4.5l.5 8.5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1l.5-8.5M6.5 7v4M9.5 7v4" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg viewBox="0 0 14 14" className="h-[10px] w-[10px] fill-white stroke-white stroke-[1]">
      <path d="M2 7l10-5-3.5 11L7 8.5z" />
    </svg>
  );
}

function ListIcon({ active = false }: { active?: boolean }) {
  return (
    <svg viewBox="0 0 13 13" className={`h-[11px] w-[11px] ${active ? "stroke-white" : "stroke-[#888]"} fill-none stroke-[1.5]`}>
      <rect x="1" y="2" width="11" height="1.8" rx="0.4" />
      <rect x="1" y="5.6" width="11" height="1.8" rx="0.4" />
      <rect x="1" y="9.2" width="11" height="1.8" rx="0.4" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg viewBox="0 0 13 13" className="h-[11px] w-[11px] stroke-[#888] fill-none stroke-[1.5]">
      <rect x="1" y="1" width="5" height="5" rx="1" />
      <rect x="7" y="1" width="5" height="5" rx="1" />
      <rect x="1" y="7" width="5" height="5" rx="1" />
      <rect x="7" y="7" width="5" height="5" rx="1" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg viewBox="0 0 13 13" className="h-[11px] w-[11px] stroke-[#888] fill-none stroke-[1.5]">
      <rect x="1" y="1" width="11" height="11" rx="1" />
      <path d="M1 5h11M5 5v7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 9 9" className="h-[9px] w-[9px] stroke-white fill-none stroke-[2.2]">
      <polyline points="1.5,4.5 3.5,6.5 7.5,2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 9 9" className="h-[9px] w-[9px] stroke-[#AAA] fill-none stroke-[2]">
      <circle cx="4.5" cy="4.5" r="3.2" />
      <path d="M4.5 2.8v1.7l1 1" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 11 11" className="h-[10px] w-[10px] stroke-current fill-none stroke-[1.5]">
      <path d="M2 1v9M2 1h7l-1.5 3L9 7H2" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 11 11" className="h-[11px] w-[11px] stroke-[#999] fill-none stroke-[1.5]">
      <circle cx="5.5" cy="3.5" r="2" />
      <path d="M1 10c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 10 10" className="h-[10px] w-[10px] stroke-[#BBB] fill-none stroke-[1.5]">
      <rect x="1" y="2" width="8" height="7" rx="1" />
      <path d="M3 1v2M7 1v2M1 5h8" />
    </svg>
  );
}

function CommentBubbleIcon() {
  return (
    <svg viewBox="0 0 11 11" className="h-[11px] w-[11px] stroke-[#BBB] fill-none stroke-[1.5]">
      <path d="M1 1h9v7H6l-2 2V8H1z" />
    </svg>
  );
}

function ClipIcon() {
  return (
    <svg viewBox="0 0 15 15" className="h-[15px] w-[15px] stroke-[#CCC] fill-none stroke-[1.5]">
      <path d="M3 11V5a4.5 4.5 0 0 1 9 0v6a3 3 0 0 1-6 0V5a1.5 1.5 0 0 1 3 0v6" />
    </svg>
  );
}
