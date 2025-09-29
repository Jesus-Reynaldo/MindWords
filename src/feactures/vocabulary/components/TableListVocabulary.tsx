import type { Word } from "../interfaces/vocabulary.interface";

export const TableListVocabulary = ({words}: {words: Word[]}) => {
  return (
    <div className="overflow-x bg-white shadow-md sm:rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left">
              <span className="text-gray-500 hover:text-gray-900">Word</span>
            </th>
            <th className="px-6 py-3">
              <span className="text-gray-500 hover:text-gray-900">Definition</span>
            </th>
            <th className="px-6 py-3">
              <span className="text-gray-500 hover:text-gray-900">Sentence</span>
            </th>
            <th className="px-6 py-3">
              <span className="text-gray-500 hover:text-gray-900">Level</span>
            </th>
            <th className="px-6 py-3">
              <span className="text-gray-500 hover:text-gray-900">Dias</span>
            </th>
            <th className="px-6 py-3">
              <span className="text-gray-500 hover:text-gray-900">Next Review Date</span>
            </th>
            <th className="px-6 py-3">
              <span className="text-gray-500 hover:text-gray-900">Date Added</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id} className="border-b">
              <td className="px-6 py-4">
                <span className="text-gray-900">{word.word}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-900">{word.definition}</span>
              </td>
              <td className="px-6 py-4">
                <ul className="list-disc text-gray-900 pl-4">
                  {word.sentence.map((sentence, index) => (
                    <li key={index} className="mb-2">
                      {sentence}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-900">{word.level}</span>
              </td>
              <td className="px-6 py-4">
                {word.dias.map((dia, index) => (
                  <span key={index} className="text-gray-900 bg-blue-100 rounded px-2 py-1">{dia}</span>
                ))}
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-900">{word.nextReviewDate}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-gray-900">{word.dateAdded}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
