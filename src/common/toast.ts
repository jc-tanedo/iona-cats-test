import { useToast } from 'bootstrap-vue-3';

export default function () {
    const toast = useToast();

    const showError = (title: string) => {
        toast?.show({ title }, {pos: 'bottom-right', variant: 'danger'});
    };

    const showSuccess = (title: string) => {
        toast?.show({ title }, {pos: 'bottom-right', variant: 'success'});
    };

    return { showError, showSuccess };
}