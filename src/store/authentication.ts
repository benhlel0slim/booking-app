import jwtDecode from 'jwt-decode';
import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { DecodeAuthToken } from '../types/auth';

const { persistAtom } = recoilPersist();

export const token = atom<string>({
	key: 'token',
	default: '',
	effects_UNSTABLE: [persistAtom],
});

export const decodedToken = selector<DecodeAuthToken | undefined>({
	key: 'decoded-Token',
	get: ({ get }) => {
		const _token = get(token);
		if (_token === '') {
			return;
		}
		return jwtDecode(_token);
	},
});
