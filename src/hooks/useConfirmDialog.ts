'use client';

import { useState, useCallback } from 'react';

interface DialogOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  onConfirm: () => void | Promise<void>;
}

export function useConfirmDialog() {
  const [dialogState, setDialogState] = useState<DialogOptions & { isOpen: boolean }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    isDestructive: true,
    onConfirm: () => {},
  });
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback((options: DialogOptions) => {
    setDialogState({
      isOpen: true,
      title: options.title,
      message: options.message,
      confirmText: options.confirmText ?? 'Delete',
      cancelText: options.cancelText ?? 'Cancel',
      isDestructive: options.isDestructive ?? true,
      onConfirm: options.onConfirm,
    });
  }, []);

  const close = useCallback(() => {
    setDialogState((prev) => ({ ...prev, isOpen: false }));
    setIsLoading(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    try {
      await dialogState.onConfirm();
    } finally {
      setIsLoading(false);
      setDialogState((prev) => ({ ...prev, isOpen: false }));
    }
  }, [dialogState]);

  return {
    confirm,
    dialogProps: {
      isOpen: dialogState.isOpen,
      title: dialogState.title,
      message: dialogState.message,
      confirmText: dialogState.confirmText,
      cancelText: dialogState.cancelText,
      isDestructive: dialogState.isDestructive,
      isLoading,
      onConfirm: handleConfirm,
      onCancel: close,
    },
  };
}
