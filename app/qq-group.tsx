import Image from "next/image";
import "./qq-group.css";

const groupName = "反诈英雄网";
const groupNumber = "123456789";

export default function QqGroup({ placement }: { placement: "header" | "content" }) {
  const icon = <Image src="/tencent-qq.png" alt="QQ 群" width={30} height={30} loading="eager" unoptimized />;

  if (placement === "header") {
    return (
      <div className="qq-group qq-group--header">
        {icon}
        <div className="qq-group-details">
          <span className="qq-group-name">{groupName}</span>
          <span className="qq-group-number">{groupNumber}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="qq-group qq-group--content">
      <div className="qq-group-identity">
        <span className="qq-group-icon">{icon}</span>
        <span className="qq-group-name">{groupName}</span>
      </div>
      <span className="qq-group-number">{groupNumber}</span>
    </div>
  );
}
