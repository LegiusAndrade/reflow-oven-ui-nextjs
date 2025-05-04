import { config } from 'process';

import {
  DiagnosticoConfig,
  GeneralConfig,
  NotificacaoConfig,
  RedeConfig,
  TGetConfigurationDiagnostic,
  TGetConfigurationGeneral,
  TGetConfigurationNewtwork,
  TGetConfigurationNotification
} from '@/shared/types';

import { methodGET, methodPUT } from './client';


//#region GET METHODS ----------------------------------------------------------------
export async function getGeneralConfig({
  options
}: TGetConfigurationGeneral = {}): Promise<GeneralConfig | null> {
  //const data = await methodGET<GeneralConfig | null>('general_config', options);
  const data = {configP: 1.2, configI: 1.3, configD: 1.4, ovenTemperatureMax: 23, ovenFanRPMMax: 2500, processTimeMax: 30, minVoltageInput: 20, maxVoltageInput: 30};
  return data;
}

export async function getNetworkConfig({
  options
}: TGetConfigurationNewtwork = {}): Promise<RedeConfig | null> {
  //const data = await methodGET<RedeConfig | null>('network_config', options);
  const data = {ipV4: '192.168.1.1',
    subnetMask: '10.1.1.1',
    defaultGateway: '10.1.1.1',
    primaryDNS: '10.1.1.1',
    secondaryDNS: '10.1.1.1',
    staticIP: false};
  return data;
}

export async function getNotificationConfig({ options }: TGetConfigurationNotification = {}): Promise<
  NotificacaoConfig[] | null
> {
  //const data = await methodGET<NotificacaoConfig[] | null>('notification_config', options);
  const data = null;
  return data;
}

export async function getDiagnosticConfig({ options }: TGetConfigurationDiagnostic = {}): Promise<
  DiagnosticoConfig[] | null
> {
  const data = null;
  return data;
}

//#endregion

//#region PUT METHODS ----------------------------------------------------------------
export async function putGeneralConfig<T>(data: T): Promise<Response> {
  //const [response, responseData] = await methodPUT<T, Response>('general_config', data);
  //console.log('Response:', response);
  //console.log('ResponseData:', responseData);
  const response = new Response();
  response.status = 200;
  response.statusText = 'OK';
  return response;
}

export async function putNetworkConfig<T>(data: T): Promise<Response> {
  //const [response, responseData] = await methodPUT<T, Response>('network_config', data);
  //console.log('Response:', response);
  //console.log('ResponseData:', responseData);
  const response = new Response();
  response.status = 200;
  response.statusText = 'OK';
  return response;
}

export async function putNotificationConfig<T>(data: T, id: string): Promise<Response> {
  //const [response, responseData] = await methodPUT<T, Response>(`notification_config/${id}`, data);
  //console.log(`notification_config/${id}`);
  const response = new Response();
  response.status = 200;
  response.statusText = 'OK';
  return response;
}
//#endregion