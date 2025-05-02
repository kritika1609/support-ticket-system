import AttachmentInput from '@/Components/AttachmentInput';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import MultiSelectDropdown from '@/Components/MultiSelectDropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import Radiobutton from '@/Components/Radiobutton';
import TextArea from '@/Components/TextArea';
import TextInput from '@/Components/TextInput';
import UserHeader from '@/Components/UserHeader';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

const CreateTicket = ({ categories, labels, success }) => {
    const user = usePage().props.auth.user;
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [priority, setPriority] = useState('low');
    const [attachment, setAttachment] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedLabels, setSelectedLabels] = useState([]);
    const { errors } = usePage().props;
    const [messageVisible, setMessageVisible] = useState(true);

    // Function to hide the success message
    const hideMessage = () => {
        setMessageVisible(false);
    };

    const handleCategoryChange = (categories) => {
        setSelectedCategories(categories);
    };
    const handleLabelChange = (labels) => {
        setSelectedLabels(labels);
    };
    const handleAttachmentChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        setAttachment(file); // Save the file in the state
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', desc);
        formData.append('priority', priority);
        formData.append('attachment', attachment);
        formData.append('user_id', user.id);
        formData.append('status', 'open'); // default
        formData.append('agent_id', ''); // null for now

        selectedCategories.forEach((cat, index) => {
            formData.append(`categories[${index}]`, cat);
        });

        selectedLabels.forEach((label, index) => {
            formData.append(`labels[${index}]`, label);
        });

        router.post('/createticket/store', formData, {
            onSuccess: () => {
                // Reset the fields after submission
                setTitle('');
                setDesc('');
                setAttachment(null);
                setPriority('low');
                setSelectedCategories([]);
                setSelectedLabels([]);
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                 <UserHeader/>
            }
        >
            {messageVisible && success && (
                <div className="relative mb-4 rounded-lg bg-green-500 p-4 text-white shadow-lg">
                    <span>{success}</span>
                    <button
                        onClick={hideMessage}
                        className="absolute right-2 top-1 text-2xl font-bold text-white hover:text-gray-200 focus:outline-none"
                    >
                        ×
                    </button>
                </div>
            )}

            <Head title="CreateTicket" />
            <div className="py-12 bg-blue-200 min-h-screen">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <div className="bg-white shadow-lg rounded-2xl p-8">
                        <div className="text-xl text-gray-900">
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        id="title"
                                        type="text"
                                        name="title"
                                        value={title}
                                        className="mt-1 block w-full"
                                        autoComplete="title"
                                        isFocused={true}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="desc" value="Description" />
                                    <TextArea
                                        id="desc"
                                        value={desc}
                                        onChange={(e) => setDesc(e.target.value)}
                                        className="mt-1 block w-full p-2"
                                    />
                                    <InputError message={errors.desc} className="mt-2" />
                                </div>

                                {/* Centered Section Starts Here */}
                                <div className="mt-6 flex flex-col items-center text-center space-y-4 w-full">

                                    <div className="w-full max-w-md">
                                        <InputLabel htmlFor="category" value="Category" className='text-left' />
                                        <MultiSelectDropdown options={categories} onChange={handleCategoryChange} />
                                        <InputError message={errors.categories} className="mt-2" />
                                    </div>

                                    <div className="w-full max-w-md">
                                        <InputLabel htmlFor="label" value="Label" className='text-left' />
                                        <MultiSelectDropdown options={labels} onChange={handleLabelChange} />
                                        <InputError message={errors.Labels} className="mt-2" />
                                    </div>

                                    <div className="w-full max-w-md">
                                        <InputLabel htmlFor="attachment" value="Attachment" className='text-left' />
                                        <AttachmentInput
                                            id="attachment"
                                            name="attachment"
                                            onChange={handleAttachmentChange}
                                        />
                                        <InputError message={errors.attachment} className="mt-2" />
                                    </div>

                                    <div className="w-full max-w-md">
                                        <InputLabel htmlFor="priority" value="Priority" className='text-left' />
                                        <div className="flex justify-center gap-6 mt-2">
                                            <Radiobutton
                                                label="Low"
                                                value="low"
                                                name="priority"
                                                checked={priority === 'low'}
                                                onChange={(e) => setPriority(e.target.value)}
                                            />
                                            <Radiobutton
                                                label="Medium"
                                                value="medium"
                                                name="priority"
                                                checked={priority === 'medium'}
                                                onChange={(e) => setPriority(e.target.value)}
                                            />
                                            <Radiobutton
                                                label="High"
                                                value="high"
                                                name="priority"
                                                checked={priority === 'high'}
                                                onChange={(e) => setPriority(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <PrimaryButton className="ms-4">
                                            Create
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
};

export default CreateTicket;
