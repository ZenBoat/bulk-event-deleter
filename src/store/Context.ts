import {AxiosInstance} from 'axios';
import React from 'react';
import {User} from '@react-native-community/google-signin';

export interface UserContextInterface {
  axiosInstance: AxiosInstance | undefined;
  setToken: (accessToken: string) => void | undefined;
  accessToken: string | undefined;
  setAxiosInstance: (axiosInstance: AxiosInstance) => void;
  user: User | undefined;
  setUser: (user: User | undefined) => void;
  emptyState: () => void;
}

export interface CalendarContextInterface {
  calendarId: string | undefined;
  setCalendarId: (calendarId: string) => void;
}

const CalendarContext = React.createContext<CalendarContextInterface>(
  {} as CalendarContextInterface,
);
const UserContext = React.createContext<UserContextInterface>(
  {} as UserContextInterface,
);
export {CalendarContext, UserContext};
