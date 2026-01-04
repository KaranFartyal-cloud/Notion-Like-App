import Link from "next/link";
import { User } from "./Navbar";

export default function NavbarList({ user }: { user: User }) {
  const list = [
    { href: "/Screenshots", title: "Screenshots" },
    { href: "/usage", title: "Usage" },
  ];

  return (
    <div className={`flex items-center gap-8  ${!user && " translate-x-17"} `}>
      {list.map((item, i) => (
        <Link key={i} href={item.href}>
          <span className="cursor-pointer text-gray-700 hover:text-gray-800 transition font-medium">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
