import AlbumView from "@/components/dashboard/album-view";
import {Suspense} from "react";


export default async function Page({params}: { params: { id: string } }) {


    return (
        <div className='container mx-auto'>
            <AlbumView params={params}/>
        </div>
    );
}
