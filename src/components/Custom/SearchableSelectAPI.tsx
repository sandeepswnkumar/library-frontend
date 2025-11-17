import React, { useEffect, useState } from 'react'
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
import LibraryService from '@/services/LibraryService'
import useDebounce from '@/hooks/useDebounce'
import Constant from '@/lib/Constants'

type SearchableSelectPropsType = {
    options?: []
    value?: string | number | undefined
    onChange?: (value: string | number) => void
    placeholder?: string
    apiCall?: string
    keyField: string
    label: string
}

const SearchableSelectAPI = ({
    options = [],
    value = '',
    onChange,
    placeholder = '',
    apiCall = '',
    keyField = '',
    label = '',
}: SearchableSelectPropsType) => {
    type Option = {
        [keyField]: number | undefined | string
        [label]: string | number | undefined
    }

    const [open, setOpen] = React.useState(false)
    const [searchedQuery, setSearchedQuery] = useState<string>('')
    const debouncedSearchQuery = useDebounce(
        searchedQuery,
        Constant.DEBOUNCE_DELAY
    )
    const [filteredOptions, setFilteredOptions] = useState<[]>([])

    useEffect(() => {
        setFilteredOptions(options)
    }, [options])
    console.log("value",value)
    const handleSearchChange = (value: string) => {
        setSearchedQuery(value)
    }

    useEffect(() => {
        filterFromBackend()
    }, [debouncedSearchQuery])

    const filterFromBackend = () => {
        switch (apiCall) {
            case 'library':
                getLibrary()
                break
        }
    }
    const getLibrary = async () => {
        try {
            const resp = await LibraryService.getLibraries({
                libraryName: searchedQuery,
            })
            if (resp.data.success) {
                setFilteredOptions(resp.data.data)
            }
        } catch {}
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between hover:bg-transparent hover:text-inherit h-8 border-gray-200"
                >
                    {/* {console.log("keyField", filteredOptions)} */}
                    {value ? (
                        <span className="text-black">
                            {
                                
                                filteredOptions.find(
                                    (option: Option) =>
                                        option[keyField] === value
                                )?.[label]
                            }
                        </span>
                    ) : (
                        <span>{placeholder}</span>
                    )}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 rounded-none">
                <Command shouldFilter={false}>
                    <CommandInput
                        value={searchedQuery}
                        onValueChange={handleSearchChange}
                        placeholder="Search options"
                        className="h-8"
                        placeholder={placeholder}
                        className="h-8"
                    />
                    <CommandList>
                        <CommandEmpty>No record found.</CommandEmpty>
                        <CommandGroup>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option: Option) => (
                                    <CommandItem
                                        key={option[keyField]}
                                        value={String(option[keyField])}
                                        onSelect={(currentValue) => {
                                            console.log(
                                                'currentValue',
                                                currentValue,
                                                value
                                            )
                                            onChange?.(
                                                currentValue === value
                                                    ? ''
                                                    : currentValue
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        {option[label]}
                                    </CommandItem>
                                ))
                            ) : searchedQuery ? (
                                <CommandEmpty>
                                    No results found for "{searchedQuery}"
                                </CommandEmpty>
                            ) : null}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default SearchableSelectAPI
