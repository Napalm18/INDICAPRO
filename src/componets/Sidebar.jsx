import React from 'react';

export function Sidebar({ children, className }) {
  return <aside className={className}>{children}</aside>;
}

export function SidebarContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function SidebarGroup({ children }) {
  return <section>{children}</section>;
}

export function SidebarGroupContent({ children }) {
  return <div>{children}</div>;
}

export function SidebarGroupLabel({ children, className }) {
  return <h3 className={className}>{children}</h3>;
}

export function SidebarMenu({ children }) {
  return <nav>{children}</nav>;
}

export function SidebarMenuButton({ children, className, asChild }) {
  if (asChild) {
    return React.cloneElement(children, { className });
  }
  return <button className={className}>{children}</button>;
}

export function SidebarMenuItem({ children }) {
  return <div>{children}</div>;
}

export function SidebarHeader({ children, className }) {
  return <header className={className}>{children}</header>;
}

export function SidebarFooter({ children, className }) {
  return <footer className={className}>{children}</footer>;
}

export function SidebarProvider({ children }) {
  return <div>{children}</div>;
}

export function SidebarTrigger({ children, className, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
}
