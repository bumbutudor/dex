import { usePage } from '@inertiajs/inertia-react';

export default () => {
    const { dict_uzual_count, dict_sinonime_count, dict_sensuri_noi_count, dictionary_count, dictionaries, dictionary_id } = usePage().props;
    let dictionaryName = '';
    if (dictionary_count) {
        const dictionaryId = parseInt(dictionary_id);
        dictionaryName = dictionaries.find(dictionary => dictionary.id === dictionaryId).name;
    }

    return (

        <div>
            {dict_uzual_count && (<>
                <div className="overflow-auto bg-smoke-light">
                    <div className="px-2 py-1 bg-yellow-200 bg-white w-full max-w-md m-auto flex-col flex rounded-lg border border-gray-500">
                        <div className="mb-2">Numărul de cuvinte-titlu adăugate în dicționarul explicativ uzual este
                            <span className="font-bold text-indigo-900">{" " + dict_uzual_count.toLocaleString()}</span>
                        </div>
                        <div className="mb-2">Numarul de cuvinte-titlu adăugate in dicționarul de sinonime este
                            <span className="font-bold text-indigo-900">{" " + dict_sinonime_count.toLocaleString()}</span>
                        </div>
                        <div className="mb-2">Numarul de cuvinte-titlu adăugate in dicţionarul explicativ de cuvinte şi sensuri noi este
                            <span className="font-bold text-indigo-900">{" " + dict_sensuri_noi_count.toLocaleString()}</span>
                        </div>
                    </div>
                </div></>)}
            {dictionary_count && (<>
                <div className="overflow-auto bg-smoke-light">
                    <div className="px-2 py-1 bg-yellow-200 bg-white w-full max-w-md m-auto flex-col flex rounded-lg border border-gray-500">
                        <div className="mb-2">Numărul de cuvinte-titlu adăugate în dicționarul: <em>{dictionaryName ? dictionaryName : ''}</em> este <span className="font-bold text-indigo-900">{" " + dictionary_count.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </>)}
        </div>
    );
}