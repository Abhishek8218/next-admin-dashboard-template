import { atom } from 'recoil';

interface SecurityPinModalState {
  isOpen: boolean;
  onSuccess?: () => void;
}

export const securityPinModalState = atom<SecurityPinModalState>({
  key: 'securityPinModalState',
  default: {
    isOpen: false,
    onSuccess: undefined,
  },
});