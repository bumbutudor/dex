import { usePage } from '@inertiajs/inertia-react';
import parse from 'html-react-parser';
import { htmlToText } from '@/utils';

export default () => {
    const { dictionary_count, dictionaries } = usePage().props;

    return (
        <div>
            {dictionary_count && (<>
                <div className='words-count' >
                    <div className="overflow-auto bg-smoke-light">
                        <div className="px-2 py-1 bg-yellow-200 bg-white w-full max-w-md m-auto flex-col flex rounded-lg border border-gray-500">
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className='text-xs'>
                                        <th>Dicționar</th>
                                        <th className="border-l border-gray-600">Nr. de cuvinte-titlu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dictionaries.map(dictionary => (
                                        <tr key={dictionary.id}>
                                            <td className="border-t border-gray-600 text-sm"><a className='hover:text-indigo-700 cursor-help' title={htmlToText(dictionary?.description)}>{dictionary.name}</a></td>
                                            <td className="border-l border-t border-gray-600 font-bold text-center text-xs">{dictionary.words_count.toLocaleString()}</td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td className="border-t border-gray-600 text-s">Total</td>
                                        <td className="border-l border-t border-gray-600 font-bold text-center text-xs">{dictionary_count.toLocaleString()}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </>)}
        </div>

    );
}