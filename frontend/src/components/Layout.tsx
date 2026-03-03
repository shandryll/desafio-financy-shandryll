import { Toaster } from "@/components/ui/sonner"
import { Header } from "./Header"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col gap-4 pb-4 md:gap-12 md:pb-12">
      <Header />
      <main className="mx-auto w-full px-4 md:px-12">{children}</main>
      <Toaster />
    </div>
  )
}
