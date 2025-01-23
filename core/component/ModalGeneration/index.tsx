/* eslint-disable react/jsx-no-useless-fragment */
import React, { FunctionComponent, useState } from 'react';
import { Form } from 'component/common';
import { Field } from 'types/type';
import GenerationContentModal from './GenerationContentModal';

interface OwnProps {
    modals: any;
}

type Props = OwnProps;

const ModalGeneration: FunctionComponent<Props> = ({ modals }) => {
    const [open, setOpen] = useState(false);
    return (
        <Form
            display="flex"
            flexDirection="column"
            openModal={open}
        // reset={() => handelReset(listData)}
        >
            {modals &&
                modals?.map((com: Field, index: number) => {
                    const keyObj = Object.keys(com)[0];
                    if (keyObj)
                        return (
                            <GenerationContentModal
                                key={index}
                                modals={com}
                                name={keyObj}
                            />
                        );
                })}
        </Form>
    );
};

export default ModalGeneration;
