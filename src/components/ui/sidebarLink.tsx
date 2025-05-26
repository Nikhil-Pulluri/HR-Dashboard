import Link from 'next/link'

export function SidebarLink({
  link,
  className = '',
}: {
  link: {
    label: string
    icon: React.ReactNode
    href?: string
    onClick?: () => void
  }
  className?: string
}) {
  if (link.onClick) {
    return (
      <button onClick={link.onClick} className={`flex w-full items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 text-left ${className}`}>
        {link.icon}
        <span>{link.label}</span>
      </button>
    )
  }

  return (
    <Link href={link.href!} className={`flex items-center gap-2 p-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${className}`}>
      {link.icon}
      <span>{link.label}</span>
    </Link>
  )
}
