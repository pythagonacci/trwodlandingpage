import Link from "next/link";
import { createPageMetadata } from "@/app/seo";
import { Nav } from "@/components/landing/Nav";
import { UseCases } from "@/components/landing/UseCases";
import base from "../dashboard-visibility/use-case.module.css";
import { getUseCaseLinks } from "../links";

export const metadata = createPageMetadata({
  title: "Multi-Project Management | Saria Use Cases",
  description:
    "See how Saria handles multi-project management with workflow pages, the Everything Table, and AI-generated cross-project charts.",
  path: "/use-cases/multi-project-management"
});

const USE_CASE_LINKS = getUseCaseLinks("/use-cases/multi-project-management");

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function Page() {
  return (
    <>
      <Nav />
      <main className={base.page}>
        <div className={base.sectionNav}>
          <div className={base.sectionNavInner}>
            {USE_CASE_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cx(base.sectionNavItem, item.active && base.sectionNavItemActive)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <UseCases standalone />
      </main>
    </>
  );
}
