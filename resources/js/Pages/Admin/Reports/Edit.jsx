import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Head, useForm } from '@inertiajs/react';
import React, { useRef, useState, useEffect} from "react";
import TextEditor from "@/Components/TextEditor";

export default function Edit({ report }) {
    const { data, setData, put, processing, errors } = useForm({
        notes : report.notes,
        is_resolved : report.is_resolved,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.reports.update', report.id), {
            preserveScroll: true,
        });
    };

    const trixInput = useRef(null);
    trixInput.current = (report.chirp && report.chirp.message) ? report.chirp.message : '';

    useEffect(() => {
        if (trixInput.current) {
            trixInput.current.editor.loadHTML((report.chirp && report.chirp.message) ? report.chirp.message : '');
        }
    }, [report.chirp]);

    const hashtags = [];
    if(report.chirp) {
        const hashtags = report.chirp.hashtags ? report.chirp.hashtags.split('|') : [];
    }

    return (
        <AuthenticatedLayout>
            <Head title="Detail Report" />

            <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h1 className="text-xl font-semibold mb-4">Detail Report</h1>
                        <div>
                            <h1 className="text-lg font-semibold mb-2">User</h1>
                            <div className='my-4 flex flex-col justify-start items-start'>
                                <div className='flex flex-row justify-start items-center'>
                                    <div className='flex flex-col'>
                                        {report.user ? report.user.name : ''}
                                    </div>
                                    <div className='ml-4 flex flex-col'>
                                        {report.user ? report.user.email : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold mb-2">Chrip</h1>
                            <div className='mt-4 flex flex-col justify-start items-start'>
                                <div className='flex flex-row justify-start items-center'>
                                    {(report.chirp ? report.chirp.image : '')  && (
                                        <img
                                            src={`/storage/${report.chirp ? report.chirp.image : ''}`}
                                            alt="Chirp"
                                            className='w-24 h-24 mr-4 cover'
                                        />
                                    )}
                                    <div className='flex justify-center flex-col'>
                                        <span id="empty-toolbar"></span>
                                        <trix-editor
                                            ref={trixInput}
                                            class="trix-editor w-full h-full border-none"
                                            readonly
                                            toolbar="empty-toolbar"
                                        />
                                    </div>
                                </div>
                                <div className="mt-1">
                                    {hashtags.map((hashtag, index) => (
                                        <span
                                            key={index}
                                            className="inline-block bg-blue-500 text-white rounded-full py-1 px-3 text-sm mr-2 mb-2"
                                        >
                                            #{hashtag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <h1 className="text-lg font-semibold mb-2">Report Notes</h1>
                        <form onSubmit={submit}>
                            <div className="mb-4 flex items-center">
                                <textarea
                                    className="w-full h-32 border-gray-300 rounded-lg focus:ring focus:ring-green-200 focus:border-green-400"
                                    placeholder="Add notes (optional)"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                ></textarea>
                                {errors.notes && (
                                    <span className="text-red-500 text-sm">{errors.notes}</span>
                                )}
                            </div>


                            {/* Is Resolved Toggle */}
                            <div className="mb-4 flex items-center">
                                <InputLabel htmlFor="is_resolved" value="Status" />
                                <button
                                    type="button"
                                    onClick={() => setData('is_resolved', !data.is_resolved)}
                                    className={`ml-4 px-4 py-2 rounded-md ${
                                        data.is_resolved
                                            ? 'bg-green-500 text-white'
                                            : 'bg-red-500 text-white'
                                    }`}
                                >
                                    {data.is_resolved ? 'Resolved' : 'Not Resolved'}
                                </button>
                            </div>

                            <div className="flex items-center justify-end">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Save
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
