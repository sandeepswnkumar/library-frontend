export type LibraryLocation = {
  id: number
  libraryId: number
  library?: LibraryRef
  locationName?: string
  email?: string
  phone?: string
  isActive?: boolean
}

export type LibraryRef = {
  id: number
  libraryName: string
}