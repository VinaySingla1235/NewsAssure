import Avatar from "./Avatar";

export default function FriendInfo(){
    return(
        <div className="flex gap-2">
        <Avatar/> 
        <div>
        <h3c className="font-bold text-xl">David Beckham</h3c>
        <div className="text-sm leading-3">5 mutual friends</div>
        </div>
       
    </div>
    );
}