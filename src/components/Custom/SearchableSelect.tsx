import React from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../ui/button'
import { ChevronsUpDownIcon } from 'lucide-react'

type Option = {
    id: number
    name: string
}

type SearchableSelectPropsType = {
    options?: Option[]
    value?: string | number | undefined
    onChange?: (value: string | number) => void
    placeholder?: string
}

const SearchableSelect = ({
    options=[],
    value='',
    onChange,
    placeholder='',
}: SearchableSelectPropsType) => {
    const [open, setOpen] = React.useState(false)
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between hover:bg-transparent hover:text-inherit h-8 border-gray-200"
                >
                    {value ? (
                        <span className="text-black">
                            {
                                options.find(
                                    (option: Option) => option.name === value
                                )?.name
                            }
                        </span>
                    ) : (
                        <span>{placeholder}</span>
                    )}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 rounded-none">
                <Command>
                    <CommandInput placeholder="Library" className="h-8" />
                    <CommandList>
                        <CommandEmpty>No record found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option: Option) => (
                                <CommandItem
                                    key={option.id}
                                    value={option.name}
                                    onSelect={(currentValue) => {
                                        onChange?.(
                                            currentValue === value
                                                ? ''
                                                : currentValue
                                        )

                                        setOpen(false)
                                    }}
                                >
                                    {option.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SearchableSelect
