import { post } from '~/helpers/apiClient';

export const buildUrl = url => `/account${url}`;

export const signup = params => post(buildUrl('/signup'), params);
export const signin = params => post(buildUrl('/signin'), params);
