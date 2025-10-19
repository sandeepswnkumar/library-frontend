'use client'
import React from 'react'
import { AppSidebar } from '@/components/app-sidebar'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar'
import SubHeaderCard from '../Custom/SubHeaderCard'



function Container({ children }: { children: React.ReactNode }) {
    const childArray = React.Children.toArray(children) as React.ReactElement[];
    const headerIndex = childArray.findIndex((el) => el.type === SubHeaderCard);
    const header = headerIndex >= 0 ? childArray[headerIndex] : null;
    // const mainChildren = headerIndex >= 0 ? childArray.filter((_, i) => i !== headerIndex) : childArray;

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="fixed w-full bg-white shadow-sm z-10 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>
                                        Data Fetching
                                    </BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col relative   w-full bg-gray-100 mt-16">
{/* 
                    {header && (
                        <div className="fixed top-16 right-0 w-auto z-10 h-14 bg-gray-100">
                            {header}
                        </div>
                    )} */}

                    <div className={`${header ? 'p-4 pt-1' : 'p-4'} `}>
                        {children}
                    </div>
                    
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
						<div className="bg-muted/50 aspect-video rounded-xl" />
					</div>
					<div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" /> */}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Container
