import React, { useState } from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import Icon from '@/Shared/Icon';
import Pagination from '@/Shared/Pagination';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import LoadingButton from '@/Shared/LoadingButton';
import { Inertia } from '@inertiajs/inertia';

const AddLetter = () => {
    const { dictionaries, errors } = usePage().props;
    const {
        data,
        meta: { links }
    } = dictionaries;

    const [sending, setSending] = useState(false);
    const [show, setShow] = useState(false);
    const [values, setValues] = useState({
        letter: '',
        dictionary_id: '',
        dictionary_name: '',
    });
    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    function emptyValues() {
        setValues({
            letter: '',
            dictionary_id: '',
            dictionary_name: '',
        });
    }

    function handleSubmit(e) {
        values.dictionary_name = data.find(x => x.id == values.dictionary_id)?.name;
        e.preventDefault();
        setSending(true);
        Inertia.post(route('dictionaries.sendLetter'), values, {
            onFinish: () => {
                setSending(false);
                if (!errors.dictionary_id) {
                    emptyValues();
                }

            }
        });

    }

    return (
        <div>
            <div className="flex items-center justify-between mb-2">
                <div className="flex">
                    <span className="text-xl font-bold">Încarcă o literă într-un dicționar</span>
                </div>
            </div>
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap">

                        <div name="Litera" className="w-full pb-8 pr-6 litera">
                            <h2 className="pb-2">Copie și lipește mai jos litera din fișierul docx. ¡Nu lipiți mai mult de 10 pagini! </h2>
                            <h2 className="pb-2">¡Verificați cuvintele! Asigurați-vă că toate <i>cuvintele-titlu</i> sunt cu <strong>bold</strong></h2>

                            <CKEditor
                                editor={ClassicEditor}
                                config={{
                                    toolbar: ['bold', 'italic', 'link', '|', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],

                                }}
                                label="Litera"
                                name="letter"
                                data={values.letter}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setValues(values => ({
                                        ...values,
                                        letter: data
                                    }));

                                }}
                            />
                        </div>

                    </div>
                    <div className="w-full flex items-center justify-start gap-4 md:gap-6">
                        <SelectInput
                            className="pt-2"
                            name="dictionary_id"
                            errors={errors.dictionary_id}
                            value={values.dictionary_id}
                            onChange={handleChange}
                        >
                            <option value="">Selectează dicționarul</option>
                            {data.map(({ id, name }) => (
                                <option key={id} value={id}>
                                    {name}
                                </option>
                            ))}
                        </SelectInput>
                        <LoadingButton
                            loading={sending}
                            type="submit"
                            className="btn-indigo"
                        >
                            Încarcă litera
                        </LoadingButton>
                    </div>
                </form>
                {data.length === 0 && (
                    <tr>
                        <td className="px-6 py-4 border-t" colSpan="4">
                            Nu există nici un dicționar.
                        </td>
                    </tr>
                )}

            </div>
        </div>
    );
};

AddLetter.layout = page => <Layout title="Incarca litera" children={page} />;

export default AddLetter;
