import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export default function UseFile() {
    const [filesId, setFilesId] = useState<number[]>([]);
    const {
        setValue,
        getValues,
        formState: { isSubmitSuccessful },

    } = useFormContext();

    useEffect(() => {
        const listFiles: any = getValues('attachments');
        const defaultFileIds = !!listFiles?.length
            ? listFiles.map((file: any) => {
                  if (file?.id) {
                      return file?.id;
                  } else {
                      return file;
                  }
              })
            : [];
        setFilesId(defaultFileIds);
      
    }, [getValues, isSubmitSuccessful]);


    useEffect(() => {
        setValue('attachments', filesId);
    }, [filesId, setValue]);

    return setFilesId;
}
