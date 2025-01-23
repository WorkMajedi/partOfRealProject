import ModalGeneration from '.';

export default function ModalRenderer() {
    return (
        <ModalGeneration
            modals={[
                {
                    production_phase_details: {
                        name: 'production_phase_details',
                        type: 'detail',
                    },
                },
                {
                    grid_link_details: {
                        name: 'grid_link_details',
                        type: 'detail',
                    },
                },
            ]}
        />
    );
}
