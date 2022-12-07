import { usePage } from '@inertiajs/inertia-react';
import parse from 'html-react-parser';

export default () => {
    const { dictionary_count, dictionaries } = usePage().props;

    const htmltoText = (html) => {
        if (!html) return ('');
        let text = html;
        text = text.replace(/\n/gi, "");
        text = text.replace(/<style([\s\S]*?)<\/style>/gi, "");
        text = text.replace(/<script([\s\S]*?)<\/script>/gi, "");
        text = text.replace(/<a.*?href="(.*?)[\?\"].*?>(.*?)<\/a.*?>/gi, " $2 $1 ");
        text = text.replace(/<\/div>/gi, "\n");
        text = text.replace(/<\/li>/gi, "\n");
        text = text.replace(/<li.*?>/gi, "  *  ");
        text = text.replace(/<\/ul>/gi, "\n");
        text = text.replace(/<\/p>/gi, "\n");
        text = text.replace(/<br\s*[\/]?>/gi, "\n");
        text = text.replace(/<[^>]+>/gi, "");
        text = text.replace(/^\s*/gim, "");
        text = text.replace(/ ,/gi, ",");
        text = text.replace(/ +/gi, " ");
        text = text.replace(/\n+/gi, "\n");
        text = text.replaceAll("&nbsp;", " ");
        return text;
    };

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
                                            <td className="border-t border-gray-600 text-sm"><a className='hover:text-indigo-700 cursor-help' title={htmltoText(dictionary?.description)}>{dictionary.name}</a></td>
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