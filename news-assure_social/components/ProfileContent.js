import { useEffect, useState } from "react";
import Card from "./Card";
import FriendInfo from "./FriendInfo";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import PostCard from "./PostCard";

export default function ProfileContent({activeTab,userId}){
    
    const [posts,setPosts]=useState([]);
    const [profile,setProfile]=useState(null);
    
    const supabase=useSupabaseClient();
    useEffect(()=>{
        if(!userId){
            return;
        }
if(activeTab==='posts'){
    loadPosts().then(()=>{});
}
    },[userId]);
async function loadPosts(){
    const posts= await userPosts(userId);
    const profile= await userProfile(userId);
    setPosts(posts);
    setProfile(profile);
}
   async function userPosts(userId){
   const {data}=await supabase.from('posts')
    .select('id,content,created_at,author')
    .eq('author',userId);
    return data;
    
    }
    async function userProfile(userId){
const {data}=await supabase.from('profiles')
.select()
.eq('id',userId);
return data[0];
    }
    return(
        <div>
        {activeTab==='posts' && (
            <div>
                {posts.length>0 && posts.map(post=>(
                    <PostCard key={post.created_at} {...post} profiles={profile}/>
                ))}
            </div>
           )}
            {activeTab==='about' && (
            <div>
                <Card>
                    <h2 className="text-3xl mb-2">About me</h2>
                    <p className="mb-2 text-sm">
                    Lorem Ipsum is simply the industry's standard took a galley of type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                    </p>
                    <p className="mb-2 text-sm">
                    Lorem Ipsum is simply the industry's standard took a galley of type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
                    </p>
                </Card>
            </div>
           )}
             {activeTab==='friends' && (
            <div>
                <Card>
                    <h2 className="text-3xl mb-2">Friends</h2>
                   <div className="">
                    
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>
                    <div className="border-b border-b-gray-100 p-4 -mx-4">
                    <FriendInfo/>
                    </div>                    

                   
                   
                   </div>
                </Card>
            </div>
           )}
           {activeTab==='photos' && (
            <div>
                <Card>
                    <div className="grid md:grid-cols-2 gap-4 ">

                    <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                        <img src="https://plus.unsplash.com/premium_photo-1697078429363-27e83588f93d?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                        <img src="https://images.unsplash.com/photo-1697644154271-d5147ee0dac9?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                        <img src="https://images.unsplash.com/photo-1698069005894-f01747b3f152?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3NHx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>
                    <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                        <img src="https://images.unsplash.com/photo-1697201208838-3b76383d3982?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4MXx8fGVufDB8fHx8fA%3D%3D" alt=""/>
                    </div>

                    </div>
                   
                </Card>
            </div>
           )}
           </div>
    );
}