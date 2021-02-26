import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import Icon from '@/Shared/Icon';

const Edit = () => {
  const { errors, dictionary } = usePage().props;
  const [sending, setSending] = useState(false);

  const [values, setValues] = useState({
    name: dictionary.name || '',
    description: dictionary.description || '',
    organization_id: dictionary.organization_id || '',
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
    Inertia.put(route('dictionaries.update', dictionary.id), values, {
      onFinish: () => setSending(false)
    });
  }

  function destroy() {
    if (confirm('Sunteți sigur că doriți să ștergeți acest dicționar?')) {
      Inertia.delete(route('dictionaries.destroy', dictionary.id));
    }
  }

  function restore() {
    if (confirm('Sunteți sigur că doriți să restabiliți acest dicționar?')) {
      Inertia.put(route('dictionaries.restore', dictionary.id));
    }
  }

  return (
    <div>
      <Helmet title={values.name} />
      <h1 className="mb-8 text-3xl font-bold">
        <InertiaLink
          href={route('dictionaries')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Dicționare
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span>
        {values.name}
      </h1>
      {dictionary.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Dicționarul a fost șters.
        </TrashedMessage>
      )}
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
            <SelectInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Organizație"
              name="organization_id"
              disabled
              errors={errors.organization_id}
              value={values.organization_id}
              onChange={handleChange}
            >
              <option value="1">IFR</option>
            </SelectInput>
          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!dictionary.deleted_at && (
              <DeleteButton onDelete={destroy}>
                Șterge dicționarul
              </DeleteButton>
            )}
            <LoadingButton
              loading={sending}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Modifică dicționarul
            </LoadingButton>
          </div>
        </form>
      </div>
      <h2 className="mt-12 text-2xl font-bold">Cuvinte</h2>
      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="font-bold text-left">
              <th className="px-6 pt-5 pb-4">Cuvânt</th>
              <th className="px-6 pt-5 pb-4">Pre-definiție</th>
              <th className="px-6 pt-5 pb-4" colSpan="2"> Definiție
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Todo */}
            {/* {organization.contacts.map(
              ({ id, name, phone, city, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-gray-100 focus-within:bg-gray-100"
                  >
                    <td className="border-t">
                      <InertiaLink
                        href={route('contacts.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {name}
                        {deleted_at && (
                          <Icon
                            name="trash"
                            className="flex-shrink-0 w-3 h-3 ml-2 text-gray-400 fill-current"
                          />
                        )}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('contacts.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {city}
                      </InertiaLink>
                    </td>
                    <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('contacts.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {phone}
                      </InertiaLink>
                    </td>
                    <td className="w-px border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('contacts.edit', id)}
                        className="flex items-center px-4"
                      >
                        <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        />
                      </InertiaLink>
                    </td>
                  </tr>
                );
              }
            )}
            {organization.contacts.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  No contacts found.
                </td>
              </tr>
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
