import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger
} from '@/components/ui/menubar';
import Link from 'next/link';
import { FaEllipsisVertical } from 'react-icons/fa6';


function AlbumOptions({ id }: { id: string }) {
    return (
      <Menubar className='p-0'>
        <MenubarMenu>
          <MenubarTrigger className=''>
            <FaEllipsisVertical className="text-xl text-white" />
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem asChild>
              <Link href={`/dashboard/album/${id}`}>View Album</Link>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Edit Album</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Share</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Delete</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    );
  }

  export default AlbumOptions;