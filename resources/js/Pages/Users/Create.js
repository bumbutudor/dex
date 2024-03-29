import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import FileInput from '@/Shared/FileInput';
import { toFormData } from '@/utils';

const Create = () => {
  const { errors } = usePage().props;
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    owner: '0',
    photo: ''
  });

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValues(values => ({
      ...values,
      [key]: value
    }));
  }

  function handleFileChange(file) {
    setValues(values => ({
      ...values,
      photo: file ? file : ''
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);

    // since we are uploading an image
    // we need to use FormData object
    // for more info check utils.js
    const formData = toFormData(values);

    Inertia.post(route('users.store'), formData, {
      onFinish: () => setSending(false)
    });
  }

  return (
    <div>
      <div>
        <h1 className="mb-8 text-3xl font-bold">
          <InertiaLink
            href={route('users')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Utilizatori
          </InertiaLink>
          <span className="font-medium text-indigo-600"> /</span> Adaugă
        </h1>
      </div>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form name="createForm" onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Prenume"
              name="first_name"
              errors={errors.first_name}
              value={values.first_name}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Nume"
              name="last_name"
              errors={errors.last_name}
              value={values.last_name}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Email"
              name="email"
              type="email"
              errors={errors.email}
              value={values.email}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Parolă"
              name="password"
              type="password"
              errors={errors.password}
              value={values.password}
              onChange={handleChange}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Lexicograf"
              name="owner"
              errors={errors.owner}
              value={values.owner}
              onChange={handleChange}
            >
              <option value="0">Da</option>
              <option value="1" disabled>Nu</option>
            </SelectInput>
            <FileInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Fotografie"
              name="photo"
              accept="image/*"
              errors={errors.photo}
              value={values.photo}
              onChange={handleFileChange}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={sending}
              type="submit"
              className="btn-indigo"
            >
              Adaugă utilizator
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Adaugă utilizator" children={page} />;

export default Create;
