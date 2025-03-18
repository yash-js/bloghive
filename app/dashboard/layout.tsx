import Link from "next/link";
import Logo from '@/public/logo.svg';
import Image from "next/image";
import DashboardItems from "@/app/_components/dashboard/DashboardItems";
import { CircleUser, DollarSign, Globe, Home } from "lucide-react";
import { ThemeToggle } from "../_components/dashboard/ThemeToggle";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import Progress from "@/components/Progress";

export const navLinks = [
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: Home
    },
    {
        name: 'Sites',
        href: '/dashboard/sites',
        icon: Globe
    },
    {
        name: "Pricing",
        href: "/dashboard/pricing",
        icon: DollarSign
    }
]


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center  px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center px-4 gap-2 font-semibold">
                            <Image
                                src={Logo}
                                alt="Logo"
                                className="size-8"

                            />
                            <h3 className="text-2xl">Blog<span className="text-primary">Hive</span></h3>
                        </Link>
                    </div>

                    <div className="flex-1">
                        <nav className="grid items-start px-2 font-medium lg:px-4">
                            <DashboardItems />
                        </nav>
                    </div>
                </div>

            </div>

            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <div className="ml-auto flex items-center gap-x-5">
                        <ThemeToggle />

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={'secondary'} size={'icon'} className="rounded-full cursor-pointer">
                                    <CircleUser className="size-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild className="cursor-pointer">
                                    <LogoutLink>
                                        Logout
                                    </LogoutLink>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
            <Progress />

        </section>
    );
}