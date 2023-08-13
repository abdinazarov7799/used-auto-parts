import { message } from 'antd';

export const customMessage = (type, content) => {
    switch(type) {
        case 'success':
            message.success(content);
            break;
        case 'error':
            message.error(content);
            break;
        case 'info':
            message.info(content);
            break;
        case 'warning':
            message.warning(content);
            break;
        default:
            message.info('Not Message');
    }
};
