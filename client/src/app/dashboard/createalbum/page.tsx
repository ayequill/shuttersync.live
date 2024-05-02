'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createAlbum, createAlbumName } from '@/lib/api/albums.helper';
import Image from 'next/image';
import { useUser } from '@/contexts/user-context';
import { FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { Album } from '@/lib/interfaces/interfaces';
export default function Page() {
    const router = useRouter();
  const [selected, setSelected] = React.useState<File[]>([]);
  const [name, setName] = React.useState('');
  const [error, setError] = React.useState('');
  const { user } = useUser();

  async function handleSubmit() {
    try {
      if (name === '' || name === undefined) {
        setError('Album name is required');
        return;
      }
      setName(name.trim());

      if (selected.length === 0) {
        setError('At least one photo is required');
        return;
      }

      const nameRes = await createAlbumName(
        user.id,
        user?.access_token as string,
        name
      );

      if (nameRes) {
        const res = await createAlbum(
          nameRes?.id,
          user?.access_token as string,
          selected,
        );

        console.log(res);
      }
    router.push(`/dashboard/album/${nameRes?.id}`);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    setSelected(files);
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <section className='flex flex-col justify-center items-center'>
    <div className=" max-w-[320px] md:max-w-[520px] space-y-[2rem]">
      <h1 className="font-medium py-2">Create Album</h1>
      {/* <InputText /> */}
      <div className="grid max-w-sm items-center gap-1.5">
        <Label htmlFor="name">Album name</Label>
        <Input
          value={name}
          onChange={handleName}
          id="name"
          type="text"
          placeholder="Enter album name/title"
        />
        <Label htmlFor="photos">Add photos</Label>
        <input
          id="photos"
          multiple
          type="file"
          onChange={handleFile}
          className="flex file:rounded-md h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-primary file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
          //   {...form.register('photos')}
        />
        <SelectedPhotos selected={selected} setSelected={setSelected} />
        <button
          onClick={handleSubmit}
          className="w-full bg-primary p-3 rounded-lg font-medium"
        >
          Create Album
        </button>
      </div>
    </div>
    </section>
  );
}

const SelectedPhotos = ({
  selected,
  setSelected,
}: {
  selected: File[];
  setSelected: React.Dispatch<React.SetStateAction<File[]>>;
}) => {
  if (selected.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-1 gap-2 p-4 border-1">
      {selected.map((file) => (
        <div key={file.name} className="relative">
          <FaTimes
            className="absolute top-0 right-1 cursor-pointer"
            onClick={() =>
              setSelected(selected.filter((f) => f.name !== file.name))
            }
          />
          <Image
            className="rounded-md w-[80px] h-[80px] object-cover"
            src={URL.createObjectURL(file)}
            alt={file.name}
            width={80}
            height={80}
          />
        </div>
      ))}
    </div>
  );
};
