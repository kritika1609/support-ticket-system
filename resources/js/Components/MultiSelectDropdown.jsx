import React, { useState, useEffect, useRef } from 'react';

const MultiSelectDropdown = ({ options, onChange }) => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Track dropdown state
    const dropdownRef = useRef(null);

    // Close the dropdown if clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle category selection
    const handleSelect = (category) => {
        if (!selectedCategories.includes(category)) {
            const updated = [...selectedCategories, category];
            setSelectedCategories(updated);
            onChange(updated);
            setIsOpen(false); // closes dropdown
        }
    };

    // Handle category unselection
    const handleRemove = (category) => {
        const updatedCategories = selectedCategories.filter(item => item !== category);
        setSelectedCategories(updatedCategories);
        onChange(updatedCategories); // Pass updated categories to parent
    };

    return (
        <div ref={dropdownRef} className="relative">
            <button
                type="button"
                className="border-gray-800 shadow rounded-md p-2 w-2/4"
                onClick={() => setIsOpen(!isOpen)} // Toggle dropdown visibility
            >
                select
            </button>

            {isOpen && (
                <div className="absolute z-10 bg-white border-black rounded-md w-2/4 mt-1 shadow-md">
                    {options.map((category) => (
                        <div
                            key={category}
                            onClick={() => handleSelect(category)}
                            className="cursor-pointer p-2 hover:bg-indigo-100"
                        >
                            {category}
                        </div>
                    ))}
                </div>
            )}

            <div className="mt-2 flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                    <div
                        key={category}
                        className="flex items-center bg-blue-200 text-blue-800 text-base px-2 py-1 rounded-full"
                    >
                        {category}
                        <span
                            onClick={() => handleRemove(category)}
                            className="ml-2 cursor-pointer"
                        >
                            &times;
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MultiSelectDropdown;
