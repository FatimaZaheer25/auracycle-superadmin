export type ProfileDetails = {
  fullName: string;
  email: string;
  role: string;
  roleNote: string;
  timeZone: string;
  initials: string;
};

export type SecurityInfo = {
  passwordChanged: string;
  twoStep: string;
  recoveryCodes: string;
};

export type ActiveSession = {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current?: boolean;
};

export type AlertPreference = {
  id: string;
  label: string;
  enabled: boolean;
};

export type ProfileMeta = {
  breadcrumb: string;
  subtitle: string;
};
