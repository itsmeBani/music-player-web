import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"
import {ArrowUpDown, ChevronDown, MoreHorizontal, Trash2Icon, TriangleAlert} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Checkbox} from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Input} from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {useQuery} from "@tanstack/react-query"
import {fetchUsers} from "../../query/fetchUsers.ts"
import {Badge} from "@/components/ui/badge.tsx"
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx"
import {useDeleteUser} from "@/hooks/useDeleteUser.ts";
import {useAuth} from "@/context/AuthProvider.tsx";
import {Navigate} from "react-router";

interface UserColumnsProps {
    DeleteUser: (id: string) => void
}

export function UserColumns({DeleteUser}: UserColumnsProps) {
    const columns: ColumnDef<User>[] = [
        {
            id: "select",
            header: ({table}) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({row}) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "userName",
            header: ({column}) => (
                <Button
                    className="hover:bg-unset PlusJakartaSans-Bold hover:text-white"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Username
                    <ArrowUpDown/>
                </Button>
            ),
            cell: ({row}) => <div>{row.getValue("userName")}</div>,
        },
        {
            accessorKey: "email",
            header: ({column}) => (
                <Button
                    className="hover:bg-unset PlusJakartaSans-Bold hover:text-white"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown/>
                </Button>
            ),
            cell: ({row}) => (
                <div className="lowercase">{row.getValue("email")}</div>
            ),
        },
        {
            accessorKey: "roles",
            header: () => <p className="PlusJakartaSans-Bold">Roles</p>,
            cell: ({row}) =>  row.original.roles.map((role:string)=> <Badge variant="outline" className={"mr-1 border-[#0e6]/30 text-green-800"}>{role}</Badge>)
        },
        {
            accessorKey: "emailConfirmed",
            header: () => <p className="PlusJakartaSans-Bold">Verified</p>,
            cell: ({row}) => {
                const confirmed = row.getValue("emailConfirmed") as boolean
                return confirmed ? (
                    <Badge
                        className="text-[#0e6]/80 border border-[#0e6]/80"
                        variant="outline"
                    >
                        Verified
                    </Badge>
                ) : (
                    <Badge variant="outline" className={"border-red-600/50 py-1 text-red-500/60"}>Unverified</Badge>
                )
            },
        },
        {
            id: "actions",
            enableHiding: false,
            header: () => <p className="PlusJakartaSans-Bold">Actions</p>,
            cell: ({row}) => (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className={"hover:bg-unset text-white"}>
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal color={"white"} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="">
                        <div className=" space-y-2  pb-3">
                            <p className="text-sm text-red-400 flex place-items-center">
                                <TriangleAlert className="inline-block mr-1"/>
                                This action cannot be undone
                            </p>
                        </div>
                        <Button
                            onClick={() => DeleteUser(row?.original.id)}
                            className="flex text-red-400 hover:text-white bg-unset border-red-400 border place-items-center justify-center w-full"
                            variant="destructive"
                        >
                            <Trash2Icon className="h-4 w-4 mr-2"/>
                            Delete user
                        </Button>
                    </PopoverContent>
                </Popover>
            ),
        },
    ]

    return {columns}
}

export type User = {
    id: string
    userName: string
    email: string
    emailConfirmed: boolean
    roles:string[]
}

export default function ManageUsers() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const { mutate: deleteUser } = useDeleteUser();
   const {currentUser}=useAuth()
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const DeleteUser = (id: string) => {
        deleteUser(id)
    }

    const {data: userdata = [], isLoading} = useQuery(fetchUsers())
    const {columns} = UserColumns({DeleteUser})

    const table = useReactTable({
        data: userdata,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })


  if(!currentUser?.roles.includes("Admin"))  return  <Navigate to={"/"}/>
    return (
        <div className="w-full">
            <div className="flex items-center py-4 gap-2 ">
                <Input
                    placeholder="Filter emails..."
                    value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("email")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                {table.getFilteredSelectedRowModel().rows.length > 0 && (
                    <Button
                        variant="outline"
                        className="text-red-500 hover:bg-unset hover:text-red-600 border-red-600 "
                        onClick={() => {
                            const selectedIds = table
                                .getFilteredSelectedRowModel()
                                .rows.map((row) => row.original.id)

                            selectedIds.forEach((id) => DeleteUser(id))

                            setRowSelection({})
                        }}
                    >
                        <Trash2Icon className="h-4 w-4 " />
                        Delete {table.getFilteredSelectedRowModel().rows.length > 1 ? "Records" :"Record" }
                    </Button>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow className={" border-white/20"}
                                          key={row.id}
                                          data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className={" PlusJakartaSans-SemiBold text-white/70"} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Footer with Delete Selected + Pagination */}
            <div className="flex items-center justify-between py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.

                </div>

                <div className="flex space-x-2">



                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
