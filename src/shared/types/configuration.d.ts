import { TOptionsProps } from './common.d';

export type GeneralConfig = {
  configP: number;
  configI: number;
  configD: number;
  ovenTemperatureMax: number;
  ovenFanRPMMax: number;
  processTimeMax: number;
  minVoltageInput: number;
  maxVoltageInput: number;
};

export type RedeConfig = {
  ipV4: string;
  subnetMask: string;
  defaultGateway: string;
  primaryDNS: string;
  secondaryDNS: string;
  staticIP: boolean;
};

export type NotificacaoConfig = {
  id: number;
  alertName: string;
  continueProcess: boolean;
  activeBuzzer: EActionBuzzerAlert;
  songBuzzer: number;
  typeNotification: number;
};

export type DiagnosticoConfig = {
  id: number;
  nameAlert: string;
  errorInProcess: boolean;
  dateAlert: Date;
  typeAlert: number;
};

export type TGetConfigurationGeneral = TOptionsProps;
export type TGetConfigurationNewtwork = TOptionsProps;
export type TGetConfigurationNotification = TOptionsProps;
export type TGetConfigurationDiagnostic = TOptionsProps;
