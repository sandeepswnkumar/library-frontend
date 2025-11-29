import userTypeEnum from '@/Enums/UserTypeEnum'
import { useAppSelector } from '@/lib/hooks'
import { Edit, Trash2 } from 'lucide-react'
import React from 'react'

const PricingTable = ({ libraryShifts = [] }: { libraryShifts: [] }) => {
    const auth = useAppSelector((state) => state.auth)
    console.log('auth?.currentUser === ', auth?.currentUser)
    return (
        <div className="relative w-full max-h-[300px] overflow-y-auto">
            <table className="w-full border-collapse text-sm">
                <thead className="sticky top-0 bg-white z-20">
                    <tr className="bg-white border-b">
                        <th className="p-2 text-left">Sl.No.</th>
                        <th className="p-2 text-left">Room Type</th>
                        <th className="p-2 text-left">Booking Type</th>
                        <th className="p-2 text-left">Shift Time</th>
                        <th className="p-2 text-left">Price</th>
                        {auth?.currentUser?.user &&
                            auth?.currentUser.user.userTypeId ==
                                userTypeEnum.ADMIN && (
                                <th className="p-2 text-left">Action</th>
                            )}
                    </tr>
                </thead>
                <tbody>
                    {libraryShifts.length > 0 ? (
                        libraryShifts.map((shift, i) => (
                            <tr className="border-b last:border-0">
                                <td className="p-2">{i + 1}</td>
                                <td className="p-2">
                                    {shift.roomType.roomType}
                                </td>
                                <td className="p-2">
                                    {shift.bookingUnit.bookingUnit}
                                </td>
                                <td className="p-2">{shift.period}</td>
                                <td className="p-2">
                                    {parseFloat(shift.rate).toFixed(2)}
                                </td>
                                {auth?.currentUser?.user &&
                                    auth?.currentUser.user.userTypeId ==
                                        userTypeEnum.ADMIN && (
                                        <td className="p-2 flex gap-2">
                                            <Edit
                                                size={18}
                                                className="text-purple-700 cursor-pointer"
                                            />
                                            <Trash2
                                                size={18}
                                                className="text-purple-700 cursor-pointer"
                                                onClick={async () => {
                                                    try {
                                                        const resp =
                                                            await LibraryLocationService.deleteLibraryShiftAndPrice(
                                                                shift.id
                                                            )
                                                        if (resp.data.success) {
                                                            getLibraryLocation()
                                                        }
                                                    } catch {}
                                                }}
                                            />
                                        </td>
                                    )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6} className="text-center py-3">
                                No Record Found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default PricingTable
