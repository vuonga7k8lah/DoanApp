export interface VersionInfo {
  getPackageName: () => string;
  getCurrentBuildNumber: () => number;
  getCurrentVersion: () => string;
}

interface NeedUpdateOption {
  currentVersion?: string;
  latestVersion?: string;
  depth?: number;
  ignoreErrors?: boolean;
}

interface NeedUpdateResult {
  isNeeded: boolean;
  storeUrl: string;
  currentVersion: string;
  latestVersion: string;
}

export interface ReactNativeVersionCheck extends VersionInfo {
  getStoreUrl: typeof getStoreUrl;
  getAppStoreUrl: typeof getAppStoreUrl;
  getPlayStoreUrl: typeof getPlayStoreUrl;
  getLatestVersion: typeof getLatestVersion;
  needUpdate: (needUpdateOption?: NeedUpdateOption | null) => Promise<NeedUpdateResult>;
}

declare const builder: (VersionInfoObject: VersionInfo) => ReactNativeVersionCheck;

export default builder;
