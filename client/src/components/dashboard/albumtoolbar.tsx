import React from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Button } from '@/components/ui/button';
import { PiArrowsDownUpBold } from "react-icons/pi";
import Link from 'next/link';
import { Separator } from "@/components/ui/separator"



export default function AlbumToolBar() {
    return (
      <div>
      <div className='flex items-center justify-start py-4 gap-3 px-3' >
        <Button className="rounded-lg shadow-inner" asChild style={{ boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.30) inset' }}>
          <Link href={'/dashboard/createalbum'}className="hover:bg-secondary-foreground shadow-inner">
            Create Album
          </Link>
        </Button>
        <NavigationMenu>
  <NavigationMenuList className=''>
    <NavigationMenuItem>
      <NavigationMenuTrigger>
      <PiArrowsDownUpBold />
        Most recent
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink asChild>
          <Button variant={'secondary'} className="rounded-lg">
            Most recent
          </Button>
        </NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
      </div>
      <Separator />
      </div>
    )
  }
