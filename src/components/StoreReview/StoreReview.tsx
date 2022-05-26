import { requestReview, isAvailableAsync, storeUrl } from 'expo-store-review';
import { FC, memo, useRef } from 'react';
import { useMount } from 'wrn-core';
import configureApp from 'utils/constants/configureApp';

export interface StoreReviewProps {
  onRequested?: (url: string | null) => void;
  onFailure?: (message: string) => void;
}

const StoreReview: FC<StoreReviewProps> = ({ onFailure, onRequested }) => {
  const timeout = useRef<Timeout | null>(null);
  const _handleStoreReview = async () => {
    try {
      const isAvailable = await isAvailableAsync();
      if (isAvailable) {
        await requestReview();
        const url = storeUrl();
        onRequested?.(url);
      } else {
        throw new Error('Not Support');
      }
    } catch (err) {
      const error = (err as unknown) as any;
      onFailure?.(error.message);
    }
  };

  useMount(() => {
    if (configureApp.settings.storeReviewEnable) {
      timeout.current = setTimeout(() => {
        _handleStoreReview();
      }, configureApp.settings.storeReviewTimeout);
    }
    return () => {
      clearTimeout((timeout.current as unknown) as number);
    };
  });

  return null;
};

export default memo(StoreReview);
