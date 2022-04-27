import { usePage } from '@inertiajs/inertia-react';

export default () => {
    const { dict_uzual_count, dict_sinonime_count, dict_sensuri_noi_count } = usePage().props;

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
        </div>
    );
}