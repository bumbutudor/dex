import React, { useState } from 'react';
import Helmet from 'react-helmet';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from '@/Shared/Layout';
import DeleteButton from '@/Shared/DeleteButton';
import LoadingButton from '@/Shared/LoadingButton';
import TextInput from '@/Shared/TextInput';
import SelectInput from '@/Shared/SelectInput';
import FileInput from '@/Shared/FileInput';
import TrashedMessage from '@/Shared/TrashedMessage';
import { toFormData } from '@/utils';

const Edit = () => {
  const { user, errors } = usePage().props;
  const [sending, setSending] = useState(false);
  const [values, setValues] = useState({
    first_name: user.first_name || '',
    last_name: user.last_name || '',
    email: user.email || '',
    password: user.password || '',
    owner: user.owner ? '1' : '0' || '0',
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

    // NOTE: When working with Laravel PUT/PATCH requests and FormData
    // you SHOULD send POST request and fake the PUT request like this.
    // For more info check utils.jf file
    const formData = toFormData(values, 'PUT');

    Inertia.post(route('users.update', user.id), formData, {
      onFinish: () => setSending(false)
    });
  }

  function destroy() {
    if (confirm('Sunteți sigur că doriți să ștergeți acest utilizator?')) {
      Inertia.delete(route('users.destroy', user.id));
    }
  }

  function restore() {
    if (confirm('Sunteți sigur că doriți să restabiliți acest utilizator?')) {
      Inertia.put(route('users.restore', user.id));
    }
  }

  return (
    <div>
      <Helmet title={`${values.first_name} ${values.last_name}`} />
      <div className="flex justify-start max-w-lg mb-8">
        <h1 className="text-3xl font-bold">
          <InertiaLink
            href={route('users')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Utilizatori
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.first_name} {values.last_name}
        </h1>
        {user.photo && (
          <img className="block w-8 h-8 ml-4 rounded-full" src={user.photo} />
        )}
      </div>
      {user.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Acets utilizator a fost șters.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
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
              <option value="1">Nu</option>
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
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!user.deleted_at && (
              <DeleteButton onDelete={destroy}>Șterge utilizatorul</DeleteButton>
            )}
            <LoadingButton
              loading={sending}
              type="submit"
              className="ml-auto btn-indigo"
            >
              Modifică utilizatorul
            </LoadingButton>
          </div>
        </form>
      </div>
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
