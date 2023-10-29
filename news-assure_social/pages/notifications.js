import Link from "next/link";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Layoutp from "../components/Layoutp";

export default function NotificationsPage(){
    return(
        <Layoutp>
            <h1 className="text-6xl mb-4 text-gray-300">
                Notifications
            </h1>
            <Card noPadding={true}>
                <div className="">

                <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
                    <Link href={'/profile'}>
                    <Avatar/>
                    </Link>
                    
                    <div>
                        <Link href={'/profile'} className={'font-semibold mr-1 hover:underline'}>John Doe</Link>
                         liked <Link href={''} className={' text-socialRed hover:underline'}>your photo</Link>
                    </div>
                </div>
                <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
                    <Link href={'/profile'}>
                    <Avatar/>
                    </Link>
                    
                    <div>
                        <Link href={'/profile'} className={'font-semibold mr-1 hover:underline'}>John Doe</Link>
                         liked <Link href={''} className={' text-socialRed hover:underline'}>your photo</Link>
                    </div>
                </div>
                <div className="flex gap-2 items-center border-b border-b-gray-100 p-4">
                    <Link href={'/profile'}>
                    <Avatar/>
                    </Link>
                    
                    <div>
                        <Link href={'/profile'} className={'font-semibold mr-1 hover:underline'}>John Doe</Link>
                         liked <Link href={''} className={' text-socialRed hover:underline'}>your photo</Link>
                    </div>
                </div>
               


                </div>
            </Card>
            </Layoutp>
    );
}