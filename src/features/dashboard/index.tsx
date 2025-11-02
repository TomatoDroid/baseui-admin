import Header from "@/components/header";
import { Main } from "@/components/layout/main";
import { TopNav } from "@/components/top-nav";

export function Dashboard() {
  return (
    <>
      <Header>
        <TopNav links={topNav} />
      </Header>
      <Main>
        Dashboard
      </Main>
    </>
  )
}


const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
]