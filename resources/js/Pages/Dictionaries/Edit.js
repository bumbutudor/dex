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
import Pagination from '@/Shared/Pagination';
import parse from 'html-react-parser';
import { html_substring } from '@/utils';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Edit = () => {
  const { errors, dictionary, organizations, dictionary_words } = usePage().props;
  const [sending, setSending] = useState(false);
  const [show, setShow] = useState(false);

  const {
    data,
    meta: { links }
  } = dictionary_words;

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
  const animateIconOnClick = () => {
    document.querySelector('#reload-icon').classList.add('animate-spin');
  }

  return (
    <div>
      <Helmet title={values.name} />
      <div className="flex items-center mb-6">
        <span className="mb-2 text-3xl font-bold">
          <InertiaLink
            href={route('dictionaries')}
            className="text-indigo-600 hover:text-indigo-700"
          >
            Dicționare
          </InertiaLink>
          <span className="mx-2 font-medium text-indigo-600">/</span>
          {values.name}
        </span>
        <div label="edit-dictionary" className="btn pl-6" >
          <label className="btn-edit" onClick={() => setShow(!show)} > Editează detaliile dicționarului </label>
        </div>
      </div>

      {dictionary.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Dicționarul a fost șters.
        </TrashedMessage>
      )}

      {show && (<>
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
              {/* Mod 06.02.2021 by Tudor - TextInput to CK editor */}
              <div name="Descriere" className="w-full pb-8 pr-6 lg:w-1/1">
                <h2 className="pb-2">Descriere:</h2>

                <CKEditor
                  editor={ClassicEditor}
                  config={{
                    toolbar: ['bold', 'italic', 'link', '|', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],

                  }}
                  label="Descriere"
                  name="description"
                  errors={errors.description}
                  data={values.description}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setValues(values => ({
                      ...values,
                      description: data
                    }));

                  }}
                />
              </div>
              {/* @TODO Review the organization of the dictionary */}
              <SelectInput
                className="w-full pb-8 pr-6 lg:w-1/1"
                label="Instituție"
                name="organization_id"
                errors={errors.organization_id}
                value={values.organization_id}
                onChange={handleChange}
              >
                <option value=""></option>
                {organizations.map(({ id, name }) => (
                  <option key={id} value={id}>
                    {name}
                  </option>
                ))}
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
                Salvează modificările
              </LoadingButton>
            </div>
          </form>
        </div></>)}
      {/* <h2 className="mt-2 text-2xl text-center font-bold">Cuvintele din acest dicționar</h2> */}
      <div className="flex flex-wrap -mx-2">
        <InertiaLink
          className="flex items-center px-6 py-4 text-gray-600 focus:text-indigo-700 focus:outline-none"
          href={history.state.url}
          onClick={animateIconOnClick} //e.target.classList.toggle('animate-spin')

        >
          <Icon
            name="reload"
            className="h-6 w-6 scale-x-[-1]"
          />
          <span>Actualizează tabelul</span>
        </InertiaLink>

      </div>
      <div className="mt-6 overflow-x-auto bg-white rounded shadow">
        <table className="w-full table-auto">
          <thead>
            <tr className="font-bold text-xl text-left">
              <th className="px-6 pt-5 pb-4">Cuvânt-titlu</th>
              <th className="px-6 pt-5 pb-4">Descriere lexicografică:
              </th>
              <th className="px-6 pt-5 pb-4">Acțiune
              </th>
              {/* <th className="px-6 pt-5 pb-4" colSpan="2"> Adăugat de:
              </th> */}
            </tr>
          </thead>
          <tbody>
            {/* @Todo display user*/}
            {data.map(
              ({ id, name, user_id, definition, deleted_at }) => {
                return (
                  <tr
                    key={id}
                    className="hover:bg-indigo-300 text-2xl text-indigo-900 focus-within:bg-indigo-300 "
                  >
                    <td className="border-t font-bold whitespace-nowrap">
                      <InertiaLink
                        href={route('words.edit', id)}
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
                    <td className="border-t text-xl pr-4">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('words.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {definition ? parse(definition) : ''}
                      </InertiaLink>
                    </td>
                    {/* <td className="border-t">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('words.edit', id)}
                        className="flex items-center px-6 py-4 focus:text-indigo focus:outline-none"
                      >
                        {user_id}
                      </InertiaLink>
                    </td> */}
                    {/* chevron -> 'Editeaza cuvintul' modiffied by Tudor on 27.09.2021 */}
                    <td className="border-t px-4">
                      <InertiaLink
                        tabIndex="-1"
                        href={route('words.edit', id)}
                        className="btn-edit focus:outline-none items-center px-4 focus:outline-none"
                      > <span>Editează cuvântul</span>
                        {/* <Icon
                          name="cheveron-right"
                          className="block w-6 h-6 text-gray-400 fill-current"
                        /> */}
                      </InertiaLink>
                    </td>
                  </tr>
                );
              }
            )}
            {dictionary.words.length === 0 && (
              <tr>
                <td className="px-6 py-4 border-t" colSpan="4">
                  Nu există niciun cuvânt în acest dicționar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination links={links} />
    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
