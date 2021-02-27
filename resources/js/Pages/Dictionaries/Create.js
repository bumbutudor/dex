import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';

const Create = () => {
  const { errors } = usePage().props;
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    name: '',
    description: '',
    // organization_id: '',
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

    Inertia.post(route('dictionaries.store'), values, {
      onFinish: () => setSending(false)
    });
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('dictionaries')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Dicționare
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Adaugă
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/1"
              label="Titlu"
              name="name"
              errors={errors.name}
              value={values.name}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/1"
              label="Descriere"
              name="description"
              errors={errors.description}
              value={values.description}
              onChange={handleChange}
            />

            {/* @TODO Review the organization of the dictionary */}
            {/* <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Organizație"
              name="organization_id"
              errors={errors.organization_id}
              value={values.organization_id}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="1">IFR</option>
              <option value="2">IMI</option>
            </SelectInput> */}
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={sending}
              type="submit"
              className="btn-indigo"
            >
              Adaugă
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Adaugă dicționar" children={page} />;

export default Create;
