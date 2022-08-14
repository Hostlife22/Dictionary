import { useParams } from 'react-router-dom';
import { useGetWordsQuery } from '../../features/words/wordsApiSlice';

function Listbook() {
  const { group, page } = useParams();
  const { data = [], isLoading } = useGetWordsQuery({
    page: page ? +page : 0,
    group: group ? +group : 0,
  });

  console.log('Listbook', data);

  if (isLoading) return <>Loading</>;

  return (
    <div>
      <ul>
        {data.map((word) => (
          <li key={word.id}>
            {word.word} - id ({word.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Listbook;
