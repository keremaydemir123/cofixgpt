import Link from "next/link";

function Files({ files, chatId }: { files: IFile[]; chatId: string }) {
  return (
    <div className="flex flex-col gap-2">
      {files.length > 0 &&
        files?.map((file: IFile) => {
          return (
            <Link
              href={`/chat/${chatId}/files/${file.name}`}
              key={file.name}
              className="hover:underline w-max"
            >
              {file.name}
            </Link>
          );
        })}
    </div>
  );
}

export default Files;
