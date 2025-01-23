import { Form } from 'component/common';
import { Field } from 'react-hook-form';
import GenerationContentModal from './GenerationContentModal';

export default function ModalGeneration({ modals }: any) {
    return (
        <Form
            display="flex"
            flexDirection="column"
            open={false}
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
}
