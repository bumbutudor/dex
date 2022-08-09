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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ConfirmModal from '@/Shared/ConfirmModal';
import ModalWithButtons from '@/Shared/ModalWithButtons';
import SmallButton from "@/Shared/SmallButton";
import LoadingSmallButton from "@/Shared/LoadingSmallButton";

const Edit = () => {
  const { word, dictionaries, errors } = usePage().props;
  const [sending, setSending] = useState(false);
  const [show, setShow] = useState(false);

  const [values, setValues] = useState({
    name: word.name || '',
    predefinition: word.predefinition || '',
    definition: word.definition || '',
    synonyms: word.synonyms || '',
    antonyms: word.antonyms || '',
    paronyms: word.paronyms || '',
    other: word.other || '',
    active: word.active || '1',
    dictionary_id: word.dictionary_id || ''
  });


  // for modal
  const [valuesModal, setValuesModal] = useState({
    name: '',
    definition: '',
    predefinition: '',
    active: word.active || '1',
    dictionary_id: word.dictionary_id || ''
  });

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  let onConfirm = () => {
    alert("Confirmed");
  }

  let onNotConfirmed = () => {
    alert("Not confirmed");
  }

  let onShowConfirmModal = () => {
    setConfirmOpen(true);
  }

  let onShowDialogWithButtons = () => {
    setDialogIsOpen(true);
  }

  function handleChangeModal(e) {
    const key = e.target.name;
    const value = e.target.value;
    setValuesModal(valuesModal => ({
      ...valuesModal,
      [key]: value
    }));
  }

  function handleSubmitFromModal(e) {
    e.preventDefault();
    setSending(true);

    Inertia.post(route('words.storeFromModal'), valuesModal, {
      preserveState: true,
      onSuccess: (page) => {
        setSending(false);
        setDialogIsOpen(false);
      },
      onError: (errors) => {
        setSending(false);
      }
    });

    // clear form after submit
    // setValuesModal({ name: '', definition: '' });
  }

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
    Inertia.put(route('words.update', word.id), values, {
      onFinish: () => setSending(false)
    });
  }

  function destroy() {
    if (confirm('Sunteți sigur că doriți să ștergeți acest cuvânt din dicționar?')) {
      Inertia.delete(route('words.destroy', word.id));
    }
  }

  function restore() {
    if (confirm('Sunteți sigur că doriți să restabiliți acest cuvânt?')) {
      Inertia.put(route('words.restore', word.id));
    }
  }

  function goBack() {
    window.history.back();
    // window.location.replace(document.referrer);
    // window.location.reload()
  }

  return (
    <div>
      <Helmet title={values.name} />
      <button className="ml-auto  text-xl font-bold text-indigo-600 mb-4" onClick={goBack}><span>←Înapoi</span></button>
      <h1 className="mb-8 text-3xl font-bold">
        {/* <InertiaLink
          href={route('words')}
          className="text-indigo-600 hover:text-indigo-700"
        >
          Cuvinte
        </InertiaLink>
        <span className="mx-2 font-medium text-indigo-600">/</span> */}
        {values.name}
      </h1>
      {word.deleted_at && (
        <TrashedMessage onRestore={restore}>
          Acest cuvânt a fost șters.
        </TrashedMessage>
      )}
      <div className="max-w-3xl overflow-hidden bg-white rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap p-8 -mb-8 -mr-6">
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Cuvânt-titlu"
              name="name"
              type="text"
              errors={errors.name}
              // value={values.name=values.name.replace(/\n/g, " ")}
              value={values.name}
              onChange={handleChange}
            />
            <TextInput
              className="w-full pb-8 pr-6 lg:w-1/2"
              label="Cuvânt de bază (folosit la ordonarea cuvintelor)"
              name="predefinition"
              type="text"
              errors={errors.predefinition}
              // value={values.name=values.name.replace(/\n/g, " ")}
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
                  toolbar: ['bold', 'italic', 'link', 'undo', 'redo']

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

          </div>
          <div className="flex items-center px-8 py-4 bg-gray-100 border-t border-gray-200">
            {!word.deleted_at && (
              <DeleteButton onDelete={destroy}>Șterge cuvântul</DeleteButton>
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
      </div>

      {/* for modal */}
      <div className="absolute top-60 right-40">
        {false &&
          <SmallButton className="btn-indigo ml-2"
            onClick={onShowConfirmModal}>
            Adaugă un articol lexicografic nou
          </SmallButton>
        }

        <SmallButton className="btn-indigo ml-2"
          onClick={onShowDialogWithButtons}>
          Adaugă un articol lexicografic
        </SmallButton>

        <ConfirmModal
          title="Delete Post?"
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={onConfirm}
          onReject={onNotConfirmed}
        >
          Esti sigur?
        </ConfirmModal>

        <ModalWithButtons
          title="Adaugă un cuvânt nou"
          open={dialogIsOpen}
          onClose={() => setDialogIsOpen(false)}
          onConfirm={() => setDialogIsOpen(false)}
          buttons={
            <React.Fragment>
              <div className="p-1">
                <LoadingSmallButton
                  loading={sending}
                  onClick={handleSubmitFromModal}
                  className="btn-indigo ml-auto"
                >
                  Salvează
                </LoadingSmallButton>
              </div>
            </React.Fragment>
          }
        >
          <div className="bg-white rounded shadow overflow-hidden max-w-3xl">
            <form>
              <div className="p-4 -mr-3 -mb-4 flex flex-wrap">
                <TextInput
                  className="pr-4 pb-4 w-full "
                  label="Cuvânt-titlu"
                  name="name"
                  value={valuesModal.name}
                  errors={errors.name}
                  onChange={handleChangeModal}
                />

                <TextInput
                  className="pr-4 pb-4 w-full "
                  label="Cuvânt de bază (folosit la ordonarea cuvintelor)"
                  name="predefinition"
                  type="text"
                  errors={errors.predefinition}
                  // value={values.name=values.name.replace(/\n/g, " ")}
                  value={valuesModal.predefinition}
                  onChange={handleChangeModal}
                />

                <div name="Definiție" className="w-full pb-8 pr-6">
                  <h2 className="pb-2">Aici, la descrierea lexicografică, decupează textul necesar din stânga și lipește-l mai jos.</h2>

                  <CKEditor
                    editor={ClassicEditor}
                    config={{
                      toolbar: ['bold', 'italic', 'link', 'undo', 'redo']

                    }}

                    label="Definiție"
                    name="definition"
                    errors={errors.definition}
                    data={valuesModal.definition}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setValuesModal(values => ({
                        ...values,
                        definition: data
                      }));

                    }}
                  />
                </div>

                <SelectInput
                  className="w-full pb-8 pr-6"
                  label="Dicționar"
                  name="dictionary_id"
                  errors={errors.dictionary_id}
                  value={valuesModal.dictionary_id}
                  onChange={handleChangeModal}
                >
                  <option value=""></option>
                  {dictionaries.map(({ id, name }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </SelectInput>

              </div>

            </form>
          </div>

        </ModalWithButtons>
      </div>

    </div>
  );
};

Edit.layout = page => <Layout children={page} />;

export default Edit;
