import { useState } from 'react';

export const useForm = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const updateInput = (newValue) => {
        setValue(newValue);
    }

    return [value, updateInput];
}

