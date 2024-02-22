// "use client"

import Image from 'next/image';
import MobileInHand from '../../public/mobile-in-hand.webp';
import Flow from '../../public/flow.webp';
import Customer from '../../public/customer1.webp';

import SignUp from '@/components/signup-form';
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage() {
    return (
        <main className="grid items-center mx-auto">
            <div className='grid items-center max-w-full justify-center gap-8 lg:gap-20'
                 style={{backgroundImage: 'url(/home.webp)', backgroundPosition: 'center'}}>
                <div
                    className='flex flex-col items-start md:items-center md:text-center w-full justify-start md:justify-center gap-2 backdrop-blur-sm h-full py-10 lg:py-20 px-4'>
                    <h1 className='font-bold text-4xl lg:text-7xl text-left text-white'>Get All Photos In One Place</h1>
                    <p className='leading-relaxed mb-8 font-medium text-white text-left md:text-center w-full lg:w-1/2'>
                        ShutterSync aims to address the need for professional photographers
                        to efficiently share and collaborate on their work with clients,
                        enhancing client engagement and project management.
                    </p>
                    <Button className="rounded-lg" asChild
                            style={{boxShadow: '0px 4px 6px 0px rgba(0, 0, 0, 0.30) inset',}}>
                        <Link href={'/signup'} className="hover:bg-secondary-foreground">
                            Get Started
                        </Link>
                    </Button>
                </div>
            </div>
            <div className='max-w-7xl place-self-center'>
                <h2 className='font-bold text-2xl md:text-4xl text-center mb-5 md:mb-12 mt-8 py-10'>What we offer</h2>
                <div className='grid grid-rows-3 gap-1 lg:gap-20 items-center px-2'>
                    <div
                        className='flex flex-col sm:flex-row justify-between items-center gap-10 rounded-lg px-5 lg:px-10 py-10 lg:py-2 bg-sky-50 dark:bg-secondary  lg:h-[400px]'>
                        <p className='leading-relaxed font-normal text-[1rem] md:text-[24px] md:w-1/2 animate:'>
                            Effortlessly organize and showcase your stunning portfolio with ShutterSync intuitive
                            gallery management. Seamlessly upload, arrange, and update your work to create a visual
                            narrative that captivates clients and enhances your professional image.
                        </p>
                        <Image className='lg:max-w-[400px]' src={MobileInHand} alt='feature'/>
                    </div>
                    <div
                        className='flex flex-col lg:flex-row justify-between items-center gap-10 rounded-lg px-5 lg:px-10 py-10 lg:py-2 bg-sky-50 dark:bg-secondary text-[1rem] md:text-[1.4rem]'>
                        <p className='leading-relaxed font-normal text-[1rem] md:text-[24px] md:w-1/2'>
                            Foster meaningful interactions with clients through
                            ShutterSync&apos;s collaborative features. Invite feedback, share
                            drafts, and streamline communication to ensure that every project
                            unfolds with precision.
                        </p>
                        <Image className='lg:max-w-[400px]' src={Customer} alt='feature'/>
                    </div>
                    <div
                        className='flex flex-col lg:flex-row justify-between items-center gap-10 rounded-lg px-5 lg:px-10 py-10 lg:py-2 bg-sky-50 dark:bg-secondary text-[1rem] md:text-[1.4rem]'>
                        <p className='leading-relaxed font-normal text-[1rem] md:text-[24px] md:w-1/2'>
                            From initial concept to final delivery, ShutterSync optimizes your
                            project workflow. Enjoy a centralized hub for all project assets,
                            streamline file sharing, and track project progress effortlessly.
                            Enhance your project management capabilities, allowing you to focus
                            more on what you love – capturing extraordinary moments.
                        </p>
                        <Image className='lg:max-w-[400px]' src={Flow} alt='feature'/>
                    </div>
                </div>

            </div>
        </main>
    );
}
