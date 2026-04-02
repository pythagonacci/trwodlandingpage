export const USE_CASE_ITEMS = [
  {
    href: "/use-cases/product-development-design",
    label: "01 - Product Development & Design"
  },
  {
    href: "/use-cases/product-launch",
    label: "02 - Product Launch"
  },
  {
    href: "/use-cases/team-task-management",
    label: "03 - Team and Task Management"
  },
  {
    href: "/use-cases/dashboard-visibility",
    label: "04 - Dashboard and Visibility"
  },
  {
    href: "/use-cases/multi-project-management",
    label: "05 - Multi-Project Management"
  },
  {
    href: "/use-cases/search-analysis",
    label: "06 - Search and Analysis"
  },
  {
    href: "/use-cases/internal-documentation-resources",
    label: "07 - Internal Docs & Resources"
  }
] as const;

export function getUseCaseLinks(activeHref: string) {
  return USE_CASE_ITEMS.map((item) => ({
    ...item,
    active: item.href === activeHref
  }));
}
