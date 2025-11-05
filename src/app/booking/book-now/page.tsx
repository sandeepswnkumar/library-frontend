import BaseCard from '@/components/Custom/BaseCard'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import React from 'react'

const BookNow = () => {
    return (
        <Container>
            <BaseCard cardClass="">
                <div className="w-full flex flex-col justify-center items-center gap-4">
                    {/* <h2 className="text-xl font-medium">Book Now</h2> */}

                    {/* Room Type Selection */}
                    <div className=" flex gap-2 flex-col justify-center items-center">
                        <h2 className="text-md font-medium ">Room Type</h2>
                        <div className=' flex gap-3 '>
                            <div>
                                <Label
                                    htmlFor="ac"
                                    className=" bg-purple-600 py-2 px-4 text-xs min-w-8 min-h-8 text-white rounded-sm border flex justify-center items-center"
                                >
                                    AC
                                </Label>
                                <Checkbox id="ac" className="hidden" />
                            </div>
                            <div>
                                <Label
                                    htmlFor="non-ac"
                                    className=" bg-purple-600 py-2 px-4 text-xs min-w-8 min-h-8 text-white rounded-sm border flex justify-center items-center"
                                >
                                    Non-AC
                                </Label>
                                <Checkbox id="non-ac" className="hidden" />
                            </div>
                        </div>
                    </div>

                    {/* Room Type Selection */}
                    {/* Room Type Selection */}
                    {/* Room Type Selection */}
                </div>
            </BaseCard>
        </Container>
    )
}

export default BookNow
