import { Protected } from '@/helpers';
import { PropsWithChildren } from 'react';

export default Protected(function ({ children }: PropsWithChildren) {
    return children;
});
