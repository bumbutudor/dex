import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';


const Create = () => {
  const { dictionaries, errors } = usePage().props;
  const [sending, setSending] = useState(false);
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({
    name: '',
    predefinition: '',
    definition: '',
    synonyms: '',
    antonyms: '',
    paronyms: '',
    other: '',
    active: '1',
    dictionary_id: '',
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    Inertia.post(route('words.store'), values, {
      onFinish: () => setSending(false)
    });
  }


  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('words')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Articol lexicografic
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Adaugă
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Cuvânt-titlu"
              name="name"
              type="text"
              errors={errors.name}
              value={values.name}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Cuvânt de bază (folosit la ordonarea cuvintelor)"
              name="predefinition"
              type="text"
              errors={errors.predefinition}
              value={values.predefinition}
              onChange={handleChange}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Dicționar"
              name="dictionary_id"
              errors={errors.dictionary_id}
              value={values.dictionary_id}
              onChange={handleChange}
            >
              <option value=""></option>
              {dictionaries.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </SelectInput>
            <div name="Definiție" className="w-full pb-8 pr-6 lg:w-1/1">
              <h2 className="pb-2">Descriere lexicografică:</h2>

              <CKEditor
                editor={ClassicEditor}
                config={{
                  toolbar: ['bold', 'italic', 'link', '|', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],

                }}
                label="Definiție"
                name="definition"
                errors={errors.definition}
                data={values.definition}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValues(values => ({
                    ...values,
                    definition: data
                  }));

                }}
              />
            </div>


            {/* <TextInput
              className="w-full pb-8 pr-6 lg:w-1/1"
              label="Definiție"
              name="definition"
              type="text"
              errors={errors.definition}
              value={values.definition}
              onChange={handleChange}
            /> */}

            <div label="More" className="w-full pb-8 pr-6 lg:w-1/1" >
              <label className="btn-info" onClick={() => setShow(!show)} > Mai multe proprietăți </label>
            </div>

            {show && (<>
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Sinonime"
                name="synonyms"
                type="text"
                errors={errors.synonyms}
                value={values.synonyms}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Antonime"
                name="antonyms"
                type="text"
                errors={errors.antonyms}
                value={values.antonyms}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Paronime"
                name="paronyms"
                type="text"
                errors={errors.paronyms}
                value={values.paronyms}
                onChange={handleChange}
              />
              <TextInput
                className="w-full pb-8 pr-6 lg:w-1/2"
                label="Alte informații"
                name="other"
                type="text"
                errors={errors.other}
                value={values.other}
                onChange={handleChange}
              /></>)}

            {/* <SelectInput
              disabled
              className="w-full pb-8 pr-6 lg:w-1/1"
              label="Cuvânt activ"
              name="active"
              value="1"
              errors={errors.active}
              value={values.active}
              onChange={handleChange}
            >
              <option value="1">Da</option>
            </SelectInput> */}
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={sending}
              type="submit"
              className="btn-indigo"
            >
              Salvează cuvântul
            </LoadingButton>
          </div>
        </form>
      </div>
      <div className="mt-10 max-w-3xl overflow-hidden bg-white rounded shadow">
        <div className="flex flex-wrap p-8 -mb-8 -mr-6">
          <p className="w-full pb-4 pr-6">Exemplu de afișare finală a obiectului din Dicționar:</p>
          <div className="w-full pb-8 pr-6" label="cuvant">
            <h1 className="text-md  pb-2 w-full pr-6">
              <a className="font-bold text-indigo-600">{values.name}</a>
            </h1>
            <p className="w-full pb-8 pr-6">{parse(values.definition)}</p>

          </div>
        </div>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Adaugă cuvânt" children={page} />;

export default Create;
