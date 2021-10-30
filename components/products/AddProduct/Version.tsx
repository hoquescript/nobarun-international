import React, { useEffect, useState } from 'react';
import { useFormState, useWatch } from 'react-hook-form';
import Togglebar from '../../controls/togglebar';
import Modal from '../../shared/Modal';

interface VersionProps {
  control: any;
  formReset: () => void;
}

const Version = (props: VersionProps) => {
  const { control, formReset } = props;
  const { dirtyFields, touchedFields } = useFormState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const version = useWatch({
    control: control,
    name: 'isBangla',
    defaultValue: false,
  });

  useEffect(() => {
    console.log('Fetching');
    if (
      Object.values(dirtyFields).length > 0 &&
      Object.keys(dirtyFields).some((field) => field !== 'isBangla')
    ) {
      setShowDeleteModal(true);
    }
  }, [version]);

  return (
    <Togglebar name="isBangla" className="mr-20">
      <Modal
        title="Confirmation Alert"
        body="Do you want to switch to another version? All changed fields will be removed."
        modalIsOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        confirmHandler={() => {
          formReset();
        }}
      />
      Bengali
    </Togglebar>
  );
};
export default Version;
