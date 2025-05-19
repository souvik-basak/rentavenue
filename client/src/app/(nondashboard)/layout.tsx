"use client"
// import Footer from "@/components/FooterSection"
import Navbar from "@/components/Navbar"
import { NAVBAR_HEIGHT } from "@/lib/constants"
import { useGetAuthUserQuery } from "@/state/api"

const Layout = ({children}:{children: React.ReactNode})=>{
  const {data: authUser} = useGetAuthUserQuery()
  console.log("authUser", authUser);
  
  return (
    <div className="h-full w-full">
      <Navbar/>
      <main className={`h-full flex w-full flex-col pt-[${NAVBAR_HEIGHT}px]`}>
        {children}
      </main>
      {/* <Footer/> */}
    </div>
  )
}

export default Layout