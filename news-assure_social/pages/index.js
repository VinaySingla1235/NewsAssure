

import Image from 'next/image'
import Card from '../components/Card'
import NavigationCard from '../components/NavigationCard'
import PostFormCard from '../components/PostFormCard'
import Avatar from '../components/Avatar'
import PostCard from '../components/PostCard'
import Layoutp from '../components/Layoutp'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import LoginPage from './login'
import { useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function Home() {
  const supabase=useSupabaseClient();
  const session=useSession();
  const[posts,setPosts]=useState([]);
  const [profile, setprofile] = useState(null);

useEffect(()=>{
  fetchPosts();
},[]);

  useEffect(()=>{

if(!session?.user?.id){
  return;
}
supabase.from('profiles')
.select()
.eq('id',session.user.id)
.then(result=>{
   if(result.data.length){
    setprofile(result.data[0]);
   }
})

},[session?.user?.id]);
function fetchPosts(){
  supabase.from('posts')
  .select('id,content,created_at,photos,profiles( id, avatar, name)')
  .is('parent',null)
  .order('created_at',{ascending:false})
  .then(result=>{
    setPosts(result.data);
    console.log(result);
  })
}
  if(!session){
    return <LoginPage/>
  }
  return (
 <Layoutp>
  <UserContext.Provider value={{profile}}>
  <PostFormCard onPost={fetchPosts}/>
  {posts?.length>0 && posts.map(post=>(
    <PostCard {...post} key={post.created_at}/>
  ))}
  </UserContext.Provider>
 </Layoutp>
  )
}
