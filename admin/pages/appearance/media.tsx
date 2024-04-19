import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import React from 'react';
import { useState } from 'react';
import { Icons } from 'react-keyed-file-browser';

const FileBrowser = dynamic(() => import('react-keyed-file-browser'), {
  ssr: false,
});
// const Icons = dynamic(
//   () => import('react-keyed-file-browser').then((mod) => mod.Icons),
//   {
//     ssr: false,
//   },
// );
// if (typeof window === 'undefined') {
//   global.window = {
//     location: {
//       protocol: '',
//     },
//   };
// }
// import '../../node_modules/react-keyed-file-browser/dist/react-keyed-file-browser.css';
// if (typeof window === 'undefined') {
//   global.window = {};
// }
const FileInformation = (props) => {
  const { file, close } = props;
  console.log(file);
  return <h1>Fuck You</h1>;
};

const Media = () => {
  const [files, setFiles] = useState<
    {
      key: string;
      size: number;
      name?: string;
    }[]
  >([
    {
      key: 'photos/animals/cat in a hat.png',
      // modified: +Moment().subtract(1, 'hours'),
      size: 1.5 * 1024 * 1024,
    },
    {
      key: 'photos/animals/kitten_ball.png',
      // modified: +Moment().subtract(3, 'days'),
      size: 545 * 1024,
    },
    {
      key: 'photos/animals/elephants.png',
      // modified: +Moment().subtract(3, 'days'),
      size: 52 * 1024,
    },
    {
      key: 'photos/funny fall.gif',
      // modified: +Moment().subtract(2, 'months'),
      size: 13.2 * 1024 * 1024,
    },
    {
      key: 'photos/holiday.jpg',
      // modified: +Moment().subtract(25, 'days'),
      size: 85 * 1024,
    },
    {
      key: 'documents/letter chunks.doc',
      // modified: +Moment().subtract(15, 'days'),
      size: 480 * 1024,
    },
    {
      key: 'documents/export.pdf',
      // modified: +Moment().subtract(15, 'days'),
      size: 4.2 * 1024 * 1024,
    },
  ]);
  const handleCreateFolder = (key) => {
    setFiles((files) => {
      files = files.concat([
        {
          key: key,
          size: 0,
        },
      ]);
      return files;
    });
  };
  const handleCreateFiles = (files, prefix) => {
    setFiles((files) => {
      const newFiles = files.map((file) => {
        let newKey = prefix;
        if (
          prefix !== '' &&
          prefix.substring(prefix.length - 1, prefix.length) !== '/'
        ) {
          newKey += '/';
        }
        newKey += file.name;
        return {
          key: newKey,
          size: file.size,
          // modified: +Moment(),
        };
      });

      const uniqueNewFiles: any[] = [];
      newFiles.map((newFile) => {
        let exists = false;
        files.map((existingFile) => {
          if (existingFile.key === newFile.key) {
            exists = true;
          }
        });
        if (!exists) {
          uniqueNewFiles.push(newFile);
        }
      });
      files = files.concat(uniqueNewFiles);
      return files;
    });
  };
  const handleRenameFolder = (oldKey, newKey) => {
    setFiles((files) => {
      const newFiles: any[] = [];
      files.map((file) => {
        if (file.key.substr(0, oldKey.length) === oldKey) {
          newFiles.push({
            ...file,
            key: file.key.replace(oldKey, newKey),
            // modified: +Moment(),
          });
        } else {
          newFiles.push(file);
        }
      });
      files = newFiles;
      return files;
    });
  };
  const handleRenameFile = (oldKey, newKey) => {
    setFiles((files) => {
      const newFiles: any[] = [];
      files.map((file) => {
        if (file.key === oldKey) {
          newFiles.push({
            ...file,
            key: newKey,
            // modified: +Moment(),
          });
        } else {
          newFiles.push(file);
        }
      });
      files = newFiles;
      return files;
    });
  };
  const handleDeleteFolder = (folderKey) => {
    setFiles((files) => {
      const newFiles: any[] = [];
      files.map((file) => {
        if (file.key.substr(0, folderKey.length) !== folderKey) {
          newFiles.push(file);
        }
      });
      files = newFiles;
      return files;
    });
  };
  const handleDeleteFile = (fileKey) => {
    setFiles((files) => {
      const newFiles: any[] = [];
      files.map((file) => {
        if (file.key !== fileKey) {
          newFiles.push(file);
        }
      });
      files = newFiles;
      return files;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <FileBrowser
            // @ts-ignore
            files={files}
            onCreateFolder={handleCreateFolder}
            onCreateFiles={handleCreateFiles}
            onMoveFolder={handleRenameFolder}
            onMoveFile={handleRenameFile}
            onRenameFolder={handleRenameFolder}
            onRenameFile={handleRenameFile}
            onDeleteFolder={handleDeleteFolder}
            onDeleteFile={handleDeleteFile}
            detailRenderer={FileInformation}
          />
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default Media;
