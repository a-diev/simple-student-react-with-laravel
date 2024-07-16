import { Head } from '@inertiajs/react';

import { Delete, Edit } from 'lucide-react';

import { PageProps, IStudent } from '@/types';

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AddStudentButton from '@/Components/AddStudentButton';
import UpdateModalButton from '@/Components/UpdateModalButton';
import DeleteModalButton from '@/Components/DeleteModalButton';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';

type TResponseData = {
    students: IStudent[],
    count: number,
    errors: any,
}

export default function Student({ auth, students, count, errors }: PageProps<TResponseData>) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Student</h2>}
        >
            <Head title="Student" />

            <div className="py-12 min-h-[540px]">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* actions button */}
                        <div className="p-6 text-gray-900 flex items-center justify-between">
                            <span>
                                Total : {" "}
                                {count < 1 ? "No Student Yet" : count}
                            </span>
                            <AddStudentButton
                                title='Add Student'
                                size='sm'
                                errors={errors}
                            />
                        </div>
                        {/* table list data */}
                        <section className='px-3 py-5'>
                            <Table>
                                <TableHeader>
                                    {
                                        count < 1
                                            ?
                                            <TableRow>
                                                <TableHead className="text-center">
                                                    {count < 1 && 'No Student Yet'}
                                                </TableHead>
                                            </TableRow>
                                            :
                                            <TableRow>
                                                <TableHead>Student</TableHead>
                                                <TableHead className="hidden sm:table-cell">
                                                    Email
                                                </TableHead>
                                                <TableHead className="text-right"></TableHead>
                                            </TableRow>
                                    }
                                </TableHeader>
                                <TableBody>
                                    {count > 0 && students.map((s: IStudent) => (
                                        <TableRow key={s.id}>
                                            <TableCell>
                                                <div className="font-medium">
                                                    <strong>
                                                        {s.firstName}
                                                        &nbsp;
                                                        {s.lastName}
                                                    </strong>
                                                </div>
                                                <div className="hidden text-sm text-muted-foreground md:inline">
                                                    {s.email}
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                {s.email}
                                            </TableCell>
                                            <TableCell className="text-right flex justify-end gap-3">
                                                <UpdateModalButton
                                                    icon={<Edit size={18} />}
                                                    size='icon'
                                                    student={s}
                                                    errors={errors}
                                                />
                                                <DeleteModalButton
                                                    icon={<Delete size={18} />}
                                                    size='icon'
                                                    student={s}
                                                    errors={errors}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
