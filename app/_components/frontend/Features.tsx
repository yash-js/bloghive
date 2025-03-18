import { CloudRain } from 'lucide-react'
import React from 'react'

const features = [
    {
        name: 'Sign up for free!',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iste aperiam iure omnis sint error laudantium dolore, in quae ipsum.',
        icon: CloudRain
    },
    {
        name: 'Blazing Fast',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iste aperiam iure omnis sint error laudantium dolore, in quae ipsum.',
        icon: CloudRain
    },
    {
        name: 'Super secure with Kinde',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iste aperiam iure omnis sint error laudantium dolore, in quae ipsum.',
        icon: CloudRain
    },
    {
        name: 'Easy to use!',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit iste aperiam iure omnis sint error laudantium dolore, in quae ipsum.',
        icon: CloudRain
    },
]

const Features = () => {
    return (
        <div className='py-24 sm:py-32 '>
            <div className="max-w-2xl mx-auto lg:text-center ">
                <p className='font-semibold leading-7 text-blue-500'>Blog Faster</p>
                <h1 className='mt-2 text-3xl font-bold tracking-tight sm:text-4xl'>Get your Blog up and running in minutes </h1>
                <p className='mt-6 text-base leading-snug text-muted-foreground'>Right here you can create a blog in minutes. We make it easy for you to create a blog in minutes. The blog is very fast and easy to create.</p>
            </div>

            <div className="mx-auto mt-16 max-w-2 sm:mt-20 lg:mt-24 lg:max-w-4xl">
                <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                    {features.map(feature => (
                        <div className="relative pl-16" key={feature.name}>
                            <div className="text-base font-semibold leading-7">
                               <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-blue-500">
                                <feature.icon className='size-6 text-white'/>
                               </div>
                                {feature.name}
                            </div>
                            <p className='mt-2 text-sm text-muted-foreground leading-snug'>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Features