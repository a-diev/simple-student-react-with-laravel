import * as React from "react";

import { useForm } from "@inertiajs/react";

import Modal from "@/Components/Modal";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

import { Button } from "@/Components/ui/button";

interface IPropsAddStudentButton {
    errors?: any
    size?: 'default' | 'icon' | 'sm' | 'lg'
    icon?: React.ReactNode
    title?: string
}

export default function AddStudentButton({
    errors: errorsProps,
    size,
    icon,
    title,
}: Readonly<IPropsAddStudentButton>) {
    const [show, setShow] = React.useState<boolean>(false);
    const { data, setData, reset, errors, processing, post } =
        useForm({
            first_name: '',
            last_name: '',
            email: '',
        });

    const handleShow = () => setShow(!show)
    const handleClose = () => {
        reset();
        setShow(!show);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post(`/student`, {
            onSuccess: () => {
                handleClose()
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
                        Add New Student
                    </h3>
                    <form onSubmit={onSubmit} className="my-10 grid gap-5">
                        <div className="grid">
                            <InputLabel
                                htmlFor="first_name"
                                value="First Name"
                            />
                            <div className="h-2" />
                            <TextInput
                                id="first_name"
                                value={data.first_name}
                                onChange={(e) =>
                                    setData("first_name", e.target.value)
                                }
                                required
                                isFocused
                                autoComplete="first_name"
                            />
                            <div className="h-3" />
                            <InputError
                                message={errors.first_name}
                            />
                        </div>
                        <div className="grid">
                            <InputLabel
                                htmlFor="last_name"
                                value="Last Name"
                            />
                            <div className="h-2" />
                            <TextInput
                                id="last_name"
                                value={data.last_name}
                                onChange={(e) =>
                                    setData("last_name", e.target.value)
                                }
                                required
                                autoComplete="last_name"
                            />
                            <div className="h-3" />
                            <InputError
                                message={errors.last_name}
                            />
                        </div>
                        <div className="grid">
                            <InputLabel htmlFor="email" value="Email" />
                            <div className="h-2" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                required
                                autoComplete="username"
                            />
                            <div className="h-3" />
                            <InputError
                                message={errors.email || errorsProps.email}
                            />
                        </div>
                        <Button
                            type="submit"
                            variant={"default"}
                            disabled={processing}
                            className={processing ? 'bg-black bg-opacity-50' : ''}
                        >
                            Add New
                        </Button>
                    </form>
                </section>
            </Modal>
        </>
    );
}
