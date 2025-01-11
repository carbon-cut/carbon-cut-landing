import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AvatarImage } from '@radix-ui/react-avatar'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function Testimonials() {
  return (
    <div className="grid grid-cols-2 py-12 px-32">
        <div className='pr-24'>
        <Badge variant="default">Testimonials</Badge>
        <br />
        <span className="text-center text-4xl font-bold tracking-tight lg:text-5xl">
            What <span className="text-chart-1">customers</span> <br /> say about us
        </span>
        <br />
        <p className='text-muted-foreground my-3'>
        Saas dashboard that enable users to perform various tasks and activities related to their business
        </p>
        <div className='grid grid-cols-2 w-1/4'>
        <Button size={'icon'} className='rounded-full bg-white border-chart-1 border-2 hover:bg-primary/20'><ArrowLeft className='stroke-chart-1' /></Button>
        <Button size={'icon'} className='rounded-full bg-white border-chart-1 border-2 hover:bg-primary/20'><ArrowRight className='stroke-chart-1' /></Button>
        </div>
        </div>
        <div className='pr-16'>
            <Image width={28} height={28} alt='testimonial' src={'home/features/bi_chat-quote-fill.svg'} />
            <p className='text-black font-bold text-lg'>
            Our business was in chaos before we started using this Saas dashboard. We were drowning in data and couldn't make sense of it. Thanks to this amazing tool, we now have clarity, and our decision-making has become precise and data-driven.
            </p>
            <div>
                <div className='flex flex-row justify-start mt-3'>
                    <Avatar className='h-12 w-12' >
                        <AvatarImage src={'home/testimonials/Avatar 1.png'} />
                        <AvatarFallback className='bg-chart-3 text-primary-foreground'>SJ</AvatarFallback>
                    </Avatar>
                    <div className='ml-3'>
                        <h1 className='text-primary text-lg font-semibold'>Sarah Johnson</h1>
                        <p>Marketing Manager</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Testimonials