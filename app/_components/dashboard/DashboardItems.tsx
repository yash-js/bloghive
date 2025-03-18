'use client'

import { navLinks } from '@/app/dashboard/layout'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const DashboardItems = () => {
    const pathname = usePathname()
    return (
        <>
            {navLinks.map((link, index) => (
                <Link href={link.href} key={index} className={cn(
                    pathname === link.href ? 'bg-muted text-primary' : 'text-muted-foreground bg-none',
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary/70'
                )}>
                    <link.icon className="size-4" />
                    {link.name}
                </Link>
            ))}
        </>
    )
}

export default DashboardItems