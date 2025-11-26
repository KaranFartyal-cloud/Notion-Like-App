import Link from "next/link";

export default function NavbarList() {
  const list = [
    { href: "/pricing", title: "Pricing" },
    { href: "/careers", title: "Careers" },
  ];

  return (
    <div className="flex items-center gap-8 text-lg">
      {list.map((item, i) => (
        <Link key={i} href={item.href}>
          <span className="cursor-pointer text-gray-700 hover:text-[#4B91DE] transition font-medium">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
