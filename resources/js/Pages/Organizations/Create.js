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
    abr: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    country: '',
    postal_code: ''
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

    Inertia.post(route('organizations.store'), values, {
      onFinish: () => setSending(false)
    });
  }

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('organizations')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Organizații
        </InertiaLink>
        <span className="font-medium text-indigo-600"> /</span> Adaugă
      </h1>
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Denumire"
              name="name"
              errors={errors.name}
              value={values.name}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Abreviere"
              name="abr"
              errors={errors.abr}
              value={values.abr}
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
              label="Telefon"
              name="phone"
              type="text"
              errors={errors.phone}
              value={values.phone}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Adresă"
              name="address"
              type="text"
              errors={errors.address}
              value={values.address}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Localitate"
              name="city"
              type="text"
              errors={errors.city}
              value={values.city}
              onChange={handleChange}
            />
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Țară"
              name="country"
              errors={errors.country}
              value={values.country}
              onChange={handleChange}
            >
              <option value=""></option>
              <option value="MD">Moldova</option>
              <option value="RO">România</option>
            </SelectInput>
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="*Cod Poștal"
              name="postal_code"
              type="text"
              errors={errors.postal_code}
              value={values.postal_code}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
            <LoadingButton
              loading={sending}
              type="submit"
              className="btn-indigo"
            >
              Adaugă organizație
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Create.layout = page => <Layout title="Create Organization" children={page} />;

export default Create;
