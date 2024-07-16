import * as React from "react";

import { useForm } from "@inertiajs/react";

import { IStudent } from "@/types";

import Modal from "@/Components/Modal";

import { Button } from "@/Components/ui/button";

interface IPropsDeleteModalButton {
    errors?: any
    student?: IStudent | any
    size?: 'default' | 'icon' | 'sm' | 'lg'
    icon?: React.ReactNode
    title?: string
}

export default function DeleteModalButton({
    student,
    size,
    icon,
    title,
}: Readonly<IPropsDeleteModalButton>) {
    const [show, setShow] = React.useState<boolean>(false);
    const { processing, delete: destroy } =
        useForm({
            id: student.id,
            first_name: student.firstName,
            last_name: student.lastName,
            email: student.email,
        });

    const handleShow = () => setShow(!show)
    const handleClose = () => {
        setShow(!show);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        destroy(`/student/${student.id}`, {
            onSuccess: () => {
                handleClose();
            },
        })
    }

    return (
        <>
            <Button
                variant={"default"}
                size={size}
                onClick={handleShow}
            >
                {icon}{title}
            </Button>

            <Modal show={show} onClose={handleClose} maxWidth="xl">
                <section className="mx-5 my-10">
                    <h3 className="font-bold text-lg">
                        Delete Student
                    </h3>
                    <form onSubmit={onSubmit} className="my-10 grid gap-5">
                        <h1>
                            Your sure delete student with name {student?.firstName} {student?.lastName}?
                        </h1>
                        <Button
                            type="submit"
                            variant={"default"}
                            disabled={processing}
                            className={processing ? 'bg-black bg-opacity-50' : ''}
                        >
                            Save
                        </Button>
                    </form>
                </section>
            </Modal>
        </>
    );
}
