'use client'
import BaseCard from '@/components/Custom/BaseCard'
import SubHeaderCard from '@/components/Custom/SubHeaderCard'
import Container from '@/components/layout/Container'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { useEffect, useReducer, useRef } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import LibraryService from '@/services/LibraryService'
import { useAppSelector } from '@/lib/hooks'
import { useParams, useRouter } from 'next/navigation'
import AddLibraryLocation from './AddLibraryLocation'
import { Switch } from '@/components/ui/switch'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import LibraryLocationService from '@/services/LibraryLocationService'
import Link from 'next/link'

export default function EditLibrary() {
    // const id = (props as { params?: { id?: string } })?.params?.id
    const { id }: { id: string } = useParams()
    type LibraryStatus = { id: number; name: string }
    type LibraryType = { id: number; name: string }
    type Location = {
        id?: number
        locationName?: string
        isActive?: boolean
        address1?: string
        address2?: string
        city?: { name?: string }
        state?: { name?: string }
        country?: { name?: string; phonecode?: string }
        pincode?: string
        email?: string
        phone?: string
    }
    type LibraryData = {
        locations?: Location[]
        [key: string]: unknown
    }

    type LibraryEventState = {
        libraryStatus: LibraryStatus[]
        libraryTypes: LibraryType[]
        library: LibraryData | null
    }

    const [event, updateEvent] = useReducer(
        (prev: LibraryEventState, next: Partial<LibraryEventState>) => {
            return { ...prev, ...next }
        },
        {
            libraryStatus: [],
            libraryTypes: [],
            library: null,
        } as LibraryEventState
    )
    const formRef = useRef<HTMLFormElement | null>(null)
    const library = useAppSelector((state) => state.library)
    const router = useRouter()
    useEffect(() => {
        updateEvent({
            libraryStatus: library.status,
            libraryTypes: library.types,
        })

        if (library.status.length && library.types.length) {
            getLibraryDetails()
        }
    }, [library])
    const formSchema = z.object({
        libraryName: z.string().min(2, {
            message: 'Library name must be at least 2 characters.',
        }),
        dimension: z.number().optional(),
        floor: z.number().optional(),
        capacity: z.number().optional(),
        statusId: z.number().min(1, {
            message: 'Please select a status.',
        }),
        typeId: z.number().min(1, {
            message: 'Please select a type.',
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            libraryName: '',
            dimension: 0,
            floor: 0,
            capacity: 0,
            statusId: 0,
            typeId: 0,
        },
    })

    const getLibraryDetails = async () => {
        try {
            const resp = await LibraryService.getLibrary(id)
            if (resp.data.success) {
                const {
                    libraryName,
                    typeId,
                    statusId,
                    dimension,
                    floor,
                    capacity,
                } = resp.data.data
                form.reset({
                    libraryName,
                    typeId,
                    statusId,
                    dimension,
                    floor,
                    capacity,
                })
                updateEvent({
                    library: resp.data.data,
                })
            }
        } catch {}
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const resp = await LibraryService.updateLibrary(id, values)
            if (resp.data.success) {
                getLibraryDetails()
            }
        } catch (err) {}
    }

    const handleSaveClick = () => {
        if (formRef.current) {
            formRef.current?.requestSubmit?.()
        }
    }
    console.log('event.library', event.library)
    return (
        <Container>
            <SubHeaderCard>
                <div>
                    <h2 className="font-bold uppercase text-muted-foreground">
                        Library Edit
                    </h2>
                </div>
                <div className="flex gap-3">
                    {event.library && (
                        <>
                            <AddLibraryLocation
                                library={event.library as any}
                                getLibraryDetail={getLibraryDetails}
                            />
                        </>
                    )}

                    <Button onClick={handleSaveClick}>Save</Button>
                </div>
            </SubHeaderCard>
            <div className="flex flex-col gap-3">
                <Form {...form}>
                    <form
                        ref={formRef}
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <BaseCard
                            cardTitle="Basic Information"
                            cardContentClass="pt-1"
                        >
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                <FormField
                                    control={form.control}
                                    name="libraryName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Library Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Library Name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="statusId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={String(
                                                        field.value || ''
                                                    )}
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>

                                                    <SelectContent>
                                                        {event.libraryStatus
                                                            .length > 0 ? (
                                                            event.libraryStatus.map(
                                                                (status: {
                                                                    id: number
                                                                    name: string
                                                                }) => (
                                                                    <SelectItem
                                                                        key={
                                                                            status.id
                                                                        }
                                                                        value={String(
                                                                            status.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            status.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="StatusNoRecord"
                                                                value="null"
                                                                disabled={true}
                                                            >
                                                                No Record found
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="typeId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    value={String(
                                                        field.value || ''
                                                    )}
                                                    onValueChange={(value) =>
                                                        field.onChange(
                                                            Number(value)
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {event.libraryTypes
                                                            .length > 0 ? (
                                                            event.libraryTypes.map(
                                                                (type: {
                                                                    id: number
                                                                    name: string
                                                                }) => (
                                                                    <SelectItem
                                                                        key={
                                                                            type.id
                                                                        }
                                                                        value={String(
                                                                            type.id
                                                                        )}
                                                                    >
                                                                        {
                                                                            type.name
                                                                        }
                                                                    </SelectItem>
                                                                )
                                                            )
                                                        ) : (
                                                            <SelectItem
                                                                key="TypeNoRecord"
                                                                value="null"
                                                                disabled={true}
                                                            >
                                                                No Record found
                                                            </SelectItem>
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dimension"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Diamention</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Dimension"
                                                    type='number'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="floor"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Floor</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Floor"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Capacity</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="number"
                                                    placeholder="Capacity"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </BaseCard>
                    </form>
                </Form>
                <BaseCard cardTitle="Branch" cardContentClass="pt-1">
                    <div className="grid grid-cols-4 gap-3 w-full">
                        {(event.library?.locations || []).map(
                            (location: any, idx: number) => (
                                <div
                                    key={location.id ?? idx}
                                    className="border p-3 rounded-md box-border flex flex-wrap flex-col"
                                >
                                    <div className="flex gap-2 justify-between items-center">
                                        <div className="flex  gap-2 justify-end items-center ">
                                            <Link
                                                href={`/branch/${location.id}`}
                                            >
                                                <ExternalLink
                                                    size={18}
                                                    className="text-purple-800 cursor-pointer"
                                                />
                                            </Link>
                                            <Edit
                                                size={18}
                                                className="text-purple-800 cursor-pointer"
                                            />
                                            <Trash2
                                                size={18}
                                                className="text-purple-800 cursor-pointer"
                                            />
                                        </div>
                                        <Switch
                                            checked={location.isActive}
                                            onCheckedChange={async (
                                                isChecked
                                            ) => {
                                                try {
                                                    const resp =
                                                        await LibraryLocationService.updateLibraryLocation(
                                                            location.id,
                                                            {
                                                                isActive:
                                                                    isChecked,
                                                            }
                                                        )
                                                    if (resp.data.success) {
                                                        getLibraryDetails()
                                                    }
                                                    console.log('resp', resp)
                                                } catch {}
                                            }}
                                            className="cursor-pointer"
                                        />
                                    </div>
                                    <h2 className="font-bold text-xl">
                                        {location.locationName}
                                    </h2>
                                    <div className="flex flex-wrap">
                                        <span className="text-[14px]">
                                            {location.address1}
                                        </span>
                                        <span className="text-[14px]">
                                            ,{location.address2}
                                        </span>
                                        <span className="text-[14px]">
                                            ,{location.city.name}
                                        </span>
                                        <span className="text-[14px]">
                                            ,{location.state.name}
                                        </span>
                                        <span className="text-[14px]">
                                            ,{location.country.name}
                                        </span>
                                    </div>
                                    <span className="text-[14px]">
                                        Pincode : {location.pincode}
                                    </span>
                                    <span className="text-[14px]">
                                        Email : {location.email}
                                    </span>
                                    <span className="text-[14px]">
                                        Phone : {location.country.phonecode}-
                                        {location.phone}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                </BaseCard>
                {/* <BaseCard
                    cardTitle="Library Facitilies"
                    cardContentClass="pt-1"
                >
                    <div className="grid grid-cols-4 gap-3 w-full">
                        {(event.library?.facilities || []).map(
                            (facility: any, idx: number) => (
                                <div
                                    key={facility.id ?? idx}
                                    className="border p-3 rounded-md box-border flex flex-wrap flex-col"
                                >
                                    <div className="flex gap-2 justify-end items-center">
                                        <Edit
                                            size={20}
                                            className="text-purple-800 cursor-pointer"
                                        />
                                        <Trash2
                                            size={20}
                                            className="text-purple-800 cursor-pointer"
                                        />
                                    </div>
                                    <h2 className="font-bold text-xl">
                                        {facility.name}
                                    </h2>
                                </div>
                            )
                        )}
                    </div>
                </BaseCard> */}
            </div>
        </Container>
    )
}
