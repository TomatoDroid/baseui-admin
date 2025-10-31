import { cn } from "@/lib/utils"

type HeaderProps = {
    children?: React.ReactNode
}
export function Header({ children }: HeaderProps) {
    return (
        <header className={cn("z-50 h-16 outline-1 outline-orange-900")}>
            {children}
        </header>
    )
}