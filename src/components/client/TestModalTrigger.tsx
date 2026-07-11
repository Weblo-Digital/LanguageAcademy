"use client";
import React from "react";
import { useLevelTest } from "@/context/LevelTestContext";

export function TestModalTrigger({
  children,
  className,
  initialLanguage,
}: {
  children: React.ReactNode;
  className?: string;
  initialLanguage?: string;
}) {
  const { openTestModal } = useLevelTest();

  if (React.isValidElement(children)) {
    const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void; className?: string }>;
    return React.cloneElement(child, {
      onClick: (e: React.MouseEvent) => {
        if (child.props.onClick) {
          child.props.onClick(e);
        }
        openTestModal(initialLanguage);
      },
      className: className ? `${className} ${child.props.className || ""}` : child.props.className
    });
  }

  return (
    <button onClick={() => openTestModal(initialLanguage)} className={className}>
      {children}
    </button>
  );
}

