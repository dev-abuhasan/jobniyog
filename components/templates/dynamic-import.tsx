'use client';
import dynamic from 'next/dynamic';
import type { TinyEditorProps, TinyEditorRef } from '@/services/types';
import { forwardRef } from 'react';

const TinyEditor = dynamic(
    () => import('@/components/atoms/inputs/tiny-editor'),
    { ssr: false }
);

export const TinyEditorDynamic = forwardRef<TinyEditorRef, TinyEditorProps>(
    (props, ref) => <TinyEditor {...props} ref={ref} />
);

TinyEditorDynamic.displayName = 'TinyEditorDynamic';