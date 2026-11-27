import Link from "next/link";

export const liuRenLinkId = "liu-ren-profile-link";

export default function LiuRenLink({ from }: { from: "criminals" | "huijian" }) {
  return (
    <Link
      id={liuRenLinkId}
      className="liu-ren-title-link"
      href={{ pathname: "/criminals/liu-ren", query: { from } }}
    >
      刘忍
    </Link>
  );
}
