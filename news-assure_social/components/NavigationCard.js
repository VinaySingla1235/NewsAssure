import { useRouter } from "next/router";
import Card from "./Card"
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import LoginPage from "../pages/login";

export default function NavigationCard(){
  const router=useRouter();
  const {asPath:pathname}=router;
  const activeEleClasses='text-sm md:text-md flex md:gap-1 md:gap-3 py-3 my-1 bg-socialRed text-white md:-mx-8 px-6 md:px-8 rounded-md shadow-md shadow-gray-300';
  const nonActiveEleClasses='text-sm md:text-md flex md:gap-1 md:gap-3 py-2 my-2 hover:bg-red-600 hover:bg-opacity-20 md:-mx-4 md:px-4 px-6 rounded-md transition-all hover:scale-110 hover:shadow-md shadow-gray-300';
 const supabase=useSupabaseClient();
  async function logout(){
await supabase.auth.signOut();
router.push('/login');
  }  
  
  
  return(
        <Card noPadding={true}>
            <div className="px-4 py-2 flex justify-between md:block shadow-md shadow-gray-500 md:shadow-none">
        <h2 className='text-gray-400 mb-3 hidden md:block'>Navigation</h2>
        <Link href="/" className={pathname==='/'?activeEleClasses:nonActiveEleClasses}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

          <span className="hidden md:block">Home</span></Link>

<Link href="/saved" className={pathname==='/saved'?activeEleClasses: nonActiveEleClasses}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
</svg>

 <span className="hidden md:block">Saved posts</span> </Link>
<Link href="/notifications" className={pathname==='/notifications'?activeEleClasses:nonActiveEleClasses}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
</svg>


  <span className="hidden md:block">Notifications</span></Link>
<button onClick={logout} className="w-full -my-2">
<span className={nonActiveEleClasses}>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>

  <span className="hidden md:block">Logout</span>
</span>
</button></div>
      </Card>
    )
}