export class LocalStorageHelper {
    private static DEVICE_ID = 'device_id';

    static setDeviceId(key: string) {
        if (!LocalStorageHelper.getDeviceId()) {
            localStorage.setItem(LocalStorageHelper.DEVICE_ID, key);
        }
    }

    static getDeviceId(): string {
        return localStorage.getItem(LocalStorageHelper.DEVICE_ID);
    }

}
