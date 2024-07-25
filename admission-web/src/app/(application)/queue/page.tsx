import { getServerUser } from '@/app/api/actions/getServerUser';
import { EnterQueue } from './components/enter-queue/EnterQueue';
import { EnteredQueue } from './components/entered-queue/EnteredQueue';
import { getQueueUser } from '@/app/api/actions/getQueueUser';

export default async function page() {
  const user = await getServerUser();

  if (!user) {
    return null;
  }

  const data = await getQueueUser(user.id);

  return (
    <main className='my-[7%] flex flex-1 flex-col items-center gap-14'>
      {data ? (
        <EnteredQueue data={data} user={user} />
      ) : (
        <EnterQueue userId={user.id} />
      )}
    </main>
  );
}
